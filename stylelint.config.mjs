/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-recommended-scss", "stylelint-config-html"],
  plugins: ["stylelint-prettier"],
  rules: {
    "prettier/prettier": true,
  },
};
