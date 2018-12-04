import Users from "./models/Users";



export default class UserRepo {
    findUser = (email: string) => {
        return Users.find<Users>({where: {email}})
        .then(res => res)
        .catch(error => { throw error; });
    }

    createUser = (data: any) => {
        return Users.create(data, {returning: true})
        .then(res => res)
        .catch(error => { throw error; });
    }

    findUserByToken = (token: string) => {
        return Users.find<Users>({where: {token}})
        .then(res => res)
        .catch(error => { throw error; });
    }
}