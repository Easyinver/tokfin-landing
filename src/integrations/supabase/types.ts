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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agk_contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          message_type: string | null
          name: string
          status: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          message_type?: string | null
          name: string
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          message_type?: string | null
          name?: string
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      agk_email_logs: {
        Row: {
          created_at: string
          email_sent: boolean | null
          email_subject: string
          email_to: string
          id: string
          message_id: string | null
          response_type: string | null
          sent_at: string | null
        }
        Insert: {
          created_at?: string
          email_sent?: boolean | null
          email_subject: string
          email_to: string
          id?: string
          message_id?: string | null
          response_type?: string | null
          sent_at?: string | null
        }
        Update: {
          created_at?: string
          email_sent?: boolean | null
          email_subject?: string
          email_to?: string
          id?: string
          message_id?: string | null
          response_type?: string | null
          sent_at?: string | null
        }
        Relationships: []
      }
      agk_email_templates: {
        Row: {
          body_html: string
          body_text: string | null
          created_at: string
          id: string
          subject: string
          template_name: string
          template_type: string
        }
        Insert: {
          body_html: string
          body_text?: string | null
          created_at?: string
          id?: string
          subject: string
          template_name: string
          template_type: string
        }
        Update: {
          body_html?: string
          body_text?: string | null
          created_at?: string
          id?: string
          subject?: string
          template_name?: string
          template_type?: string
        }
        Relationships: []
      }
      agk_investment_requests: {
        Row: {
          created_at: string
          email: string
          id: string
          investment_amount: number | null
          investor_type: string | null
          message: string | null
          name: string
          phone: string | null
          project_id: number | null
          project_name: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          investment_amount?: number | null
          investor_type?: string | null
          message?: string | null
          name: string
          phone?: string | null
          project_id?: number | null
          project_name?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          investment_amount?: number | null
          investor_type?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          project_id?: number | null
          project_name?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      agk_project_achievements: {
        Row: {
          created_at: string | null
          date: string
          description_en: string
          description_es: string
          description_fr: string
          id: string
          project_id: number
          title_en: string
          title_es: string
          title_fr: string
        }
        Insert: {
          created_at?: string | null
          date: string
          description_en: string
          description_es: string
          description_fr: string
          id?: string
          project_id: number
          title_en: string
          title_es: string
          title_fr: string
        }
        Update: {
          created_at?: string | null
          date?: string
          description_en?: string
          description_es?: string
          description_fr?: string
          id?: string
          project_id?: number
          title_en?: string
          title_es?: string
          title_fr?: string
        }
        Relationships: [
          {
            foreignKeyName: "agk_project_achievements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "agk_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agk_projects: {
        Row: {
          area: string
          benefits_en: string[] | null
          benefits_es: string[] | null
          benefits_fr: string[] | null
          created_at: string | null
          description_en: string | null
          description_es: string | null
          description_fr: string | null
          duration: string | null
          id: number
          image: string
          location: string
          min_investment: string | null
          name: string
          payment_frequency: string | null
          price: string
          return_rate: string
          risk_level: string | null
          tokens_available: number | null
          updated_at: string | null
        }
        Insert: {
          area: string
          benefits_en?: string[] | null
          benefits_es?: string[] | null
          benefits_fr?: string[] | null
          created_at?: string | null
          description_en?: string | null
          description_es?: string | null
          description_fr?: string | null
          duration?: string | null
          id?: number
          image: string
          location: string
          min_investment?: string | null
          name: string
          payment_frequency?: string | null
          price: string
          return_rate: string
          risk_level?: string | null
          tokens_available?: number | null
          updated_at?: string | null
        }
        Update: {
          area?: string
          benefits_en?: string[] | null
          benefits_es?: string[] | null
          benefits_fr?: string[] | null
          created_at?: string | null
          description_en?: string | null
          description_es?: string | null
          description_fr?: string | null
          duration?: string | null
          id?: number
          image?: string
          location?: string
          min_investment?: string | null
          name?: string
          payment_frequency?: string | null
          price?: string
          return_rate?: string
          risk_level?: string | null
          tokens_available?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
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
      blocks: {
        Row: {
          block_number: number
          collator_id: string | null
          consensus_team: string[] | null
          created_at: string | null
          id: string
          master_id: string | null
          nominator_id: string | null
          rewards_distributed: number | null
          round_created: number | null
          total_gas: number | null
          total_transactions: number | null
        }
        Insert: {
          block_number: number
          collator_id?: string | null
          consensus_team?: string[] | null
          created_at?: string | null
          id?: string
          master_id?: string | null
          nominator_id?: string | null
          rewards_distributed?: number | null
          round_created?: number | null
          total_gas?: number | null
          total_transactions?: number | null
        }
        Update: {
          block_number?: number
          collator_id?: string | null
          consensus_team?: string[] | null
          created_at?: string | null
          id?: string
          master_id?: string | null
          nominator_id?: string | null
          rewards_distributed?: number | null
          round_created?: number | null
          total_gas?: number | null
          total_transactions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blocks_collator_id_fkey"
            columns: ["collator_id"]
            isOneToOne: false
            referencedRelation: "citizens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocks_master_id_fkey"
            columns: ["master_id"]
            isOneToOne: false
            referencedRelation: "citizens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocks_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "citizens"
            referencedColumns: ["id"]
          },
        ]
      }
      citizens: {
        Row: {
          created_at: string | null
          cteam_rol: number | null
          id: string
          initial_wallet_fiat: number | null
          initial_wallet_tkf: number | null
          initial_wallet_tkfe: number | null
          initial_wallet_tkfr: number | null
          membership_level: number | null
          name: string
          node_role: Database["public"]["Enums"]["node_role_type"] | null
          round_joined: number | null
          seg_level: number | null
          trust_score: number | null
          wallet_fiat: number | null
          wallet_tkf: number | null
          wallet_tkfe: number | null
          wallet_tkfr: number | null
        }
        Insert: {
          created_at?: string | null
          cteam_rol?: number | null
          id?: string
          initial_wallet_fiat?: number | null
          initial_wallet_tkf?: number | null
          initial_wallet_tkfe?: number | null
          initial_wallet_tkfr?: number | null
          membership_level?: number | null
          name: string
          node_role?: Database["public"]["Enums"]["node_role_type"] | null
          round_joined?: number | null
          seg_level?: number | null
          trust_score?: number | null
          wallet_fiat?: number | null
          wallet_tkf?: number | null
          wallet_tkfe?: number | null
          wallet_tkfr?: number | null
        }
        Update: {
          created_at?: string | null
          cteam_rol?: number | null
          id?: string
          initial_wallet_fiat?: number | null
          initial_wallet_tkf?: number | null
          initial_wallet_tkfe?: number | null
          initial_wallet_tkfr?: number | null
          membership_level?: number | null
          name?: string
          node_role?: Database["public"]["Enums"]["node_role_type"] | null
          round_joined?: number | null
          seg_level?: number | null
          trust_score?: number | null
          wallet_fiat?: number | null
          wallet_tkf?: number | null
          wallet_tkfe?: number | null
          wallet_tkfr?: number | null
        }
        Relationships: []
      }
      consensus_participations: {
        Row: {
          block_id: string | null
          citizen_id: string | null
          created_at: string | null
          id: string
          reward_tkf: number | null
          reward_tkfe: number | null
          reward_tkfr: number | null
          round_created: number | null
        }
        Insert: {
          block_id?: string | null
          citizen_id?: string | null
          created_at?: string | null
          id?: string
          reward_tkf?: number | null
          reward_tkfe?: number | null
          reward_tkfr?: number | null
          round_created?: number | null
        }
        Update: {
          block_id?: string | null
          citizen_id?: string | null
          created_at?: string | null
          id?: string
          reward_tkf?: number | null
          reward_tkfe?: number | null
          reward_tkfr?: number | null
          round_created?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "consensus_participations_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consensus_participations_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizens"
            referencedColumns: ["id"]
          },
        ]
      }
      consensus_team_config: {
        Row: {
          created_at: string | null
          fixed_members: number
          membership_level: number
          role_name: string
        }
        Insert: {
          created_at?: string | null
          fixed_members?: number
          membership_level: number
          role_name: string
        }
        Update: {
          created_at?: string | null
          fixed_members?: number
          membership_level?: number
          role_name?: string
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
      membership_packs: {
        Row: {
          created_at: string | null
          cteam_rol: number
          id: string
          membership_level: number
          pack_name: string
          price_usd_fee: number
          price_usd_year: number
          round_number: number
          seg_level: number
          target_users: number
          tkf_amount: number
          tkfe_amount: number
          tkfr_amount: number
        }
        Insert: {
          created_at?: string | null
          cteam_rol: number
          id?: string
          membership_level: number
          pack_name: string
          price_usd_fee: number
          price_usd_year: number
          round_number: number
          seg_level: number
          target_users: number
          tkf_amount?: number
          tkfe_amount?: number
          tkfr_amount?: number
        }
        Update: {
          created_at?: string | null
          cteam_rol?: number
          id?: string
          membership_level?: number
          pack_name?: string
          price_usd_fee?: number
          price_usd_year?: number
          round_number?: number
          seg_level?: number
          target_users?: number
          tkf_amount?: number
          tkfe_amount?: number
          tkfr_amount?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          device: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          device?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          device?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      simulation_config: {
        Row: {
          created_at: string | null
          current_round: number
          current_users: number
          daily_transactions_per_user: number | null
          full_config_json: Json | null
          id: string
          round_name: string
          round_targets: Json | null
          simulation_days: number | null
          simulation_start_time: string | null
          target_users: number
          tkfe_price_usdt: number
          transactions_per_block: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_round?: number
          current_users?: number
          daily_transactions_per_user?: number | null
          full_config_json?: Json | null
          id?: string
          round_name?: string
          round_targets?: Json | null
          simulation_days?: number | null
          simulation_start_time?: string | null
          target_users?: number
          tkfe_price_usdt?: number
          transactions_per_block?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_round?: number
          current_users?: number
          daily_transactions_per_user?: number | null
          full_config_json?: Json | null
          id?: string
          round_name?: string
          round_targets?: Json | null
          simulation_days?: number | null
          simulation_start_time?: string | null
          target_users?: number
          tkfe_price_usdt?: number
          transactions_per_block?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      smart_contracts: {
        Row: {
          created_at: string | null
          description: string | null
          domain_code: string
          failed_executions: number | null
          gas_cost_business: number | null
          gas_cost_defi: number | null
          gas_cost_social: number | null
          id: string
          is_active: boolean | null
          min_membership_level: number | null
          min_trust_score: number | null
          name: string
          successful_executions: number | null
          total_executions: number | null
          total_gas_consumed: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          domain_code: string
          failed_executions?: number | null
          gas_cost_business?: number | null
          gas_cost_defi?: number | null
          gas_cost_social?: number | null
          id?: string
          is_active?: boolean | null
          min_membership_level?: number | null
          min_trust_score?: number | null
          name: string
          successful_executions?: number | null
          total_executions?: number | null
          total_gas_consumed?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          domain_code?: string
          failed_executions?: number | null
          gas_cost_business?: number | null
          gas_cost_defi?: number | null
          gas_cost_social?: number | null
          id?: string
          is_active?: boolean | null
          min_membership_level?: number | null
          min_trust_score?: number | null
          name?: string
          successful_executions?: number | null
          total_executions?: number | null
          total_gas_consumed?: number | null
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
          profile_id: string | null
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
          profile_id?: string | null
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
          profile_id?: string | null
          start_date?: string
          status?: string
          subscription_pack?: string
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tokfin_network_config: {
        Row: {
          created_at: string
          id: string
          ip: string
          is_primary: boolean | null
          lat: number
          location: string
          lon: number
          name: string
          role: string
          status: string
          updated_at: string
          ws_port: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip: string
          is_primary?: boolean | null
          lat: number
          location: string
          lon: number
          name: string
          role?: string
          status?: string
          updated_at?: string
          ws_port?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          ip?: string
          is_primary?: boolean | null
          lat?: number
          location?: string
          lon?: number
          name?: string
          role?: string
          status?: string
          updated_at?: string
          ws_port?: number | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          citizen_id: string | null
          contract_id: string | null
          gas_used: number
          id: string
          round_created: number | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          timestamp: string | null
          tkf_amount: number | null
          tkfe_reward: number | null
          tkfr_reward: number | null
        }
        Insert: {
          citizen_id?: string | null
          contract_id?: string | null
          gas_used: number
          id?: string
          round_created?: number | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          timestamp?: string | null
          tkf_amount?: number | null
          tkfe_reward?: number | null
          tkfr_reward?: number | null
        }
        Update: {
          citizen_id?: string | null
          contract_id?: string | null
          gas_used?: number
          id?: string
          round_created?: number | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          timestamp?: string | null
          tkf_amount?: number | null
          tkfe_reward?: number | null
          tkfr_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "smart_contracts"
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_waitlist_subscription: {
        Args: {
          p_email: string
          p_interests: string
          p_message: string
          p_name: string
        }
        Returns: undefined
      }
      capitalize_devteam: { Args: never; Returns: Json }
      check_invite_availability: {
        Args: { referrer_id: string }
        Returns: boolean
      }
      check_participant_email: { Args: { p_email: string }; Returns: boolean }
      check_participant_username: {
        Args: { p_username: string }
        Returns: boolean
      }
      create_smart_contracts: { Args: never; Returns: Json }
      execute_initial_tkfe_distribution: { Args: never; Returns: Json }
      export_configuration_as_json: { Args: never; Returns: Json }
      generate_invitation_code: { Args: never; Returns: string }
      generate_simulation_step: { Args: never; Returns: Json }
      generate_user_invitation_codes: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      get_citizens_stats: { Args: never; Returns: Json }
      get_leaderboard_data: {
        Args: never
        Returns: {
          created_at: string
          direct_invites: number
          invites_sent: number
          social_network: string
          username: string
        }[]
      }
      get_participants_count: { Args: never; Returns: number }
      get_referrer_data: {
        Args: { p_username: string }
        Returns: {
          first_name: string
          id: string
          last_name: string
          username: string
        }[]
      }
      get_simulation_metrics: { Args: never; Returns: Json }
      get_subscription_stats: { Args: never; Returns: Json }
      insertcitizensround0: { Args: { num_ctzs?: number }; Returns: undefined }
      is_system_admin: { Args: never; Returns: boolean }
      load_full_configuration: { Args: never; Returns: Json }
      process_round_pack_purchases: {
        Args: { p_round_number: number }
        Returns: Json
      }
      purchase_membership_pack: {
        Args: {
          p_citizen_id: string
          p_membership_level: number
          p_round_number: number
        }
        Returns: Json
      }
      register_participant: {
        Args: {
          p_email: string
          p_first_name: string
          p_last_name: string
          p_phone: string
          p_referred_by_id?: string
          p_social_network: string
          p_username: string
        }
        Returns: {
          id: string
          username: string
        }[]
      }
      update_round_targets: { Args: { targets: Json }; Returns: Json }
    }
    Enums: {
      node_role_type:
        | "Master"
        | "Authority"
        | "Treasury"
        | "Storage"
        | "DAO"
        | "Foundation"
        | "Infrastructure"
        | "ConsensusTeam"
        | "Light"
      transaction_status: "pending" | "confirmed" | "failed" | "completed"
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
      node_role_type: [
        "Master",
        "Authority",
        "Treasury",
        "Storage",
        "DAO",
        "Foundation",
        "Infrastructure",
        "ConsensusTeam",
        "Light",
      ],
      transaction_status: ["pending", "confirmed", "failed", "completed"],
    },
  },
} as const
