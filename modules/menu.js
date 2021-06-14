// import { drawMenu } from "./build";
import { generateDTO, newGame } from "./action.js";
import { CHANGE, DIV, INPUT, LABEL, SUBMIT } from "./constants.js";
import { appendChildren, createEl, custGap, delChildren } from "./methods.js";
import store, {customGameOptionsSubmission } from "./store.js";

function generateFormRow(name, prompt) {
    let formRow = createEl(DIV, `${name} row`);
    
    let label = createEl(LABEL, "label col-3", null, prompt);
    label.htmlFor = name;
    
    let input = createEl(INPUT, "input col-6", name, "");
    input.name = name;
    input.value = store[name];
    input.type = "number";
    input.min = (name == "mineCount") ? 10 : 8;
    input.max = (name == "mineCount") ? 63 : 20;
    input.addEventListener(CHANGE, (event) => {
        input.value = event.target.value;
    })

    appendChildren(formRow, [label, input, custGap(3)]);
    return formRow;
}

function generateSubmit() {
    let submitRow = createEl(DIV, "submit row");
    let left = custGap(6);
    let submit = createEl(INPUT, "submit col-3")
    submit.type = SUBMIT;
    submit.value = "Submit!";
    let right = custGap(3);
    appendChildren(submitRow, [left, submit, right]);

    return submitRow;
}

export default function menu(playDiv) {
    delChildren(playDiv);
    let [leftGap, rightGap] = [custGap(2), custGap(2)];
    const form = createEl("form", "form col-8")
    form.addEventListener(SUBMIT, (event) => {
        event.preventDefault();
        const dto = generateDTO(form);
        customGameOptionsSubmission(dto);
        newGame(event, playDiv);
    })
    let rowSelect = generateFormRow("arenaRows", "Rows");
    let colSelect = generateFormRow("arenaCols", "Columns");
    let mineSelect = generateFormRow("mineCount", "Mines");
    let submit = generateSubmit();
    appendChildren(form, [rowSelect, colSelect, mineSelect, submit]);
    appendChildren(playDiv, [leftGap, form, rightGap]);
}