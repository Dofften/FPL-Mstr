"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const LeftTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    orientation="vertical"
    ref={ref}
    className={cn(
      "flex flex-col md:flex-row rounded-md p-1 border-3 border-white text-muted-foreground gap-1",
      className
    )}
    {...props}
  />
));

LeftTabs.displayName = TabsPrimitive.List.displayName;

const LeftTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex-fit md:w-[100px] md:h-[600px] mlk-items-center justify-center rounded-md p-1 bg-muted text-muted-foreground",
      className
    )}
    {...props}
  />
));
LeftTabsList.displayName = TabsPrimitive.List.displayName;

type LeftTabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> & {
  icon: React.ReactNode;
  label: string;
};

const LeftTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  LeftTabsTriggerProps
>(({ className, icon, label, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    {...props}
    className={cn(
      "items-center justify-center whitespace-nowrap rounded-md p-1 md:w-[80px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:rounded-md data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-background/25 ",
      className
    )}
  >
    <div className="flex flex-col justify-center">
      <div className="self-center">{icon}</div>
      <div className="text-xs pt-2">{label}</div>
    </div>
  </TabsPrimitive.Trigger>
));

const LeftTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "flex-grow overflow-y-auto h-[600px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
LeftTabsContent.displayName = TabsPrimitive.Content.displayName;

export { LeftTabs, LeftTabsList, LeftTabsTrigger, LeftTabsContent };
