const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  products: [
    {
      name: {
        type: String,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
    },
  ],
  totlaPrice: {
    type: Number,
    require: true,
  },
  shipingAddress: {
    name: {
      type: String,
      require: true,
    },
    mobileNumber: {
      type: String,
      require: true,
    },
    houseNo: {
      type: String,
      require: true,
    },
    street: {
      type: String,
      require: true,
    },
    lanmark: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    codePostal: {
      type: String,
      require: true,
    },
  },
  paymentMethode: {
    type: String,
    require: true,
  },
  crated_at: {
    type: Date,
    default: Date.now,
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
