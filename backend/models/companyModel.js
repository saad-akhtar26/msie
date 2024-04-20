const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please specify a relevant User'],
      ref: 'User',
    },
    company_name: {
      type: String,
      required: [true, 'Please specify a company name'],
    },
    industry: {
      type: String,
      required: [true, 'Please specify an industry'],
    },
    total_equipments: {
      type: Number,
      required: [true, 'Please specify total equipments'],
      default: 0
    },
    phone: {
      type: String,
      required: [true, 'Please specify a phone number'],
    },
    reg_num: {
      type: String,
      required: [true, 'Please specify a registration number'],
    },
    address: {
      type: String,
      required: [true, 'Please specify an address'],
    },
    package_name: {
      type: String,
      required: [true, 'Please specify a package'],
    },
    limit: {
      type: Number,
      required: [true, 'Please specify a package limit'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Company', companySchema)
