/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        // Dark mode
        // "primary-bg-dark" : "#1B1734", // blackish bg
        "primary-bg-dark" : "#090d2b", // blackish bg
        // "primary-bg-dark" : "#000000", // blackish bg
        "btn-bg-dark" : "#896FBC", 
        "brdr-dark" : "#5C038C", //violet ( 2nd one )
        "input-txt-dark" : "#5C038C",
        "secondary-bg-dark" : "#f02ef0", //purple( Rightmost )
        "inactive-txt-dark" : "#ABB2BF",
        "tabs-bg-dark" : "#181b38",
        //light mode
        "primary-bg" : "",
        "btn-bg" : "#896FBC", 
        "brdr" : "#", 
        "input-txt" : "#5C038C",
        "secondary-bg" : "#32B768", // green  
        "secondary-bg-faded" : "#afe0c3", // green  
        "secondary-txt" : "#FFFFFF",
        "tabs-bg" : "#f2f3f5"




        // //light mode
        // // for elements like btns
        // // "primary-bg": "#32B768",
        // "primary-bg": "#896FBC",
        // "primary-text": "#FFFFFF",
        // "primary-border": "#ccc",
        // // backgrounds
        // "background": "",
        // "surface": "",
        // "background-muted": "",
        // // for main content
        // "txt-primary": "",
        // "txt-secondary": "",
        // "txt-muted": "",
        // // border
        // "brdr-primary": "#3b82f6",
        // "brdr-muted": "",
        // //highlights , alerts
        // "accent": "",
        // "accent-muted": "",
        // // dark mode
        // // for elements like btns
        // "primary-bg-dark": "#",
        // "primary-text-dark": "#",
        // "primary-border-dark": "",
        // // backgrounds
        // "background-dark": "#1B1734",
        // "surface-dark": "",
        // "background-muted-dark": "",
        // // for main content
        // "txt-primary-dark": "",
        // "txt-secondary-dark": "",
        // "txt-muted-dark": "",
        // // border
        // "brdr-primary-dark": "#ADE292",
        // "brdr-muted-dark": "",
        // //highlights , alerts
        // "accent-dark": "",
        // "accent-muted-dark": "",
        // "dark-bg": "#660066",
        // "dark-2": "#86CB92",
        // "label-bg-light": "#fff",
        // "label-text-light": "#999",
        // //change the below 2
        // "label-bg-dark": "#660066",
        // "label-text-dark": "#ADE292",
        // "input-border-light" : "#ccc",
        // "input-border-dark" : "#ADE292"
      },
      caretColor: {
        'custom-light': '#000000',  // Black for light mode
        'custom-dark': '#ADE292',   // White for dark mode
      },
    },
  },
  plugins: [],
};
