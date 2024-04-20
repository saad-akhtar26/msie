const express = require('express');
const router = express.Router();
const {
	getCompanies,
	setCompany,
	changePkg,
	deleteCompany,
} = require('../controllers/companyController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
	.get(protect, getCompanies)
	.post(protect, setCompany)
	.patch(protect, changePkg);

router.route('/:id')
	.delete(protect, deleteCompany)

module.exports = router;
