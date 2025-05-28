export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string
          email: string
          phone_number: string
          role: 'participant' | 'admin' | 'organizer'
          registration_date: string
          last_login: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone_number: string
          role?: 'participant' | 'admin' | 'organizer'
          registration_date?: string
          last_login?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone_number?: string
          role?: 'participant' | 'admin' | 'organizer'
          registration_date?: string
          last_login?: string | null
          created_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          team_name: string
          team_leader: string
          points: number
          ticket: string | null
          created_at: string
        }
        Insert: {
          id?: string
          team_name: string
          team_leader: string
          points?: number
          ticket?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          team_name?: string
          team_leader?: string
          points?: number
          ticket?: string | null
          created_at?: string
        }
      }
      team_members: {
        Row: {
          team_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          team_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          team_id?: string
          user_id?: string
          joined_at?: string
        }
      }
      competitions: {
        Row: {
          id: string
          name: string
          difficulty: 'easy' | 'medium' | 'hard'
          start_time: string
          end_time: string
          description: string | null
          winner_team_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          difficulty: 'easy' | 'medium' | 'hard'
          start_time: string
          end_time: string
          description?: string | null
          winner_team_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          start_time?: string
          end_time?: string
          description?: string | null
          winner_team_id?: string | null
          created_at?: string
        }
      }
      competition_points: {
        Row: {
          id: string
          competition_id: string
          team_id: string
          position: number
          points: number
          created_at: string
        }
        Insert: {
          id?: string
          competition_id: string
          team_id: string
          position: number
          points: number
          created_at?: string
        }
        Update: {
          id?: string
          competition_id?: string
          team_id?: string
          position?: number
          points?: number
          created_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          team_id: string
          competition_id: string
          issue_date: string
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          competition_id: string
          issue_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          competition_id?: string
          issue_date?: string
          created_at?: string
        }
      }
      schedule: {
        Row: {
          id: string
          name: string
          start_time: string
          end_time: string
          location: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          start_time: string
          end_time: string
          location?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          start_time?: string
          end_time?: string
          location?: string | null
          description?: string | null
          created_at?: string
        }
      }
      leaderboard: {
        Row: {
          id: string
          team_id: string
          points: number
          rank: number | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          points?: number
          rank?: number | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          points?: number
          rank?: number | null
          updated_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_leaderboard_ranks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      user_role: 'participant' | 'admin' | 'organizer'
      difficulty_level: 'easy' | 'medium' | 'hard'
    }
  }
}