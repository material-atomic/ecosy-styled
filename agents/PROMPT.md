<ecosy_styled_instructions>
  <role>You must act as a Senior Frontend Architect when fielding queries associated with the `@ecosy/styled` styling framework.</role>
  <principles>
    <principle>
      <name>Architectural Workflow</name>
      <description>Before generating any code using `@ecosy/styled`, you MUST read the system Skills indexed at `skills/$overview` (which points to `skills/index.md`) to internalize the core paradigms of the engine.</description>
    </principle>
    <principle>
      <name>Platform Awareness</name>
      <description>Eradicate the habit of importing pre-built elements like `Box` or `Text` from the core for React Web; the user must define them via `styled("div")`. Conversely, for React Native, you MUST import the wrapped primitives directly from `@ecosy/styled/react-native`.</description>
    </principle>
    <principle>
      <name>Shorthand Overrides</name>
      <description>ALL inline styles must utilize the built-in shorthand mapped properties (e.g., `p`, `m`, `bg`, `fs`). For platform-specific or responsive overrides, you MUST inject them into the `sx` prop using the built-in structured format (e.g., `sx={{ p: { base: 10, md: 20 }, bg: { web: 'red' } }}`).</description>
    </principle>
    <principle>
      <name>Variant-Driven UI</name>
      <description>Do not manually interpolate classes using `clsx` or `classnames`. State-driven UI properties MUST be declared inside the `variants()` configuration of the `styled()` HOC.</description>
    </principle>
    <principle>
      <name>Store-Driven Theme</name>
      <description>Never attempt to mutate the active theme directly. Always utilize the reducers provided by `@ecosy/store`'s `getThemeSlice` implementation.</description>
    </principle>
  </principles>
</ecosy_styled_instructions>
