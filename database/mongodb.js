import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


if (!DB_URI) {
    throw new Error("DB URI is not defines in environment variables");
}


const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log("connected to DB");
    }

    catch (error) {
        console.log(encodeURIComponent('nischay@3903'));
        console.error("error connecting to database", error);
        process.exit(1);
    }
}

export default connectToDatabase;