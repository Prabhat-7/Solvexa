"use client";
import React from "react";
import crypto from "crypto";
import { Button } from "@/components/ui/button";
import PricingComponents from "../_components/pricingComponents";
import { useUser } from "@clerk/nextjs";
function upgradePlans() {
  const user = useUser();
  const createSignature = (message: string) => {
    const secret = "8gBm/:&EnhH.1/q"; //different in production
    //create an HMAC-SHA26 hash
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(message);
    //Get the digest in Base64 format
    const hashBase64 = hmac.digest("base64");
    return hashBase64;
  };
  const signature = createSignature(
    `total_amount=${499},transaction__uuid=${
      user.user?.id
    },product_code=EPAYTEST`
  );
  const formData = {
    "amount": "499",
    "failure_url": "http://localhost:3000",
    "product_delivery_charge": "0",
    "product_service_charge": "0",
    "product_code": "EPAYTEST",
    "signature": signature,
    "signed_field_names": "total_amount,transaction_uuid,product_code",
    "success_url": "http://localhost:3000/dashboard",
    "tax_amount": "0",
    "total_amount": "499",
    "transaction_uuid": user.user?.id,
  };
  const esewaCall = (formData: any) => {
    console.log(formData);
    var path = "https://epay.esewa.com.np/api/epay/main/v2/form";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);
    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <h2 className=" text-3xl font-medium">Plan</h2>
      <p>Upgrade your plans to upload multiple pdf to take notes</p>
      <PricingComponents />
      <Button onClick={esewaCall}> Click</Button>
    </div>
  );
}

export default upgradePlans;
