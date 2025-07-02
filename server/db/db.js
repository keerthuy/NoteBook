 import mongoose, { connect }  from "mongoose";
  const connectToMongoDB = async () => {
    try{

        await mongoose.connect("");
        console.log("Connected to mongoDB");
    }catch(error){
       console.log("Error connecting to mongoDB:", error.message);
    }
  };

  export default connectToMongoDB;