import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const response = await fetch(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: "key cdfb94b887b045daa70db45fc19648f7",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to initiate payment" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Payment API Response:", data);

    return NextResponse.json({ payment_url: data.payment_url });
  } catch (err: any) {
    return NextResponse.json(
      { error: `An error occurred: ${err.message}` },
      { status: 500 }
    );
  }
}
