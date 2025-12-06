
// import { Menu } from "lucide-react";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
// import LogoutButton from "./LogoutButton";
// import { getCookie } from "@/services/auth/tokenHandlers";
// import { Logo } from "./logo";


// const PublicNavbar = async () => {
//  const navItems = [

//   { href: "/dashboard/all-events", label: "Explore Events" },
//   { href: "/dashboard/my-events", label: "My Events" },
//   { href: "/dashboard", label: "Dashboard" },
//   { href: "/about", label: "About" },
//   { href: "/contact", label: "Contact" },
// ];


//   const accessToken = await getCookie("accessToken");

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//          <Link href="/" className="flex items-center space-x-2">
//           <Logo/>
//       </Link>
//         <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
//           {navItems.map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               className="text-foreground hover:text-primary transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="hidden md:flex items-center space-x-2">
//           {accessToken ? (
//             <LogoutButton />
//           ) : (
//             <Link href="/login">
//               <Button>Login</Button>
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu */}

//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline">
//                 {" "}
//                 <Menu />{" "}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
//               <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
//               <nav className="flex flex-col space-y-4 mt-8">
//                 {navItems.map((link) => (
//                   <Link
//                     key={link.label}
//                     href={link.href}
//                     className="text-lg font-medium"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//                 <div className="border-t pt-4 flex flex-col space-y-4">
//                   <div className="flex justify-center"></div>
//                   <Link href="/login" className="text-lg font-medium">
//                     <Button>Login</Button>
//                   </Link>
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default PublicNavbar;



// components/layout/PublicNavbar.tsx
"use client"; 

import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "../ui/sheet";
import LogoutButton from "./LogoutButton";
import { Logo } from "./logo";
import { getCookie } from "@/services/auth/tokenHandlers";

import { useEffect, useState } from "react";
import { verifyAccessToken } from "@/lib/jwtHanlders";

type NavItem = { href: string; label: string };

const NAV_BY_ROLE: Record<string, NavItem[]> = {
  PUBLIC: [
   
    { href: "/explore-events", label: "Explore Events" },
    { href: "/become-host", label: "Become a Host" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  CLIENT: [
    
    { href: "/explore-events", label: "Explore Events" },
    { href: "/events/my-events", label: "My Events" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
  ],
  HOST: [
   
       { href: "/explore-events", label: "Explore Events" },
    { href: "/events/my-hosted", label: "My Events " },
    { href: "/events/create", label: "Create Event" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/my-profile", label: "Profile" },
  ],
  ADMIN: [

    { href: "/admin", label: "Admin Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/hosts", label: "Manage Hosts" },
    { href: "/admin/events", label: "Manage Events" },
    { href: "/profile", label: "Profile" },
  ],
};

const PublicNavbar = () => {
  const [role, setRole] = useState<string>("PUBLIC");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const token = await getCookie("accessToken");
      if (!token) {
        setRole("PUBLIC");
      } else {
        const result = await verifyAccessToken(token);
        console.log(result)
        if (result.success && result.payload && result.payload.role) {
          const r = String(result.payload.role).toUpperCase();
          setRole(["CLIENT", "HOST", "ADMIN"].includes(r) ? r : "PUBLIC");
        } else {
          setRole("PUBLIC");
        }
      }
      setLoading(false);
    };

    fetchRole();
  }, []);

  if (loading) return null; // loader বা placeholder লাগাতে পারেন

  const navItems = NAV_BY_ROLE[role];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link key={link.label} href={link.href} className="text-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right-side auth */}
        <div className="hidden md:flex items-center space-x-2">
          {role !== "PUBLIC" ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link key={link.label} href={link.href} className="text-lg font-medium">
                    {link.label}
                  </Link>
                ))}

                <div className="border-t pt-4 flex flex-col space-y-4">
                  {role !== "PUBLIC" ? (
                    <div className="flex justify-center">
                      <LogoutButton />
                    </div>
                  ) : (
                    <Link href="/login" className="text-lg font-medium">
                      <Button>Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
