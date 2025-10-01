import React, { ReactNode, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';

type AnimationPresetProps = {
  children: ReactNode;
  open: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

const AnimationPreset: React.FC<AnimationPresetProps> = ({
  children,
  open,
  setOpen,
}) => {
  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          ref.current &&
          !ref.current.contains(
            event.target instanceof HTMLElement ? event.target : null,
          )
        ) {
          callback();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [callback]);

    return ref;
  };
  const ref = useOutsideClick(() => {
    setOpen(false);
  });
  return (
    <Transition
      show={open}
      enter="transition-opacity ease-linear duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      ref={ref}
    >
      {children}
    </Transition>
  );
};

export default AnimationPreset;
