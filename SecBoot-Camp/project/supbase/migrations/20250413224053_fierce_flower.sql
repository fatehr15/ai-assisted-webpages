/*
  # Create SecBootCamp Database Schema

  1. New Tables
    - `teams`
      - `id` (uuid, primary key)
      - `team_name` (text, unique)
      - `leader_id` (uuid, foreign key)
      - `points` (integer)
      - `created_at` (timestamp)

    - `competitions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `difficulty` (integer)
      - `description` (text)
      - `date` (date)
      - `time` (time)
      - `category` (text)

    - `leaderboard`
      - `id` (uuid, primary key)
      - `team_id` (uuid, foreign key)
      - `competition_id` (uuid, foreign key)
      - `rank` (integer)
      - `points_awarded` (integer)
      - `created_at` (timestamp)

    - `tickets`
      - `id` (uuid, primary key)
      - `team_name` (text)
      - `competition_id` (uuid, foreign key)
      - `issued_at` (timestamp)
      - `show_time` (timestamp)

    - `mentors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `job_title` (text)
      - `linkedin` (text)
      - `bio` (text)

    - `sessions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (text)
      - `start_time` (timestamp)
      - `duration` (integer)
      - `mentor_id` (uuid, foreign key)
      - `competition_id` (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text UNIQUE NOT NULL,
  leader_id uuid REFERENCES users(id),
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  difficulty integer CHECK (difficulty BETWEEN 1 AND 5),
  description text,
  date date NOT NULL,
  time time NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id),
  competition_id uuid REFERENCES competitions(id),
  rank integer NOT NULL,
  points_awarded integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL,
  competition_id uuid REFERENCES competitions(id),
  issued_at timestamptz DEFAULT now(),
  show_time timestamptz NOT NULL
);

-- Create mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  job_title text NOT NULL,
  linkedin text,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  start_time timestamptz NOT NULL,
  duration integer NOT NULL,
  mentor_id uuid REFERENCES mentors(id),
  competition_id uuid REFERENCES competitions(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for teams
CREATE POLICY "Public teams are viewable by everyone"
  ON teams
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Team leaders can update their team"
  ON teams
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = leader_id)
  WITH CHECK (auth.uid() = leader_id);

-- Create policies for competitions
CREATE POLICY "Competitions are viewable by everyone"
  ON competitions
  FOR SELECT
  TO public
  USING (true);

-- Create policies for leaderboard
CREATE POLICY "Leaderboard is viewable by everyone"
  ON leaderboard
  FOR SELECT
  TO public
  USING (true);

-- Create policies for tickets
CREATE POLICY "Tickets are viewable by everyone"
  ON tickets
  FOR SELECT
  TO public
  USING (true);

-- Create policies for mentors
CREATE POLICY "Mentors are viewable by everyone"
  ON mentors
  FOR SELECT
  TO public
  USING (true);

-- Create policies for sessions
CREATE POLICY "Sessions are viewable by everyone"
  ON sessions
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_teams_leader_id ON teams(leader_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_team_id ON leaderboard(team_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_competition_id ON leaderboard(competition_id);
CREATE INDEX IF NOT EXISTS idx_tickets_competition_id ON tickets(competition_id);
CREATE INDEX IF NOT EXISTS idx_sessions_mentor_id ON sessions(mentor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_competition_id ON sessions(competition_id);

-- Create function to update team points
CREATE OR REPLACE FUNCTION update_team_points()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE teams
  SET points = (
    SELECT COALESCE(SUM(points_awarded), 0)
    FROM leaderboard
    WHERE team_id = NEW.team_id
  )
  WHERE id = NEW.team_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update team points
CREATE TRIGGER update_team_points_trigger
AFTER INSERT OR UPDATE ON leaderboard
FOR EACH ROW
EXECUTE FUNCTION update_team_points();