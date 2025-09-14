export const registry = {
  items: [
    {
      name: "custom-button",
      description: "A customizable button component with various variants and sizes",
      type: "registry:component",
      registryDependencies: undefined,
      files: [
        {
          path: "custom-button/custom-button.tsx",
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
          path: "modal/modal.tsx",
          type: "registry:component",
          target: "components/modal.tsx"
        }
      ],
      categories: ["components"],
      meta: {
        title: "Modal",
        description: "A comprehensive modal system with dialog and responsive variants for different screen sizes and use cases."
      }
    },
    {
      name: "modal-variants",
      description: "Modal variants demonstration",
      type: "registry:component",
      registryDependencies: undefined,
      files: [
        {
          path: "modal/modal-variants.tsx",
          type: "registry:component",
          target: "components/modal-variants.tsx"
        }
      ],
      categories: ["components"],
      meta: {
        title: "Modal Variants",
        description: "Demonstration of different modal variants and types."
      }
    },
    {
      name: "custom-button-variants",
      description: "Custom button variants demonstration",
      type: "registry:component",
      registryDependencies: undefined,
      files: [
        {
          path: "custom-button/custom-button-variants.tsx",
          type: "registry:component",
          target: "components/custom-button-variants.tsx"
        }
      ],
      categories: ["components"],
      meta: {
        title: "Custom Button Variants",
        description: "Demonstration of different custom button variants and sizes."
      }
    }
  ]
}
