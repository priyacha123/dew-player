import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export function BoxRevalStory() {
  return (
    <>
    <div className='max-w-lg items-center justify-center overflow-hidden pt-8'>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className='text-[3.5rem] font-semibold'>
          Why this project<span className='text-[#5046e6]'>?</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className='mt-[.5rem] text-[1rem]'>
          Once I wanted to watch <span className='text-[#5046e6]'>Ghosted (2023)</span>
          with someone, and we couldn&apos;t find anywhere, thankfully{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className='underline'>torrent</span>
              </TooltipTrigger>
              <TooltipContent>
                <span className='text-xs'>Do not use torrent, I don&apos;t support piracy</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>{" "}
          helped me.
        </h2>
        <h2 className='mt-[.5rem] text-[1rem] '>
          But <span className='text-[#5046e6]'>google meet</span> shares audio when a tab is shared, while sharing
          screen I have to unmute myself {":("}
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <Button className='mt-[1.6rem] bg-[#5046e6]'>This gave me this idea</Button>
      </BoxReveal>
    </div>
    </>

  );
}
