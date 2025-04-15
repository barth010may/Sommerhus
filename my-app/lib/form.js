export function validate({ firstName, lastName, setIsValidFirst, setIsValidLast }) {
    // Validate firstName
    if (firstName.length > 2 || firstName.length < 20) {
        setIsValidFirst(false);
    } else {
        setIsValidFirst(true);
    }

    // Validate lastName
    if (lastName.length > 2 || lastName.length < 20) {
        setIsValidLast(false);
    } else {
        setIsValidLast(true);
    }

    // Return true only if both fields are valid
    return firstName.length >= 2 && firstName.length <= 20 &&
           lastName.length >= 2 && lastName.length <= 20;
}
