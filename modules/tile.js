import {createEl} from "./methods.js";

const tile = (status) => {
    let tile = createEl("div", status , null, "");
    let p = createEl("p", "info", null, '\u00a0');

    tile.appendChild(p);
    return tile;
};

export default tile;