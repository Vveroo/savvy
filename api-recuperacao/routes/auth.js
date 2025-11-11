const express = require('express');
const router = express.Router();
const { sendResetCode, resetPassword } = require('../controllers/authController');

router.post('/send-reset-code', sendResetCode);
router.post('/reset-password', resetPassword);

module.exports = router;
