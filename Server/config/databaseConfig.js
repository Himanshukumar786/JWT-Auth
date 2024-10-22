import mongoose from "mongoose";

const DB_URL = "mongodb://localhost:27017/jwtauth";

// Connect to the database
const connectDatabase = () => {
  mongoose
    .connect(DB_URL)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.log("ERROR While connecting to DB",err.message)
    })
};

export default connectDatabase;
