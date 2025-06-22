
-- Add is_contest_entry column to user_posts table
ALTER TABLE public.user_posts ADD COLUMN is_contest_entry BOOLEAN DEFAULT false;

-- Update existing posts to not be contest entries by default
UPDATE public.user_posts SET is_contest_entry = false WHERE is_contest_entry IS NULL;
