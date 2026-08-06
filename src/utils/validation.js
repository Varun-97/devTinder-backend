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

const validateEditProfileData = (req) => {
    const allowedEditFields = ['age', 'gender', 'photoUrl', 'about', 'skill']
    const reqFields = Object.keys(req.body)
    const isAllowed = reqFields.every((field) => allowedEditFields.includes(field))
    return isAllowed ? true : false
}

const validatePasswordStrong = (password) => {
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong")
    }
    return true
}

export { validateSignupData, validateEditProfileData, validatePasswordStrong }