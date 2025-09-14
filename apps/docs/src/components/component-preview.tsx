import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { ComponentPreviewTabs } from "./component-preview-tabs"
import { ComponentSource } from "./component-source"
import { getRegistryComponent } from "@/lib/registry"

interface ComponentPreviewProps {
  name: string
  className?: string
  description?: string
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  hideCode?: boolean
  type?: "block" | "component" | "example"
}

export async function ComponentPreview({
  name,
  className,
  description,
  align = "center",
  children,
  hideCode = false,
  type = "component",
  ...props
}: ComponentPreviewProps) {
  const DemoComponent = getRegistryComponent(name)

  if (!DemoComponent && !children) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1">
        <div className="bg-background absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground">Block preview for {name}</span>
        </div>
      </div>
    )
  }

  const component = children || (DemoComponent ? (
    <React.Suspense fallback={
      <div className="flex items-center justify-center h-32">
        <span className="text-muted-foreground">Loading preview...</span>
      </div>
    }>
      <DemoComponent />
    </React.Suspense>
  ) : null)

  const source = await ComponentSource({
    name: name,
    title: `registry/custom-ui/${name}.tsx`,
    collapsible: false,
  })

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={component}
      source={source}
      {...props}
    />
  )
}
