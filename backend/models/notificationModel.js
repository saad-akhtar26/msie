const mongoose = require('mongoose')
const moment = require('moment');

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please specify a relevant user'],
      ref: 'User',
    },
    equip: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please specify a relevant equipment'],
      ref: 'Equipments'
    },
    date: {
      type: mongoose.Schema.Types.Date,
      required: [true, 'Please specify a date'],
      default: moment().format('YYYY-MM-DD'),
    },
    text: {
      type: String,
      required: [true, 'Please specify a text'],
    },
    status: {
      type: String,
      required: [true, 'Please specify repeat type'],
      default: 'UNREAD',
    },
  },
  {
    timestamps: false,
  },
)

notificationSchema.index({ date: 1, equip: 1 }, { unique: true });

module.exports = mongoose.model('Notifications', notificationSchema)
