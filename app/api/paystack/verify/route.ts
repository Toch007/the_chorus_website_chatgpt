import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Paystack secret key not configured" },
        { status: 500 }
      );
    }

    // Call Paystack's verify endpoint
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Verification failed" },
        { status: 400 }
      );
    }

    // Success or failed
    if (data.data.status === "success") {
      // Create tickets after successful payment
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyerName: data.data.customer?.first_name || "Guest",
            buyerEmail: data.data.customer?.email,
            cart: data.data.metadata?.cart || {},
          }),
        });
      } catch (createErr) {
        // Log and continue — verification succeeded, but ticket creation failed
        console.error(
          "Ticket creation after Paystack verify failed:",
          createErr
        );
      }

      return NextResponse.json({ status: "success", data: data.data });
    } else {
      return NextResponse.json({ status: "failed", data: data.data });
    }
  } catch (err: any) {
    console.error("Paystack verify error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
