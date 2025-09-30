import type { Preview } from "@storybook/react";
import "../styles/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    nextjs: { appDirectory: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    darkMode: {
      defaultValue: false, // Enable light mode by default on all stories
    },
  },
};

export default preview;
