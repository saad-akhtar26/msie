const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Company = require('../models/companyModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

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

	const { company_name, owner_name, industry, reg_num, address, phone, email, password, package, limit } = req.body

	if (!company_name || !owner_name || !industry || !reg_num || !address || !phone || !email || !password || !package || !limit) {
		res.status(400)
		throw new Error('Please add all fields')
	}

	// Check if user exists
	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// Create user
	const user = await User.create({
		name: owner_name,
		email,
		password: hashedPassword,
	})

	if (user) {

		// Create Company
		const company = await Company.create({
			user: user.id,
			company_name,
			industry,
			phone,
			reg_num,
			address,
			package_name: package,
			limit,
		});

		if(company){
			res.status(201).json({ message: 'User Added Successfully' })
		}

	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      is_admin: user.is_admin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
	let user = await User
		.aggregate()
		.match({
			email: req.user.email
		})
		.project({
			password: false
		})
		.lookup({
			as: 'companies', 
			from: 'companies', 
			foreignField: 'user', 
			localField: '_id'
		})
		.lookup({
			as: 'equipments',
			from: 'equipments',
			foreignField: 'user',
			localField: '_id'
		});

	res.status(200).json(user[0]);
})

const getList = asyncHandler(async (req, res) => {
	if(req.user.is_admin === true){
		try {
			let user = await User
				.aggregate()
				.match({
					is_admin: false
				})
				.project({
					password: false
				})
				.lookup({
					as: 'companies', 
					from: 'companies', 
					foreignField: 'user', 
					localField: '_id'
				})
				.lookup({
					as: 'equipments',
					from: 'equipments',
					foreignField: 'user',
					localField: '_id'
				});

			res.status(200).json(user);
		} catch (error) {
			res.status(401);
			throw new Error('Not Authorized');
		}
	}
	else{
		res.status(401);
		throw new Error('Not Authorized');
	}
})

const changePass = asyncHandler (async (req, res) => {
	const { oldPass, newPass } = req.body

	// verify oldPass for user.email
	const user = await User
		.findOne({ email: req.user.email })
		.select('password');

	// user exists and old password is valid
	if (user && (await bcrypt.compare(oldPass, user.password)) === true) {
		// Hash password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(newPass, salt)
		
		const user = await User
			.findOneAndUpdate(
				{ email: req.user.email },
				{ password: hashedPassword }
			)
			.select('-password');

		if(user){
			res.status(200)
				.json({ message: 'Password changed successfully' });
		}
	} else {
		res.status(400)
		throw new Error('Invalid credentials')
	}
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getList,
  changePass,
}
