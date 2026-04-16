-- ============================================
-- YANGG Gallery Seed Data
-- ============================================
-- This file creates sample gallery items
-- You'll need to upload images to Supabase Storage first,
-- then update the image_url and image_path fields
-- ============================================

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM gallery;

-- Insert sample gallery items
-- Note: Replace image_url and image_path with actual Supabase Storage URLs after uploading
INSERT INTO gallery (
  title, description, image_url, image_path, category, created_at, updated_at
) VALUES
  ('Africa The Future Conference', 'YANGG event and program activities', '/placeholder-conference-1.jpg', 'gallery/placeholder-conference-1.jpg', 'conference', NOW(), NOW()),
  ('Leadership Training Session', 'YANGG event and program activities', '/placeholder-training-1.jpg', 'gallery/placeholder-training-1.jpg', 'training', NOW(), NOW()),
  ('Community Workshop', 'YANGG event and program activities', '/placeholder-workshop-1.jpg', 'gallery/placeholder-workshop-1.jpg', 'workshop', NOW(), NOW()),
  ('Youth Empowerment Program', 'YANGG event and program activities', '/placeholder-conference-2.jpg', 'gallery/placeholder-conference-2.jpg', 'conference', NOW(), NOW()),
  ('SDG Implementation Training', 'YANGG event and program activities', '/placeholder-training-2.jpg', 'gallery/placeholder-training-2.jpg', 'training', NOW(), NOW()),
  ('She Leads Initiative', 'YANGG event and program activities', '/placeholder-workshop-2.jpg', 'gallery/placeholder-workshop-2.jpg', 'workshop', NOW(), NOW()),
  ('Afripreneur Summit', 'YANGG event and program activities', '/placeholder-conference-3.jpg', 'gallery/placeholder-conference-3.jpg', 'conference', NOW(), NOW()),
  ('Capacity Building Workshop', 'YANGG event and program activities', '/placeholder-training-3.jpg', 'gallery/placeholder-training-3.jpg', 'training', NOW(), NOW()),
  ('Virtual Conference', 'YANGG event and program activities', '/placeholder-workshop-3.jpg', 'gallery/placeholder-workshop-3.jpg', 'workshop', NOW(), NOW()),
  ('Team Collaboration', 'YANGG event and program activities', '/placeholder-conference-4.jpg', 'gallery/placeholder-conference-4.jpg', 'conference', NOW(), NOW()),
  ('International Youth Day', 'YANGG event and program activities', '/placeholder-training-4.jpg', 'gallery/placeholder-training-4.jpg', 'training', NOW(), NOW()),
  ('Women Leadership Forum', 'YANGG event and program activities', '/placeholder-workshop-4.jpg', 'gallery/placeholder-workshop-4.jpg', 'workshop', NOW(), NOW()),
  ('Innovation Hub Launch', 'YANGG event and program activities', '/placeholder-conference-5.jpg', 'gallery/placeholder-conference-5.jpg', 'conference', NOW(), NOW()),
  ('Networking Event', 'YANGG event and program activities', '/placeholder-training-5.jpg', 'gallery/placeholder-training-5.jpg', 'training', NOW(), NOW()),
  ('Panel Discussion', 'YANGG event and program activities', '/placeholder-workshop-5.jpg', 'gallery/placeholder-workshop-5.jpg', 'workshop', NOW(), NOW());

-- Verify the insert
SELECT COUNT(*) as total_gallery_items FROM gallery;
SELECT id, title, category FROM gallery ORDER BY created_at DESC LIMIT 10;
