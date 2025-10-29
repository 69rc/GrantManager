import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Target, Heart, TrendingUp, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">GrantHub</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            We're on a mission to make funding accessible to everyone with a great idea and the passion to make it happen.
            Since 2020, we've been empowering individuals and organizations to achieve their goals through strategic grant funding.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                GrantHub exists to bridge the gap between ambitious projects and the funding they need to succeed. 
                We believe that financial barriers shouldn't stand in the way of innovation, education, or community development.
              </p>
              <p className="text-muted-foreground">
                By streamlining the grant application process and providing transparent, accessible funding opportunities, 
                we're helping to create a more equitable future where great ideas can thrive regardless of their origin.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <div className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">$5M+</div>
                      <div className="text-sm text-muted-foreground">Total funding distributed</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-muted-foreground">Projects successfully funded</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in clear communication and transparent processes. You'll always know exactly 
                  where your application stands and what to expect next.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-muted-foreground">
                  Grant funding shouldn't be complicated. We've simplified the application process to make 
                  it accessible to everyone, regardless of background or experience.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We're more than just a funding platform. We're building a community of innovators, 
                  entrepreneurs, and change-makers who support each other's success.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a dedicated team of professionals passionate about making a difference through accessible funding
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <p className="text-muted-foreground text-center mb-6">
                Our team brings together expertise in finance, technology, community development, and project management. 
                We work collaboratively to ensure every application receives fair consideration and every successful 
                applicant gets the support they need to make their project a reality.
              </p>
              <p className="text-muted-foreground text-center">
                With years of combined experience in grant administration and community support, we understand both 
                the challenges of seeking funding and the importance of responsible grant distribution.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have questions about our grant programs or need help with your application? 
            We're here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact">
                Contact Us
              </Button>
            </Link>
            <Link href="/grants">
              <Button size="lg" variant="outline" data-testid="button-view-grants">
                View Grant Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
