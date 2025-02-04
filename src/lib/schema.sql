-- Create posts table
create table posts (
    id bigint primary key generated always as identity,
    caption text not null,
    user_ip text,
    user_id uuid,
    uploads text[], -- Array of text for storing multiple upload URLs/paths
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create an index on user_id for faster lookups
create index posts_user_id_idx on posts(user_id);

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at timestamp
create trigger update_posts_updated_at
    before update on posts
    for each row
    execute function update_updated_at_column();

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  visit_count INTEGER DEFAULT 1,
  first_visit_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_visit_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country TEXT,
  city TEXT,
  browser TEXT,
  os TEXT,
  device_type TEXT,
  app BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on ip_address for faster lookups
CREATE INDEX IF NOT EXISTS visitors_ip_address_idx ON visitors(ip_address);

-- Enable RLS
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON visitors FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON visitors FOR UPDATE USING (true);

-- Grant necessary permissions to anon and authenticated roles
GRANT SELECT, INSERT, UPDATE ON visitors TO anon, authenticated;
