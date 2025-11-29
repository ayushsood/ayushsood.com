import Link from 'next/link'

const socialLinks = [
  {
    href: "https://twitter.com/ayushsood",
    label: "Twitter",
    icon: (
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    )
  },
  {
    href: "https://linkedin.com/in/ayushsood",
    label: "LinkedIn",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    )
  }
]

export default function Header() {
  return (
    <header className="max-w-4xl mx-auto px-6 py-8">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-black">
          ayushsood<span className="text-red-500">.</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="text-gray-600 hover:text-red-500 transition-colors"
              aria-label={link.label}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                {link.icon}
              </svg>
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}