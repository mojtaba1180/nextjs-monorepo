export const registry = {
  items: [
    {
      name: "custom-button",
      description: "A customizable button component with various variants and sizes",
      type: "registry:component",
      registryDependencies: undefined,
      files: [
        {
          path: "custom-ui/custom-button.tsx",
          type: "registry:component",
          target: "components/custom-button.tsx"
        }
      ],
      categories: ["components"],
      meta: {
        title: "CustomButton",
        description: "A customizable button component with various variants and sizes for different use cases."
      }
    }
  ]
}
