

export enum errorValues {
    // User Validations
    FIRSTNAME_VALIDATION = "Firstname Cannot be null",
    LASTNAME_VALIDATION = "Lastname Cannot be null",
    PASSOWRD_VALIDATION = "Password Cannot be null",
    EMAIL_BLANK_VALIDATION = "Email Cannot be null",
    EMAIL_EXITS_VALIDATION = "Email Already Exists",
    INVALID_MAIL_ID = "Invalid Mail ID",
    INVALID_PASSWORD = "Invalid Password",

    SIGNUP_ERROR = "Error While SignUp the User",
    LOGIN_ERROR = "Error While Login",

    // Project Validations
    NAME_VALIDAION = "Name Cannot be Blank",
    NAME_ALREADY_EXISTS = "Given Project Name already exists",
    COMPARE_VALIDATION = "No Previous Verions to Compare",

    PROJECT_CREATION_ERROR = "Error while creating the project",
    PROJECT_LISTING_ERROR = "Error while listing the projects",
    FILES_LISTING_ERROR = "Error while listing the files",
    FILES_COMPARE_ERROR = "Error while comparing the files",
    UPLOAD_ERROR = "Error while Uploading the file",
}