"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BadgeCheck, Code, DoorOpen, Github, GitPullRequest } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center space-y-10">
      {/* Introduction Section */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Transparent Pricing</h2>
        <p className="text-muted-foreground">
          Enjoy all features of our platform, completely free and open-source.
        </p>
      </section>

      {/* Pricing Section */}
      <section className="w-full max-w-4xl space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Completely Free</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              No hidden fees, no subscriptions, no premium plans. Everything is free and open for everyone.
            </p>
            <Button size="lg">Get Started Now</Button>
          </CardContent>
        </Card>
      </section>

      {/* Why Free Section */}
      <section className="w-full max-w-4xl space-y-8 text-center">
        <h3 className="text-xl font-semibold">Why Free?</h3>
        <p className="text-muted-foreground">
          We believe in empowering developers and businesses without any financial barriers. Our project is supported by a global community of contributors who share the same vision.
        </p>
      </section>

      {/* Features of Open Source */}
      <section className="w-full max-w-4xl">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex justify-center">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="opensource">Open Source Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="text-center p-4">
                  <BadgeCheck className="h-12 w-12 text-emerald-500 mx-auto" />
                  <h4 className="text-lg font-bold mt-4">No Cost</h4>
                  <p className="text-muted-foreground">
                    Free for everyone, always.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4">
                  <Code className="h-12 w-12 text-indigo-500 mx-auto" />
                  <h4 className="text-lg font-bold mt-4">Customizable</h4>
                  <p className="text-muted-foreground">
                    Tailor the platform to meet your needs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4">
                  <Github className="h-12 w-12 text-gray-500 mx-auto" />
                  <h4 className="text-lg font-bold mt-4">Community Driven</h4>
                  <p className="text-muted-foreground">
                    Supported and improved by contributors worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opensource">
            <Card>
              <CardContent className="text-center p-4">
                <GitPullRequest className="h-12 w-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold mt-4">Open Collaboration</h4>
                <p className="text-muted-foreground">
                Collaborate with developers and businesses globally to create solutions that work for everyone.
                </p>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="collaboration">
            <Card>
              <CardContent className="text-center p-4">
                <DoorOpen className="h-12 w-12 text-indigo-500 mx-auto" />
                <h4 className="text-lg font-bold mt-4">Open Source</h4>
                <p className="text-muted-foreground">
                Collaborate with developers and businesses globally to create solutions that work for everyone.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it really free?</AccordionTrigger>
            <AccordionContent>
              Yes! The platform is completely free with no hidden costs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How can I contribute?</AccordionTrigger>
            <AccordionContent>
              You can contribute by submitting code, reporting bugs, or suggesting features on our GitHub repository.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Who supports this project?</AccordionTrigger>
            <AccordionContent>
              Our global community of developers and organizations support and maintain the project.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
