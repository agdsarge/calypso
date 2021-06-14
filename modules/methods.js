import store from "./store.js";

export function createEl(tag, className, id, innerText) {
    let el = document.createElement(tag);
    if (!!className) el.className = className;
    if (!!id) el.id = id;
    if (!!innerText) el.innerText = innerText;
    return el;
}

export function delChildren(domNode) {
    while (domNode.lastChild) {
        domNode.removeChild(domNode.lastChild);
    }
}

export function neighborBounds(coordinate, rowFlag) {
    let lowBound = Math.max(0, coordinate - 1);
    let highBound = rowFlag ? Math.min(store.grid.length, coordinate + 2) : Math.min(store.grid[0].length, coordinate + 2);
    return [lowBound, highBound];
}