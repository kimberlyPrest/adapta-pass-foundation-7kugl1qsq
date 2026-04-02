-- Create the clientes table
CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    cnpj TEXT NOT NULL,
    setor TEXT,
    responsavel_nome TEXT NOT NULL,
    responsavel_email TEXT NOT NULL,
    consultor_id UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
    gerente_cs_id UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
    data_inicio_programa DATE,
    ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Handle UNIQUE constraint safely
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'clientes_cnpj_key'
    ) THEN
        ALTER TABLE public.clientes ADD CONSTRAINT clientes_cnpj_key UNIQUE (cnpj);
    END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS clientes_consultor_id_idx ON public.clientes(consultor_id);
CREATE INDEX IF NOT EXISTS clientes_gerente_cs_id_idx ON public.clientes(gerente_cs_id);
CREATE INDEX IF NOT EXISTS clientes_ativo_idx ON public.clientes(ativo);
CREATE INDEX IF NOT EXISTS clientes_setor_idx ON public.clientes(setor);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_clientes_updated_at ON public.clientes;
CREATE TRIGGER update_clientes_updated_at
    BEFORE UPDATE ON public.clientes
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Update usuarios table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'usuarios_empresa_id_fkey'
    ) THEN
        ALTER TABLE public.usuarios
            ADD CONSTRAINT usuarios_empresa_id_fkey 
            FOREIGN KEY (empresa_id) REFERENCES public.clientes(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Trigger placeholder function
CREATE OR REPLACE FUNCTION public.placeholder_criar_pipeline_estagio()
RETURNS trigger AS $$
BEGIN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for pipeline
DROP TRIGGER IF EXISTS criar_pipeline_estagio_on_insert ON public.clientes;
CREATE TRIGGER criar_pipeline_estagio_on_insert
    AFTER INSERT ON public.clientes
    FOR EACH ROW EXECUTE FUNCTION public.placeholder_criar_pipeline_estagio();

-- Enable RLS
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "clientes_select" ON public.clientes;
CREATE POLICY "clientes_select" ON public.clientes
    FOR SELECT TO authenticated
    USING (
        public.get_user_perfil(auth.uid()) IN ('ceo_adapta', 'head_consultoria', 'cs_lead')
        OR (public.get_user_perfil(auth.uid()) = 'consultor' AND consultor_id = auth.uid())
        OR (public.get_user_perfil(auth.uid()) = 'gerente_cs' AND gerente_cs_id = auth.uid())
        OR (public.get_user_perfil(auth.uid()) IN ('gestor_cliente', 'colaborador') AND id = public.get_user_empresa(auth.uid()))
    );

DROP POLICY IF EXISTS "clientes_insert" ON public.clientes;
CREATE POLICY "clientes_insert" ON public.clientes
    FOR INSERT TO authenticated
    WITH CHECK (
        public.get_user_perfil(auth.uid()) = 'consultor' AND consultor_id = auth.uid()
    );

DROP POLICY IF EXISTS "clientes_update" ON public.clientes;
CREATE POLICY "clientes_update" ON public.clientes
    FOR UPDATE TO authenticated
    USING (
        (public.get_user_perfil(auth.uid()) = 'consultor' AND consultor_id = auth.uid())
        OR public.get_user_perfil(auth.uid()) IN ('cs_lead', 'head_consultoria')
    )
    WITH CHECK (
        (public.get_user_perfil(auth.uid()) = 'consultor' AND consultor_id = auth.uid())
        OR public.get_user_perfil(auth.uid()) IN ('cs_lead', 'head_consultoria')
    );
