"use client";

import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Mail, Send, Users, CheckCircle2, AlertCircle } from "lucide-react";

const EMAIL_SENDERS = [
  { value: "newsletter@thechorusabuja.org", label: "Newsletter (newsletter@thechorusabuja.org)" },
  { value: "info@thechorusabuja.org", label: "General Info (info@thechorusabuja.org)" },
  { value: "events@thechorusabuja.org", label: "Events (events@thechorusabuja.org)" },
  { value: "support@thechorusabuja.org", label: "Support (support@thechorusabuja.org)" },
  { value: "admin@thechorusabuja.org", label: "Admin (admin@thechorusabuja.org)" },
];

const RECIPIENT_GROUPS = [
  { value: "newsletter", label: "Newsletter Subscribers" },
  { value: "members", label: "All Members" },
  { value: "choir", label: "Choir Applicants" },
  { value: "volunteer", label: "Volunteer Applicants" },
  { value: "media", label: "Media Team Applicants" },
  { value: "tech", label: "Tech Team Applicants" },
  { value: "custom", label: "Custom Email List" },
  { value: "single", label: "Single Recipient" },
];

export default function AdminMessagingPage() {
  useAuthRedirect();
  const [fromEmail, setFromEmail] = useState(EMAIL_SENDERS[0].value);
  const [recipientGroup, setRecipientGroup] = useState("single");
  const [customEmails, setCustomEmails] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isHtml, setIsHtml] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    sentCount?: number;
  } | null>(null);
  const [recipientCount, setRecipientCount] = useState(0);

  useEffect(() => {
    if (recipientGroup !== "custom" && recipientGroup !== "single") {
      fetchRecipientCount();
    }
  }, [recipientGroup]);

  const fetchRecipientCount = async () => {
    try {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();

      const response = await fetch(`/api/admin/messaging/count?group=${recipientGroup}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setRecipientCount(data.count || 0);
    } catch (error) {
      console.error("Error fetching recipient count:", error);
      setRecipientCount(0);
    }
  };

  const handleSend = async () => {
    if (!subject || !message) {
      alert("Please fill in subject and message");
      return;
    }

    if (recipientGroup === "single" && !singleEmail) {
      alert("Please enter a recipient email");
      return;
    }

    if (recipientGroup === "custom" && !customEmails) {
      alert("Please enter email addresses");
      return;
    }

    const confirmMessage = 
      recipientGroup === "single" 
        ? `Send email to ${singleEmail}?`
        : recipientGroup === "custom"
        ? `Send email to custom list?`
        : `Send email to ${recipientCount} recipients?`;

    if (!confirm(confirmMessage)) return;

    setSending(true);
    setResult(null);

    try {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();

      const response = await fetch("/api/admin/messaging/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          recipientGroup,
          customEmails: recipientGroup === "custom" ? customEmails : undefined,
          singleEmail: recipientGroup === "single" ? singleEmail : undefined,
          subject,
          content: message,
          isHtml,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: `Email sent successfully to ${data.sentCount} recipient(s)!`,
          sentCount: data.sentCount,
        });
        // Clear form
        setSubject("");
        setMessage("");
        setSingleEmail("");
        setCustomEmails("");
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to send email",
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || "An error occurred",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Messaging System"
        description="Send emails to members, subscribers, and custom recipients"
      />

      {/* Result Message */}
      {result && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            result.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          )}
          <div>
            <p
              className={`font-medium ${
                result.success ? "text-green-900" : "text-red-900"
              }`}
            >
              {result.message}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="space-y-6">
          {/* From Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Email Address
            </label>
            <select
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {EMAIL_SENDERS.map((sender) => (
                <option key={sender.value} value={sender.value}>
                  {sender.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Choose which email address to send from
            </p>
          </div>

          {/* Recipient Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipients
            </label>
            <select
              value={recipientGroup}
              onChange={(e) => setRecipientGroup(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {RECIPIENT_GROUPS.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
            {recipientGroup !== "custom" && recipientGroup !== "single" && (
              <p className="text-xs text-gray-500 mt-1">
                {recipientCount} recipient(s)
              </p>
            )}
          </div>

          {/* Single Email Input */}
          {recipientGroup === "single" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Email
              </label>
              <input
                type="email"
                value={singleEmail}
                onChange={(e) => setSingleEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Custom Email List */}
          {recipientGroup === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Addresses (comma-separated)
              </label>
              <textarea
                value={customEmails}
                onChange={(e) => setCustomEmails(e.target.value)}
                placeholder="email1@example.com, email2@example.com, email3@example.com"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple emails with commas
              </p>
            </div>
          )}

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isHtml ? "Enter HTML content..." : "Enter your message..."}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="isHtml"
                checked={isHtml}
                onChange={(e) => setIsHtml(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="isHtml" className="text-sm text-gray-600">
                Use HTML formatting
              </label>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={sending || !subject || !message}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
          >
            {sending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 mb-2">Email Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Choose the appropriate sender email for your message type</li>
              <li>• Newsletter subscribers will receive emails with unsubscribe links</li>
              <li>• Use HTML for formatted emails with images and links</li>
              <li>• Test with a single recipient before sending to groups</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
