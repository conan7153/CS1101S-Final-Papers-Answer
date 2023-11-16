function similar(tn1, tn2){
    if(is_null(tn1) && is_null(tn2)){
        return true;
    }else if(is_null(tn1) || is_null(tn2)){
        return false;
    }else if(is_number(head(tn1)) && is_number(head(tn2))){
        return (head(tn1) === head(tn2)
        || math_abs(head(tn1) - head(tn2)) === 1)
        && similar(tail(tn1), tail(tn2));
    }else if(is_list(head(tn1)) && is_list(head(tn2))){
        return similar(head(tn1), head(tn2))
        && similar(tail(tn1), tail(tn2));
    }else{
        return false;
    }
}

const a = list(4, 1, list(5,5));
const b = list(5, 1, list(4,8));
similar(a,b);