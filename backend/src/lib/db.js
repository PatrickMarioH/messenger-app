import mongoose from "mongoose";

export const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongDB Connected: " + conn.connection.host);

    }

    catch (error) {

        console.log("MongDB Connection Error: ", error);

    }

};