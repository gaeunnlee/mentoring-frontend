import { createGlobalStyle } from "styled-components";
import JejuGothic from "../static/fonts/JejuGothic.ttf";
import Jalnan from "../static/fonts/Jalnan.ttf";
import TheJamsil from "../static/fonts/TheJamsil.ttf";

export const GlobalStyles = createGlobalStyle`
  @font-face {
        font-family: 'JejuGothic';
        src: local('JejuGothic'), local('JejuGothic');
        font-style: normal;
        src: url(${JejuGothic}) format('truetype');
  }
  @font-face {
        font-family: 'Jalnan';
        src: local('Jalnan'), local('Jalnan');
        font-style: normal;
        src: url(${Jalnan}) format('truetype');
  } 
  @font-face {
        font-family: 'TheJamsil';
        src: local('TheJamsil'), local('TheJamsil');
        font-style: normal;
        src: url(${TheJamsil}) format('truetype');
  } 
  * {
    font-family: 'JejuGothic';
  }

  body {
    margin: 0;
    background-color: #F1C368;
    display: flex;
    justify-content: center;
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: transparent;
    height: 100vh;
    width: 100%;
    max-width: 500px;
  }
  .sliderContainer {
    width: calc( 100vw - 40px )!important;
    height: calc( 100vw - 60px )!important;
    max-width: 450px!important;
    max-height: 450px!important;
  }
  .rsis-container {
    width: calc( 100vw - 40px )!important;
    height: calc( 100vw - 60px )!important;
    max-width: 450px!important;
    max-height: 450px!important;
  } 
  .sliderWrapper {
    width: calc( 100vw - 40px )!important;
    height: calc( 100vw - 60px )!important;
    display: flex!important;
    justify-content: center;
    max-width: 450px!important;
    max-height: 450px!important;
    background-color: #f2f2f2!important;
  }

  .sliderContainer {
    width: calc( 100vw - 60px )!important;
    height: calc( 100vw - 60px )!important;
    display: flex!important;
    max-width: 440px!important;
    max-height: auto!important;
    position: sticky!important;
  }

  .rsis-container div {
    background-position: center center!important;
    max-width: 450px!important;
    max-height: 450px!important;    background-size: contain !important;
    background-repeat: no-repeat!important;
  }

  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
button {
    background-color: transparent;
    border: 0;
    padding: 0;
}
a {
    text-decoration: none;
    color: black;
}
input[type="submit"], input[type="button"] {
    border: 0;
} 

.pagination {
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 100%;
  height: 50px;
  align-items: center;
  gap: 2px;
  position: sticky;
  top: -20px;
  background-color: #f9f9f9;
  z-index: 999;
}

.hidden {
  display: none;
}
.pagination .break {
}

.pagination a {
  padding: 10px;
  border-radius: 5px;
  border : 1px solid #ffa46c;
  color: #ffa46c;
  &:hover {
    cursor: pointer;
  }
}

.pagination__link {
  font-weight: bold;
}

.pagination__link--active a {
  color: #fff;
  background: #ffa46c;
}

.pagination__link--disabled a {
  color: rgb(198, 197, 202);
  border: 1px solid rgb(198, 197, 202);
  background-color: transparent;
}

`;