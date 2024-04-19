const mongoose = require('mongoose')

const equipmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please specify a relevant company'],
      ref: 'User',
    },
    item_id: {
      type: String,
      required: [true, 'Please specify a company name'],
    },
    equip_name: {
      type: String,
      required: [true, 'Please specify an industry'],
    },
    repeat_type: {
      type: Number,
      required: [true, 'Please specify total equipments'],
      default: 0
    },
    added_on: {
      type: Date,
      required: [true, 'Please specify an added date']
    },
    next_date: {
      type: Date,
      required: [true, 'Please specify a next date'],
    },
  },
  {
    timestamps: false,
  }
)

module.exports = mongoose.model('Equipment', equipmentSchema)
