module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",   // ✅ so Tailwind parses @layer in CSS
  ],
  theme: { extend: {} },
  plugins: [],
};
