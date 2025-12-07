function check(mat, row, column, num){
    //check in row
    for(let i = 0; i < 9; i++){
        if(mat[row][i] === num) return false;
    }

    //check in column
    for(let i = 0; i < 9; i++){
        if(mat[i][column] === num) return false;
    }

    //check in grid
    let gridrow = row - (row%3);
    let gridcolum = column - (column%3);

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(mat[i+gridrow][j+gridcolum] == num) return false;
        }
    }

    return true;
}

function solvesudoku(mat, row, column){
    if(row === 8 && column === 9) return true;

    if(column === 9){
        row++; column = 0;
    }

    if(mat[row][column] !== 0){
        return solvesudoku(mat, row, (column+1));
    }

    for(let i = 1; i <= 9; i++){
        if(check(mat, row, column, i)){
            mat[row][column] = i;
            if(solvesudoku(mat, row, column+1)){
                return true;
            }
            mat[row][column] = 0;
        }
    }

    return false;
}

function generatesudoku(grid, row, column){
    if(row === 8 && column === 9) return true;

    if(column === 9){
        row++; column = 0;
    }

    if(grid[row][column] !== 0){
        return solvesudoku(grid, row, (column+1));
    }

    let num = Math.floor(Math.random()*9) + 1;
    if(check(grid, row, column, num)){
        grid[row][column] = num;
        if(solvesudoku(grid, row, column+1)){
            return true;
        }
        grid[row][column] = 0;
    }

    return false;
}

function generatesodukuandremove(grid){
    generatesudoku(grid, 0, 0);
    let k = 45;
    while (k > 0) {
        let cellid = Math.floor(Math.random() * 81);
        let i = Math.floor(cellid / 9);
        let j = cellid % 9;

        if (grid[i][j] !== 0) {
            grid[i][j] = 0;
            k--;
        }
    }
}

function isvalid(grid){

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let num = grid[i][j];
            
            if(num === 0) continue;
            if(num < 1 || num > 9) return false;
            grid[i][j] = 0;
            if(!check(grid, i, j, num)){
                grid[i][j] = num;
                return false;
            }

            grid[i][j] = num;
        }
    }

    return true;
}

function makegridhtml(){
    var table = document.getElementById("sudoku-table");
    table.innerHTML = "";

    for(let row = 0; row < 9; row++){
        var tr = document.createElement("tr");

        for(let col = 0; col < 9; col++){
            var input = document.createElement("input");

            input.type = "text";
            input.maxLength = 1;

            input.dataset.row = row;
            input.dataset.col = col;

            var td = document.createElement("td");
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function tabletogrid(){
    const table = document.getElementById("sudoku-table");
    const grid = [];

    for (let row = 0; row < 9; row++) {
        const gridRow = [];
        const cells = table.rows[row].cells;

        for (let col = 0; col < 9; col++) {
            const input = cells[col].querySelector("input");
            const value = input.value.trim();

            if(value === "") gridRow.push(0);
            else gridRow.push(Number(value));
        }

        grid.push(gridRow);
    }

    return grid;
}

function gridtotable(grid){
    const table = document.getElementById("sudoku-table");

    for(let row = 0; row < 9; row++){
        const cells = table.rows[row].cells;

        for(let col = 0; col < 9; col++){
            const input = cells[col].querySelector("input");
            const value = grid[row][col];

            input.value = value === 0 ? "" : value;
        }
    }
}

const grid = new Array(9).fill(0).map(() => new Array(9).fill(0));

// const sudoku = [
//     [3, 0, 6, 5, 0, 8, 4, 0, 0],
//     [5, 2, 0, 0, 0, 0, 0, 0, 0],
//     [0, 8, 7, 0, 0, 0, 0, 3, 1],
//     [0, 0, 3, 0, 1, 0, 0, 8, 0],
//     [9, 0, 0, 8, 6, 3, 0, 0, 5],
//     [0, 5, 0, 0, 9, 0, 6, 0, 0],
//     [1, 3, 0, 0, 0, 0, 2, 5, 0],
//     [0, 0, 0, 0, 0, 0, 0, 7, 4],
//     [0, 0, 5, 2, 0, 0, 0, 0, 0]
// ];

// solvesudoku(sudoku, 0, 0);
// sudoku.forEach(row => console.log(row.join(" ")));
// generatesudoku(grid, 0, 0);
// grid.forEach(row => console.log(row.join(" ")));

window.onload = () => {
    makegridhtml();

    document.getElementById("generate").onclick = generatefinal;
    document.getElementById("solve").onclick = solvefinal;
    document.getElementById("reset").onclick = clearall;
};

function generatefinal(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            grid[i][j] = 0;
        }
    }
    generatesodukuandremove(grid, 0, 0);
    gridtotable(grid);
}

function solvefinal(){
    const newgrid = tabletogrid();
    if(!isvalid(newgrid)){
        const prev = document.getElementById("errormsg");
        if(prev) prev.remove();

        const p = document.createElement("p");
        p.id = "errormsg";
        p.textContent = "Input is invalid";
        document.body.appendChild(p);
        return;
    }
    else{
        const prev = document.getElementById("errormsg");
        if(prev) prev.remove();
    }
    solvesudoku(newgrid, 0, 0);
    gridtotable(newgrid); 
}

function clearall(){
    const newgrid = tabletogrid();
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            newgrid[i][j] = 0;
        }
    }
    gridtotable(newgrid);
}