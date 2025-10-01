import React, { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  classes?: string;
};
const Container: React.FC<ContainerProps> = ({ children, classes }) => {
  return (
    <div className={`w-full flex justify-center ${classes} `}>
      <div className="py-1 w-full xl:w-[1200px] px-2 xl:px-0">{children}</div>
    </div>
  );
};

export default Container;
