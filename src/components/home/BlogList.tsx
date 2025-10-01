import React from 'react';
import { Post } from '@/utils/types/generated';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const BlogOne = dynamic(() => import('@/components/blog/BlogOne'));

type BlogListProps = {
  posts?: Post[];
};
const BlogList: React.FC<BlogListProps> = ({ posts = [] }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3 flex justify-between items-center">
        <div className="text-[30px] font-Century-Gothic-Bold">Inspiración</div>

        <div className="text-[#006FDC] text-[15px] font-Century-Gothic-Bold">
          <Link   href={`/blog`}>Ver todos</Link>
        </div>
      </div>
      <div className="col-span-full overflow-x-auto">
        <div className="grid grid-cols-3 gap-4 w-[1040px] lg:w-full">
          {posts.map((post, i) => (
            <BlogOne key={i} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
