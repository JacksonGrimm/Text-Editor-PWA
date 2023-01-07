import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";
//bring in the icon
import Icon from "../images/logo.png";

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  //my icon is an a new image
  const myIcon = new Image();
  //the score of the image is the icon
  myIcon.src = Icon;
  //append the icon to the main html
  main.appendChild(myIcon);
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}
