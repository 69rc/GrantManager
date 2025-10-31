import { Link } from "wouter";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About GrantHub</h3>
            <p className="text-sm text-muted-foreground">
              Empowering individuals and organizations through accessible funding opportunities. We've distributed over $5M to support education, business, and community development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/grants" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-grants">
                  Available Grants
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-register">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:Granthub11@outlook.com" className="hover:text-foreground transition-colors">
                  Granthub11@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  WhatsApp Support
                </a>
              </li>
              <li className="text-xs mt-2">
                We typically respond within 24 hours
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="https://facebook.com/granthub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate rounded-md p-2"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com/granthub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate rounded-md p-2"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://x.com/granthub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate rounded-md p-2"
                data-testid="link-x"
              >
                <SiX className="h-5 w-5" />
                <span className="sr-only">X (Twitter)</span>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Follow us for updates on new grant opportunities and success stories.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GrantHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
