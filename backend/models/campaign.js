const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  goalAmount: {
    type: Number,
    required: true
  },
  amountRaised: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Campaign", campaignSchema);