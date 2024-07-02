const asyncHandler = require('express-async-handler')
const Equipment = require('../models/equipmentModel')
const Notification = require('../models/notificationModel')
const moment = require('moment');

const readNotifications = asyncHandler(async (req, res) => {
	try {

		// Query for equipments that belong to the user with next_date before today
		const equipments = await Equipment.find({ 
			next_date: { $lte: moment().format('YYYY-MM-DD') },
			user: req.user.id 
		})
		
		for (const equipment of equipments) {

			const nextNotificationDate = calculateNextNotificationDate(equipment.next_date, equipment.repeat_type);
			
			if(moment().isSame(nextNotificationDate, 'day')) {
				
				// Change new notification date in MongoDB equipments collection
				await Equipment.findByIdAndUpdate(
					equipment._id,
					{ next_date: nextNotificationDate }
				)
	
				// Create notification entry in MongoDB notifications collection
				await Notification.create({
					user: req.user.id,
					equip: equipment._id,
					text: `${equipment.repeat_type} Maintenance required for ${equipment.equip_name} on ${nextNotificationDate}`,
				});
			}
		}

		// Check for notifications
		const notifications = await Notification.find({ 
			user: req.user.id,
			status: 'UNREAD',
		})

		res.status(200).json(notifications)

	} catch (error) {
		if(error.code !== 11000){
			console.error('Error during login:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	}
})

const deleteNotification = asyncHandler(async (req, res) => {

	await Notification.findByIdAndUpdate(
		req.params.id, 
		{ status: 'READ' }
	)

	res.status(200).json({ message: 'Notification READ' })
})

// Function to calculate next notification date for different repeat types
function calculateNextNotificationDate(lastNotificationDate, repeatType) {
	const currentDate = moment().startOf('day');
	let nextNotificationDate = lastNotificationDate;
  
	// Calculate iterative next notification date based on repeat type
	switch (repeatType) {
		case 'Daily':
			while (moment(nextNotificationDate).isBefore(currentDate, 'day')) {
				nextNotificationDate = moment(nextNotificationDate).add(1, 'day');
			}
		break;
		case 'Weekly':
			while (moment(nextNotificationDate).isBefore(currentDate, 'day')) {
				nextNotificationDate = moment(nextNotificationDate).add(1, 'week');
			}
		break;
		case 'Fortnightly':
			while (moment(nextNotificationDate).isBefore(currentDate, 'day')) {
				nextNotificationDate = moment(nextNotificationDate).add(2, 'weeks');
			}
		break;
		case 'Monthly':
			while (moment(nextNotificationDate).isBefore(currentDate, 'day')) {
				nextNotificationDate = moment(nextNotificationDate).add(1, 'month');
			}
		break;
		case 'Quarterly':
			while (moment(nextNotificationDate).isBefore(currentDate, 'day')) {
				nextNotificationDate = moment(nextNotificationDate).add(3, 'months');
			}
		break;
		case 'Bi-Annually':
			while (moment(nextNotificationDate).isBefore(currentDate, 'day')) {
				nextNotificationDate = moment(nextNotificationDate).add(6, 'months');
			}
		break;
		case 'Annually':
			while (moment(nextNotificationDate).isBefore(currentDate, 'day')) {
				nextNotificationDate = moment(nextNotificationDate).add(1, 'year');
			}
		break;
		default:
			throw new Error('Invalid repeat type');
	}
  
	return moment(nextNotificationDate).format('YYYY-MM-DDT00:00:00.000+00:00');
}

module.exports = {
  readNotifications,
  deleteNotification,
}
