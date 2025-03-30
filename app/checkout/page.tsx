"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const makeProUser = useMutation(api.user.makeProUser);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run this effect when the user data is loaded and we have the actual user
    if (!isLoaded || !user) {
      return;
    }

    async function run() {
      try {
        const response = await fetch("/api/validateTransaction", {
          method: "POST",
          body: JSON.stringify({
            pidx: searchParams.get("pidx"),
          }),
        });

        const data = await response.json();

        if (data.success) {
          const result = await makeProUser({
            email: user?.primaryEmailAddress?.emailAddress ?? "",
          });
          router.push("http://localhost:3000/dashboard?payment=success");
        } else {
          router.push("http://localhost:3000/dashboard?payment=failed");
        }
      } catch (error) {
        router.push("http://localhost:3000/dashboard?payment=failed");
      }
    }

    run();
  }, [isLoaded, user, searchParams, makeProUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 rounded-lg bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Processing Payment</h1>
        <p className="text-gray-600 mb-2">
          Please wait while we verify your payment...
        </p>
        <div className="animate-pulse h-2 w-full bg-blue-200 rounded"></div>
      </div>
    </div>
  );
}
