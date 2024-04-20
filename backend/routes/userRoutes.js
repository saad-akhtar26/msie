const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getList,
  changePass,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/', protect, getList)
router.patch('/changepass', protect, changePass)

module.exports = router
