import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Shield, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/verify", label: "Verify Content" },
  { path: "/analysis", label: "Claim Analysis" },
  { path: "/history", label: "History" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">VeriFact AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </Link>
          <Link to="/verify">
            <Button>Verify Now</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-fade-in">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2">
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
              <Link to="/verify" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                <Button className="w-full">Verify Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
