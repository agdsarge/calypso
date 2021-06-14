import {DIV} from "./constants.js";
import store from "./store.js";

export function createEl(tag, className, id, innerText) {
    let el = document.createElement(tag);
    if (!!className) el.className = className;
    if (!!id) el.id = id;
    if (!!innerText) el.innerText = innerText;
    return el;
}

export function formElement(id, initialValue, min, max, text, form) {
    let row = createEl("div", "formInput row");
    let label = createEl("label", "label col-4", null, text);
    label.for = id;
    let input = createEl("input", "input col-2", id)
    input.type = "number";
    input.value = initialValue;
    input.min = min;
    input.max = max;
    input.name = id;
    let space = createEl(DIV, "space col-6");
    [label, input, space].forEach(d => row.appendChild(d));

    form.appendChild(row);
    form.appendChild(createEl("br"));
}

export function delChildren(domNode) {
    while (domNode.lastChild) {
        domNode.removeChild(domNode.lastChild);
    }
}

export function appendChildren(parent, childArray) {
    childArray.forEach(child => parent.appendChild(child));
}

export function neighborBounds(coordinate, rowFlag) {
    let lowBound = Math.max(0, coordinate - 1);
    let highBound = rowFlag ? Math.min(store.grid.length, coordinate + 2) : Math.min(store.grid[0].length, coordinate + 2);
    return [lowBound, highBound];
}

export function smallGaps() {
    let leftGap = createEl(DIV, "gap col-2");
    let rightGap = createEl(DIV, "gap col-2");
    return [leftGap, rightGap];
}

export function custGap(n) {
    let colWidth = `gap col-${n}`;
    return createEl(DIV, colWidth);
}