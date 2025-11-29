export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="max-w-2xl mx-auto px-6 py-8 text-sm text-gray-600 text-center">
      <span>&copy; {currentYear} Ayush Sood</span>
    </footer>
  )
}