/**
 * Presets de janela temporal compartilhados por todo o admin.
 *
 * Usar o MESMO conjunto de valores em:
 *  - gráficos do dashboard (/admin, /admin/web-vitals)
 *  - exportações CSV/PDF
 *
 * Assim o filtro escolhido pelo usuário produz sempre o mesmo recorte,
 * independente da visualização.
 */
export type AdminRangePreset = "7" | "30" | "90";

export const ADMIN_RANGE_PRESETS: Array<{ value: AdminRangePreset; label: string }> = [
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
];

export const ADMIN_RANGE_DEFAULT: AdminRangePreset = "7";

export function isAdminRangePreset(v: string): v is AdminRangePreset {
  return v === "7" || v === "30" || v === "90";
}
