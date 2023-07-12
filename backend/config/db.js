const mongoose = require("mongoose");

const connection = mongoose.connect('mongodb+srv://manutyagi9991:1999igaytunam@live-chatting-app.uz6cdjp.mongodb.net/chat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { connection }
