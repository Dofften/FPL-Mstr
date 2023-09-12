import Image from "next/image";
import { Dela_Gothic_One } from "next/font/google";
import { Input } from "@/components/ui/ui/input";
import { Button } from "@/components/ui/ui/button";

const dela = Dela_Gothic_One({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className="flex w-screen flex-col supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
      <div className="relative flex flex-1 flex-col justify-center px-5 pt-8 text-[#37003c] dark:text-[#D292FF] md:px-6 md:py-[22px] lg:px-8">
        <nav className="absolute left-0 top-8 flex w-full px-6 md:top-[22px] md:px-6 lg:px-8">
          <h1 aria-label="ChatGPT by OpenAI">
            <div className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px]">
              <Image src="/FPL_Mstr.png" alt="fplmstr" width={70} height={70} />
            </div>
          </h1>
        </nav>
        <div className="flex-col text-[32px] leading-[1.2] md:flex md:text-[40px]">
          <Image src="/Manager1.png" alt="manager" width={500} height={500} />
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center rounded-t-[30px] bg-black px-5 py-8 text-white dark:bg-black dark:text-white md:rounded-none md:px-6">
        <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-[1.25] font-bold">
          Get started
        </h2>
        <div className="mt-5 w-full max-w-[440px]">
          <div className="flex w-full max-w-sm">
            <Input className="rounded-l" type="number" placeholder="FPL ID" />
            <Button
              className="bg-[#D292FF] hover:bg-[#c26dff] rounded-r"
              type="submit"
            >
              start
            </Button>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-center md:absolute md:bottom-4 md:left-1/2 md:mt-0 md:-translate-x-1/2">
          <div className="flex justify-center md:mb-3">
            <Image src="/FPL_Mstr.png" alt="fplmstr" width={70} height={70} />
          </div>
          <div className="py-3 text-xs">
            <a
              href="https://openai.com/policies/terms-of-use"
              target="_blank"
              className="mx-3 text-gray-500"
              rel="noreferrer"
            >
              Terms of use
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              className="mx-3 text-gray-500"
              rel="noreferrer"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
