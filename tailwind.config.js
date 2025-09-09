/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          light: '#dbeafe',
        },
        secondary: {
          DEFAULT: '#6b7280',
          hover: '#4b5563',
          light: '#f3f4f6',
        },
        success: {
          DEFAULT: '#059669',
          hover: '#047857',
          light: '#d1fae5',
        },
        danger: {
          DEFAULT: '#dc2626',
          hover: '#b91c1c',
          light: '#fee2e2',
        },
        warning: {
          DEFAULT: '#d97706',
          hover: '#b45309',
          light: '#fef3c7',
        },
      },
    },
  },
  plugins: [],
}
