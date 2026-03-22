"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Mail,
  Lock,
  Music,
  LogIn,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  UserPlus,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

export default function MemberLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setResendSuccess("");

    try {
      console.log("Attempting login...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Login successful, checking verification status...");

      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        console.log("Email not verified");
        setErrors({
          general: "Please verify your email before logging in. Check your inbox for the verification link.",
        });
        setShowResendVerification(true);
        await auth.signOut();
        setIsLoading(false);
        return;
      }

      console.log("Email verified, checking member status...");

      // Check if member account exists and is approved with shorter timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      try {
        const response = await fetch(
          `/api/members/check-status?uid=${userCredential.user.uid}`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        console.log("Check status response:", response.status);

        if (!response.ok) {
          throw new Error("Failed to check member status");
        }

        const data = await response.json();
        console.log("Member data:", { exists: data.exists, status: data.status });

        if (!data.exists) {
          setErrors({ general: "Member account not found. Please contact admin." });
          await auth.signOut();
          setIsLoading(false);
          return;
        }

        if (data.status !== "approved") {
          setErrors({
            general: `Your account is ${data.status}. Please wait for admin approval or contact support.`,
          });
          await auth.signOut();
          setIsLoading(false);
          return;
        }

        console.log("All checks passed, redirecting to portal...");
        // Redirect to member portal
        router.push("/members/portal");
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        console.error("Fetch error:", fetchError);
        if (fetchError.name === 'AbortError') {
          setErrors({ general: "Connection timeout. Please check your internet and try again." });
        } else {
          setErrors({ general: "Failed to verify account status. Please try again." });
        }
        await auth.signOut();
        setIsLoading(false);
        return;
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        setErrors({ general: "Invalid email or password" });
      } else if (error.code === "auth/user-not-found") {
        setErrors({ general: "No account found with this email" });
      } else if (error.code === "auth/too-many-requests") {
        setErrors({ general: "Too many failed attempts. Please try again later." });
      } else if (error.code === "auth/network-request-failed") {
        setErrors({ general: "Network error. Please check your internet connection." });
      } else {
        setErrors({ general: "Failed to login. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
      setShowResendVerification(false);
      setResendSuccess("");
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email || !formData.password) {
      setErrors({ general: "Please enter your email and password first." });
      return;
    }

    setResendingEmail(true);
    setResendSuccess("");
    setErrors({});

    try {
      console.log("Attempting to resend verification...");
      // Sign in to get user object with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const userCredential = await Promise.race([
        signInWithEmailAndPassword(auth, formData.email, formData.password),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Authentication timeout')), 5000)
        )
      ]) as any;

      clearTimeout(timeoutId);
      console.log("Signed in, sending verification email...");

      // Send verification email with timeout
      await Promise.race([
        sendEmailVerification(userCredential.user, {
          url: `${window.location.origin}/members/login`,
          handleCodeInApp: false,
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email send timeout')), 5000)
        )
      ]);

      setResendSuccess("Verification email sent! Please check your inbox and spam folder.");
      console.log("Verification email sent successfully");
      
      // Sign out after sending
      await auth.signOut();
    } catch (error: any) {
      console.error("Resend verification error:", error);
      if (error.message === 'Authentication timeout' || error.message === 'Email send timeout') {
        setErrors({ general: "Request timed out. Please check your internet connection and try again." });
      } else if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        setErrors({ general: "Invalid email or password. Please check your credentials." });
      } else if (error.code === "auth/too-many-requests") {
        setErrors({ general: "Too many requests. Please wait a few minutes before trying again." });
      } else {
        setErrors({ general: "Failed to resend verification email. Please try again later." });
      }
    } finally {
      setResendingEmail(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-4 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/rehearsal.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-purple-900/60 to-blue-900/70"></div>
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <Music className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome Back
            </h1>
            <p className="text-xl text-blue-100">
              Login to access your member portal
            </p>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <LogIn className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Member Login</h2>
              <p className="text-gray-600">Enter your credentials to continue</p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login
                  </>
                )}
              </button>

              {/* Resend Verification Section */}
              {showResendVerification && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 mb-3">
                    Haven't received the verification email?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendingEmail}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {resendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Resend Verification Email
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Resend Success Message */}
              {resendSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-800">{resendSuccess}</p>
                </div>
              )}

              {/* Signup Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-3">
                  Don't have an account?{" "}
                  <Link
                    href="/members/signup"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign up here
                  </Link>
                </p>
                <Link
                  href="/admin/login"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Admin Login →
                </Link>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              New Member?
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              If you're a new member of The Chorus Abuja, please sign up to create your account. Your account will need to be approved by an admin before you can access the portal.
            </p>
            <Link
              href="/members/signup"
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
