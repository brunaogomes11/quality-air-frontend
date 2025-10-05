interface ContadorProps {
  incrementar: () => void;
  decrementar: () => void;
  quantidades: Record<number, number>;
  itemId: number;
  disabledIncrement?: boolean;
}

export const Contador = ({
  itemId,
  incrementar,
  decrementar,
  quantidades,
  disabledIncrement = false,
}: ContadorProps) => {
  return (
    <div className="flex items-center border rounded px-2 py-1">
      <button
        className="text-gray-500 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => decrementar()}
      >
        –
      </button>
      <span className="px-2">{quantidades[itemId] || 0}</span>
      <button
        className="text-red-500 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => incrementar()}
        disabled={disabledIncrement}
      >
        +
      </button>
    </div>
  );
};
