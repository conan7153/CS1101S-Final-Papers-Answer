//Q1 B
function similar(tn1, tn2){
    if(is_null(tn1) && is_null(tn2)){
        return true;
    }else if(is_null(tn1) || is_null(tn2)){
        return false;
    }else if(is_number(head(tn1)) && is_number(head(tn2))){
        return (head(tn1) === head(tn2)
        || math_abs(head(tn1) - head(tn2)) === 1) 
        //() needed to keep the evaluation of conditional expression in proper manner
        // else the && conditional expression will simply be ignored
        // if left of || is true.
        && similar(tail(tn1), tail(tn2));
    }else if(is_list(head(tn1)) && is_list(head(tn2))){
        return similar(head(tn1), head(tn2))
        && similar(tail(tn1), tail(tn2));
    }else{
        return false;
    }
}

//Q1 C
function differences(tn1, tn2){
    function helper(t1, t2){
        return is_null(t1) && is_null(t2)
        ? 0
        : (is_null(head(t1)) && !is_null(head(t2))) || 
        (!is_null(head(t1)) && is_null(head(t2)))
        ? 1 + helper(tail(t1), tail(t2))
        : is_list(head(t1)) && is_list(head(t2))
        ? helper(head(t1), head(t2)) 
        + helper(tail(t1), tail(t2))
        : head(t1) === head(t2)
        ? 0 + helper(tail(t1), tail(t2))
        : 1 + helper(tail(t1), tail(t2));
    }
    return helper(tn1, tn2);
}

//Q1 D
function map_tree(f, tree){
    return map(subtree => !is_list(subtree)
                        ? f(subtree)
                        : map_tree(f, subtree),
                tree);
}

function increment(tn){
    return map_tree(x => x + 1, tn);
}

//Q3 A
function array_with_zeros(n){
    const M = [];
    for(let i = 0; i < n; i = i + 1){
        M[i] = 0;
    }
    return M;
}

//Q3 B
function make_histogram(arr, max){
    const histogram = array_with_zeros(max + 1);
    const hlen = max + 1;
    const len = array_length(arr);
    for(let i = 0; i < hlen; i = i + 1){
        let count = 0;
        for(let j = 0; j < len; j = j + 1){
            if(arr[j] === i){
                count = count + 1;
            }else{}
        }
        histogram[i] = count;
    }
    return histogram;
}

//Q3 C
function enter_copies(arr, n, v, start){
    for(let i = start; i < start + n; i = i + 1){
        arr[i] = v;
    }
}

//Q3 D
function generating_sorted(histogram){
    const hlen = array_length(histogram);
    const M = [];
    let start = 0;
    for(let i = 0; i < hlen; i = i + 1){
        if(histogram[i] === 0){
            continue;
        }else{
            enter_copies(M, histogram[i], i, start);
            start = start + histogram[i];
        }
    }
    return M;
}

const a = list(4, 1, list(5,5));
const b = list(5, 1, list(4,8));
similar(a,b);

const unsorted = [5,1,10,2,1,5,7,3];
const max = 12;
generating_sorted(make_histogram(unsorted, max));
