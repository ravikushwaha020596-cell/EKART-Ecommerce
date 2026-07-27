import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/EKART-RAVI`)
        console.log('MongoDB connect Successfully');
    } catch (error) {
        console.log("MongoDB connection failed:", error);
    }
}

export default connectDB