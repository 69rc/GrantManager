import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap, Briefcase, Users, Lightbulb, CheckCircle, Clock, HeartHandshake, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/Community_empowerment_hero_image_7472de27.png";
import { grantTypes } from "@shared/schema";

const iconMap = {
  GraduationCap,
  Briefcase,
  Users,
  Lightbulb,
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Diverse community members collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Empowering Your Future
            <br />
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Through Funding
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto mb-8">
            Access grants for education, business, community development, and research. 
            Join hundreds of successful applicants who've turned their dreams into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6" data-testid="button-hero-apply">
                Apply Now
              </Button>
            </Link>
            <Link href="/grants">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 bg-background/80 backdrop-blur" 
                data-testid="button-hero-learn"
              >
                Learn More
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-foreground/80">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-chart-2" />
              <span>Over $5M Distributed</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-chart-2" />
              <span>500+ Projects Funded</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-chart-2" />
              <span>Trusted Since 2020</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Types Overview */}
      <section className="py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Grant Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our diverse grant programs designed to support various initiatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {grantTypes.map((grant) => {
              const Icon = iconMap[grant.icon as keyof typeof iconMap];
              return (
                <Card key={grant.id} className="p-6 hover-elevate rounded-xl" data-testid={`card-grant-${grant.id}`}>
                  <div className="flex flex-col h-full">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{grant.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {grant.description}
                    </p>
                    <p className="text-sm font-medium text-primary mb-4">
                      {grant.amountRange}
                    </p>
                    <Link href="/register">
                      <Button variant="outline" className="w-full" data-testid={`button-apply-${grant.id}`}>
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to secure your grant funding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Create Account", description: "Sign up in minutes with just your email", icon: Users },
              { step: 2, title: "Submit Application", description: "Fill out our simple application form", icon: CheckCircle },
              { step: 3, title: "Review Process", description: "Our team reviews your application within 5 days", icon: Clock },
              { step: 4, title: "Receive Funding", description: "Get approved and receive your grant", icon: TrendingUp },
            ].map((item) => (
              <div key={item.step} className="relative" data-testid={`step-${item.step}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mb-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GrantHub</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to making grant funding accessible to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Fast Processing",
                description: "Applications reviewed within 5 business days with quick turnaround on decisions",
              },
              {
                icon: CheckCircle,
                title: "Transparent Process",
                description: "Track your application status in real-time and receive updates at every step",
              },
              {
                icon: HeartHandshake,
                title: "Expert Support",
                description: "Our team is here to help you through the application process and answer questions",
              },
            ].map((feature) => (
              <Card key={feature.title} className="p-6 text-center" data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$5M+", label: "Total Grants Awarded" },
              { value: "85%", label: "Success Rate" },
              { value: "5 Days", label: "Avg Processing Time" },
              { value: "500+", label: "Projects Funded" },
            ].map((stat) => (
              <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our grant programs
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger data-testid="faq-eligibility">Who is eligible to apply?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our grants are available to individuals, small businesses, educational institutions, 
                and non-profit organizations. Specific eligibility criteria vary by grant type, but we 
                welcome applications from diverse backgrounds and locations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger data-testid="faq-time">How long does the review process take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most applications are reviewed within 5 business days. You'll receive updates via email 
                as your application progresses through each stage. Complex applications may take slightly 
                longer, but we'll keep you informed throughout the process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger data-testid="faq-documents">What documents do I need to apply?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You'll need to provide basic information about yourself or your organization, a detailed 
                project description, and a budget proposal. You can optionally upload supporting documents 
                like business plans, proof of concept, or letters of recommendation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger data-testid="faq-multiple">Can I apply for multiple grants?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! You can submit applications for different grant types as long as your projects meet 
                the specific criteria for each category. However, we recommend focusing on the grant type 
                that best matches your primary need.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger data-testid="faq-reapply">What if my application is rejected?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                If your application is not approved, you'll receive feedback on areas for improvement. 
                You're welcome to revise and resubmit your application after addressing the concerns. 
                Our team is also available to provide guidance for strengthening your next application.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger data-testid="faq-disbursement">How is the grant money disbursed?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Once approved, grant funds are typically disbursed within 10 business days via direct 
                deposit or check. For larger grants, we may set up milestone-based payments to ensure 
                project progress aligns with funding distribution.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of successful applicants and take the first step toward funding your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8" data-testid="button-cta-apply">
                Start Your Application
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
