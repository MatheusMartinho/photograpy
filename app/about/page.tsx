"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { DitherImage } from "@/components/dither/DitherImage";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="md:pl-24">
        <div className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-6xl font-bold font-header uppercase tracking-tighter mb-8">About</h1>
              <p className="text-xl text-zinc-300 leading-relaxed mb-6">
                I'm Matheus Martinho, a wildlife and landscape photographer based in Brazil.
                My work focuses on capturing the raw beauty of nature, from the windswept peaks of Patagonia to the dense forests of Canada.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                When I'm not behind the camera waiting for the perfect light, I work as a full-stack developer.
                This portfolio is a blend of my two passions: technology and art.
              </p>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-header uppercase tracking-widest text-accent">Gear</h2>
                <ul className="grid grid-cols-2 gap-4 text-sm font-mono text-zinc-400">
                  <li>Sony A1</li>
                  <li>Sony A7R IV</li>
                  <li>FE 400mm GM</li>
                  <li>FE 16-35mm GM</li>
                  <li>FE 24-70mm GM II</li>
                  <li>DJI Mavic 3</li>
                </ul>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <DitherImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Matheus Martinho"
                width={800}
                height={1000}
                className="w-full aspect-[4/5] object-cover grayscale"
                ditherEnabled={true}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
