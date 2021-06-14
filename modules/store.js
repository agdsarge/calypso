const store = {
    
    mineCount: 10,
    grid: [],
    arenaCols: 8,
    arenaRows: 10,
    firstClick: false,
    goodClicks: 0,
    display: {
        timer: 0,
        minesRemaining: null,
        message: ""
    }
}

export class Acre {
    constructor(row, col) {
        this.mined = false;
        this.disabled = false;
        this.value = 0;
        this.row = row;
        this.col = col;
        this.flagged = false;
    }

}

export default store;