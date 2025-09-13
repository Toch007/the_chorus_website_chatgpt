// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DATACENTER = process.env.MAILCHIMP_SERVER_PREFIX;

  const data = {
    email_address: email,
    status: "subscribed",
  };

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status >= 400) {
    const errorData = await response.json();
    return NextResponse.json({ error: errorData.detail || "Mailchimp error" }, { status: 400 });
  }

  return NextResponse.json({ message: "Successfully subscribed" });
}
