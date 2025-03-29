"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PricingComponents from "../_components/pricingComponents";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
function upgradePlans() {
  const { user } = useUser();

  const handlePayment = async () => {
    const formData = {
      "return_url": "http://localhost:3000/",
      "website_url": "https://localhost:3000/",
      "amount": "1000",
      "purchase_order_id": "Order01",
      "purchase_order_name": "test",
      "customer_info": {
        "name": "Ram Bahadur",
        "email": "test@khalti.com",
        "phone": "9800000001",
      },
    };

    try {
      const response = await fetch(
        "https://dev.khalti.com/api/v2/epayment/initiate/",
        {
          method: "POST",
          headers: {
            "Authorization": "key cdfb94b887b045daa70db45fc19648f7",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.payment_url) {
        // Redirect to the received payment URL
        window.location.href = data.payment_url;
      } else {
        console.error("Payment URL not found in response", data);
      }
    } catch (err: any) {
      throw new Error("An error occured", err);
    }
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
