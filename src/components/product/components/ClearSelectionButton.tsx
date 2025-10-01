import CrossClose from '@/images/crossClose.svg';

const ClearSelectionButton = ({ onClear }: { onClear: () => void }) => {
  return (
    <div
      className="flex h-[30px] items-center text-[10px] cursor-pointer mb-6"
      onClick={onClear}
    >
      <div className="w-[12px] flex self-center h-[12px] mr-1">
        <CrossClose />
      </div>
      <div className="flex self-center">Limpiar</div>
    </div>
  );
};

export default ClearSelectionButton;
