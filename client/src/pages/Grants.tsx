import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { grantTypes } from "@shared/schema";
import { GraduationCap, Briefcase, Users, Lightbulb } from "lucide-react";

const iconMap = {
  GraduationCap,
  Briefcase,
  Users,
  Lightbulb,
};

export default function Grants() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Grant Programs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We offer diverse funding opportunities to support education, entrepreneurship, community development, and innovation.
            Find the grant that best matches your project needs.
          </p>
        </div>

        {/* Grant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {grantTypes.map((grant) => {
            const Icon = iconMap[grant.icon as keyof typeof iconMap];
            return (
              <Card key={grant.id} className="p-8 hover-elevate rounded-xl" data-testid={`card-grant-detail-${grant.id}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{grant.name}</h2>
                    <p className="text-lg font-medium text-primary">{grant.amountRange}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {grant.description}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <p className="text-sm text-muted-foreground">
                      Fast application review process within 5 business days
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <p className="text-sm text-muted-foreground">
                      Flexible funding amounts based on project scope and needs
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <p className="text-sm text-muted-foreground">
                      Ongoing support and guidance throughout your project
                    </p>
                  </div>
                </div>
                <Link href="/register">
                  <Button className="w-full" data-testid={`button-apply-grant-${grant.id}`}>
                    Apply for {grant.name}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Additional Information */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-4">General Eligibility Criteria</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Who Can Apply:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span>Individuals with innovative project ideas</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span>Small businesses and startups</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span>Educational institutions and students</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span>Non-profit organizations</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Application Requirements:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span>Detailed project description and objectives</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span>Clear budget breakdown and funding needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span>Supporting documentation (optional but recommended)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span>Valid contact information</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Create an account and submit your application in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" data-testid="button-cta-register">
                Create Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-cta-contact">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
