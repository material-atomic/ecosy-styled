---
name: styled-react-native
description: Skill for developing React Native components using @ecosy/styled/react-native.
---

# React Native Styling (@ecosy/styled/react-native)

<instructions>
  <rule>
    <title>Pre-Wrapped Primitives</title>
    <details>
      For React Native, `@ecosy/styled/react-native` directly exports pre-wrapped versions of core UI components like `View`, `Text`, `Image`, `ScrollView`, `TextInput`, `TouchableOpacity`, `Pressable`, `SafeAreaView`, `FlatList`, `SectionList`, `KeyboardAvoidingView`, `ActivityIndicator`. You MUST import these instead of the ones from `react-native`.
    </details>
  </rule>
  <rule>
    <title>Dynamic Styling (sx)</title>
    <details>
      You can style these imported primitives directly using the `sx` prop. `sx` supports the same API across Web and Native, meaning you can still use `web`, `ios`, `android` platform discriminators inside `sx` even on mobile components (though `web` will be ignored in RN environments).
    </details>
  </rule>
  <rule>
    <title>Custom HOC Wrapping</title>
    <details>
      If you need to wrap a third-party Native component (e.g. from `react-native-reanimated`), import the `styled` HOC from `@ecosy/styled/react-native` and wrap it: `const AnimatedBox = styled(Animated.View, { flex: 1 })`.
    </details>
  </rule>
</instructions>

<examples>
  <example>
    <description>Using Pre-Wrapped React Native Primitives</description>
    <code>
import { View, Text, TouchableOpacity } from "@ecosy/styled/react-native";

export const ProfileCard = () => (
  <View sx={{ bg: "surface", p: 16, r: 8, flexDirection: "row", alignItems: "center" }}>
    <Text sx={{ fs: 18, fw: "bold", c: "text" }}>John Doe</Text>
    <TouchableOpacity sx={{ ml: "auto", bg: "primary.50", px: 12, py: 6, r: 4 }}>
      <Text sx={{ c: "white", fs: 14 }}>Follow</Text>
    </TouchableOpacity>
  </View>
);
    </code>
  </example>
</examples>
