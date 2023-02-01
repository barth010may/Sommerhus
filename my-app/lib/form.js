

export function validate({ firstName, lastName, setIsValidFirst, setIsValidLast}) {
    
    // do some validation

    if ( 
        firstName.length < 2 ||
        lastName.length < 2 ||
        firstName.length > 20 ||
        lastName.length > 20) 
    {
        setIsValidFirst(false);
        setIsValidLast(false);
        return false;
    }
    else {
        setIsValidFirst(true);
        setIsValidLast(true);
        return true;
    }
}
