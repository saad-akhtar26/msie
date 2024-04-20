const asyncHandler = require('express-async-handler')

const Equipment = require('../models/equipmentModel')

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

	const { equip_name, item_id, repeat_type, added_on, next_date } = req.body;

	if (!equip_name || !item_id || !repeat_type || !added_on || !next_date) {
		res.status(400)
		throw new Error('Please fill all the fields')
	}

	const newEquipment = await Equipment.create({
		...req.body,
		user: req.user.id,
	})

	res.status(200).json(newEquipment)
})

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

	const updatedEquipment = await Equipment
		.findByIdAndUpdate(
			req.params.id, 
			req.body
		)

	res.status(200).json({ message: 'Equipment updated successfully' })
})

// @desc    Delete equipment
// @route   DELETE /api/equipments/:id
// @access  Private
const deleteEquipment = asyncHandler(async (req, res) => {

	const equipment = await Equipment.findByIdAndDelete(req.params.id)

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
})

module.exports = {
  getEquipments,
  addEquipment,
  updateEquipment,
  deleteEquipment,
}
