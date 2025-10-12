"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/formatCurrency";

type PaystackButtonProps = {
  className?: string;
  text?: string;
  disabled?: boolean;
  publicKey: string;
  email?: string;
  amount: number;
  reference?: string;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
  metadata?: any;
};

const PaystackButton: React.FC<PaystackButtonProps> = ({
  className,
  text = "Donate",
  disabled,
  publicKey,
  email,
  amount,
  reference,
  onSuccess,
  onClose,
  metadata,
}) => {
  const loadScript = () =>
    new Promise<void>((resolve, reject) => {
      if ((window as any).PaystackPop) return resolve();
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Paystack script"));
      document.body.appendChild(script);
    });

  const handleClick = async () => {
    if (disabled) return;
    try {
      await loadScript();
      const handler = (window as any).PaystackPop.setup({
        key: publicKey,
        email,
        amount,
        reference: reference ?? `DON-${crypto.randomUUID()}`,
        metadata,
        callback: (res: any) => {
          onSuccess && onSuccess(res);
        },
        onClose: () => {
          onClose && onClose();
        },
      });
      handler.openIframe();
    } catch (err) {
      console.error("Paystack load error:", err);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default function DonationForm() {
  const [amount, setAmount] = useState<number>(1000);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  const handleSuccess = async (res: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount,
          name: name.trim() || "Anonymous",
          reference: res.reference,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(
          `✅ Thank you for your donation of ₦${formatCurrency(amount)}! A confirmation email has been sent to ${email}.`
        );
        setEmail("");
        setName("");
        setAmount(1000);
      } else {
        alert("❌ Failed to record donation: " + (data.error || data.message));
      }
    } catch (err) {
      console.error(err);
      alert(
        "❌ Donation succeeded but recording failed. Please contact support."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Your full name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
      <input
        type="number"
        min={100}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full px-4 py-4 border border-gray-300 rounded-lg text-center text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />

      <PaystackButton
        className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors font-semibold disabled:opacity-60 text-base min-h-[44px] flex items-center justify-center"
        text={loading ? "Processing..." : `Donate ₦${amount}`}
        disabled={!email || amount < 100 || loading}
        publicKey={publicKey}
        email={email}
        amount={amount * 100} // Paystack expects kobo
        onSuccess={handleSuccess}
        onClose={() => alert("❌ Transaction cancelled.")}
      />
    </div>
  );
}
