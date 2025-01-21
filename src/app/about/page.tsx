"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Github, Code, Lightbulb, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";


interface ProfileData {
  html_url: string;
  avatar_url: string;
  login: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string | null;
}

export default function Page() {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [readme, setReadme] = useState<string | null>(null);

    useEffect(() => {
        const username = "MRWICKJ";
        fetch(`https://raw.githubusercontent.com/${username}/${username}/main/README.md`)
        .then((res) => res.text(),)
        .then((data) => setReadme(data))
      // Fetch GitHub profile data
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((data) => setProfileData(data))
        .catch((error) => console.error("Error fetching GitHub data:", error));
    }, []);
  
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center space-y-10">
        {/* About Section Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About Me</h1>
          <p className="text-muted-foreground text-lg">
            Heyy, Shubhendu Here! I am a passionate software developer with a strong background in Node.js, Python, and cutting-edge technologies.
          </p>
        </section>
  
        {/* Profile Details */}
        <section className="w-full max-w-4xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData ? (
                <>
                  {/* Profile Image */}
                  <div className="flex justify-center mb-6">
                    
                    <Image
                      src={profileData.avatar_url}
                      width={128}
                      height={128}
                      alt="Profile Avatar"
                      className="rounded-full w-32 h-32 border-4 border-primary"
                    />
                  </div>
  
                  <div className="flex items-center space-x-4">
                    <Github className="h-8 w-8 text-foreground" />
                    <p>
                    <strong>GitHub:</strong> <a href={profileData.html_url} className="underline text-primary">{profileData.login}</a>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Linkedin className="h-8 w-8 text-foreground" />
                    <p>
                    <strong>Linkdin:</strong> <a href={'https://www.linkedin.com/in/shubhendu-halder-5752762ba/'} className="underline text-primary">Shubhendu Halder</a>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Twitter className="h-8 w-8 text-foreground" />
                    <p>
                    <strong>X:</strong> <a href={'https://x.com/SHalder90020'} className="underline text-primary">Shubhendu Halder</a>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Users className="h-8 w-8 text-foreground" />
                    <p>
                      <strong>Followers:</strong> {profileData.followers} | <strong>Following:</strong> {profileData.following}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Code className="h-8 w-8 text-foreground" />
                    <p>
                      <strong>Public Repositories:</strong> {profileData.public_repos}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Lightbulb className="h-8 w-8 text-foreground" />
                    <p>
                      <strong>Bio:</strong> {profileData.bio || "Passionate about creating innovative solutions and building impactful software."}
                    </p>
                  </div>
                </>
              ) : (
                <p>Loading profile data...</p>
              )}
            </CardContent>
          </Card>

            <Markdown>{readme}</Markdown>

        </section>
        
  
        {/* Call to Action */}
        <section className="text-center space-y-4">
          <p className="text-muted-foreground text-lg">
            Feel free to explore my repositories and connect with me!
          </p>
          <Button asChild>
            <a href="https://github.com/MRWICKJ" target="_blank" rel="noopener noreferrer">
              Visit My GitHub
            </a>
          </Button>
        </section>
      </div>
    );
}