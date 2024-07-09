const express = require('express');
const {allUsers, sendRequest} = require('../controller/User');
const router = express.Router();

router.get('/:userId', allUsers);
router.post('/request', sendRequest);
module.exports = router; // Ensure you export the router correctly
