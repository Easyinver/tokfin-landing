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
      bchain: {
        Row: {
          cteamid: number | null
          gas: number | null
          id: number
          shares: number | null
          stable: number | null
          trscfin: number | null
          trscini: number | null
          trscliq: number | null
          trust: number | null
        }
        Insert: {
          cteamid?: number | null
          gas?: number | null
          id?: number
          shares?: number | null
          stable?: number | null
          trscfin?: number | null
          trscini?: number | null
          trscliq?: number | null
          trust?: number | null
        }
        Update: {
          cteamid?: number | null
          gas?: number | null
          id?: number
          shares?: number | null
          stable?: number | null
          trscfin?: number | null
          trscini?: number | null
          trscliq?: number | null
          trust?: number | null
        }
        Relationships: []
      }
      citizens: {
        Row: {
          actor: number | null
          consdate: string | null
          consen: number | null
          crypto: number | null
          cteam: number | null
          fiat: number | null
          id: number
          moneda: string | null
          rol: number | null
          shares: number | null
          stable: number | null
          stardate: string | null
          trust: number | null
        }
        Insert: {
          actor?: number | null
          consdate?: string | null
          consen?: number | null
          crypto?: number | null
          cteam?: number | null
          fiat?: number | null
          id?: number
          moneda?: string | null
          rol?: number | null
          shares?: number | null
          stable?: number | null
          stardate?: string | null
          trust?: number | null
        }
        Update: {
          actor?: number | null
          consdate?: string | null
          consen?: number | null
          crypto?: number | null
          cteam?: number | null
          fiat?: number | null
          id?: number
          moneda?: string | null
          rol?: number | null
          shares?: number | null
          stable?: number | null
          stardate?: string | null
          trust?: number | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      cteam: {
        Row: {
          blockid: number | null
          colla1: number | null
          colla2: number | null
          colla3: number | null
          enddate: string | null
          gas: number | null
          id: number
          mstr1: number | null
          nomin1: number | null
          nomin2: number | null
          nomin3: number | null
          sigm1: number | null
          sigm2: number | null
          sigm3: number | null
          sigs1: number | null
          sigs2: number | null
          sigs3: number | null
          sigs4: number | null
          stardate: string | null
          valg1: number | null
          valg2: number | null
          valp1: number | null
          valp2: number | null
          valp3: number | null
          valp4: number | null
          valp5: number | null
          valp6: number | null
          vals1: number | null
          vals2: number | null
          vals3: number | null
          vals4: number | null
          vals5: number | null
          vals6: number | null
          vals7: number | null
          vals8: number | null
          vals9: number | null
        }
        Insert: {
          blockid?: number | null
          colla1?: number | null
          colla2?: number | null
          colla3?: number | null
          enddate?: string | null
          gas?: number | null
          id?: number
          mstr1?: number | null
          nomin1?: number | null
          nomin2?: number | null
          nomin3?: number | null
          sigm1?: number | null
          sigm2?: number | null
          sigm3?: number | null
          sigs1?: number | null
          sigs2?: number | null
          sigs3?: number | null
          sigs4?: number | null
          stardate?: string | null
          valg1?: number | null
          valg2?: number | null
          valp1?: number | null
          valp2?: number | null
          valp3?: number | null
          valp4?: number | null
          valp5?: number | null
          valp6?: number | null
          vals1?: number | null
          vals2?: number | null
          vals3?: number | null
          vals4?: number | null
          vals5?: number | null
          vals6?: number | null
          vals7?: number | null
          vals8?: number | null
          vals9?: number | null
        }
        Update: {
          blockid?: number | null
          colla1?: number | null
          colla2?: number | null
          colla3?: number | null
          enddate?: string | null
          gas?: number | null
          id?: number
          mstr1?: number | null
          nomin1?: number | null
          nomin2?: number | null
          nomin3?: number | null
          sigm1?: number | null
          sigm2?: number | null
          sigm3?: number | null
          sigs1?: number | null
          sigs2?: number | null
          sigs3?: number | null
          sigs4?: number | null
          stardate?: string | null
          valg1?: number | null
          valg2?: number | null
          valp1?: number | null
          valp2?: number | null
          valp3?: number | null
          valp4?: number | null
          valp5?: number | null
          valp6?: number | null
          vals1?: number | null
          vals2?: number | null
          vals3?: number | null
          vals4?: number | null
          vals5?: number | null
          vals6?: number | null
          vals7?: number | null
          vals8?: number | null
          vals9?: number | null
        }
        Relationships: []
      }
      smc: {
        Row: {
          destino: number | null
          feature: string | null
          fiat: number | null
          fid: string | null
          gas: number | null
          id: number
          modid: string | null
          modulo: string | null
          origen: number | null
          seglevel: number | null
          shares: number | null
          smcid: string | null
          smi: string | null
          stable: number | null
          submodulo: string | null
          trust: number | null
        }
        Insert: {
          destino?: number | null
          feature?: string | null
          fiat?: number | null
          fid?: string | null
          gas?: number | null
          id?: number
          modid?: string | null
          modulo?: string | null
          origen?: number | null
          seglevel?: number | null
          shares?: number | null
          smcid?: string | null
          smi?: string | null
          stable?: number | null
          submodulo?: string | null
          trust?: number | null
        }
        Update: {
          destino?: number | null
          feature?: string | null
          fiat?: number | null
          fid?: string | null
          gas?: number | null
          id?: number
          modid?: string | null
          modulo?: string | null
          origen?: number | null
          seglevel?: number | null
          shares?: number | null
          smcid?: string | null
          smi?: string | null
          stable?: number | null
          submodulo?: string | null
          trust?: number | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          next_renewal_date: string
          start_date: string
          status: string
          subscription_pack: string
          updated_at: string | null
          user_id: number
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          next_renewal_date: string
          start_date?: string
          status?: string
          subscription_pack: string
          updated_at?: string | null
          user_id: number
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          next_renewal_date?: string
          start_date?: string
          status?: string
          subscription_pack?: string
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      trsc: {
        Row: {
          blockid: number | null
          cteamid: number | null
          ctzid: number | null
          destino: number | null
          gas: number | null
          id: number
          origen: number | null
          seglevel: number | null
          shares: number | null
          smccode: string | null
          smcid: number | null
          stable: number | null
          trust: number | null
        }
        Insert: {
          blockid?: number | null
          cteamid?: number | null
          ctzid?: number | null
          destino?: number | null
          gas?: number | null
          id?: number
          origen?: number | null
          seglevel?: number | null
          shares?: number | null
          smccode?: string | null
          smcid?: number | null
          stable?: number | null
          trust?: number | null
        }
        Update: {
          blockid?: number | null
          cteamid?: number | null
          ctzid?: number | null
          destino?: number | null
          gas?: number | null
          id?: number
          origen?: number | null
          seglevel?: number | null
          shares?: number | null
          smccode?: string | null
          smcid?: number | null
          stable?: number | null
          trust?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: number
          joined_at: string | null
          simulation_batch: string | null
          subscription_pack: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: number
          joined_at?: string | null
          simulation_batch?: string | null
          subscription_pack?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: number
          joined_at?: string | null
          simulation_batch?: string | null
          subscription_pack?: string | null
          username?: string | null
        }
        Relationships: []
      }
      waitlist_subscriptions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          interests: string | null
          message: string | null
          name: string | null
          origin: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          interests?: string | null
          message?: string | null
          name?: string | null
          origin?: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          interests?: string | null
          message?: string | null
          name?: string | null
          origin?: string
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
