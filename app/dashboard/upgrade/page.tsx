"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import PricingComponents from "../_components/pricingComponents";
import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

function UpgradePlans() {
  const { user } = useUser();

  const handlePayment = async () => {
    const formData = {
      return_url: "http://localhost:3000/",
      website_url: "http://localhost:3000/",
      amount: 49999,
      purchase_order_id: "Order02",
      purchase_order_name: "test",
      customer_info: {
        name: "Ram Bahadur",
        email: "test@khalti.com",
        phone: "9800000001",
      },
    };

    try {
      const response = await fetch("/api/generateSignature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.payment_url) {
        window.location.href = data.payment_url; // Redirect to Khalti payment page
      } else {
        console.error("Payment URL not found in response", data);
      }
    } catch (err) {
      console.error("Error initiating payment:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 sm:p-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} className="text-blue-600" />
            <span>Upgrade your experience</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Unlock premium features and upload unlimited PDFs to enhance your
            note-taking experience
          </p>
        </div>

        {/* Pricing Components */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-3/4 bg-gradient-to-b from-blue-50/50 to-transparent rounded-3xl" />
          </div>

          {/* Pricing content */}
          <div className="relative">
            <PricingComponents handlePayment={handlePayment} />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Everything you need for better note-taking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Unlimited PDFs",
                description:
                  "Upload as many PDFs as you need without restrictions",
              },
              {
                title: "Advanced Features",
                description: "Access premium tools and enhanced functionality",
              },
              {
                title: "Priority Support",
                description: "Get faster responses and dedicated assistance",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradePlans;
