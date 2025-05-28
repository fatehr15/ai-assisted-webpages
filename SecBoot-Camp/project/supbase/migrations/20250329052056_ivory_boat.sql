/*
  # Create registration tables

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `type` (text, either 'solo' or 'team')
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `school` (text, required)
      - `other_school` (text, nullable)
      - `student_card_url` (text, required)
      - `team_name` (text, nullable)
      - `created_at` (timestamp with timezone)

    - `team_members`
      - `id` (uuid, primary key)
      - `registration_id` (uuid, foreign key to registrations)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `school` (text, required)
      - `other_school` (text, nullable)
      - `student_card_url` (text, required)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on both tables
    - Add policies for inserting new registrations
    - Add policies for viewing registrations
*/

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('solo', 'team')),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  school text NOT NULL,
  other_school text,
  student_card_url text NOT NULL,
  team_name text,
  created_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid NOT NULL REFERENCES registrations(id),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  school text NOT NULL,
  other_school text,
  student_card_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policies for registrations
CREATE POLICY "Allow anonymous registrations"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for team_members
CREATE POLICY "Allow anonymous team member registrations"
  ON team_members
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view team members"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (true);

-- Create unique constraint on email
ALTER TABLE registrations ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE team_members ADD CONSTRAINT unique_team_member_email UNIQUE (email);