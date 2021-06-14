import {drawGame, revelation} from "./build.js";
import {delChildren, neighborBounds} from "./methods.js";
import store from "./store.js";
import abstractLayer, {wipeAbstractLayer} from "./abstractLayer.js";

export function leftClick(row, col, playDiv) {
    if (store.grid[row][col].disabled) return; // base case for the recursion call.

    store.grid[row][col].disabled = true;
   
    if (store.grid[row][col].value == 0) {
        let [lowRowBound, highRowBound] = neighborBounds(row, true);
        let [lowColBound, highColBound] = neighborBounds(col, false);

        for (let r = lowRowBound; r < highRowBound; r++) {
            for (let c = lowColBound; c < highColBound; c++) {
                if (row != r || col != c) {
                    leftClick(r, c, playDiv);
                } 
            }
        }
    }
    
    if (store.grid[row][col].value == -1) {
        //game over!
        delChildren(playDiv);
        revelation(playDiv);
    } else {
        store.goodClicks++;
        if (store.goodClicks == (store.arenaCols * store.arenaRows) - store.mineCount) {
            alert("VICTORY!");
            delChildren(playDiv);
            wipeAbstractLayer();
            abstractLayer();
            drawGame(playDiv);
        } else {
            delChildren(playDiv)
            drawGame(playDiv);
        }
        
        
        
    }
}

export function superClick(row, col, playDiv, event) {
    event.preventDefault();
    console.log("SUPERCLICK!");
}

export function rightClick(row, col, playDiv, event) {
    event.preventDefault();
    store.grid[row][col].flagged = !store.grid[row][col].flagged;
    delChildren(playDiv);
    drawGame(playDiv);
}

export function newGame(event, playDiv) {
    event.preventDefault();
    wipeAbstractLayer();
    delChildren(playDiv);
    abstractLayer();
    drawGame(playDiv);
}



export function generateDTO(form) {
    const dto = {};
    for (let [key, value] of new FormData(form)) {
        dto[key] = value;
    }
    return dto;
}

// export function submitCustomGame(event, custRow, custCol, custMineCount, playDiv) {
//     event.preventDefault();
//     store.arenaRows = custRow;
//     store.arenaCols = custCol;
//     store.mineCount = custMineCount;
//     store.display.minesRemaining = custMineCount;
//     newGame(event, playDiv);
// }

export function openMenu(){}

export function closeMenu(){}

