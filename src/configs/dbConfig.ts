import mongoose from 'mongoose';


const db = async() =>{
    const db_url = process.env.DB_URL as string;
    try {
        await mongoose.connect(db_url).then(() =>{
            console.log('Db is successfully connected!!')
        })
    } catch (error) {
        console.error(error)
    }
}

export default db