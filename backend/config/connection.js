const mongoClient = require('mongodb').MongoClient
const state={
    db:null
}

module.exports.connect=(done)=>{
    // const url="mongodb://localhost:27017"
        const url="mongodb+srv://jaivin:1234@cluster0.oa7gp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const dbname="project"

    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        done()
    })
}


module.exports.get=()=>{
    return state.db
}