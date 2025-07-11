import express from 'express'
import middleware from '../middleware/middleware.js'
import Note from '../models/Note.js';


const router = express.Router()

router.post('/add',middleware,async (req,res) => {
  try{

 const { title,description} = req.body;


const newNote = new Note({
   title,
   description,
   userId: req.user.id
})

await newNote.save();

  return res
  .status(200)
  .json( {success: true,message:"Note Created Successfully"} );

}catch(error){
        console.error(error); // Log the error for debugging
        return res.status(500).json({success:false , message:"Error Adding User", error: error.message})
    }
})

router.get('/' , async (res,req) => {
try{

const notes = await Note.find()
return res.status(200) .json({ success : true,notes})


}
catch{

  return res.status(500) .json({success:false,message:"cant retrive notes"})
}



}
)
export default router;