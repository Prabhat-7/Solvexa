import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pidx = searchParams.get("pidx");
  const transaction_id = searchParams.get("transaction_id");
  const response = await fetch(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    {
      method: "POST",
      headers: {
        Authorization: "key cdfb94b887b045daa70db45fc19648f7",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "pidx": pidx }),
    }
  );
  const data = await response.json();
  console.log(data);
  if (data.status != "Completed") {
    return NextResponse.json({
      "status": 400,
      "error": "Payment not complete",
    });
  } else {
    return NextResponse.json({ success: true, message: "Payment Successful" });
  }
}
