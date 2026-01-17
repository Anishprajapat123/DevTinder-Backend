const mongoose = require("mongoose")

const connectDB = async ()=>{

mongoose.connect(
    "mongodb+srv://anishprajapat924:NDV0Lk67o9brreUg@cluster0.pqidz.mongodb.net/devtinder"
);
};

module.exports={ connectDB, };

