// components/product/ProductPageLayout.tsx
import React from 'react';
import { ProductType } from '@/utils/types/generated';
import StaticMeta from '@/components/utils/StaticMeta';
import ProductLayout from '@/components/layouts/ProductLayout';

type ProductPageLayoutProps = {
  product: ProductType;
  children: React.ReactNode;
  asPath: string;
};

const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({
  product,
  children,
  asPath,
}) => {
  return (
    <ProductLayout>
      <StaticMeta
        title={product?.name as string}
        description={`Sanimex: ${product?.name}` as string}
        asPath={asPath}
        image={(product as any)?.featuredImage?.node.sourceUrl as string}
        product={product as any}
      />
      <div className="my-4 lg:my-12">{children}</div>
    </ProductLayout>
  );
};

export default ProductPageLayout;
