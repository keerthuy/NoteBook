import express from 'express'
import Note from '../models/Note';


const router = express.Router()

router.post('/add',async (req,res) => {
  try{

 const { title,description} = req.body;
 const user = await User.findOne({email})

const newNote = new Note({
   title,
   description,
})

await newUser.save()

return res.status(200).json({success:true , message:"Account Created Successfully"})
    }catch(error){
        console.error(error); // Log the error for debugging
        return res.status(500).json({success:false , message:"Error Adding User", error: error.message})
    }
})


export default router;