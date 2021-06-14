import store, {Acre} from "./store.js";
import {neighborBounds} from "./methods.js";

function incrementSurroundings(row, col) {
    
    for (let r = row-1; r < row+2; r++) {
        if (store.grid[r] == undefined) continue;
        for (let c = col-1; c < col+2; c++) {
            if (store.grid[r][c] == undefined) continue;
            if (store.grid[r][c].mined) continue;
            store.grid[r][c].value++;
        }
    }
}

function generateRandomSet() {
    let arenaArea = store.arenaCols * store.arenaRows;
    const rands = new Set();
    while (rands.size < store.mineCount) {
        rands.add(Math.floor(arenaArea * Math.random()));
    }
    return rands;
}

function initializeArena(rands) {
    const grid = store.grid;
    for (let row = 0; row < store.arenaRows; row++) {
        const newRow = [];
        for (let col = 0; col < store.arenaCols; col++) {
            let acre = new Acre(row, col);
            let addr = ((row * store.arenaCols) + col);

            if (rands.has(addr)) {
                acre.mined = true;
                acre.value = -1;
            }
            newRow.push(acre);
        }
        grid.push(newRow);
    }
}

function investigateNeighbors() {
    for (let row = 0; row < store.arenaRows; row++) {
        for (let col = 0; col < store.arenaCols; col++) {
            if (store.grid[row][col].mined) {
                incrementSurroundings(row, col);
            }
        }
    }
}

export function wipeAbstractLayer() {
    store.grid = [];
    store.goodClicks = 0;
}

function abstractLayer() {    
    const rands = generateRandomSet();
    initializeArena(rands);
    investigateNeighbors();
}

export default abstractLayer;