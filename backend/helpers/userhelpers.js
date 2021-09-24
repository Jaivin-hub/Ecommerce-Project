var db = require('../config/connection')

module.exports = {

    addUser: (user) => {
        console.log('this is helpers')
        console.log(user)

        db.get().collection('usermanagement').insertOne(user).then(() => {
            console.log('success')
        })
    },

    fetchUser: () => {
        console.log('i am going to fetch data');
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').find().toArray().then((res) => {
                console.log(res)
                resolve(res)
            }).catch((err) => {
                console.log(err)
            })
        })

    }
}