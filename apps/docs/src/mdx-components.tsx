import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  CodeTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Steps,
  Step,
  ComponentPreview,
  ComponentSource,
} from './components';
import { ComponentPreviewTabs } from './components/component-preview-tabs';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    CodeTabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Steps,
    Step,
    ComponentPreview,
    ComponentSource,
    ComponentPreviewTabs,
    ...components,
  };
}
