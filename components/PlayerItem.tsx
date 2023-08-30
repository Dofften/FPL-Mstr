import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/ui/dialog";
import { Separator } from "@/components/ui/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/ui/tooltip";

export default function PlayerItem(props: {
  elementName: string;
  team: string;
  position: string;
  now_cost: number;
  form: number;
  fixture: string;
  selected_by_percent: number;
  predictedPoints?: number;
  captain?: string;
  news?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <div className="flex flex-col items-center cursor-pointer">
            <Image
              src="https://cdn.sofifa.net/players/220/697/23_120.png"
              alt="jersey"
              width={70}
              height={70}
              className="h-10 w-10 md:h-16 md:w-16"
            />
            <div className="flex flex-col">
              <div
                className={`${
                  props.news
                    ? "bg-[#ffe65b] text-[#37003c]"
                    : "bg-[#37003c] text-white"
                } font-bold text-[6px] md:text-xs w-12 md:w-[90px] md:py-1 text-center truncate`}
              >
                {props.elementName}
              </div>
              <div className="bg-[#e9f9f14d] text-[#37003c] font-bold text-[6px] md:text-xs w-12 md:w-[90px] text-center rounded-b">
                {props.fixture}
              </div>
            </div>
          </div>
          {props.predictedPoints ? (
            <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 rounded-full text-xs font-bold text-white bg-red-500 border-white flex justify-center items-center">
              <span className="text-[8px] md:text-xs font-bold">
                {props.predictedPoints}
              </span>
            </div>
          ) : null}
          {props.captain ? (
            <div className="absolute top-5 md:top-7 right-0 w-3 h-3 md:w-5 md:h-5 rounded-full text-xs font-bold text-white bg-black flex justify-center items-center">
              <span className="text-[8px] md:text-xs font-bold">
                {props.captain}
              </span>
            </div>
          ) : null}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-[#02efff] from-30% via-white via-55% to-white to-90% overflow-x-hidden">
        {props.news ? (
          <div className="flex bg-[#ffe65b] justify-center rounded">
            <span className="mx-4 text-sm">{props.news}</span>
          </div>
        ) : null}
        <DialogHeader className="flex flex-row items-center">
          <Image
            src="https://cdn.sofifa.net/players/220/697/23_120.png"
            alt="jersey"
            width={70}
            height={70}
            className="h-24 w-24"
          />
          <div className="flex flex-col p-4 space-y-2">
            <DialogDescription className="content-center">
              <div className="bg-[#37003c] text-[#02efff] font-semibold text-center text-xs rounded-b w-fit p-1">
                {props.position}
              </div>
            </DialogDescription>
            <DialogTitle className="text-[#37003c] font-bold tracking-normal">
              {props.elementName}
            </DialogTitle>
            <DialogDescription className="flex text-sm text-[#37003c]">
              {props.team}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex justify-evenly py-4 rounded-lg bg-opacity-50 bg-white drop-shadow-md text-[#37003c]">
          <div className="text-center">
            <div className="text-xs">Price</div>
            <div className="font-bold">
              ${(props.now_cost / 10).toFixed(1)}m
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="text-center">
            <div className="text-xs">Form</div>
            <div className="font-bold">{props.form}</div>
          </div>
          <Separator orientation="vertical" />
          <div className="text-center">
            <div className="text-xs">AI Prediction</div>
            <div className="font-bold">9.0</div>
          </div>
          <Separator orientation="vertical" />
          <div className="text-center">
            <div className="text-xs">Ownership</div>
            <div className="font-bold">{props.selected_by_percent}%</div>
          </div>
          <Separator orientation="vertical" />
          <div className="text-center">
            <div className="text-xs">
              <TooltipProvider delayDuration={10}>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="underline decoration-dotted"
                  >
                    <div>TO%</div>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p className=" whitespace-normal">
                      Ownership by Top 15 FPL Managers
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="font-bold">52%</div>
          </div>
        </div>
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold">
            Fixtures
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="flex justify-around">
          <div className="flex rounded shadow p-3">
            BRE <div className="bg-green-200 rounded px-3 mx-2">2</div>
          </div>
          <div className="flex rounded shadow p-3">
            MUN <div className="bg-green-200 rounded px-3 mx-2">2</div>
          </div>
          <div className="flex rounded shadow p-3">
            BOU <div className="bg-red-200 rounded px-3 mx-2">3</div>
          </div>
        </div>
        <DialogFooter>
          <div className="text-xs font-bold text-transparent">FPL Master</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
