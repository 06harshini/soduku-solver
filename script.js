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

function solvesoduku(mat, row, column){
    if(row === 8 && column === 9) return true;

    if(column === 9){
        row++; column = 0;
    }

    if(mat[row][column] !== 0){
        return solvesoduku(mat, row, (column+1));
    }

    for(let i = 1; i <= 9; i++){
        if(check(mat, row, column, i)){
            mat[row][column] = i;
            if(solvesoduku(mat, row, column+1)){
                return true;
            }
            mat[row][column] = 0;
        }
    }

    return false;
}

function generatesoduku(grid){
    let num = Math.floor(Math.random()*9) + 1;
    let row = Math.floor(Math.random()*9) + 1;
    let column = Math.floor(Math.random()*9) + 1;
    
    grid[row][column] = num;
    solvesoduku(grid, 0, 0);
}

const grid = new Array(9).fill(0).map(() => new Array(9).fill(0));

const soduku = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 0, 0, 0, 0]
];


    // solvesoduku(soduku, 0, 0);
    // soduku.forEach(row => console.log(row.join(" ")));
generatesoduku(grid);
grid.forEach(row => console.log(row.join(" ")));
// for(let i = 0; i < 9; i++){
//     for(let j = 0; j < 9; j++){
//         console.log(soduku[i][j]);
//     }
// }