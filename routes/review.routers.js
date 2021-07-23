
const express = require("express")
const ReviewsModel = require("../modules/Review.model")
const RoomModel = require("../modules/Room.model")
const router = express.Router();
const isAuthtenticated = require('../middlewares/isAuthenticated')


router.use(express.json())

///room

router.post("/newroom",async(req,res)=>{
    try{
    const formData = req.body

    const addRoom = await RoomModel.create(formData)
    return res.status(200).json(addRoom)
    }catch(err){
        return res.status(500).json({msg:err})
    }
})


router.put("/editroom/:id",async(req,res,next)=>{

    try{

const formData = req.body
const id = req.params.id

const idroom =await RoomModel.findOne({_id:id})
const updateroom = await RoomModel.findOneAndUpdate({_id:idroom},{$set:{...formData}}, { new: true, runValidators: true } );
return res.status(200).json(updateroom) 

}catch(err){
        next(err)
    }
})



router.delete("/deleteroom/:id",async(req,res,next)=>{
    try{
const id = req.params.id

const deleteRoom = await RoomModel.deleteOne({_id:id})


if(deleteRoom.n===0){
    return res.status(404).json({msg:"error"})
}

return res.status(200).json({});

    }catch(err){next()}
})

router.get("/all",async(req,res,next)=>{
    try{
        
        const all = await RoomModel.find().populate('review')
    
        return res.status(200).json(all)
    }catch(err){
    console.log(err)
    }
    })


    ///review

router.post("/newreview/:id",async(req,res)=>{
    try{
    const formData = req.body
    const id = req.params.id
    console.log(req.body)

    const newrev = await ReviewsModel.create({comment: formData.comment,roomId:id})

    const roomreview = await RoomModel.findOneAndUpdate({_id:id},{$push:{reviews:newrev._id}} );

    return res.status(200).json(newrev)

    }catch(err){
        return res.status(500).json({msg:err})
    }
})


router.put("/editreviews/:id",async(req,res)=>{
    try{

       const {id} = req.params
       const formData = req.body

       const reviewId = await ReviewsModel.findOneAndUpdate({_id:id},{$set:{...formData}}, { new: true, runValidators: true } )

      return res.status(200).json(reviewId)

    }catch(err){
        return res.status(500).json({msg:err})
    }
})

router.delete("/deletereview/:id",async(req,res)=>{
    try{
        const id = req.params.id
const deletreview = await ReviewsModel.deleteOne({_id:id})



if(deletreview.n===0){
    return res.status(404).json({msg:"error"})
}

return res.status(200).json(deletreview)
    }
    catch(err){
        return res.status(500).json({msg:err})}
})

router.get("/allreview",async(req,res)=>{
    try{
        const {id} = req.params
           
           
           const allreviews = await ReviewsModel.find()
           return res.status(200).json(allreviews)
    }catch(err){
        return res.status(500).json({msg:err})}
    
})





module.exports = router