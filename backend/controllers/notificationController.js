const asyncHandler = require('express-async-handler')
const Equipment = require('../models/equipmentModel')
const Notification = require('../models/notificationModel')
const moment = require('moment');

const readNotifications = asyncHandler(async (req, res) => {
	try {

		// Query for equipment entities that belong to the user and are today and have no notification
		const equipments = await Equipment.aggregate([
			{
				$lookup: {
					from: 'notifications',
					localField: '_id',
					foreignField: 'equip',
					as: 'notifications'
				}
			},
			{
				$match: {
					user: req.user._id,
					notifications: { $eq: [] }, // Filter out documents with notifications
					next_date: {
						$gte: moment().startOf('day').toDate(), 
						$lte: moment().endOf('day').toDate()
					},
				}
			}
		]);
		console.log('equipment: ', equipments);
		
		for (const equipment of equipments) {
			// Create notification entry in MongoDB notifications collection
			await Notification.create({
				user: req.user.id,
				equip: equipment._id,
				text: `${equipment.repeat_type} Maintenance required for ${equipment.equip_name} on ${moment().format('YYYY-MM-DD')}`,
			});
			
			const nextNotificationDate = calculateNextNotificationDate(equipment.added_on, equipment.next_date, equipment.repeat_type);
			console.log('next date: ', nextNotificationDate);

			// Change new notification date in MongoDB equipments collection
			await Equipment.findByIdAndUpdate(
				equipment._id,
				{
					added_on: moment().format('YYYY-MM-DDT00:00:00.000+00:00'), 
					next_date: nextNotificationDate 
				}
			)

		}

	// Check for notifications
	const notifications = await Notification
		.find({ 
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
function calculateNextNotificationDate(addedOn, lastNotificationDate, repeatType) {
	const currentDate = moment().startOf('day');
	const addedDate = moment(addedOn).startOf('day');
	const lastNotification = lastNotificationDate ? moment(lastNotificationDate).startOf('day') : addedDate;
  
	let nextNotificationDate;
  
	// Calculate next notification date based on repeat type
	switch (repeatType) {
		case 'Daily':
			nextNotificationDate = moment(lastNotification).add(1, 'day');
		break;
		case 'Weekly':
			nextNotificationDate = moment(lastNotification).add(1, 'week');
		break;
		case 'Fortnightly':
			nextNotificationDate = moment(lastNotification).add(2, 'weeks');
		break;
		case 'Monthly':
			nextNotificationDate = moment(lastNotification).add(1, 'month');
		break;
		case 'Quarterly':
			nextNotificationDate = moment(lastNotification).add(3, 'months');
		break;
		case 'Bi-Annually':
			nextNotificationDate = moment(lastNotification).add(6, 'months');
		break;
		case 'Annually':
			nextNotificationDate = moment(lastNotification).add(1, 'year');
		break;
		default:
			throw new Error('Invalid repeat type');
	}
  
	return nextNotificationDate.format('YYYY-MM-DDT00:00:00.000+00:00');
}


module.exports = {
  readNotifications,
  deleteNotification,
}
