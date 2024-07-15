import mongoose, { Mongoose } from "mongoose";

export const connect = async() => {
    try{    
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => console.log('Database connected'));
        connection.on('error', (err) => console.log(err ?? 'Error connecting to database'));
    }
    catch(error){
        console.log(error ?? 'error in database connection');
    }
}