import abstractLayer from "./abstractLayer.js";
import {buildFrame, drawGame, drawTitleBar } from "./build.js";

function setup(container) {
    abstractLayer();
    let [frame, titlebar, playDiv] = buildFrame(container);
    drawGame(playDiv);
    drawTitleBar(titlebar, playDiv);
}

export default setup;