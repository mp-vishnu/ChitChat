const User = require('../models/user');

exports.allUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('userId <><<>> ', userId);
    const users = await User.find({_id: {$ne: userId}});
    console.log('users <><><> ', users);
    res.json(users);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.sendRequest = async (req, res) => {
  const {senderId, receiverId, message} = req.body;

  console.log(senderId);
  console.log(receiverId);
  console.log(message);

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({message: 'Receiver not found'});
  }

  receiver.requests.push({from: senderId, message});
  await receiver.save();

  res.status(200).json({message: 'Request sent succesfully'});
};
