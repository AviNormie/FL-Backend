import mongoose from 'mongoose';

const OrganizationMemberSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['owner', 'admin', 'user']
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('OrganizationMember', OrganizationMemberSchema);
