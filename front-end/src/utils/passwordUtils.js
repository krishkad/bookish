

export const isStrongPassword  = (password) => {
    const passwordNeeds = {
        minLength: 5,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const isStrong = 
    password.length >= passwordNeeds.minLength &&
    passwordNeeds.hasUpperCase &&
    passwordNeeds.hasLowerCase &&
    passwordNeeds.hasNumber &&
    passwordNeeds.hasSpecialChar;

    return {
        isStrong,
        passwordNeeds
    }
}


