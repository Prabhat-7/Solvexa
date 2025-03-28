"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PricingComponents from "../_components/pricingComponents";
import { useUser } from "@clerk/nextjs";
function upgradePlans() {
  const { user } = useUser();
  const generateSignature = async (message: string) => {
    try {
      const res = await fetch("/api/generateSignature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return data.signature;
    } catch (error) {
      console.error("Signature generation failed:", error);
    }
  };

  const handlePayment = async () => {
    const message = `total_amount=499,transaction__uuid=123,product_code=EPAYTEST`;
    const signature = await generateSignature(message);

    if (!signature) return console.error("Signature not generated!");

    const formData: any = {
      total_amount: "499",
      transaction_uuid: "123",
      product_code: "EPAYTEST",
      tax_amount: "0",
      amount: "499",
      failure_url: "http://localhost:3000",
      product_delivery_charge: "0",
      product_service_charge: "0",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:3000/dashboard",
      signature: signature,
    };

    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
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
      <Button onClick={handlePayment}> Click</Button>
    </div>
  );
}

export default upgradePlans;
