 import mongoose, { connect }  from "mongoose";
  const connectToMongoDB = async () => {
    try{

        await mongoose.connect("mongodb+srv://keerththanango111:Admin@cluster0.hoistvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to mongoDB");
    }catch(error){
       console.log("Error connecting to mongoDB:", error.message);
    }
  };

  export default connectToMongoDB;