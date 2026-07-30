import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
sessionSchema.index({ UserId: 1 }, { unique: true });

const Session = mongoose.model("Session", sessionSchema);
export default Session;
