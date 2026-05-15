# @ecosy/styled

A zero-dependency, platform-agnostic, and highly performant Styling Engine for **React** and **React Native**. 

`@ecosy/styled` bridges the gap between Web and Mobile development by offering a unified API for inline styles, theming, dynamic variants, responsive design, and platform-specific rendering, seamlessly integrated with `@ecosy/store`.

---

## 🚀 Features

- 🌍 **True Cross-Platform**: Write once, run on React Web and React Native with 100% API parity.
- 🎨 **Dynamic Theming**: Centralized theme management powered by `@ecosy/store` with built-in Light/Dark mode toggling.
- ⚡ **Zero External CSS**: All styles are resolved inline/StyleSheet, meaning no messy Webpack CSS loaders, no Tailwind setup, and no separate `.css` files.
- 🧩 **CVA-like Variants**: Built-in `variants()` utility for creating complex, state-driven UI components.
- 📱 **Responsive & Platform Aware**: Built-in support for responsive breakpoints (`base`, `md`, `lg`, etc.) and platform selection (`ios`, `android`, `web`).
- 🏷️ **Type-Safe**: Written completely in TypeScript, featuring exhaustive IntelliSense and strict type-checking for every styling property.

---

## 📦 Installation

```bash
yarn add @ecosy/styled
# Or using npm
npm install @ecosy/styled
```

### Peer Dependencies

Ensure you have the required peer dependencies installed:
```bash
yarn add @ecosy/core @ecosy/react @ecosy/store
# Optional depending on your platform:
yarn add react react-native
```

---

## 📖 Quick Start

### 1. Initialize the Theme Store

Create your application's global theme store by hooking up `@ecosy/styled`'s theme slice.

```ts
// store.ts
import { createStore } from "@ecosy/store";
import { getThemeSlice } from "@ecosy/styled/slice";
import { defaultThemes } from "@ecosy/styled/theme/default";

export const { store, actions } = createStore({
  slices: {
    theme: getThemeSlice({
      initialState: {
        mode: "light",
        themes: defaultThemes,
      }
    }),
  }
});
```

### 2. Wrap your Application

Wrap your root component with `@ecosy/react`'s `StoreProvider`.

```tsx
import { StoreProvider } from "@ecosy/react";
import { store } from "./store";

function App() {
  return (
    <StoreProvider store={store}>
      <Main />
    </StoreProvider>
  );
}
```

### 3. Create Styled Components

Use the `styled` HOC to build reusable UI elements with styled shorthands (`p`, `m`, `bg`, etc.) and `sx` prop support.

**React Native Example:**
```tsx
import { Text, View, styled } from "@ecosy/styled/react-native";

const Container = styled(View, {
  bg: "background",
  p: 20,
  alignItems: "center",
  justifyContent: "center",
  flex: 1
});

const Title = styled(Text, {
  fs: 24,
  fw: "bold",
  c: "primary.50"
});

export const ProfileScreen = () => (
  <Container>
    <Title>Hello React Native!</Title>
  </Container>
);
```

**React Web Example:**
```tsx
import { styled } from "@ecosy/styled/react";

const Box = styled("div", {
  bg: "background",
  p: 20,
  display: "flex",
  flexDirection: "column"
});

const Text = styled("span", {
  fs: 16,
  c: "text"
});

export const ProfilePage = () => (
  <Box>
    <Text>Hello Web!</Text>
  </Box>
);
```

---

## 🛠 Advanced Features

### Dynamic Variants (CVA Alternative)

Build highly customizable components with `variants()`.

```tsx
import { styled } from "@ecosy/styled/react";

const Button = styled("button", 
  // 1. Default base styles
  {
    px: 16,
    py: 8,
    r: 8,
    fw: "bold",
    c: "white",
    border: "none",
    cursor: "pointer",
  },
  // 2. Variant configurations
  {
    variants: {
      intent: {
        primary: { bg: "primary.50" },
        danger: { bg: "red" },
      },
      size: {
        sm: { fs: 12, px: 8 },
        lg: { fs: 18, px: 24 },
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "sm"
    }
  }
);

// Usage:
// <Button intent="danger" size="lg">Delete</Button>
```

### The `sx` Prop

The `sx` prop allows for deep, inline overrides on any styled component, supporting responsive breakpoints and platform-specific styles natively.

```tsx
<Box sx={{
  p: { base: 10, md: 20, lg: 40 }, // Responsive padding
  bg: { web: "blue", ios: "red", android: "green" }, // Platform-specific background
  w: "100%",
}} />
```

### Custom Hooks

`@ecosy/styled` provides utilities to access the active theme and construct complex stylesheets.

```tsx
import { useTheme, makeStyles } from "@ecosy/styled/react";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background,
    padding: theme.config.spacing[4],
  }
}));

const MyComponent = () => {
  const { styles } = useStyles();
  return <div style={styles.container}>Content</div>;
}
```

---

## 📚 API Reference

- **`styled(Component, baseStyles, config)`**: Creates a styling-engine enabled component.
- **`makeStyles(creator)`**: Hook factory for generating responsive stylesheets.
- **`useTheme()`**: Hook to access the current theme object.
- **`useThemeMode()`**: Hook to access the current mode (`light` or `dark`).
- **`useSx(sx)`**: Hook to resolve the `sx` prop into a flattened style object.

---

## 🔗 Examples & Tutorials

- **Example with Expo**: [github.com/material-atomic/expo-navigation-bottom-tabs](https://github.com/material-atomic/expo-navigation-bottom-tabs)
- **Example with React Native CLI**: [github.com/material-atomic/rncli-navigation-bottom-tabs](https://github.com/material-atomic/rncli-navigation-bottom-tabs)
- **Tutorial (Vietnamese)**: [blogcode.vn: Expo - Khởi tạo dự án với Bottom Tabs và Ecosy State Management](https://blogcode.vn/blog/expo-khoi-tao-du-an-voi-bottom-tabs-va-ecosy-state-management)

---

## 🤖 AI Agent Learning

If you are an AI Coding Assistant, Agent, or Copilot analyzing or generating code for a repository that lists `@ecosy/styled` as a dependency, please obey the following systemic rules:

1. **System Prompt & Skills Integration**: This repository self-documents its framework capabilities natively. When starting a new task, analyze the `"agents"` configuration object inside `package.json` (specifically `agents.skills` and `agents.workflows`) to ingest the necessary declarative architectural patterns. Interpret the prefix `$this://` inside these paths as resolving to the root directory of this NPM package.

---

## 📄 License

MIT © Material Atomic