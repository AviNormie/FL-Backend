// MongoDB Schemas using Mongoose for Event Management App
// models/index.js

import mongoose from 'mongoose';

// Check if models are already defined to prevent OverwriteModelError
// during hot reloading in Next.js development

// Profile Schema (linked to Supabase auth)
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

// Organization Schema
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

// Organization Member Schema
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

// Compound index to ensure uniqueness of organization + profile
OrganizationMemberSchema.index({ organization: 1, profile: 1 }, { unique: true });

// Event Schema
const EventSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  description: { type: String },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  venue: {
    name: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postal_code: { type: String }
  },
  is_online: { type: Boolean, default: false },
  online_url: { type: String },
  poster_url: { type: String },
  banner_url: { type: String },
  event_type: { type: String },
  max_capacity: { type: Number },
  price: { type: Number, default: 0 },
  is_free: { type: Boolean, default: true },
  registration_deadline: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

// Event Registration Schema
const EventRegistrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  registration_time: { type: Date, default: Date.now },
  check_in_time: { type: Date },
  is_checked_in: { type: Boolean, default: false },
  ticket_code: { type: String, unique: true },
  payment_status: { 
    type: String, 
    default: 'pending',
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  payment_amount: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Compound index to ensure uniqueness of event + profile
EventRegistrationSchema.index({ event: 1, profile: 1 }, { unique: true });

// Session Schema
const SessionSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  description: { type: String },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  location: { type: String },
  is_online: { type: Boolean, default: false },
  online_url: { type: String },
  max_capacity: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

// Speaker Schema
const SpeakerSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  name: { type: String, required: true },
  bio: { type: String },
  photo_url: { type: String },
  company: { type: String },
  position: { type: String },
  social_links: {
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String },
    github: { type: String }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Session Speaker Schema (for many-to-many relationship)
const SessionSpeakerSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  speaker: { type: mongoose.Schema.Types.ObjectId, ref: 'Speaker', required: true },
  role: { type: String },
  created_at: { type: Date, default: Date.now }
});

// Compound index to ensure uniqueness of session + speaker
SessionSpeakerSchema.index({ session: 1, speaker: 1 }, { unique: true });

// Resource Schema
const ResourceSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  name: { type: String, required: true },
  description: { type: String },
  file_url: { type: String, required: true },
  file_type: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

// Coupon Schema
const CouponSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String, required: true },
  description: { type: String },
  code: { type: String },
  qr_code_url: { type: String },
  redemption_limit: { type: Number, default: 1 },
  start_date: { type: Date },
  expiry_date: { type: Date },
  type: { 
    type: String,
    enum: ['food', 'merchandise', 'discount', 'other']
  },
  discount_amount: { type: Number },
  discount_percentage: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

// Coupon Redemption Schema
const CouponRedemptionSchema = new mongoose.Schema({
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  redeemed_at: { type: Date, default: Date.now }
});

// Compound index to ensure uniqueness of coupon + profile
CouponRedemptionSchema.index({ coupon: 1, profile: 1 }, { unique: true });

// Sponsor Schema
const SponsorSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  description: { type: String },
  logo_url: { type: String },
  website_url: { type: String },
  tier: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// FAQ Schema
const FAQSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order_number: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

// Feedback Schema
const FeedbackSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  rating: { 
    type: Number,
    min: 1,
    max: 5 
  },
  comment: { type: String },
  is_anonymous: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

// Notification Schema
const NotificationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  is_push: { type: Boolean, default: false },
  is_in_app: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

// User Notification Schema
const UserNotificationSchema = new mongoose.Schema({
  notification: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification', required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  is_read: { type: Boolean, default: false },
  read_at: { type: Date },
  created_at: { type: Date, default: Date.now }
});

// Compound index to ensure uniqueness of notification + profile
UserNotificationSchema.index({ notification: 1, profile: 1 }, { unique: true });

// Define models with Next.js safe pattern (preventing model recompilation during hot reload)
export const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
export const Organization = mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema);
export const OrganizationMember = mongoose.models.OrganizationMember || mongoose.model('OrganizationMember', OrganizationMemberSchema);
export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
export const EventRegistration = mongoose.models.EventRegistration || mongoose.model('EventRegistration', EventRegistrationSchema);
export const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);
export const Speaker = mongoose.models.Speaker || mongoose.model('Speaker', SpeakerSchema);
export const SessionSpeaker = mongoose.models.SessionSpeaker || mongoose.model('SessionSpeaker', SessionSpeakerSchema);
export const Resource = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
export const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
export const CouponRedemption = mongoose.models.CouponRedemption || mongoose.model('CouponRedemption', CouponRedemptionSchema);
export const Sponsor = mongoose.models.Sponsor || mongoose.model('Sponsor', SponsorSchema);
export const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
export const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
export const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
export const UserNotification = mongoose.models.UserNotification || mongoose.model('UserNotification', UserNotificationSchema);