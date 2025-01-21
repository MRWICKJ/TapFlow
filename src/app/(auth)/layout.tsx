import { Card } from "@/components/ui/card";
import Image from "next/image"; // For optimized image handling

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen bg-background text-foreground p-6 flex items-center justify-center pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {/* Left Side: Image */}
        <div className="flex items-center justify-center">
          <Image
            src="https://i.pinimg.com/originals/cf/1f/b9/cf1fb9d43d38b1b4a15109f84af3a5e9.gif" // Replace with your desired image URL
            alt="Contact Illustration"
            width={500}
            height={600}
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </div>

        {/* Right Side: Contact Form */}
        <Card>
          {children}
        </Card>
      </div>
    </div>
  );
}
