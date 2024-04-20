const mongoose = require('mongoose')

const equipmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please specify a relevant company'],
      ref: 'User',
    },
    item_id: {
      type: Number,
      required: [true, 'Please specify an item id'],
    },
    equip_name: {
      type: String,
      required: [true, 'Please specify a name'],
    },
    repeat_type: {
      type: String,
      required: [true, 'Please specify repeat type'],
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

module.exports = mongoose.model('Equipments', equipmentSchema)
