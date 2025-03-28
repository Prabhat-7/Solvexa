import { NextApiRequest, NextApiResponse } from "next";
import crypto, { hash } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();
  const secret = "8gBm/:&EnhH.1/q";
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);
  const signature = hmac.digest("base64"); // Convert to Base64
  console.log(signature);
  return NextResponse.json({ signature: signature });
}
