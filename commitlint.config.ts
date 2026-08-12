export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "always"],
    "subject-empty": [2, "never"],
    "type-case": [2, "always", "lower-case"],
    "type-enum": [2, "always", ["feat", "fix", "chore"]],
  },
};
