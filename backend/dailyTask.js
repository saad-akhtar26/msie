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
  
	// Check if today is a notification day
	const isTodayNotificationDay = currentDate.isSame(nextNotificationDate, 'day');
  
	return { nextNotificationDate, isTodayNotificationDay };
}
