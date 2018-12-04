import * as bcrypt from "bcrypt";
import UserRepo from "./repo";
import { errorValues } from "../../constants/errorValues";
import { uuid } from "../common/uuid";
import _ = require("lodash");
const SALT_ROUNDS = 10;

export default class UserService {

    signUp = async (data: any) => {
        try {
            const resp = {error: false, errorText: "", values: {}};
            const repo = new UserRepo();
            const user = await repo.findUser(data.email);
            if (user) {
                return {...resp, error: true, errorText: errorValues.EMAIL_EXITS_VALIDATION};
            }
            else {
                const values = await repo.createUser(
                    {
                        ...data,
                        password: await this.hashPassword(data.password),
                        token: uuid()
                    }
                );
                return {...resp, values};
            }
        } catch (error) {
            throw error;
        }
    }

    login = async (data: any) => {
        try {
            const resp = {error: false, errorText: "", values: {}};
            const repo = new UserRepo();
            const user = await repo.findUser(data.email);
            if (!user)
                return {...resp, error: true, errorText: errorValues.INVALID_MAIL_ID};
            else if (!bcrypt.compareSync(data.password, user.password))
                return {...resp, error: true, errorText: errorValues.INVALID_PASSWORD};
            else
                return {...resp, values: _.omit(user.toJSON(), ["password", "createdAt", "updatedAt"])};
        } catch (error) {
            throw error;
        }
    }

    hashPassword = (plainTextPassword: string) => {
        return bcrypt.hash(plainTextPassword, SALT_ROUNDS)
            .then((hash: string) => {
                return hash;
            });
    }
}