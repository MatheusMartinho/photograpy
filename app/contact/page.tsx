"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate form submission
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-12 px-4 max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold font-header uppercase tracking-tighter mb-8">Contact</h1>
        <p className="text-xl text-zinc-400 mb-12">
          Interested in prints or collaboration? Get in touch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-zinc-500">Name</label>
            <input
              type="text"
              id="name"
              required
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl focus:outline-none focus:border-accent transition-colors"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-zinc-500">Email</label>
            <input
              type="email"
              id="email"
              required
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl focus:outline-none focus:border-accent transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest text-zinc-500">Message</label>
            <textarea
              id="message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-accent hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "idle" ? "Send Message" : status === "submitting" ? "Sending..." : "Sent!"}
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
}
