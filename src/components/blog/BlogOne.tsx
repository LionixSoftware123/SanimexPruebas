import React from 'react';

import moment from 'moment';
import 'moment/locale/es';

import { Post } from '@/utils/types/generated';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
type BlogOneProps = {
  post?: Post;
};

const BlogOne: React.FC<BlogOneProps> = ({ post }) => {
  return (
    <div>
      <div className="relative w-full h-[250px]">
        <Link   href={`/blog/${post?.slug}`}>
          <ImageWithFallback
            fill
            style={{ objectFit: 'cover' }}
            src={post?.featuredImage?.node.sourceUrl as string}
            alt={post?.title as string}
          />
        </Link>
      </div>
      <div className="border-b-[2px] border-b-[#7F7F7F] py-4 text-[18px] font-Century-Gothic h-[82px]">
        <Link   href={`/blog/${post?.slug}`} className="line-clamp-2 font-bold">
          {post?.title}
        </Link>
      </div>
      <div>
        <p className="text-[#999999] text-[12px] my-2 font-Century-Gothic">
          Publicado el {moment(post?.date).format('DD [de] MMMM, YYYY')}
        </p>
        <div>
          <div
            className="line-clamp-2 "
            dangerouslySetInnerHTML={{ __html: post?.excerpt as string }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogOne;
