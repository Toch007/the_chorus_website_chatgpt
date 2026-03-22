"use client";

import { useState } from "react";
import { Send, Eye, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

interface NewsletterComposerProps {
  subscriberCount: number;
}

export default function NewsletterComposer({
  subscriberCount,
}: NewsletterComposerProps) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    sentCount?: number;
  } | null>(null);

  const handleSend = async () => {
    if (!subject || !content) {
      alert("Please fill in both subject and content");
      return;
    }

    if (testMode && !testEmail) {
      alert("Please enter a test email address");
      return;
    }

    const confirmMessage = testMode
      ? `Send test email to ${testEmail}?`
      : `Send newsletter to ${subscriberCount} subscribers?`;

    if (!confirm(confirmMessage)) return;

    setSending(true);
    setResult(null);

    try {
      // Get user token for authentication
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();

      const response = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          htmlContent: content,
          testMode,
          testEmail: testMode ? testEmail : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: testMode
            ? "Test email sent successfully!"
            : `Newsletter sent to ${data.sentCount} subscribers!`,
          sentCount: data.sentCount,
        });

        if (!testMode) {
          // Clear form after successful send
          setSubject("");
          setContent("");
        }
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to send newsletter",
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
    <div className="space-y-6">
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

      {/* Subject Line */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject Line
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter newsletter subject..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Newsletter Content (HTML)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter HTML content or plain text..."
          rows={15}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          You can use HTML tags for formatting. Unsubscribe links are
          automatically added to all emails.
        </p>
      </div>

      {/* Test Mode */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="testMode"
            checked={testMode}
            onChange={(e) => setTestMode(e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1">
            <label
              htmlFor="testMode"
              className="font-medium text-gray-900 cursor-pointer"
            >
              Test Mode
            </label>
            <p className="text-sm text-gray-600">
              Send a test email to yourself before sending to all subscribers
            </p>
            {testMode && (
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        </div>
      </div>

      {/* Preview & Send Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setPreview(!preview)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          {preview ? "Hide Preview" : "Preview"}
        </button>

        <button
          onClick={handleSend}
          disabled={sending || !subject || !content}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
        >
          {sending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {testMode
                ? "Send Test Email"
                : `Send to ${subscriberCount} Subscribers`}
            </>
          )}
        </button>
      </div>

      {/* Preview */}
      {preview && (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
            <p className="text-sm text-gray-600">
              <strong>Subject:</strong> {subject || "(No subject)"}
            </p>
          </div>
          <div
            className="p-6 bg-white"
            dangerouslySetInnerHTML={{ __html: content || "<p>No content</p>" }}
          />
        </div>
      )}
    </div>
  );
}
