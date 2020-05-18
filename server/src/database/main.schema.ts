module.exports = {
    //* Economy Schema
    //*________________
    Posts: require('mongoose').model("posts", require('mongoose').Schema({

        _id: String,
        text: String,
        createdAt: Date,
        edited: Boolean
    }))
}