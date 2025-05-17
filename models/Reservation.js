const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: [String], 
    enum: ['hotel', 'pool', 'cottage', 'hall', 'karaoke'], 
    required: true 
  },
  date: { type: Date, required: true },
  guests: { 
    type: {
      adults: { type: Number, default: 1 },              
      students: { type: Number, default: 0 },            
      seniors: { type: Number, default: 0 },             
      pwd: { type: Number, default: 0 },                 
      childrenUnder2: { type: Number, default: 0 }       
    },
    default: { adults: 1, students: 0, seniors: 0, pwd: 0, childrenUnder2: 0 }
  },
  checkOutDate: { type: Date },
  isCheckedOut: { type: Boolean, default: false },
  timeOfDay: {
    type: String,
    enum: ['morning', 'afternoon', 'morning and afternoon', 'overnight'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'downpayment', 'cancelled'],
    required: true,
    default: 'downpayment'
  },
  downpaymentAmount: {
    type: Number,
    default: 0
  },
  cancelledAmount: {
    type: Number, 
    default: 0
  }
});