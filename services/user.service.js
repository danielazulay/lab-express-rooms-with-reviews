const bcrypt =require("bcryptjs");

const jwt = require('jsonwebtoken');
const UserModel = require('../modules/User.model');



class UserService{
    cosntructor(user){
        this.name = user.name;
        this.email = user.email;
        this.password = user.password
    }

    isValid(field,validationregex){
        //validar o email e a senha
        if(!field|| !field.match(validationRegex)){
            return false
        }
        return false
    }

    async getUserEmail(email){
        const user = await UserModel.finOne({email:email})
        return user
    }

    async userExists(email){
        const user = await this.getUserByEmail(email)
        if(user){
            return true
        }
        return false
    }

    hashPassword(plainTextPassword){
        const saltRound = 10
        const salt = bcrypt.genSaltSync(saltRound)
        console.log(salt);
        const hashedPassword = bcrypt.hashSync(plainPassword,salt);
        return hashedPassword 
    }
    async createuser(){
        return UserModel.create({
            name:this.name,
            email:this.email,
            passwordHash:this.hashedPassword(this.password),
//nao entendi pq que tem fazer o then
        }).then((insertResult) => insertResult)
    }

    //nao tem que passar parametro do user do login?
    async login(){
        const user = await this.getUserByemail(this.email)

        if(!user){
            throw new error('usurio nao cadastrada')
        }
        if(bcrypt.comapreSync(this.password,user.passwordHash)){
            const token = this.generateToken(user)
            return {token:token,user:user}
        }
        return false
    }

    generateToken(user){
        const signSecret = process.env.TOKEN_SIGN_SECRET

        delete user.passwordHash
        const token =  jwt.sign(user.toJson(),signSecret,{expiresIn:'6h'})
        return token
    }
}
module.exports = UserService