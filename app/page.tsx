"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Transform Your PDFs into
              <span className="text-primary block mt-2">Smart Study Notes</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Solvexa uses advanced AI to convert your PDF documents into
              organized, intelligent study notes. Save time and learn more
              effectively.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href={"/dashboard"}>
                <Button size="lg" className="gap-2">
                  Try For Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            <div className="mt-12 text-sm text-muted-foreground">
              No credit card required • Free plan available
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Transform PDFs into Smart Notes in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Powerful Features for Better Learning
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to transform your study material
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border bg-white hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Start Learning Smarter Today
          </h2>
          <p className="text-xl text-primary-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of students who are already using Solvexa to
            transform their study materials into intelligent notes.
          </p>
          <Link href={"/dashboard"}>
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Use Cases", "Guides"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {["Help Center", "Community", "API", "Status"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Privacy", "Terms", "Security", "Accessibility"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} Solvexa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const steps = [
  {
    title: "Upload Your PDF",
    description: "Simply drag and drop your PDF documents into Solvexa",
    icon: <Upload className="w-8 h-8 text-primary" />,
  },
  {
    title: "AI Processing",
    description:
      "Our AI analyzes and extracts key information from your documents",
    icon: <Brain className="w-8 h-8 text-primary" />,
  },
  {
    title: "Get Smart Notes",
    description: "Receive organized, intelligent notes ready for studying",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
  },
];

const features = [
  {
    title: "Smart Summarization",
    description:
      "AI-powered summaries that capture the most important concepts from your PDFs.",
    icon: <Wand2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Key Concepts",
    description:
      "Automatically identifies and highlights key terms and concepts for better understanding.",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
  {
    title: "Custom Notes",
    description:
      "Generate personalized study notes tailored to your learning style.",
    icon: <FileText className="w-6 h-6 text-primary" />,
  },
];
