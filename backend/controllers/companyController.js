const asyncHandler = require('express-async-handler')

const Company = require('../models/companyModel')
const Equipment = require('../models/equipmentModel')
const User = require('../models/userModel')

// @desc    Get companies
// @route   GET /api/companies
// @access  Private
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({ user: req.user.id })

  res.status(200).json(companies)
})

// @desc    Set goal
// @route   POST /api/companies
// @access  Private
const setCompany = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Company.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/companies/:id
// @access  Private
const changePkg = asyncHandler (async (req, res) => {
	const { package_name, limit } = req.body

	// Verify Is Admin
	if (req.user.is_admin === false) {
		res.status(401)
		throw new Error('User not authorized')
	}

	// find User and update
	const company = await Company
		.findOneAndUpdate(
			{ user: req.query.user_id },
			{ package_name, limit }
		)

	if(company){
		res.status(200)
			.json({ message: 'Package changed successfully' });
	}
})

// @desc    Delete company
// @route   DELETE /api/companies/:id
// @access  Private
const deleteCompany = asyncHandler(async (req, res) => {

	const company = await Company.deleteOne({ user: req.params.id })
	const equipments = await Equipment.deleteMany({ user: req.params.id })
	const user = await User.findByIdAndDelete(req.params.id)

  if (!company) {
		res.status(400)
		throw new Error('Company not found')
	}

	// Check for user
	if (!req.user) {
		res.status(401)
		throw new Error('User not found')
	}

	// Make sure the logged in user is admin
	if (req.user.is_admin === false) {
		res.status(401)
		throw new Error('User not authorized')
	}

	res.status(200).json({ message: 'Company and Equipments data Deleted Successfully' })
})

module.exports = {
  getCompanies,
  setCompany,
  deleteCompany,
  changePkg,
}
