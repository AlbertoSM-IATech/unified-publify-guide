export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          attempts: number
          channel: string
          created_at: string
          error_message: string | null
          id: string
          lead_id: string
          recipient: string | null
          sent_at: string | null
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          attempts?: number
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          lead_id: string
          recipient?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          attempts?: number
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          lead_id?: string
          recipient?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_notifications_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_email_versions: {
        Row: {
          author_email: string | null
          body: string
          created_at: string
          created_by: string | null
          cta: string | null
          id: string
          lead_id: string
          prompt_text: string | null
          reason: string | null
          source: string
          subject: string
          token_values: Json
          tone_notes: string | null
          version: number
        }
        Insert: {
          author_email?: string | null
          body: string
          created_at?: string
          created_by?: string | null
          cta?: string | null
          id?: string
          lead_id: string
          prompt_text?: string | null
          reason?: string | null
          source?: string
          subject: string
          token_values?: Json
          tone_notes?: string | null
          version: number
        }
        Update: {
          author_email?: string | null
          body?: string
          created_at?: string
          created_by?: string | null
          cta?: string | null
          id?: string
          lead_id?: string
          prompt_text?: string | null
          reason?: string | null
          source?: string
          subject?: string
          token_values?: Json
          tone_notes?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "lead_email_versions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          ai_email_body: string | null
          ai_email_cta: string | null
          ai_email_generated_at: string | null
          ai_email_personalization_snippets: Json | null
          ai_email_subject: string | null
          ai_email_tone_notes: string | null
          ai_email_version: string | null
          ai_error: string | null
          ai_frictions: string[] | null
          ai_next_steps: string[] | null
          ai_objections: string[] | null
          ai_opportunity: Json | null
          ai_output: Json | null
          ai_reply_recommendation_type: string | null
          ai_sales_questions: string[] | null
          ai_status: string | null
          ai_summary: string | null
          books_range: string | null
          client_request_id: string | null
          configure_first: string | null
          created_at: string
          email: string
          email_send_error: string | null
          email_send_status: string
          email_sent_at: string | null
          email_sent_by: string | null
          email_sent_version: number | null
          id: string
          impact_without_system: string[] | null
          landing_path: string | null
          lead_score_breakdown: Json | null
          lead_score_total: number | null
          lead_stage: Database["public"]["Enums"]["lead_stage"] | null
          main_question_text: string | null
          name: string
          needs_system: string | null
          next_step_preference: string | null
          objections_text: string | null
          pain_points: string[] | null
          pain_text: string | null
          preferred_schedule: string | null
          situation_description: string | null
          team_range: string | null
          timing: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          ai_email_body?: string | null
          ai_email_cta?: string | null
          ai_email_generated_at?: string | null
          ai_email_personalization_snippets?: Json | null
          ai_email_subject?: string | null
          ai_email_tone_notes?: string | null
          ai_email_version?: string | null
          ai_error?: string | null
          ai_frictions?: string[] | null
          ai_next_steps?: string[] | null
          ai_objections?: string[] | null
          ai_opportunity?: Json | null
          ai_output?: Json | null
          ai_reply_recommendation_type?: string | null
          ai_sales_questions?: string[] | null
          ai_status?: string | null
          ai_summary?: string | null
          books_range?: string | null
          client_request_id?: string | null
          configure_first?: string | null
          created_at?: string
          email: string
          email_send_error?: string | null
          email_send_status?: string
          email_sent_at?: string | null
          email_sent_by?: string | null
          email_sent_version?: number | null
          id?: string
          impact_without_system?: string[] | null
          landing_path?: string | null
          lead_score_breakdown?: Json | null
          lead_score_total?: number | null
          lead_stage?: Database["public"]["Enums"]["lead_stage"] | null
          main_question_text?: string | null
          name: string
          needs_system?: string | null
          next_step_preference?: string | null
          objections_text?: string | null
          pain_points?: string[] | null
          pain_text?: string | null
          preferred_schedule?: string | null
          situation_description?: string | null
          team_range?: string | null
          timing?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          ai_email_body?: string | null
          ai_email_cta?: string | null
          ai_email_generated_at?: string | null
          ai_email_personalization_snippets?: Json | null
          ai_email_subject?: string | null
          ai_email_tone_notes?: string | null
          ai_email_version?: string | null
          ai_error?: string | null
          ai_frictions?: string[] | null
          ai_next_steps?: string[] | null
          ai_objections?: string[] | null
          ai_opportunity?: Json | null
          ai_output?: Json | null
          ai_reply_recommendation_type?: string | null
          ai_sales_questions?: string[] | null
          ai_status?: string | null
          ai_summary?: string | null
          books_range?: string | null
          client_request_id?: string | null
          configure_first?: string | null
          created_at?: string
          email?: string
          email_send_error?: string | null
          email_send_status?: string
          email_sent_at?: string | null
          email_sent_by?: string | null
          email_sent_version?: number | null
          id?: string
          impact_without_system?: string[] | null
          landing_path?: string | null
          lead_score_breakdown?: Json | null
          lead_score_total?: number | null
          lead_stage?: Database["public"]["Enums"]["lead_stage"] | null
          main_question_text?: string | null
          name?: string
          needs_system?: string | null
          next_step_preference?: string | null
          objections_text?: string | null
          pain_points?: string[] | null
          pain_text?: string | null
          preferred_schedule?: string | null
          situation_description?: string | null
          team_range?: string | null
          timing?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ensure_allowed_admin: {
        Args: { _email: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
      lead_stage: "high_intent" | "solution_aware" | "problem_aware" | "cold"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
      lead_stage: ["high_intent", "solution_aware", "problem_aware", "cold"],
    },
  },
} as const
