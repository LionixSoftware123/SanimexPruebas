import React from 'react';

import Link from 'next/link';
import { Post } from '@/utils/types/generated';
import dynamic from 'next/dynamic';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
type InspirationCardProps = {
  post?: Post;
};

const InspirationCard: React.FC<InspirationCardProps> = ({ post }) => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-[120px] h-[60px] relative flex self-center">
          <Link   href={`/blog/${post?.slug}`}>
            <ImageWithFallback
              fill
              style={{ objectFit: 'cover' }}
              src={post?.featuredImage?.node.sourceUrl as string}
              alt={post?.title as string}
            />
          </Link>
        </div>
        <div className="pl-2 w-full">
          <Link   href={`/blog/${post?.slug}`}>{post?.title}</Link>
        </div>
      </div>
    </div>
  );
};

export default InspirationCard;
