-- Create resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  domain TEXT NOT NULL,
  personal_info JSONB DEFAULT '{}'::jsonb,
  objective TEXT,
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  education JSONB[] DEFAULT ARRAY[]::JSONB[],
  experience JSONB[] DEFAULT ARRAY[]::JSONB[],
  certificates JSONB[] DEFAULT ARRAY[]::JSONB[],
  internships JSONB[] DEFAULT ARRAY[]::JSONB[],
  projects JSONB[] DEFAULT ARRAY[]::JSONB[],
  presentations JSONB[] DEFAULT ARRAY[]::JSONB[],
  achievements JSONB[] DEFAULT ARRAY[]::JSONB[],
  extracurricular JSONB[] DEFAULT ARRAY[]::JSONB[],
  languages TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow users to view their own resumes" ON public.resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own resumes" ON public.resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own resumes" ON public.resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own resumes" ON public.resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS resumes_user_id_idx ON public.resumes(user_id);
