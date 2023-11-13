//Section A
function insert_last(C, x){
    set_tail(C, pair(x, tail(C)));
    return C;
}

function make_RCL(L){
    const lst = reverse(L);
    let result = list(head(lst));
    set_tail(result, result);
    let rest = tail(lst);
    while(!is_null(rest)){
        result = insert_last(result, head(rest));
        rest = tail(rest);
    }
    return result;
}

function append_RCL(C1, C2){
    const C1_tail = tail(C1);
    set_tail(C1, tail(C2));
    set_tail(C2, C1_tail);
    return C2;
}

const L1 = list(1,2,3,4);
const C = make_RCL(L1);

const RCL1 = make_RCL(list(1,2,3,4));
const RCL2 = make_RCL(list(5,6,7,8));

//Section B
function find_2nd_min(bmt){
    return is_empty_tree(left_branch(bmt))
    ? entry(right_branch(bmt))
    : entry(left_branch(bmt));
}

function find_max(bmt){
    return is_empty_tree(right_branch(bmt))
    ? is_empty_tree(left_branch(bmt))
    ? entry(bmt)
    : find_max(left_branch(bmt))
    : find_max(right_branch(bmt));
}

function find_x(bmt, x){
    return is_empty_tree(bmt)
    ? false
    : entry(bmt) === x 
    ? true 
    : x < entry(right_branch(bmt)) || x < entry(left_branch(bmt))
    ? false
    : find_x(left_branch(bmt), x) || find_x(right_branch(bmt), x);
}

function flatten(bmt){
    function helper(bmt){
        return is_empty_tree(bmt)
        ? null 
        : append(pair(entry(bmt), flatten(left_branch(bmt))),
                flatten(right_branch(bmt)));
    }
    return reverse(helper(bmt));
}

//Section E
function utm(n){
    let M = [];
    for(let i = 0; i < n; i = i + 1){
        M[i] = [];
        for(let j = i; j < n; j = j + 1){
            M[i][j] = 1;
        }
        
        for(let j = 0; j < i; j = j + 1){
            M[i][j] = 0;
        }
    }
    return M;
}

utm(20);

//Section F
function stream(...args){
    const arr = args;
    function helper(i){
        return i < array_length(arr)
        ? pair(arr[i], () => helper(i + 1))
        : null;
    }
    return helper(0);
}

const s1 = stream(1,2,3,4,5);

function lazier_stream(f, xs){
    return pair(() => f(head(xs)),
                () => lazier_stream(f, tail(xs)));
}

function lazier_stream_element(s, n){
    let element = s;
    for(let i = 0; i < n; i = i + 1){
        element = tail(element)();
    }
    return head(element)();
}

const s = lazier_stream(math_sqrt, list(4,9,16));
lazier_stream_element(s, 1);

//Section G
function valid_next(r, c, maze){
    const M = [];
    let i = 0;
    if(maze[r][c+1] === 0){
        M[i] = [r, c+1];
        i = i + 1;
    }
    
    if(maze[r+1] === undefined){
        return M;
    }else{
        if(maze[r+1][c+1] === 0){
            M[i] = [r+1, c+1];
            i = i + 1;
        }
        if(maze[r+1][c] === 0){
            M[i] = [r+1, c];
            i = i + 1;
        }
    }
    return M;
}


function is_solvable(r, c, maze){
    let solvable = false;
    if(r === array_length(maze) - 1 && c === array_length(maze[0]) - 1){
        return true;
    }else if(array_length(valid_next(r, c, maze)) === 0){
        return false;
    }else{
        const next_step = valid_next(r, c, maze);
        for(let i = 0; i < array_length(next_step); i = i + 1){
            solvable = solvable || is_solvable(next_step[i][0],
                                                next_step[i][1],
                                                maze);
        }
        return solvable;
    }
}

const maze1 = [[0,0,1,0],
               [1,0,1,1],
               [1,0,0,0]];
               
const maze2 = [[0,0,1,0],
               [1,1,1,0],
               [1,0,0,0]];
               
const maze3 = [[0,0,0,0]];

is_solvable(0,0,maze1);
