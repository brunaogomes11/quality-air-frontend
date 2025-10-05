export const Badge = ({ situacao }: { situacao?: string }) => {
  const map: Record<string, string> = {
    ocupada: "bg-emerald-100 text-emerald-700 border-emerald-300",
    vaga: "bg-gray-100 text-gray-700 border-gray-300",
    reforma: "bg-amber-100 text-amber-700 border-amber-300",
  };
  const cls =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm " +
    (situacao
      ? map[situacao] ?? "bg-gray-100 text-gray-700 border-gray-300"
      : "bg-gray-100 text-gray-700 border-gray-300");
  const dot =
    "inline-block h-2 w-2 rounded-full " +
    (situacao === "ocupada"
      ? "bg-emerald-600"
      : situacao === "reforma"
      ? "bg-amber-600"
      : "bg-gray-500");
  const label =
    situacao === "ocupada"
      ? "Ocupada"
      : situacao === "reforma"
      ? "Em reforma"
      : "Vaga";
  return (
    <span className={cls}>
      <i className={dot} />
      {label}
    </span>
  );
};
