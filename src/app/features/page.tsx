"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, Laugh, Globe, Star } from "lucide-react";

export default function page() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-6 space-y-10">
      {/* Introduction Section */}
      <section className="w-full max-w-4xl text-center space-y-6">
        <h1 className="text-3xl font-bold">Explore Our Features</h1>
        <p className="text-muted-foreground">
          Discover what makes our application stand out from the crowd. From seamless integration to advanced analytics, we&apos;ve got you covered.
        </p>
      </section>

      {/* Features Grid Section */}
      <section className="w-full max-w-6xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="h-6 w-6 text-indigo-400" />,
              title: "Lightning Fast",
              description: "Experience unparalleled speed with our optimized processes.",
            },
            {
              icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
              title: "Secure by Design",
              description: "Top-notch encryption ensures your data stays private and secure.",
            },
            {
              icon: <Laugh className="h-6 w-6 text-amber-500" />,
              title: "User-Friendly",
              description: "Our intuitive design makes it easy for everyone to use.",
            },
            {
              icon: <Globe className="h-6 w-6 text-blue-600" />,
              title: "Global Access",
              description: "Reach users worldwide with no limitations.",
            },
            {
              icon: <Star className="h-6 w-6 text-purple-400" />,
              title: "24/7 Support",
              description: "Get assistance whenever you need it with our dedicated support team.",
            },
          ].map((feature, idx) => (
            <Card key={idx}>
              <CardHeader className="flex items-center space-x-2">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>


      {/* Tabs Section */}
      <section className="w-full max-w-6xl space-y-8">
        <h2 className="text-2xl font-bold text-center">More About Our Features</h2>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="justify-center">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p>
              Our platform offers a wide range of features to simplify your workflow and enhance productivity.
            </p>
          </TabsContent>
          <TabsContent value="performance">
            <p>
              Lightning-fast performance ensures you can accomplish tasks with minimal delays.
            </p>
          </TabsContent>
          <TabsContent value="security">
            <p>
              Security is our priority, featuring advanced encryption and fraud detection.
            </p>
          </TabsContent>
        </Tabs>
      </section>
      <Separator/>
      {/* Accordion Section */}
      <section className="w-full max-w-6xl space-y-8">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What makes this platform unique?</AccordionTrigger>
            <AccordionContent>
              Our platform combines speed, security, and ease of use, setting us apart from competitors.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              Yes, we use state-of-the-art encryption and adhere to industry best practices to ensure data security.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I use this platform globally?</AccordionTrigger>
            <AccordionContent>
              Absolutely, our platform is accessible and functional worldwide.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Call to Action Section */}
      <section className="w-full max-w-4xl text-center space-y-6">
        <h3 className="text-xl font-semibold">
          Ready to Get Started?
        </h3>
        <Button size="lg">Sign Up Now</Button>
      </section>
    </div>
  );
}
