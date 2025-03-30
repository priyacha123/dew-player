"use client";
import { BoxRevalStory } from "@/components/custom/BoxRevalStory";
// import { ShareSocials } from "@/components/custom/Dock";
import { FeaturesSection } from "@/components/custom/Features";
import { TerminalStory } from "@/components/custom/TerminalStory";
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import Link from "next/link";
// import Image from "next/image";

export default function HomePageLayout() {
  return (
    <div>
      <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
        <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
          <h1 className='text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl z-10'>
            Your friendly{" "}
            <LineShadowText className='italic' shadowColor={"black"}>
              In
            </LineShadowText>{" "}
            <AuroraText>Browser</AuroraText>
            <LineShadowText className='italic' shadowColor={"black"}>
              Player
            </LineShadowText>{" "}
          </h1>
          <div className='flex items-center justify-center w-full'>
            <Link href={"/upload"}>
              <InteractiveHoverButton className='bg-transparent'>Let&apos;s watch together ✨</InteractiveHoverButton>
            </Link>
          </div>
        </main>
        {/* <div className='absolute bottom-10 left-0 right-0'>
          <ShareSocials />
        </div> */}
      </div>
      <div className='h-screen flex items-center justify-center px-20'>
        <FeaturesSection />
      </div>
      <div className='h-screen flex items-center justify-center px-20 gap-10'>
        <BoxRevalStory />
        <TerminalStory />
      </div>
    </div>
  );
}
