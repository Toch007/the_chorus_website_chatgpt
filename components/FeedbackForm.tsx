"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface FeedbackFormProps {
  eventName?: string;
  className?: string;
}

export default function FeedbackForm({
  eventName,
  className = "",
}: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
    eventName: eventName || "",
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || "Thank you for your feedback!",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          rating: 0,
          message: "",
          eventName: eventName || "",
        });
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to submit feedback",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
        Share Your Feedback
      </h2>
      <p className="text-gray-600 mb-6">
        We'd love to hear about your experience with The Chorus Abuja
      </p>

      {result && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            result.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <p
            className={`${
              result.success ? "text-green-900" : "text-red-900"
            } font-medium`}
          >
            {result.message}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Event Name (Optional) */}
        {!eventName && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event/Concert (Optional)
            </label>
            <input
              type="text"
              value={formData.eventName}
              onChange={(e) =>
                setFormData({ ...formData, eventName: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Handel's Solomon"
            />
          </div>
        )}

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Rating *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || formData.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {formData.rating === 0 && "Click to rate"}
            {formData.rating === 1 && "Poor"}
            {formData.rating === 2 && "Fair"}
            {formData.rating === 3 && "Good"}
            {formData.rating === 4 && "Very Good"}
            {formData.rating === 5 && "Excellent"}
          </p>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Feedback *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us about your experience..."
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
}
