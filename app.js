import setup from "./modules/setup.js";

const container = () => document.getElementById("container");

function app() {
    const cont = container();
    setup(cont);
}

document.addEventListener("DOMContentLoaded", app);