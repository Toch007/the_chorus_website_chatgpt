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
      {/* Fancy Tier Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tickets.map((ticket) => {
          const tierMeta: Record<
            string,
            { icon: string; gradient: string; glow: string; badge?: string }
          > = {
            Bronze: {
              icon: "🎫",
              gradient: "from-amber-800 via-amber-600 to-yellow-700",
              glow: "shadow-amber-500/40",
            },
            Silver: {
              icon: "⭐",
              gradient: "from-slate-500 via-gray-400 to-slate-600",
              glow: "shadow-slate-400/40",
            },
            Gold: {
              icon: "👑",
              gradient: "from-yellow-500 via-amber-400 to-yellow-600",
              glow: "shadow-yellow-400/60",
              badge: "Most Popular",
            },
            Diamond: {
              icon: "💎",
              gradient: "from-blue-600 via-purple-500 to-indigo-700",
              glow: "shadow-blue-500/60",
              badge: "Premium",
            },
          };
          const meta = tierMeta[ticket.name] ?? {
            icon: "🎟️",
            gradient: "from-blue-700 to-blue-900",
            glow: "shadow-blue-500/40",
          };
          const inCart = cart[ticket.name] ?? 0;

          return (
            <div
              key={ticket.name}
              className={`relative rounded-2xl overflow-hidden flex flex-col shadow-2xl ${meta.glow} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group`}
            >
              {/* Badge */}
              {meta.badge && (
                <div className="absolute top-3 right-3 z-10 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border border-white/30">
                  {meta.badge}
                </div>
              )}

              {/* Gradient body */}
              <div
                className={`bg-gradient-to-br ${meta.gradient} p-6 flex-1 flex flex-col items-center text-center text-white relative overflow-hidden`}
              >
                {/* Shimmer streak */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rotate-45 blur-2xl group-hover:translate-x-40 transition-transform duration-700 pointer-events-none" />

                <div className="text-5xl mb-3 drop-shadow-lg">{meta.icon}</div>
                <h3 className="text-2xl font-extrabold tracking-wide mb-1">
                  {ticket.name}
                </h3>
                <div className="w-8 h-0.5 bg-white/40 rounded mb-3" />
                <div className="text-3xl font-black">
                  ₦{formatCurrency(ticket.price)}
                </div>
                <p className="text-xs text-white/70 mt-1 uppercase tracking-widest">
                  per ticket
                </p>

                {ticket.perks.length > 0 && (
                  <ul className="mt-4 space-y-1 text-sm text-white/90 w-full text-left">
                    {ticket.perks.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-white/60">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                )}

                {/* In-cart indicator */}
                {inCart > 0 && (
                  <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-semibold border border-white/30">
                    <span>🧾</span> {inCart} in cart
                  </div>
                )}
              </div>

              {/* Add to Cart footer */}
              <button
                onClick={() => addToCart(ticket)}
                className="w-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white font-bold py-4 text-sm uppercase tracking-widest border-t border-white/20 transition-all duration-200 active:scale-95"
              >
                + Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart & Buyer Info */}
      <div className="mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-2xl">🛒</span>
          <span>Your Cart</span>
          {Object.keys(cart).length > 0 && (
            <span className="ml-auto bg-yellow-500 text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
              {Object.values(cart).reduce((a, b) => a + b, 0)} ticket
              {Object.values(cart).reduce((a, b) => a + b, 0) !== 1 ? "s" : ""}
            </span>
          )}
        </h2>

        {Object.keys(cart).length === 0 ? (
          <div className="text-center py-8 text-gray-400 border border-dashed border-gray-600 rounded-xl mb-6">
            <div className="text-4xl mb-2">🎫</div>
            <p>No tickets selected yet. Choose a tier above.</p>
          </div>
        ) : (
          <ul className="space-y-3 mb-6">
            {Object.entries(cart).map(([name, qty]) => {
              const t = tickets.find((x) => x.name === name);
              if (!t) {
                console.error(`Ticket not found in cart: ${name}`);
                return null;
              }
              return (
                <li
                  key={name}
                  className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                >
                  <div>
                    <div className="font-semibold text-white">{name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      ₦{formatCurrency(t.price)} × {qty} ={" "}
                      <span className="text-yellow-400 font-bold">
                        ₦{formatCurrency(t.price * qty)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(t)}
                      className="w-8 h-8 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg font-bold transition"
                    >
                      −
                    </button>
                    <div className="w-8 text-center font-bold">{qty}</div>
                    <button
                      onClick={() => addToCart(t)}
                      className="w-8 h-8 flex items-center justify-center bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded-lg font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Your full name *"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
              buyerName.trim()
                ? "border-green-500/50 focus:ring-green-500/30"
                : "border-white/10 focus:ring-white/10"
            }`}
            required
          />
          <input
            type="email"
            placeholder="Your email address * (tickets will be sent here)"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
              buyerEmail.includes("@")
                ? "border-green-500/50 focus:ring-green-500/30"
                : "border-white/10 focus:ring-white/10"
            }`}
            required
          />
          {(!buyerName.trim() || !buyerEmail.trim()) && totalAmount > 0 && (
            <p className="text-amber-400 text-sm flex items-center gap-2">
              <span>⚠️</span>
              Please fill in your name and email to proceed
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-6 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
          <div className="text-gray-300 font-medium">Total Amount</div>
          <div className="text-2xl font-extrabold text-yellow-400">
            ₦{formatCurrency(totalAmount)}
          </div>
        </div>

        <PaystackButton
          className={`w-full font-bold py-4 rounded-xl text-base uppercase tracking-wide transition-all duration-200 ${
            loading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : totalAmount === 0 || !buyerName.trim() || !buyerEmail.trim()
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 hover:from-yellow-300 hover:to-amber-400 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 active:scale-95"
          }`}
          text={
            loading
              ? "🔄 Processing Payment..."
              : "💳 Proceed to Secure Payment"
          }
          disabled={
            totalAmount === 0 ||
            loading ||
            !buyerName.trim() ||
            !buyerEmail.trim()
          }
          publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!}
          email={buyerEmail}
          amount={totalAmount * 100}
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

        <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
          <span>🔒</span> Secured by Paystack &bull; Tickets delivered to your
          email instantly after payment
        </p>
      </div>
    </div>
  );
}
