'use client'; // Required for usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuMessageSquareDot } from "react-icons/lu";

const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/project" }, 
    // { name: "Services", href: "/services" }, 
  ];

  // return (
  //   <header className="sticky top-0 z-50 bg-gray-950 text-white border-b border-gray-800">
  //     <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
     
  //       {/* Modern Logo Style */}
  //       <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
  //         vince<span className="text-blue-500">dev</span>
  //       </Link>
        
  //       <nav>
  //         <ul className="flex items-center gap-8">
  //           {navLinks.map((link) => {
  //             const isActive = pathname === link.href;
              
  //             return (
  //               <li key={link.href}>
  //                 <Link
  //                   href={link.href}
  //                   className={`transition-colors duration-200 text-base tracking-wide ${
  //                     isActive 
  //                       ? "text-blue-400 font-semibold" 
  //                       : "text-gray-300 hover:text-white"
  //                   }`}
  //                 >
  //                   {link.name}
  //                 </Link>
  //               </li>
  //             );
  //           })}
            
  //           {/* Call to Action Button */}
  //           <li>
  //             <Link 
  //               href="/contact"
  //               className=" text-gray-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
  //             >
  //               Contact
  //             </Link>
  //           </li>
  //         </ul>
  //       </nav> 
  //     </div>
  //   </header>
  // );
  return (
      <header>
        <div className='flex gap-6 py-2 bg-[#121314]'>
            <h2 className='text-blue-500'>VD</h2>
              <ul className='flex gap-2 items-center text-white'>
                <li>File</li>
                <li>Edit</li>
                <li>Theme</li>
                <li></li>
                <li></li>
              </ul>
              <div className='w-1/2 px-3 flex items-center gap-1 border border-gray-100/5 rounded '>
                <input type="text" className='outline-none w-full border-r border-gray-300' />
                <LuMessageSquareDot className='text-lg text-gray-400'/>
              </div>
        </div>
      </header>
  )

};

export default Header;