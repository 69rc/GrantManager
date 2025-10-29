import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [, navigate] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-elevate rounded-lg px-3 py-2" data-testid="link-home">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              GrantHub
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                {isAdmin ? (
                  <Link href="/admin" data-testid="link-admin">
                    <Button variant="ghost" className="hover-elevate">Admin Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/dashboard" data-testid="link-dashboard">
                      <Button variant="ghost" className="hover-elevate">My Applications</Button>
                    </Link>
                    <Link href="/apply" data-testid="link-apply">
                      <Button variant="ghost" className="hover-elevate">Apply for Grant</Button>
                    </Link>
                  </>
                )}
                <Link href="/contact" data-testid="link-contact">
                  <Button variant="ghost" className="hover-elevate">Contact</Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="hover-elevate"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
                <ThemeToggle />
              </>
            ) : (
              <>
                <Link href="/grants" data-testid="link-grants">
                  <Button variant="ghost" className="hover-elevate">Grants</Button>
                </Link>
                <Link href="/about" data-testid="link-about">
                  <Button variant="ghost" className="hover-elevate">About Us</Button>
                </Link>
                <Link href="/contact" data-testid="link-contact">
                  <Button variant="ghost" className="hover-elevate">Contact</Button>
                </Link>
                <Link href="/login" data-testid="link-login">
                  <Button variant="ghost" className="hover-elevate">Login</Button>
                </Link>
                <Link href="/register" data-testid="link-register">
                  <Button>Get Started</Button>
                </Link>
                <ThemeToggle />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                {isAdmin ? (
                  <Link href="/admin" data-testid="link-admin-mobile">
                    <Button variant="ghost" className="w-full justify-start hover-elevate" onClick={() => setMobileMenuOpen(false)}>
                      Admin Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/dashboard" data-testid="link-dashboard-mobile">
                      <Button variant="ghost" className="w-full justify-start hover-elevate" onClick={() => setMobileMenuOpen(false)}>
                        My Applications
                      </Button>
                    </Link>
                    <Link href="/apply" data-testid="link-apply-mobile">
                      <Button variant="ghost" className="w-full justify-start hover-elevate" onClick={() => setMobileMenuOpen(false)}>
                        Apply for Grant
                      </Button>
                    </Link>
                  </>
                )}
                <Link href="/contact" data-testid="link-contact-mobile">
                  <Button variant="ghost" className="w-full justify-start hover-elevate" onClick={() => setMobileMenuOpen(false)}>
                    Contact
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start hover-elevate"
                  data-testid="button-logout-mobile"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/grants" data-testid="link-grants-mobile">
                  <Button variant="ghost" className="w-full justify-start hover-elevate" onClick={() => setMobileMenuOpen(false)}>
                    Grants
                  </Button>
                </Link>
                <Link href="/about" data-testid="link-about-mobile">
                  <Button variant="ghost" className="w-full justify-start hover-elevate" onClick={() => setMobileMenuOpen(false)}>
                    About Us
                  </Button>
                </Link>
                <Link href="/contact" data-testid="link-contact-mobile">
                  <Button variant="ghost" className="w-full justify-start hover-elevate" onClick={() => setMobileMenuOpen(false)}>
                    Contact
                  </Button>
                </Link>
                <Link href="/login" data-testid="link-login-mobile">
                  <Button variant="ghost" className="w-full justify-start hover-elevate" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Button>
                </Link>
                <Link href="/register" data-testid="link-register-mobile">
                  <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
