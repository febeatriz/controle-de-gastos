/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0f172a',
                'dark-card': '#1e293b',
                'dark-input': '#0f172a',
                'receita': '#14532d',
                'despesa': '#7f1d1d',
                'saldo': '#1d4ed8',
            },
        },
    },
}
