//Q2 D
function replace_2(a, b, xs){
    return accumulate((x,ys) => x === a ? pair(b, ys) : pair(x, ys),
                    null,
                    xs);
}

//Q4
function closeset_two_power(x){
    return math_pow(2, math_floor(math_log2(x)));
}

function min_tiles(L, W){
    if(L === 0 || W === 0){
        return 0;
    }else if(L === 1 && W === 1){
        return 1;
    }else{
        let dim = closeset_two_power(math_min(L, W));
        return 1 + min_tiles(L - dim, W) + min_tiles(dim, W - dim);
    }
}

//Q5 B
function bubblesort_list(L){
    const len = length(L);
    for(let i = len - 1; i >= 1; i = i - 1){
        let p = L;
        for(let j = 0; j < i; j = j + 1){
            if(head(p) > head(tail(p))){
                let temp = head(p);
                set_head(p, head(tail(p)));
                set_head(tail(p), temp);
            }
            p = tail(p);
        }
    }
}

//Q5 C
function reorder1(A, T){
    const N = array_length(A);
    const B = [];
    for(let i = 0; i < N; i = i + 1){
        B[T[i]] = A[i];
    }
    
    for(let i = 0; i < N; i = i + 1){
        A[i] = B[i];
    }
}

//Q5 D
function swap(A, i, j){
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function reorder2(A, T){
    const N = array_length(A);
    for(let i = 0; i < N; i = i + 1){
        if(T[i] === i){
            continue;
        }else{
            swap(A, i, T[i]);
            swap(T, i, T[i]);
        }
    }
}

const A = [78, 23, 56, 12, 99];
const T = [3, 1, 4, 0, 2];
reorder2(A, T);
A;

//Q6
function free_grid(grid){
    for(let i = 0; i < 3; i = i + 1){
        for(let j = 0; j < 3; j = j + 1){
            grid[i][j] = "_";
        }
    }
}

function replace_string(new_string, r, c, g, expected_string){
    if(g[r][c] === "_" || g[r][c] === expected_string){
        g[r][c] = new_string;
        return true;
    }else{
        return false;
    }
}

function check_winner(g, p){
    return (
        (g[0][0] === p && g[1][1] === p && g[2][2] === p) ||
        (g[0][2] === p && g[1][1] === p && g[2][0] === p) ||
        (g[0][0] === p && g[1][0] === p && g[2][0] === p) ||
        (g[0][1] === p && g[1][1] === p && g[2][1] === p) ||
        (g[0][2] === p && g[1][2] === p && g[2][2] === p) ||
        (g[0][0] === p && g[0][1] === p && g[0][2] === p) ||
        (g[1][0] === p && g[1][1] === p && g[1][2] === p) ||
        (g[2][0] === p && g[2][1] === p && g[2][2] === p)
        );
}

function grid_to_string(grid){
    return "Current grid:\n" + 
    grid[0][0] + grid[0][1] + grid[0][2] + "\n" +
    grid[1][0] + grid[1][1] + grid[1][2] + "\n" +
    grid[2][0] + grid[2][1] + grid[2][2] + "\n";
}

function play_tic_tac_toe(){
    const grid = [["_", "_", "_"],
                  ["_", "_", "_"],
                  ["_", "_", "_"]];
    while(prompt("Do you want to play tic-tac-toe?") === "yes"){
        free_grid(grid);
        let current_player = "X";
        
        while(current_player !== "GAME_OVER"){
            const r = parse_int(prompt(grid_to_string(grid) + 
                                "\nPlayer " + current_player +
                                ": enter row (0-2): "), 10);
            const c = parse_int(prompt(grid_to_string(grid) + 
                                "\nPlayer " + current_player +
                                ": enter col (0-2): "), 10);
            if(grid[r][c] !== "_"){
                prompt(grid_to_string(grid) + "slot" + r + c + 
                "occupied\n Please select another slot");
                continue;
            }else{
                grid[r][c] = current_player;
            }
            
            if(check_winner(grid, current_player)){
                prompt(grid_to_string(grid) + 
                current_player + "is the winner!");
                break;
            }else{
                if(current_player === "X"){
                    current_player = "O";
                }else{
                    current_player = "X";
                }
            }
        }
    }
}

//play_tic_tac_toe();

//Q8
function show_stream(s, n){
    for_each(display, eval_stream(s, n));
}

const ones = pair(1, () => ones);
const integers = pair(1, () => stream_map(x => x + 1, integers));
//show_stream(ones, 6);
//show_stream(integers, 6);

function stream_zip(s1, s2){
    return pair(head(s1), () => stream_zip(s2, stream_tail(s1)));
}

//show_stream(stream_zip(ones, integers), 9);

function extend(bno){
    function stream_fun(s1, s2){
        return pair(bno(head(s1), head(s2)),
                    () => stream_fun(stream_tail(s1), stream_tail(s2)));
    }
    return stream_fun;
}

const add_streams = extend((x,y) => x + y);
//show_stream(add_streams(ones, ones), 6);
const mult_stream = extend((x,y) => x * y);
//show_stream(mult_stream(integers, integers), 6);

function convolve(binary_stream_operation){
    function unary_stream_operation(stream){
        const convolved = pair(head(stream),
                            () => binary_stream_operation(
                                stream, convolved));
        return convolved;
    }
    return unary_stream_operation;
}

const convolving_zip = convolve(stream_zip);
//show_stream(convolving_zip(integers), 9);
show_stream(convolve(extend((x,y) => x * y))(integers), 6);