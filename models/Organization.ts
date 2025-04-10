import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  logo_url: { type: String },
  banner_url: { type: String },
  domain: { type: String },
  type: { type: String },
  contact_email: { type: String },
  contact_phone: { type: String },
  website: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Organization', OrganizationSchema);
