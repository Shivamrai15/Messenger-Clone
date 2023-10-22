/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage : {
        chatBg : "url('/images/chat-bg.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy : 'class'
    })
  ],
}
