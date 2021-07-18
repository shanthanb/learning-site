const NameValidation = (name) => {
    if(name === ""){
        return "Please Enter Details";
    }
    for(let i=0;i<name.length;i++){
        if(name[i] >= '0' && name[i] <='9'){ return "Invalid Username!";}
        if(name[i] === '!' || name[i] === '@' || name[i] === '#' || name[i] === '$' || name[i] === '%'){
            return "Invalid Username!";
        }
    }
    return "";
}

export default NameValidation;