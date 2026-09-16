import Link from "next/link";
import { LinkPreview } from "../ui/link-preview";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-gray-400 border-t border-gray-200/5 h-screen w-full">
      <div className="mx-auto px-6 py-2">
        <div className="flex items-center gap-6">
          <p className="text-gray-400">Header</p>
          <p className="text-gray-400">Sidebar</p>
          <p className="text-gray-400">Navbar</p>
          <p className="text-gray-400">Home</p>
          <p className="text-gray-400">About</p>
          <p className="text-gray-400">Project</p>
          <p className="text-gray-400">Contact</p>
          <p className="text-white border-b border-blue-500">Footer</p>
        </div>
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
              <LinkPreview 
              url="https://github.com/Amon-mamon"  
              className="text-white transition-colors">GitHub</LinkPreview>
              <LinkPreview
              isStatic
              url="https://www.linkedin.com/in/vince-stephen-david-ab72292a0/"
              imageSrc="/linkedin-preview.png" 
              className="text-white transition-colors">LinkedIn</LinkPreview>
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