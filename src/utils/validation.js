import validator from 'validator'

const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName) {
        throw new Error("First name and last name are required")
    }
    else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('please enter strong password with length between 6')
    }

}

export { validateSignupData }