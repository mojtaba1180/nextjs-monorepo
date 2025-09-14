"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "fumadocs-ui/components/tabs"

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs
        className="relative mr-auto w-full"
        defaultValue="preview"
      >
        <div className="flex items-center justify-between px-4 ">
          {!hideCode && (
            <TabsList className="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
              <TabsTrigger
                value="preview"
                className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
              >
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
        
        <TabsContent value="preview" className="mt-0">
          <div
            className={cn(
              "preview flex min-h-[450px] w-full justify-center p-10 rounded-lg border",
              {
                "items-center": align === "center",
                "items-end": align === "end",
                "items-start": align === "start",
              }
            )}
          >
            {component}
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="mt-0">
          <div className="rounded-lg border">
            {source}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
