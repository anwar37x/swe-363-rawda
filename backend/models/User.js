const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ["admin", "gardener", "expert", "store"], default: "gardener" },
    phone:         { type: String, default: "" },
    notifications: { type: Boolean, default: true },
    status:   { type: String, enum: ["Active", "Inactive"], default: "Active" },
    yearsExperience: { type: Number, default: 0 },
    bio:          { type: String, default: "" },
    certificates: { type: [String], default: [] },
    expertStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);