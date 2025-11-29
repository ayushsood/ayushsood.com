import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Advising - Ayush Sood",
  description: "Technical advising and career coaching services",
}

export default function Advising() {
  return (
    <div className="space-y-8 py-8">
      <header>
        <h1 className="text-3xl font-bold text-black mb-6">Advising</h1>
      </header>

      <section className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          I work with early-stage startups on technical strategy, recruiting, team building, and go-to-market initiatives.
          Whether you're scaling your engineering org, making critical technical decisions, or building out your founding team,
          I can help you navigate the challenges that come with building software products.
        </p>

        <p className="text-gray-700 leading-relaxed">
          I also offer individual 1:1 career coaching for engineers and technical leaders looking to level up in their careers,
          make strategic career moves, or navigate complex organizational dynamics.
        </p>

        <p className="text-gray-700 leading-relaxed">
          If you're interested in working together, reach out to me on{" "}
          <a
            href="https://linkedin.com/in/ayushsood"
            className="text-red-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {" "}or{" "}
          <a
            href="https://twitter.com/ayushsood"
            className="text-red-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          .
        </p>
      </section>
    </div>
  )
}
