const messageModel = require('../model/messageModel')

module.exports.addMessage = async (req, res, next) => {
    try{
        const {to, from, message} = req.body;
        const data = await messageModel.create({
            message : {
                text : message
            },
            users : [from, to],
            sender : from,
        });
        if(data) return res.json({message : "Message added successfully!", status : true});
        else return res.json({message : "Couldn't add message!", status : false})
    }catch(ex){
        next(ex);
    }
};
module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await Messages.find({
            users: {
            $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
}