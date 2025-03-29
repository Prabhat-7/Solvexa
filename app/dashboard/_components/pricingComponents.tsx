import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ChildProps {
  handlePayment: () => void;
}

const PricingComponents: React.FC<ChildProps> = ({ handlePayment }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedMethod(null);
  };

  const selectPaymentMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const proceedToPayment = () => {
    if (selectedMethod) {
      handlePayment();
      closeDialog();
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        {/* Pro Plan */}
        <div className="rounded-2xl border border-indigo-600 p-6 shadow-md ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Pro
              <span className="sr-only">Plan</span>
            </h2>

            <div className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Rs.499
              </strong>
              <p className="text-sm font-medium text-gray-700">/one time</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Unlimited PDF upload</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Unlimited Notes taking</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Download Notes</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Email Support</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Help center access</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Community access</span>
            </li>
          </ul>

          <button
            className="mt-8 block w-full rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200"
            onClick={openDialog}
          >
            Get Started
          </button>
        </div>

        {/* Payment Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Choose Payment Method
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                Select your preferred payment option
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                    selectedMethod === "khalti"
                      ? "border-indigo-600 bg-indigo-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => selectPaymentMethod("khalti")}
                >
                  <Image
                    src="/khalti.png"
                    height={50}
                    width={120}
                    alt="Khalti Payment"
                    className="object-contain"
                  />
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                    selectedMethod === "esewa"
                      ? "border-indigo-600 bg-indigo-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => selectPaymentMethod("esewa")}
                >
                  <Image
                    src="/esewa.png"
                    height={50}
                    width={120}
                    alt="eSewa Payment"
                    className="object-contain"
                  />
                </div>
              </div>

              {selectedMethod && (
                <div className="text-center text-sm text-indigo-600 font-medium">
                  {selectedMethod === "khalti" ? "Khalti" : "eSewa"} selected
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-2">
              <Button
                variant="outline"
                onClick={closeDialog}
                className="rounded-full px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={proceedToPayment}
                className={`rounded-full px-6 ${
                  !selectedMethod
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                disabled={!selectedMethod}
              >
                Proceed to Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Free Plan */}
        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Free
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Rs.0
              </strong>
              <span className="text-sm font-medium text-gray-700">/month</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">5 PDF uploads</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Unlimited Notes taking</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Email support</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700">Help center access</span>
            </li>
          </ul>

          <button
            className="mt-8 block w-full rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:bg-gray-50 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200"
            disabled
          >
            Current Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingComponents;
