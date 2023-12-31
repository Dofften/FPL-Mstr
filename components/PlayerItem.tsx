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
  fixture1: string;
  fixture2: string;
  selected_by_percent: number;
  top250?: number;
  predictedPoints?: number;
  captain?: string;
  news?: string;
  image: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <div className="flex flex-col items-center cursor-pointer">
            {props.image ? (
              <Image
                src={props.image}
                alt="jersey"
                width={70}
                height={70}
                className="h-10 w-10 md:h-16 md:w-16"
              />
            ) : (
              <Image
                src="https://cdn.sofifa.net/player_0.svg"
                alt="jersey"
                width={70}
                height={70}
                className="h-10 w-10 md:h-16 md:w-16"
              />
            )}
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
          {props.image ? (
            <Image
              src={props.image}
              alt="jersey"
              width={70}
              height={70}
              className="h-20 w-20 md:h-20 md:w-20"
            />
          ) : (
            <Image
              src="https://cdn.sofifa.net/player_0.svg"
              alt="jersey"
              width={70}
              height={70}
              className="h-20 w-20 md:h-20 md:w-20"
            />
          )}
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
        <div className="flex justify-evenly py-4 rounded bg-opacity-50 bg-white drop-shadow-md text-[#37003c]">
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
          {props.top250 ? (
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
                    <TooltipContent side="left" className="bg-white rounded">
                      <p className="whitespace-normal">
                        Ownership by Top 250 FPL Managers
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="font-bold">{props.top250.toFixed(1)}%</div>
            </div>
          ) : null}
        </div>
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold">
            Fixtures
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="flex justify-around">
          <div className="flex rounded shadow p-3 mx-1 text-xs md:text-sm">
            {props.fixture}{" "}
          </div>
          <div className="flex rounded shadow p-3 mx-1 text-xs md:text-sm">
            {props.fixture1}{" "}
          </div>
          <div className="flex rounded shadow p-3 mx-1 text-xs md:text-sm">
            {props.fixture2}{" "}
          </div>
        </div>
        <DialogFooter>
          <div className="text-xs font-bold text-transparent">FPL Master</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
