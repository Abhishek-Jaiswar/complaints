"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-4">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-4 text-start">
          Raise Complaints Effortlessly
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-xl text-start">
          Submit your concerns in seconds and track them until they’re resolved.
          We make it easy for you and transparent for admins.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/hero.png"
          alt="hero image"
          width={600}
          height={600}
          className="w-full h-auto rounded-2xl"
          priority={true}
        />
      </div>
    </section>
  );
};

export default Hero;
