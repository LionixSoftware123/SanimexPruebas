import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Container = dynamic(() => import('@/components/utils/Container'));

type BreadcrumbItem = {
  name: string;
  path?: string;
  active?: boolean;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const replacements: Record<string, string> = {
    banos: 'Baños',
  };

  const replaceWords = (text: string): string => {
    return text
      .split(' ')
      .map((word) => replacements[word.toLowerCase()] || word)
      .join(' ');
  };

  return (
    <div className="bg-[#F6F6F6] pt-2 lg:pt-0 w-full">
      <Container>
        <div className="items-center lg:h-[35px]">
          {items.map((item, i) => (
            <React.Fragment key={'breadcrumb' + i}>
              {item.path ? (
                <Link href={item.path}>
                  <span className="font-Century-Gothic-Bold mr-2">
                    {i ? '| ' : ''}
                    <span className={item.active ? 'text-[#0071CE]' : ''}>
                      {replaceWords(item.name)}
                    </span>
                  </span>
                </Link>
              ) : (
                <span className="font-Century-Gothic-Bold mr-2">
                  {i ? '| ' : ''}
                  <span className={item.active ? 'text-[#0071CE]' : ''}>
                    {replaceWords(item.name)}
                  </span>
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Breadcrumb;
