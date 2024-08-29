const mongoose=require("mongoose");



const connection=mongoose.connect('mongodb+srv://raghuwansh:singh@cluster0.ux37wqw.mongodb.net/InstaMasai?retryWrites=true&w=majority')

module.exports={
    connection
} 