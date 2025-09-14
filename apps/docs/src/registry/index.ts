export const registry = {
  items: [
    {
      name: "custom-button",
      description: "A customizable button component with various variants and sizes",
      type: "registry:component",
      registryDependencies: undefined,
      files: [
        {
          path: "custom-button.tsx",
          type: "registry:component",
          target: "components/custom-button.tsx"
        }
      ],
      categories: ["components"],
      meta: {
        title: "CustomButton",
        description: "A customizable button component with various variants and sizes for different use cases."
      }
    },
    {
      name: "modal",
      description: "A comprehensive modal system with dialog and responsive variants",
      type: "registry:component",
      registryDependencies: undefined,
      files: [
        {
          path: "modal.tsx",
          type: "registry:component",
          target: "components/modal.tsx"
        }
      ],
      categories: ["components"],
      meta: {
        title: "Modal",
        description: "A comprehensive modal system with dialog and responsive variants for different screen sizes and use cases."
      }
    }
  ]
}
