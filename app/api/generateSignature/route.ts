import { NextApiRequest, NextApiResponse } from "next";
import crypto, { hash } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.json();
  try {
    const response = await fetch(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          "Authorization": "key cdfb94b887b045daa70db45fc19648f7",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.body),
      }
    );
    const data = response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: `An error occurred: ${err.message}` },
      { status: 500 }
    );
  }
}
