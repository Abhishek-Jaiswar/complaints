import mongoose, { Document, Model, Schema } from "mongoose";

export interface IComplaints extends Document {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: Date;
}

const complaintSchema: Schema<IComplaints> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "product",
        "service",
        "support",
        "billing",
        "technical",
        "account",
        "payment",
        "delivery",
        "refund",
        "feedback",
        "other",
      ],
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "resolved", "in progress"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Complaints =
  (mongoose.models.Complaint as Model<IComplaints>) ||
  mongoose.model("Complaint", complaintSchema);
