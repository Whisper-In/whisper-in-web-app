import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        'sat': 'var(--safe-area-inset-top)',
        'sab': 'var(--safe-area-inset-bottom)',
        'sab-or-14': 'max(var(--safe-area-inset-bottom),14px)'
      },
      colors: {
        primary: "#3B96EB",
        onPrimary: "#FFF",
        primaryContainer: "#004a75",
        onPrimaryContainer: "#DDD",
        secondary: "#D5D5D5",
        onSecondary: "#555",
        secondaryContainer: "#FFF",
        onSecondaryContainer: "#666666",
        tertiary: "#4fd8eb",
        onTertiary: "#00363d",
        tertiaryContainer: "#004f58",
        onTertiaryContainer: "#97f0ff",
        error: "#ba1a1a",
        onError: "#ffffff",
        errorContainer: "#ffdad6",
        onErrorContainer: "#410002",
        background: "#E5E7E8",
        onBackground: "#1B1D1F",
        surface: "#FFF",
        onSurface: "#1B1D1F",
        surfaceVariant: "#dee3eb",
        onSurfaceVariant: "#888",
        outline: "#72777f",
        outlineVariant: "#c2c7cf",
        shadow: "#000",
        scrim: "#000",
        inverseSurface: "#2f3033",
        inverseOnSurface: "#f0f0f4",
        inversePrimary: "#96ccff",
        surfaceDisabled: "#96ccff",
        onSurfaceDisabled: "#96ccff",
        backdrop: "#96ccff",

        primaryDark: "#3B96EB",
        onPrimaryDark: "#DDD",
        primaryContainerDark: "#004a75",
        onPrimaryContainerDark: "#82a2e0",
        secondaryDark: "#1D2129",
        onSecondaryDark: "#999999",
        secondaryContainerDark: "#004f58",
        onSecondaryContainerDark: "#666666",
        tertiaryDark: "#4fd8eb",
        onTertiaryDark: "#00363d",
        tertiaryContainerDark: "#004f58",
        onTertiaryContainerDark: "#97f0ff",
        errorDark: "#ffb4ab",
        onErrorDark: "#690005",
        errorContainerDark: "#93000a",
        onErrorContainerDark: "#ffb4ab",
        backgroundDark: "#090B10",
        onBackgroundDark: "#ffffff",
        surfaceDark: "#16191F",
        onSurfaceDark: "#bbbbbb",
        surfaceVariantDark: "#42474e",
        onSurfaceVariantDark: "#777",
        outlineDark: "#8c9198",
        outlineVariantDark: "#42474e",
        shadowDark: "#000",
        scrimDark: "#000",
        inverseSurfaceDark: "#e2e2e5",
        inverseOnSurfaceDark: "#2f3033",
        inversePrimaryDark: "#00639a",
        surfaceDisabledDark: "#00639a",
        onSurfaceDisabledDark: "#00639a",
        backdropDark: "#00639a",
        white: "#FFF",
        black: "#000"
      },
      dropShadow: {
        DEFAULT: '0 2px 2px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}
export default config
