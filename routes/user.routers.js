const router = require("express").Router()
const bcrypt =require("bcryptjs");
const UserService = require("../services/user.service");

const isAuthenticated = require("../middlewares/isAuthenticated");


router.post('/signup',async(rq,res,next)=>{
    try{
const userService = new  UserSerice(req.body)
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;


  if(!userService.isValid(userService.email,emailRegex)){
      return res.status(400).json({error:'O campo email e obrigatorio e deve ser um email valido'})
  }

  if(!userService.isValid(userService.password,passwordRegex)){
      return res.status(400).json({error:"o campo senha e obrigatorio e precisa no minimo 8 caracters"})
  }
  if(await userService.userExist(userService.email)){
      return res.status(400).json({
          erro:'este ja esta cadastrado'
      })
  }
// o que faz insertResult
  const insertResult = await await userService.createUser();

  return res.status(201).json(insertResult)

    }catch(err){
        next(err)
    }
})
//nao entendi
router.get('/profile',isAuthenticated,async(req,res,next)=>{
    try{
        return res.status(200).json(req.user)
    }catch(err){
        next(err)
    }
})

module.exports = router