const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentId: String, // for future (Razorpay/Stripe)
  isAnonymous: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);