import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone, Facebook, Instagram, Clock } from "lucide-react";
import { SiX } from "react-icons/si";

export default function Contact() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our grant programs? Our team is here to help you every step of the way.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <Card className="p-6 text-center hover-elevate">
            <div className="mb-4 inline-flex p-4 bg-primary/10 rounded-full">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Send us an email and we'll respond within 24 hours
            </p>
            <a
              href="mailto:Granthub11@outlook.com"
              className="inline-block"
              data-testid="link-email"
            >
              <Button variant="outline" className="w-full">
                Granthub11@outlook.com
              </Button>
            </a>
          </Card>

          {/* WhatsApp */}
          <Card className="p-6 text-center hover-elevate">
            <div className="mb-4 inline-flex p-4 bg-primary/10 rounded-full">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Get instant support via WhatsApp messenger
            </p>
            <a
              href="https://wa.me/12232704045"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-whatsapp"
            >
              <Button variant="outline" className="w-full">
                +1 (223) 270-4045
              </Button>
            </a>
          </Card>

          {/* Live Chat */}
          <Card className="p-6 text-center hover-elevate">
            <div className="mb-4 inline-flex p-4 bg-primary/10 rounded-full">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Chat with our support team in real-time
            </p>
            <Button className="w-full" data-testid="button-live-chat">
              Start Chat
            </Button>
          </Card>
        </div>

        {/* Social Media & Office Hours */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Social Media */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
            <p className="text-muted-foreground mb-6">
              Follow us on social media for updates, success stories, and grant announcements
            </p>
            <div className="space-y-4">
              <a
                href="https://facebook.com/granthub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg hover-elevate border"
                data-testid="link-facebook-page"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Facebook className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Facebook</div>
                  <div className="text-sm text-muted-foreground">@granthub</div>
                </div>
              </a>
              <a
                href="https://instagram.com/granthub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg hover-elevate border"
                data-testid="link-instagram-page"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Instagram className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Instagram</div>
                  <div className="text-sm text-muted-foreground">@granthub</div>
                </div>
              </a>
              <a
                href="https://x.com/granthub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg hover-elevate border"
                data-testid="link-x-page"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <SiX className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">X (Twitter)</div>
                  <div className="text-sm text-muted-foreground">@granthub</div>
                </div>
              </a>
            </div>
          </Card>

          {/* Office Hours & FAQ */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Support Hours</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-2">We're Here to Help</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Response Time</p>
                <p className="text-sm text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please use our WhatsApp support for faster assistance.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Common Questions?</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Before reaching out, check our FAQ section on the homepage for quick answers to common questions.
                </p>
                <a href="/#faq">
                  <Button variant="outline" className="w-full">
                    View FAQ
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Address (Optional) */}
        <Card className="p-8 mt-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Mailing Address</h3>
          <p className="text-muted-foreground">
            GrantHub Foundation<br />
            123 Innovation Drive, Suite 400<br />
            San Francisco, CA 94102<br />
            United States
          </p>
        </Card>
      </div>
    </div>
  );
}
