import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  city: string;
  rating: number;
  review: string;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name:   { type: String, required: true },
    city:   { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

export const Testimonial =
  (mongoose.models.Testimonial as mongoose.Model<ITestimonial>) ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);