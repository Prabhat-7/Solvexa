import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
  const body = await res.json();
  const { pidx } = body;
  const response = await fetch(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    {
      method: "POST",
      headers: {
        Authorization: "key cdfb94b887b045daa70db45fc19648f7",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx: pidx }),
    }
  );

  //   TODO , update check if this pidx is already used by checking the database. If it is already used then handle the "Smart user" accordinlgy ,
  //  TODO  if it is has not been used before update the database with it and then send back the request as success

  const data = await response.json();
  if (data.status != "Completed") {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Payment not complete",
    });
  } else {
    return NextResponse.json({ success: true, message: "Payment Successful" });
  }
}
