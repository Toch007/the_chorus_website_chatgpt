// lib/autoReplyService.ts
import { emailTemplates } from "./emailTemplates";

type EmailTemplateType = keyof typeof emailTemplates;

interface AutoReplyParams {
  email: string;
  name: string;
  formType: EmailTemplateType;
  additionalData?: {
    voicePart?: string;
    skills?: string[];
  };
}

export async function sendAutoReply({
  email,
  name,
  formType,
  additionalData = {},
}: AutoReplyParams): Promise<boolean> {
  try {
    const template = emailTemplates[formType];
    let html: string;

    // Generate HTML based on form type
    switch (formType) {
      case "choir":
        html = template.getHtml(name, additionalData);
        break;
      case "volunteer":
        html = template.getHtml(name);
        break;
      case "media":
        html = template.getHtml(name, additionalData);
        break;
      case "tech":
        html = template.getHtml(name, additionalData);
        break;
      default:
        html = template.getHtml(name);
    }

    // Send the email via the existing API
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: template.subject,
        html: html,
      }),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Auto-reply error:", error);
    return false;
  }
}

// Helper to extract relevant data from form submissions
export function prepareAutoReplyData(
  formType: EmailTemplateType,
  formData: any
) {
  const baseData = {
    email: formData.email,
    name: formData.fullName,
    formType,
  };

  switch (formType) {
    case "choir":
      return {
        ...baseData,
        additionalData: {
          voicePart: formData.voicePart,
        },
      };

    case "media":
      return {
        ...baseData,
        additionalData: {
          skills: formData.mediaSkills || [],
        },
      };

    case "tech":
      return {
        ...baseData,
        additionalData: {
          skills: formData.techSkills || [],
        },
      };

    default:
      return baseData;
  }
}
