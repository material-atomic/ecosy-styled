---
name: styled-react-web
description: Skill for developing React Web components using @ecosy/styled/react.
---

# React Web Styling (@ecosy/styled/react)

<instructions>
  <rule>
    <title>HOC Factory Creation</title>
    <details>
      Web primitive tags (`div`, `span`, `button`, `input`, etc.) must be wrapped using the `styled()` HOC factory exported from `@ecosy/styled/react`. Do NOT attempt to import pre-built tags directly.
    </details>
  </rule>
  <rule>
    <title>Applying Base Styles</title>
    <details>
      Base default styles are provided as the second argument to `styled()`. Use the shorthand mapping (`p`, `m`, `bg`, etc.) which maps to DOM-compatible CSS properties.
    </details>
  </rule>
</instructions>

<examples>
  <example>
    <description>Creating a styled Web button</description>
    <code>
import { styled } from "@ecosy/styled/react";

export const Button = styled("button", {
  bg: "primary.50",
  px: 16,
  py: 8,
  r: 4,
  border: "none",
  cursor: "pointer",
  fs: 14,
  fw: "bold",
  c: "white"
});
    </code>
  </example>
</examples>
