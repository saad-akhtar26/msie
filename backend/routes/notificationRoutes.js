const express = require('express');
const router = express.Router();
const {
	readNotifications,
	markAllRead,
	deleteNotification,
} = require('../controllers/notificationController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
	.get(protect, readNotifications);

router.route('/')
	.patch(protect, markAllRead);

router.route('/:id')
	.delete(protect, deleteNotification);

module.exports = router;
