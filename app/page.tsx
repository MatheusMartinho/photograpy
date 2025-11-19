import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/ui/Navigation";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />

      {/* Manifesto Section */}
      <section className="min-h-screen flex flex-col md:flex-row border-b border-foreground/20">
        <div className="w-full md:w-1/2 border-r border-foreground/20 p-12 flex flex-col justify-center">
          <h2 className="text-6xl md:text-8xl font-header font-bold uppercase tracking-tighter mb-8">
            The<br />Signal
          </h2>
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/80 max-w-md">
            We are drowning in noise. This archive is a signal. A collection of raw moments from the natural world, stripped of artifice and presented in their most brutal, honest form.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center bg-accent text-background">
          <div className="text-center">
            <h3 className="text-4xl font-header font-bold uppercase mb-8">
              Explore the Archive
            </h3>
            <Link
              href="/gallery"
              className="inline-block border-2 border-background px-12 py-4 text-xl font-bold uppercase tracking-widest hover:bg-background hover:text-accent transition-colors"
            >
              Enter Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 border-t border-foreground/20 flex justify-between items-end">
        <div>
          <h4 className="font-header text-2xl font-bold uppercase">Matheus Martinho</h4>
          <p className="font-mono text-xs tracking-widest mt-2 text-foreground/60">
            © 2025 // ALL RIGHTS RESERVED
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs tracking-widest text-accent">
            SYSTEM STATUS: ONLINE
          </p>
        </div>
      </footer>
    </main>
  );
}
