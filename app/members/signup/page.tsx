"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Music,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function MemberSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    voicePart: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [emailWarning, setEmailWarning] = useState("");

  const voiceParts = ["Soprano", "Alto", "Tenor", "Bass", "Instrumentalist", "Other"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.voicePart) {
      newErrors.voicePart = "Please select your voice part";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setEmailWarning("");

    try {
      console.log("Starting account creation...");
      
      // Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Firebase auth account created:", userCredential.user.uid);

      // Try to send email verification (non-blocking)
      let emailSent = false;
      try {
        await Promise.race([
          sendEmailVerification(userCredential.user, {
            url: `${window.location.origin}/members/login`,
            handleCodeInApp: false,
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Email timeout')), 5000)
          )
        ]);
        emailSent = true;
        console.log("Verification email sent");
      } catch (emailError: any) {
        console.error("Email verification error:", emailError);
        setEmailWarning("Note: Verification email failed to send. You can request a resend from the login page.");
      }

      // Create member account in Firestore via API with shorter timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      try {
        console.log("Creating member account in Firestore...");
        const response = await fetch("/api/members/create-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: userCredential.user.uid,
            fullName: formData.fullName,
            email: formData.email,
            voicePart: formData.voicePart,
            phone: formData.phone,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        console.log("API response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("API error:", errorData);
          throw new Error(errorData.error || "Failed to create member account");
        }
        
        console.log("Member account created successfully");
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        console.error("Fetch error:", fetchError);
        if (fetchError.name === 'AbortError') {
          setSuccessMessage(
            "Account created but server is slow. Your account may be ready - try logging in after a few minutes."
          );
          setTimeout(() => router.push("/members/login"), 4000);
          return;
        }
        throw fetchError;
      }

      setSuccessMessage(
        emailSent 
          ? "Account created successfully! Please check your email to verify your account before logging in."
          : "Account created! However, the verification email failed to send. You can request a new verification link from the login page."
      );

      // Redirect to login after 4 seconds
      setTimeout(() => {
        router.push("/members/login");
      }, 4000);
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already registered" });
      } else if (error.code === "auth/weak-password") {
        setErrors({ password: "Password is too weak. Please choose a stronger password." });
      } else if (error.code === "auth/invalid-email") {
        setErrors({ email: "Invalid email address format" });
      } else {
        setErrors({ general: error.message || "Failed to create account. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
              Join the Member Portal
            </h1>
            <p className="text-xl text-blue-100">
              Access rehearsal materials, announcements, and stay connected with The Chorus Abuja
            </p>
          </div>
        </section>

        {/* Signup Form Section */}
        <section className="max-w-2xl mx-auto px-4 py-12">
          {successMessage ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 mb-3">Success!</h2>
              <p className="text-green-800 mb-4">{successMessage}</p>
              {emailWarning && (
                <p className="text-sm text-yellow-700 mb-2">{emailWarning}</p>
              )}
              <p className="text-sm text-green-700">Redirecting to login page...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Member Account</h2>
                <p className="text-gray-600">Fill in your details to get started</p>
              </div>

              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
                        errors.fullName ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
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

                {/* Voice Part */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Part / Role *
                  </label>
                  <div className="relative">
                    <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="voicePart"
                      value={formData.voicePart}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
                        errors.voicePart ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your voice part</option>
                      {voiceParts.map((part) => (
                        <option key={part} value={part}>
                          {part}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.voicePart && <p className="mt-1 text-sm text-red-600">{errors.voicePart}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="08012345678"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
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
                      placeholder="Minimum 6 characters"
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
                        errors.confirmPassword ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Create Account
                    </>
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link href="/members/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
