import store from "./store.js";
import {leftClick, rightClick, superClick, newGame} from "./action.js";
import { BOMB, BUTTON, CLEAN, CLICK, CONTEXTMENU, DIRTY, DIV, FLAG, SPAN } from "./constants.js";
import {createEl, neighborBounds, formElement, delChildren, smallGaps, custGap} from "./methods.js";
import menu from "./menu.js";

function countNeighborFlags(row, col) {
    //console.log("COUNT FLAGS!")
    //given coordinates row, col, see how many flags are about.
    let [lowRowBound, highRowBound] = neighborBounds(row, true);
    let [lowColBound, highColBound] = neighborBounds(col, false);

    let count = 0;

    for (let r = lowRowBound; r < highRowBound; r++) {
        for (let c = lowColBound; c < highColBound; c++) {
            if (row == r && col == c) continue;
            if (store.grid[r][c].flagged) count++;
        }
    }
    return count;
}


export function buildFrame(container) {
    let frameDiv = createEl(DIV, "frame col-12");
    container.appendChild(frameDiv);
    let titleBarDiv = createEl(DIV, "titleBar row", null, "");
    let gameplayDiv = createEl(DIV, "gameplay row", null, "");
    frameDiv.appendChild(titleBarDiv);
    
    frameDiv.appendChild(gameplayDiv);
    return [frameDiv, titleBarDiv, gameplayDiv];
}

export function drawTitleBar(titleBarDiv, playDiv) {
    let title = createEl(DIV, "title col-3", null, "Calypso");
    let space = custGap(5);
    let newGameBtn = createEl(BUTTON, "reset col-2", null, "New Game");
    newGameBtn.addEventListener(CLICK, (event) => {newGame(event, playDiv)} );
    let menuBtn = createEl(BUTTON, "menu col-2", null, "Menu");
    menuBtn.addEventListener(CLICK, (event) => {drawMenu(playDiv)});
    [title, space, newGameBtn, menuBtn].forEach(el => {titleBarDiv.appendChild(el)});
}

export function drawGame(playDiv) {
    let [leftGap, rightGap] = smallGaps();
    let table = createEl("table", "arena col-8");
    for (let row = 0; row < store.grid.length; row++) {
        let tableRow = createEl("tr", "acreRow");
        for (let col = 0; col < store.grid[row].length; col++) {
            let entry = createEl("td", CLEAN);
            if (store.grid[row][col].disabled) {
                entry.className = DIRTY;
                entry.addEventListener(CONTEXTMENU, (event) => {superClick(row, vol, playDiv, event)});
                if (store.grid[row][col].value == -1) {
                    entry.innerText = BOMB;
                } else {
                    entry.innerText = store.grid[row][col].value > 0 ? store.grid[row][col].value : "";
                } 
            } else {
                if (store.grid[row][col].flagged) {
                    entry.innerText = FLAG;
                }
                entry.addEventListener(CLICK, () => leftClick(row, col, playDiv));
                entry.addEventListener(CONTEXTMENU, (event) => rightClick(row, col, playDiv, event));
            }
            tableRow.appendChild(entry);
        }
        table.appendChild(tableRow);
    }
    [leftGap, table, rightGap].forEach(c => playDiv.appendChild(c))
    
}

export function revelation(playDiv) {
    let [leftGap, rightGap] = smallGaps();
    let table = createEl("table", "arena col-8");
    for (let row = 0; row < store.grid.length; row++) {
        let tableRow = createEl("tr", "acreRow");
        for (let col = 0; col < store.grid[row].length; col++) {
            let entry = createEl("td", DIRTY);
           
            if (store.grid[row][col].value == -1) {
                entry.innerText = BOMB;
            } else {
                entry.innerText = store.grid[row][col].value > 0 ? store.grid[row][col].value : "";
            } 
            
            tableRow.appendChild(entry);
        }
        table.appendChild(tableRow);
    }
    [leftGap, table, rightGap].forEach(c => playDiv.appendChild(c))
}

export function drawMenu(playDiv) {
    menu(playDiv);
}