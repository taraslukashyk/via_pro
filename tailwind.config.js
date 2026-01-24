/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#EAE4DF", // Light cream/beige
                foreground: "#1D1D1D", // Dark grey/black
                accent: "#184c71", // Deep Blue from Logo
                muted: "#F5F5F5",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Using Inter as a safe geometric sans
            },
        },
    },
    plugins: [],
}
