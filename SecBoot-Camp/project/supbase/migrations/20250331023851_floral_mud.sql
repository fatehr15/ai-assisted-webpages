/*
  # Create users table and related schemas

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required, unique)
      - `phone_number` (text, required)
      - `role` (text, required)
      - `registration_date` (timestamp)
      - `last_login` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authentication and authorization
*/

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('participant', 'admin', 'organizer');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone_number text NOT NULL,
  role user_role NOT NULL DEFAULT 'participant',
  registration_date timestamptz DEFAULT now(),
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );