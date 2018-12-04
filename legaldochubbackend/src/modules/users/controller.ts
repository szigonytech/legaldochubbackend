import { RequestHandler } from "../common/request-handler";
import { errorValues } from "../../constants/errorValues";
import UserService from "./service";



export default new class UserController {

    signUp = async (handler: RequestHandler) => {
        try {
            handler.validate("firstname", errorValues.FIRSTNAME_VALIDATION).notEmpty();
            handler.validate("lastname", errorValues.LASTNAME_VALIDATION).notEmpty();
            handler.validate("email", errorValues.EMAIL_BLANK_VALIDATION).notEmpty();
            handler.validate("password", errorValues.PASSOWRD_VALIDATION).notEmpty();
            if (!await handler.performValidation()) {
                return;
            }
            const resp = await new UserService().signUp(handler.getBody());
            return handler.handleCreatedResponse(resp);
        } catch (error) {
            return handler.sendServerError({
                message: errorValues.SIGNUP_ERROR,
                error: error
            });
        }
    }

    login = async (handler: RequestHandler) => {
        try {
            handler.validate("email", errorValues.EMAIL_BLANK_VALIDATION).notEmpty();
            handler.validate("password", errorValues.PASSOWRD_VALIDATION).notEmpty();
            if (!await handler.performValidation()) {
                return;
            }
            const resp = await new UserService().login(handler.getBody());
            return handler.handleResponse(resp);
        } catch (error) {
            return handler.sendServerError({
                message: errorValues.LOGIN_ERROR,
                error: error
            });
        }
    }
}();