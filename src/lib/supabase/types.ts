// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      clientes: {
        Row: {
          ativo: boolean
          cnpj: string
          consultor_id: string | null
          created_at: string
          data_inicio_programa: string | null
          gerente_cs_id: string | null
          id: string
          nome: string
          responsavel_email: string
          responsavel_nome: string
          setor: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          cnpj: string
          consultor_id?: string | null
          created_at?: string
          data_inicio_programa?: string | null
          gerente_cs_id?: string | null
          id?: string
          nome: string
          responsavel_email: string
          responsavel_nome: string
          setor?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          cnpj?: string
          consultor_id?: string | null
          created_at?: string
          data_inicio_programa?: string | null
          gerente_cs_id?: string | null
          id?: string
          nome?: string
          responsavel_email?: string
          responsavel_nome?: string
          setor?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_consultor_id_fkey"
            columns: ["consultor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_gerente_cs_id_fkey"
            columns: ["gerente_cs_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          area_id: string | null
          ativo: boolean
          avatar_url: string | null
          created_at: string
          email: string
          empresa_id: string | null
          gestor_direto_id: string | null
          id: string
          nome: string
          perfil: string
          senha_definida: boolean
          status: string
          subtime_declarado: boolean
          tem_subtime: boolean
          updated_at: string
        }
        Insert: {
          area_id?: string | null
          ativo?: boolean
          avatar_url?: string | null
          created_at?: string
          email: string
          empresa_id?: string | null
          gestor_direto_id?: string | null
          id: string
          nome: string
          perfil: string
          senha_definida?: boolean
          status?: string
          subtime_declarado?: boolean
          tem_subtime?: boolean
          updated_at?: string
        }
        Update: {
          area_id?: string | null
          ativo?: boolean
          avatar_url?: string | null
          created_at?: string
          email?: string
          empresa_id?: string | null
          gestor_direto_id?: string | null
          id?: string
          nome?: string
          perfil?: string
          senha_definida?: boolean
          status?: string
          subtime_declarado?: boolean
          tem_subtime?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_gestor_direto_id_fkey"
            columns: ["gestor_direto_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_empresa: { Args: { user_id: string }; Returns: string }
      get_user_perfil: { Args: { user_id: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const


// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: clientes
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   cnpj: text (not null)
//   setor: text (nullable)
//   responsavel_nome: text (not null)
//   responsavel_email: text (not null)
//   consultor_id: uuid (nullable)
//   gerente_cs_id: uuid (nullable)
//   data_inicio_programa: date (nullable)
//   ativo: boolean (not null, default: true)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: usuarios
//   id: uuid (not null)
//   empresa_id: uuid (nullable)
//   area_id: uuid (nullable)
//   gestor_direto_id: uuid (nullable)
//   nome: text (not null)
//   email: text (not null)
//   avatar_url: text (nullable)
//   perfil: text (not null)
//   status: text (not null, default: 'convidado'::text)
//   senha_definida: boolean (not null, default: false)
//   subtime_declarado: boolean (not null, default: false)
//   tem_subtime: boolean (not null, default: false)
//   ativo: boolean (not null, default: true)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: clientes
//   UNIQUE clientes_cnpj_key: UNIQUE (cnpj)
//   FOREIGN KEY clientes_consultor_id_fkey: FOREIGN KEY (consultor_id) REFERENCES usuarios(id) ON DELETE SET NULL
//   FOREIGN KEY clientes_gerente_cs_id_fkey: FOREIGN KEY (gerente_cs_id) REFERENCES usuarios(id) ON DELETE SET NULL
//   PRIMARY KEY clientes_pkey: PRIMARY KEY (id)
// Table: usuarios
//   UNIQUE usuarios_email_key: UNIQUE (email)
//   FOREIGN KEY usuarios_empresa_id_fkey: FOREIGN KEY (empresa_id) REFERENCES clientes(id) ON DELETE SET NULL
//   FOREIGN KEY usuarios_gestor_direto_id_fkey: FOREIGN KEY (gestor_direto_id) REFERENCES usuarios(id) ON DELETE SET NULL
//   FOREIGN KEY usuarios_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   CHECK usuarios_perfil_check: CHECK ((perfil = ANY (ARRAY['ceo_adapta'::text, 'head_consultoria'::text, 'consultor'::text, 'cs_lead'::text, 'gerente_cs'::text, 'gestor_cliente'::text, 'colaborador'::text])))
//   PRIMARY KEY usuarios_pkey: PRIMARY KEY (id)
//   CHECK usuarios_status_check: CHECK ((status = ANY (ARRAY['convidado'::text, 'ativo'::text, 'inativo'::text])))

// --- ROW LEVEL SECURITY POLICIES ---
// Table: clientes
//   Policy "clientes_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: ((get_user_perfil(auth.uid()) = 'consultor'::text) AND (consultor_id = auth.uid()))
//   Policy "clientes_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((get_user_perfil(auth.uid()) = ANY (ARRAY['ceo_adapta'::text, 'head_consultoria'::text, 'cs_lead'::text])) OR ((get_user_perfil(auth.uid()) = 'consultor'::text) AND (consultor_id = auth.uid())) OR ((get_user_perfil(auth.uid()) = 'gerente_cs'::text) AND (gerente_cs_id = auth.uid())) OR ((get_user_perfil(auth.uid()) = ANY (ARRAY['gestor_cliente'::text, 'colaborador'::text])) AND (id = get_user_empresa(auth.uid()))))
//   Policy "clientes_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (((get_user_perfil(auth.uid()) = 'consultor'::text) AND (consultor_id = auth.uid())) OR (get_user_perfil(auth.uid()) = ANY (ARRAY['cs_lead'::text, 'head_consultoria'::text])))
//     WITH CHECK: (((get_user_perfil(auth.uid()) = 'consultor'::text) AND (consultor_id = auth.uid())) OR (get_user_perfil(auth.uid()) = ANY (ARRAY['cs_lead'::text, 'head_consultoria'::text])))
// Table: usuarios
//   Policy "usuarios_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((id = auth.uid()) OR (get_user_perfil(auth.uid()) = ANY (ARRAY['ceo_adapta'::text, 'head_consultoria'::text, 'consultor'::text, 'gerente_cs'::text, 'cs_lead'::text])) OR ((get_user_perfil(auth.uid()) = ANY (ARRAY['gestor_cliente'::text, 'colaborador'::text])) AND (empresa_id = get_user_empresa(auth.uid()))))
//   Policy "usuarios_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: ((id = auth.uid()) OR ((get_user_perfil(auth.uid()) = 'gestor_cliente'::text) AND (empresa_id = get_user_empresa(auth.uid()))))
//     WITH CHECK: ((id = auth.uid()) OR ((get_user_perfil(auth.uid()) = 'gestor_cliente'::text) AND (empresa_id = get_user_empresa(auth.uid()))))

// --- DATABASE FUNCTIONS ---
// FUNCTION get_user_empresa(uuid)
//   CREATE OR REPLACE FUNCTION public.get_user_empresa(user_id uuid)
//    RETURNS uuid
//    LANGUAGE sql
//    SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//       SELECT empresa_id FROM public.usuarios WHERE id = user_id;
//   $function$
//   
// FUNCTION get_user_perfil(uuid)
//   CREATE OR REPLACE FUNCTION public.get_user_perfil(user_id uuid)
//    RETURNS text
//    LANGUAGE sql
//    SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//       SELECT perfil FROM public.usuarios WHERE id = user_id;
//   $function$
//   
// FUNCTION placeholder_criar_pipeline_estagio()
//   CREATE OR REPLACE FUNCTION public.placeholder_criar_pipeline_estagio()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//       RETURN NEW;
//   END;
//   $function$
//   
// FUNCTION update_updated_at_column()
//   CREATE OR REPLACE FUNCTION public.update_updated_at_column()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//       NEW.updated_at = NOW();
//       RETURN NEW;
//   END;
//   $function$
//   

// --- TRIGGERS ---
// Table: clientes
//   criar_pipeline_estagio_on_insert: CREATE TRIGGER criar_pipeline_estagio_on_insert AFTER INSERT ON public.clientes FOR EACH ROW EXECUTE FUNCTION placeholder_criar_pipeline_estagio()
//   update_clientes_updated_at: CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON public.clientes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
// Table: usuarios
//   update_usuarios_updated_at: CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()

// --- INDEXES ---
// Table: clientes
//   CREATE INDEX clientes_ativo_idx ON public.clientes USING btree (ativo)
//   CREATE UNIQUE INDEX clientes_cnpj_key ON public.clientes USING btree (cnpj)
//   CREATE INDEX clientes_consultor_id_idx ON public.clientes USING btree (consultor_id)
//   CREATE INDEX clientes_gerente_cs_id_idx ON public.clientes USING btree (gerente_cs_id)
//   CREATE INDEX clientes_setor_idx ON public.clientes USING btree (setor)
// Table: usuarios
//   CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email)
//   CREATE INDEX usuarios_empresa_area_idx ON public.usuarios USING btree (empresa_id, area_id)
//   CREATE INDEX usuarios_empresa_id_idx ON public.usuarios USING btree (empresa_id)
//   CREATE INDEX usuarios_perfil_idx ON public.usuarios USING btree (perfil)
//   CREATE INDEX usuarios_status_empresa_idx ON public.usuarios USING btree (status, empresa_id)

