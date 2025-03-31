"use client";
import React from "react";
import PricingComponents from "../_components/pricingComponents";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function UpgradePlans() {
  const { user } = useUser();
  const userInfo = useQuery(api.user.getUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });
  const handlePayment = async () => {
    const formData = {
      return_url: "http://localhost:3000/checkout",
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
      const response = await fetch("/api/initiatePayment", {
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

  if (userInfo?.isProUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6 sm:p-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Pro Plan Active</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Pro Experience
              </h1>
              <p className="text-gray-600">
                You're enjoying all premium features and unlimited access
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Current Usage
                </h3>
                <p className="text-gray-600">Unlimited PDF uploads available</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Plan Status
                </h3>
                <p className="text-gray-600">Pro Plan - Active</p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/dashboard">
                <Button className="inline-flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
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
