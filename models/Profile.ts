import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  supabase_id: { type: String, required: true, unique: true }, // Auth ID from Supabase
  email: { type: String, required: true, unique: true },
  full_name: { type: String },
  avatar_url: { type: String },
  phone_number: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  last_login: { type: Date }
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
