import Link from "next/link";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
              vince<span className="text-blue-500">dev</span>
            </Link>
            <p className="text-sm text-gray-500">
              Building exceptional digital experiences.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <nav className="flex justify-center gap-6 text-sm font-medium">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/project" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Column 3: Social/Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm">
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
            <p className="text-xs text-gray-600">
              &copy; {currentYear} Vince. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;