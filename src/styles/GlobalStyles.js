import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit !important;
}

body {
  box-sizing: border-box !important;
  font-family: 'Star Jedi' , sans-serif !important;
  letter-spacing: 1.25px !important;
  font-weight: 300 !important;
  color: white !important;
  background: black !important;
}

h1 {
  font-family: 'Star Jedi' ;
  letter-spacing: 1.25px !important;
  font-weight: 300 !important;
  color: #FFD700 !important;
}

h2, h3, h4, h5, h6,
p, div, button, a, 
input, select, textarea {
  font-family: 'Open Sans', sans-serif !important;
  font-weight: 300 !important;
  letter-spacing: 1.25px !important;
}


`;
