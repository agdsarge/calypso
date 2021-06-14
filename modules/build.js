import store from "./store.js";
import tile from "./tile.js";
import {leftClick, rightClick, superClick, newGame} from "./action.js";
import { BOMB, CLEAN, DIRTY, FLAG } from "./constants.js";
import {createEl, neighborBounds} from "./methods.js";

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
    let frameDiv = createEl("div", "frame");
    container.appendChild(frameDiv);
    let titleBarDiv = createEl("div", "titleBar", null, "");
    let gameplayDiv = createEl("div", "gameplay", null, "");
    frameDiv.appendChild(titleBarDiv);
    
    frameDiv.appendChild(gameplayDiv);
    return [frameDiv, titleBarDiv, gameplayDiv];
}

export function drawTitleBar(titleBarDiv, playDiv) {
    let title = createEl("h4", "title", null, "Minesweeper!");
    let newGameBtn = createEl("button", "reset", null, "Reset");
    newGameBtn.addEventListener("click", (event) => {newGame(event, playDiv)} );
    [title, newGameBtn].forEach(el => {titleBarDiv.appendChild(el)});
}

export function drawGame(playDiv) {
    let table = createEl("table", "arena");
    for (let row = 0; row < store.grid.length; row++) {
        let tableRow = createEl("tr", "acreRow");
        for (let col = 0; col < store.grid[row].length; col++) {
            let entry = createEl("td", CLEAN);
            if (store.grid[row][col].disabled) {
                entry.className = DIRTY;
                entry.addEventListener("contextMenu", (event) => {superClick(row, vol, playDiv, event)});
                if (store.grid[row][col].value == -1) {
                    entry.innerText = BOMB;
                } else {
                    entry.innerText = store.grid[row][col].value > 0 ? store.grid[row][col].value : "";
                } 
            } else {
                if (store.grid[row][col].flagged) {
                    entry.innerText = FLAG;
                }
                entry.addEventListener("click", () => leftClick(row, col, playDiv));
                entry.addEventListener("contextmenu", (event) => rightClick(row, col, playDiv, event));
            }
            tableRow.appendChild(entry);
        }
        table.appendChild(tableRow);
    }
    playDiv.appendChild(table); 
}


export function revelation(playDiv) {
    let table = createEl("table", "arena");
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
    playDiv.appendChild(table); 

}