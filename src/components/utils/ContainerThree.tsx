import React, { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  classes?: string;
};
const ContainerThree: React.FC<ContainerProps> = ({ children, classes }) => {
  return (
    <div className={`w-full flex justify-center ${classes}`}>
      <div className=" py-1 w-full w-custom px-0">{children}</div>
    </div>
  );
};


export default ContainerThree;
