// Generated — run supabase gen types after migrations

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; email: string | null; name: string | null; role: string; avatar: string | null; created_at: string }
        Insert: { id: string; email?: string | null; name?: string | null; role?: string; avatar?: string | null; created_at?: string }
        Update: { id?: string; email?: string | null; name?: string | null; role?: string; avatar?: string | null; created_at?: string }
      }
      scripts: {
        Row: { id: string; user_id: string; title: string; content: string; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; title: string; content: string; created_at?: string; updated_at?: string }
        Update: { id?: string; user_id?: string; title?: string; content?: string; created_at?: string; updated_at?: string }
      }
      saved_items: {
        Row: { id: string; user_id: string; type: string; name: string; content: string | null; metadata: Json; created_at: string }
        Insert: { id?: string; user_id: string; type: string; name: string; content?: string | null; metadata?: Json; created_at?: string }
        Update: { id?: string; user_id?: string; type?: string; name?: string; content?: string | null; metadata?: Json; created_at?: string }
      }
      plugins: {
        Row: { id: string; name: string; description: string | null; install_path: string | null; created_at: string }
        Insert: { id?: string; name: string; description?: string | null; install_path?: string | null; created_at?: string }
        Update: { id?: string; name?: string; description?: string | null; install_path?: string | null; created_at?: string }
      }
    }
  }
}
