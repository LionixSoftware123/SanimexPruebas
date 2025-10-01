import EcoIcon from '@/images/eco.svg';

type TooltipIconProps = {
  isCategory: boolean;
};

const EcologicalProductIcon: React.FC<TooltipIconProps> = ({ isCategory }) => (
  <div
    id="tooltip"
    className="relative flex items-center justify-center cursor-pointer h-[33px] w-[33px] rounded-full bg-white border    hover:tooltip-visible overflow-visible"
  >
    <EcoIcon className="h-[50px] w-[50px] " />

    <span
      id={isCategory ? 'tooltipTextEcoCategory' : 'tooltipTextEco'}
      className="tooltip-text  absolute bottom-full mb-2 bg-gray-200 p-1 rounded text-xs invisible"
    >
      Ahorra agua ¡Únete al movimiento!
    </span>
  </div>
);

export default EcologicalProductIcon;
