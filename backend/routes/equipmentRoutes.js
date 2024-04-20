const express = require('express');
const router = express.Router();
const {
	// getGoals,
	addEquipment,
	updateEquipment,
	deleteEquipment,
} = require('../controllers/equipmentController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
// 	.get(protect, getGoals)
	.post(protect, addEquipment);

router.route('/:id')
	.delete(protect, deleteEquipment)
	.patch(protect, updateEquipment);

module.exports = router;
