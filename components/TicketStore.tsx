"use client";

import React, { useState } from "react";
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
  text = "Pay",
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
        reference: reference ?? `REF-${crypto.randomUUID()}`,
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

export type Ticket = {
  name: string;
  price: number;
  perks: string[];
  color?: string;
};

type TicketStoreProps = {
  tickets: Ticket[];
};

export default function TicketStore({ tickets }: TicketStoreProps) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const addToCart = (ticket: Ticket) =>
    setCart((prev) => ({
      ...prev,
      [ticket.name]: (prev[ticket.name] || 0) + 1,
    }));

  const removeFromCart = (ticket: Ticket) =>
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[ticket.name]) return copy;
      if (copy[ticket.name] > 1) copy[ticket.name] -= 1;
      else delete copy[ticket.name];
      return copy;
    });

  const totalAmount = Object.entries(cart).reduce((sum, [name, qty]) => {
    const t = tickets.find((x) => x.name === name);
    return sum + (t ? t.price * qty : 0);
  }, 0);

  const handleSuccess = async (res: any) => {
    if (!buyerName || !buyerEmail) {
      alert("Please enter your name and email before proceeding.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/purchaseTickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: res.reference,
          cart,
          buyerName,
          email: buyerEmail,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Payment verified! Your tickets have been emailed to you.");
        setCart({});
        setBuyerName("");
        setBuyerEmail("");
      } else {
        alert("❌ Ticket processing failed: " + (data.error || data.message));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error verifying payment. Please contact support if charged.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-10">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl">
          <div className="bg-white rounded-lg p-8 shadow-2xl text-center max-w-sm mx-4">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Processing Payment
            </h3>
            <p className="text-gray-600 text-sm">
              Verifying transaction and issuing your tickets...
            </p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Options */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.name}
            className={`rounded-xl overflow-hidden shadow-lg bg-white flex flex-col ${
              ticket.name === "Diamond"
                ? "ring-4 ring-blue-400 animate-pulse"
                : ""
            }`}
          >
            <div
              className={`${ticket.color ?? "bg-blue-700"} p-4 text-white text-center`}
            >
              <h3 className="text-xl font-bold">{ticket.name}</h3>
              <p className="text-lg font-semibold mt-1">
                ₦{formatCurrency(ticket.price)}
              </p>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              {ticket.perks.length > 0 && (
                <ul className="text-sm text-gray-700 mb-4 space-y-1">
                  {ticket.perks.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              )}

              <div className="flex justify-between items-center">
                <button
                  onClick={() => addToCart(ticket)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
                >
                  Add to Cart
                </button>
                <span className="text-xs text-gray-500">Per ticket</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart & Buyer Info */}
      <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">🛒 Your Cart</h2>

        {Object.keys(cart).length === 0 ? (
          <p className="text-gray-600 mb-4">No tickets selected yet.</p>
        ) : (
          <ul className="space-y-3 mb-4">
            {Object.entries(cart).map(([name, qty]) => {
              const t = tickets.find((x) => x.name === name)!;
              return (
                <li
                  key={name}
                  className="flex justify-between items-center bg-green-500 rounded p-3 shadow-sm"
                >
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-xs text-gray-500">
                      ₦{formatCurrency(t.price)} each
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(t)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      −
                    </button>
                    <div className="min-w-[36px] text-center">{qty}</div>
                    <button
                      onClick={() => addToCart(t)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="space-y-3 mb-4">
          <input
            type="text"
            placeholder="Your full name *"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md transition-colors ${
              buyerName.trim()
                ? "border-green-300 bg-green-50"
                : "border-gray-300"
            }`}
            required
          />
          <input
            type="email"
            placeholder="Your email address *"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md transition-colors ${
              buyerEmail.includes("@")
                ? "border-green-300 bg-green-50"
                : "border-gray-300"
            }`}
            required
          />
          {(!buyerName.trim() || !buyerEmail.trim()) && totalAmount > 0 && (
            <p className="text-red-600 text-sm flex items-center">
              <span className="mr-1">⚠️</span>
              Please fill in your name and email address to proceed
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">Total:</div>
          <div className="text-xl font-bold text-blue-900">
            ₦{formatCurrency(totalAmount)}
          </div>
        </div>

        <PaystackButton
          className={`flex-1 font-bold px-4 py-2 rounded-md transition-all duration-200 ${
            loading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-yellow-500 text-blue-900 hover:bg-yellow-400"
          } disabled:opacity-60`}
          text={loading ? "🔄 Processing Payment..." : "💳 Proceed to Payment"}
          disabled={
            totalAmount === 0 ||
            loading ||
            !buyerName.trim() ||
            !buyerEmail.trim()
          }
          publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!}
          email={buyerEmail}
          amount={totalAmount * 100} // in kobo
          reference={`TICKET-${crypto.randomUUID()}`}
          onSuccess={handleSuccess}
          onClose={() => alert("Transaction closed")}
          metadata={{
            custom_fields: [
              {
                display_name: "Name",
                variable_name: "buyerName",
                value: buyerName,
              },
              {
                display_name: "Cart",
                variable_name: "cart",
                value: JSON.stringify(cart),
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
