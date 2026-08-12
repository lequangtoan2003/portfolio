import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const ignores = [
  ".next/**",
  "node_modules/**",
  "out/**",
  "next-env.d.ts",
  "tsconfig.tsbuildinfo",
];

const eslintConfig = [
  { ignores },
  ...nextVitals,
  ...nextTypescript,
  {
    files: ["scripts/**/*.mjs", "*.config.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        URL: "readonly",
      },
    },
  },
];

export default eslintConfig;
