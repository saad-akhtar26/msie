const asyncHandler = require('express-async-handler')
const moment = require('moment')
const Equipment = require('../models/equipmentModel')
const Notification = require('../models/notificationModel')

// @desc    Get equipments
// @route   GET /api/equipments
// @access  Private
const getEquipments = asyncHandler(async (req, res) => {
  const equipments = await Equipment.find({ user: req.user.id })

  res.status(200).json(equipments)
})

// @desc    Set equipment
// @route   POST /api/equipments
// @access  Private
const addEquipment = asyncHandler(async (req, res) => {
	try {

		const { equip_name, item_id, repeat_type/* , added_on, next_date */ } = req.body;
	
		if (!equip_name || !item_id || !repeat_type /* || !added_on || !next_date */) {
			res.status(400)
			throw new Error('Please fill all the fields')
		}
	
		req.body.added_on = moment().format('YYYY-MM-DD')
		req.body.next_date = calculateNextDate(req.body.added_on, repeat_type)
		const newEquipment = await Equipment.create({
			...req.body,
			user: req.user.id,
		})
	
		// if(moment().isSame(req.body.added_on, 'day')) {
		// Create notification entry in MongoDB notifications collection
		const test = await Notification.create({
			user: req.user.id,
			equip: newEquipment._id,
			text: `${newEquipment.repeat_type} Maintenance required for ${newEquipment.equip_name} on ${req.body.added_on}`,
		});
		// }
	
		res.status(200).json(newEquipment)

	} catch (err) {
		console.error("Error: ", err);
		res.status(400).json({ "message": "Please add number in item code" })
	}
})

// Function to calculate next notification date for different repeat types
function calculateNextDate(start_date, repeat_type) {
	let next_date;
  
	// Calculate iterative next notification date based on repeat type
	switch (repeat_type) {
		case 'Daily':
			next_date = moment(start_date).add(1, 'day');
		break;
		case 'Weekly':
			next_date = moment(start_date).add(1, 'week');
		break;
		case 'Fortnightly':
			next_date = moment(start_date).add(2, 'weeks');
		break;
		case 'Monthly':
			next_date = moment(start_date).add(1, 'month');
		break;
		case 'Quarterly':
			next_date = moment(start_date).add(3, 'months');
		break;
		case 'Bi-Annually':
			next_date = moment(start_date).add(6, 'months');
		break;
		case 'Annually':
			next_date = moment(start_date).add(1, 'year');
		break;
		default:
			throw new Error('Invalid repeat type');
	}
  
	return moment(next_date).format('YYYY-MM-DDT00:00:00.000+00:00');
}

// @desc    Update equipment
// @route   PUT /api/equipments/:id
// @access  Private
const updateEquipment = asyncHandler(async (req, res) => {

	const equipment = await Equipment.findById(req.params.id)

	if (!equipment) {
		res.status(400)
		throw new Error('Equipment not found')
	}

	// Check for user
	if (!req.user) {
		res.status(401)
		throw new Error('User not found')
	}

	// Make sure the logged in user matches the equipment user
	if (equipment.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	req.body.added_on = moment().format('YYYY-MM-DD')
	req.body.next_date = calculateNextDate(req.body.added_on, req.body.repeat_type)

	await Equipment.findByIdAndUpdate(
		req.params.id,
		req.body
	)

	// Also delete relevant Notifications
	await Notification.deleteMany({ user: req.user.id, equip: req.params.id })

	// Create New Today Notification
	const test = await Notification.create({
		user: req.user.id,
		equip: req.params.id,
		text: `${req.body.repeat_type} Maintenance required for ${req.body.equip_name} on ${req.body.added_on}`,
	});

	res.status(200).json({ message: 'Equipment updated successfully' })
})

// @desc    Delete equipment
// @route   DELETE /api/equipments/:id
// @access  Private
const deleteEquipment = asyncHandler(async (req, res) => {
	try {

		const equipment = await Equipment.findByIdAndDelete(req.params.id)

		// Also delete relevant Notifications
		await Notification.deleteMany({ user: req.user.id, equip: req.params.id })
		
		if (!equipment) {
			res.status(400)
			throw new Error('Equipment not found')
		}

		// Check for user
		if (!req.user) {
			res.status(401)
			throw new Error('User not found')
		}

		// Make sure the logged in user matches the equipment user
		if (equipment.user.toString() !== req.user.id) {
			res.status(401)
			throw new Error('User not authorized')
		}

		res.status(200).json({ message: 'Equipment Deleted Successfully' })

	} catch (error) {
		console.error("Error: ", error);
	}
})

module.exports = {
  getEquipments,
  addEquipment,
  updateEquipment,
  deleteEquipment,
}
