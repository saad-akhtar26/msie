const express = require('express');
const router = express.Router();
const {
	readNotifications,
	deleteNotification,
} = require('../controllers/notificationController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
	.get(protect, readNotifications);

router.route('/:id')
	.delete(protect, deleteNotification);

module.exports = router;
