-- A autorização administrativa pertence exclusivamente à conta verificada abaixo.
-- A função consulta auth.users no servidor; a regra não depende de um gate da interface.
CREATE OR REPLACE FUNCTION public.is_designated_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL
     AND EXISTS (
       SELECT 1
       FROM auth.users AS u
       WHERE u.id = auth.uid()
         AND lower(u.email) = 'mentefelizterapias@gmail.com'
         AND u.email_confirmed_at IS NOT NULL
     );
$$;

REVOKE ALL ON FUNCTION public.is_designated_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_designated_admin() TO authenticated;

-- Não aceitar papéis administrativos de user_roles para nenhuma outra conta.
-- O parâmetro de usuário também precisa ser o próprio usuário autenticado,
-- impedindo enumeração de papéis de terceiros via chamada direta ao RPC.
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT CASE
    WHEN _user_id IS DISTINCT FROM auth.uid() THEN FALSE
    WHEN _role = 'admin'::public.app_role THEN public.is_designated_admin()
    ELSE EXISTS (
      SELECT 1
      FROM public.user_roles AS ur
      WHERE ur.user_id = _user_id
        AND ur.role = _role
    )
  END;
$$;

REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

-- Remover papéis admin legados de qualquer conta diferente do endereço autorizado.
DELETE FROM public.user_roles AS ur
USING auth.users AS u
WHERE ur.user_id = u.id
  AND ur.role = 'admin'::public.app_role
  AND lower(u.email) IS DISTINCT FROM 'mentefelizterapias@gmail.com';

-- O painel de saúde do PWA pode ler telemetria global apenas pela conta autorizada.
DROP POLICY IF EXISTS "Designated admin can read all PWA health events"
  ON public.pwa_health_events;
CREATE POLICY "Designated admin can read all PWA health events"
  ON public.pwa_health_events
  FOR SELECT
  TO authenticated
  USING (public.is_designated_admin());
