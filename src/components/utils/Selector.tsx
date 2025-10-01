import React from 'react';

type SelectorProps = {
  setSelected: (value: boolean[] | ((prevVar: boolean[]) => boolean[])) => void;
  selected: boolean;
  change: [boolean, boolean];
};
const Selector: React.FC<SelectorProps> = ({
  setSelected,
  selected,
  change,
}) => {
  return (
    <button
      onClick={() => setSelected(change)}
      className="w-[18px] h-[18px] flex justify-center border border-[#0071CE] rounded-full"
    >
      <div
        className={`${
          selected ? 'bg-[#0071CE]' : 'bg-white'
        } w-[12px] h-[12px] flex self-center rounded-full`}
      ></div>
    </button>
  );
};

export default Selector;
