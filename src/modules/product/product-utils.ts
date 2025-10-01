import {
  PaMarcas,
  PaMaterial,
  Product,
  SimpleProduct,
  FetchAllMarcasQuery,
  FetchAllMaterialQuery,
  Cart,
  StockStatusEnum,
  VariableProduct,
  PaColor,
  VariationAttribute,
  GlobalProductAttribute,
  ProductCategory,
  ProductTypesEnum,
  PaMedidasCm,
  PaCaja,
  PaUso,
  PaAcabado,
} from '@/utils/types/generated';
import currencyFormatter from 'currency-formatter';
import { ATTRIBUTES_ALLOWED, ATTRIBUTES_BAG_ALLOWED } from '@/utils/constants';
import {
  ProductCustom,
  ProductVariantFilter,
} from '@/modules/product/product-types';
import { AlgoliaHit } from '@/modules/algolia/algolia-types';

export const getProductBrand = (product: Product | undefined) => {
  return product?.allPaMarcas?.edges
    .map((edge) => (edge.node as PaMarcas).name)
    .join(' ,');
};

export const calculateDiscount = (product: Product | undefined): number => {
  if (
    !(
      product &&
      (product as SimpleProduct).price &&
      (product as SimpleProduct).regularPrice
    )
  )
    return 0;

  const price =
    (product as SimpleProduct).type === ProductTypesEnum.Variable
      ? (product as SimpleProduct).price?.split(' - ')[0]
      : (product as SimpleProduct).price;
  const regularPrice =
    (product as SimpleProduct).type === ProductTypesEnum.Variable
      ? (product as SimpleProduct).regularPrice?.split(' - ')[1]
      : (product as SimpleProduct).regularPrice;

  const currencyPrice = currencyFormatter.unformat(price as string, {
    code: 'USD',
  });

  const currencyRegularPrice = currencyFormatter.unformat(
    regularPrice as string,
    { code: 'USD' },
  );

  return currencyRegularPrice - currencyPrice;
};

export const getBrands = (brands: FetchAllMarcasQuery | undefined) => {
  return (
    (brands?.allPaMarcas?.edges.map((edge) => edge.node) as PaMarcas[]) || []
  );
};

export const getMaterials = (materials: FetchAllMaterialQuery | undefined) => {
  return (
    (materials?.allPaMaterial?.edges.map(
      (edge) => edge.node,
    ) as PaMaterial[]) || []
  );
};

export const getPercentDiscount = (price: number, priceDiscount: number) => {
  if (!price) return 0;

  return parseFloat(((priceDiscount / price) * 100).toFixed(2));
};

export const getNecessaryProducts = (cart: Cart | undefined) => {
  return cart?.contents?.nodes
    .map(({ product }) => product?.node.upsell?.edges?.map((edge) => edge.node))
    .reduce((acc, curr) => {
      const data: Product[] = [];

      curr?.forEach((currentProduct) => {
        const findProduct = (acc as Product[]).find(
          (product) =>
            product.databaseId === (currentProduct as Product).databaseId,
        );
        if (!findProduct) data.push(currentProduct as Product);
      });
      return [...(acc || []), ...data];
    }, []);
};

export const checkProductInStock = (product: SimpleProduct | undefined) => {
  return product?.stockStatus === StockStatusEnum.InStock;
};
export const getMarca = (product?: Product) => {
  return product?.attributes?.nodes
    .filter((item: GlobalProductAttribute) => item.label === 'Marcas')
    .map((node: GlobalProductAttribute) => {
      const termName = node.terms?.nodes.length ? node.terms.nodes[0].name : '';
      return node.label === 'Marcas' ? termName : '';
    });
};
export const getVariableProduct = (
  product: VariableProduct,
  color: PaColor | undefined,
  measure: PaMedidasCm | undefined,
  box: PaCaja | undefined,
  uso: PaUso | undefined,
  acabado: PaAcabado | undefined,
): VariableProduct | undefined => {
  return (product as VariableProduct).variations?.nodes.find(
    (productVariation) => {
      const stockQuantity =
        productVariation &&
        (productVariation as VariableProduct).stockQuantity &&
        ((productVariation as VariableProduct).stockQuantity ?? 0) > 1;

      const attributes = (productVariation as VariableProduct).attributes
        ?.nodes;

      const attributeUso = attributes?.find(
        (attribute: VariationAttribute) => attribute.value === uso?.name,
      );

      const attributeBox = attributes?.find(
        (attribute: VariationAttribute) => attribute.value === box?.name,
      );

      const attributeColor = attributes?.find(
        (attribute: VariationAttribute) => attribute.value === color?.name,
      );

      const attributeMeasure = attributes?.find(
        (attribute: VariationAttribute) => attribute.value === measure?.name,
      );

      const attributeAcabado = attributes?.find(
        (attribute: VariationAttribute) => attribute.value === acabado?.name,
      );

      if (color && measure && box && uso) {
        return (
          stockQuantity &&
          attributeColor &&
          attributeMeasure &&
          attributeBox &&
          attributeUso
        );
      }

      if (color && measure && box) {
        return (
          stockQuantity && attributeColor && attributeMeasure && attributeBox
        );
      }

      if (color && uso && box) {
        return stockQuantity && attributeColor && attributeUso && attributeBox;
      }

      if (color && uso && measure) {
        return (
          stockQuantity && attributeColor && attributeMeasure && attributeUso
        );
      }

      if (box && uso && measure) {
        return (
          stockQuantity && attributeUso && attributeMeasure && attributeBox
        );
      }

      if (box && measure) {
        return stockQuantity && attributeBox && attributeMeasure;
      }

      if (measure && uso) {
        return stockQuantity && attributeMeasure && attributeUso;
      }

      if (box && uso) {
        return stockQuantity && attributeBox && attributeUso;
      }

      if (color && uso) {
        return stockQuantity && attributeColor && attributeUso;
      }

      if (color && box) {
        return stockQuantity && attributeColor && attributeBox;
      }

      if (color && measure) {
        return stockQuantity && attributeColor && attributeMeasure;
      }

      if (color) return attributeColor && stockQuantity;

      if (measure) return attributeMeasure && stockQuantity;

      if (uso) return attributeUso && stockQuantity;

      if (box) return attributeBox && stockQuantity;

      if (acabado) return attributeAcabado && stockQuantity;

      return false;
    },
  ) as VariableProduct;
};

export const getProductVariableByFilter = (
  product: VariableProduct,
  productVariantFilter: ProductVariantFilter[],
) => {
  return (product as VariableProduct).variations?.nodes.find(
    (productVariation) => {
      const stockQuantity =
        productVariation &&
        (productVariation as VariableProduct).stockQuantity &&
        ((productVariation as VariableProduct).stockQuantity ?? 0) > 1;

      const attributes = (productVariation as VariableProduct).attributes
        ?.nodes;

      const selectedAttributes = attributes?.filter(
        (attribute: VariationAttribute) =>
          productVariantFilter.find(
            (productVariant) =>
              productVariant &&
              productVariant.databaseId === attribute.attributeId,
          ),
      );

      return (
        selectedAttributes?.length === productVariantFilter.length &&
        stockQuantity
      );
    },
  ) as VariableProduct;
};

export const getProductVariableFilter = (
  product: VariableProduct,
  node: ProductVariantFilter,
  productVariantFilter: ProductVariantFilter[],
) => {
  return (product as VariableProduct).variations?.nodes.find(
    (productVariation) => {
      const stockQuantity =
        productVariation &&
        (productVariation as VariableProduct).stockQuantity &&
        ((productVariation as VariableProduct).stockQuantity ?? 0) > 1;

      const attributes = (productVariation as VariableProduct).attributes
        ?.nodes;

      const currentValue = attributes?.find(
        (attribute: VariationAttribute) =>
          attribute.attributeId === node.databaseId,
      );

      if (!currentValue) return false;
      if (!productVariantFilter.length) return true;

      const selectedAttributes = attributes?.filter(
        (attribute: VariationAttribute) =>
          productVariantFilter.find(
            (productVariant) =>
              productVariant.databaseId === attribute.attributeId,
          ),
      );

      return selectedAttributes?.length && currentValue && stockQuantity;
    },
  ) as VariableProduct;
};

export const getProductAttributeBox = (
  product: Product | undefined,
): GlobalProductAttribute => {
  return product?.attributes?.nodes.find((node) =>
    ATTRIBUTES_ALLOWED.includes(
      (node as GlobalProductAttribute).slug as string,
    ),
  ) as GlobalProductAttribute;
};

export const getProductAttributeBag = (
  product: Product | undefined,
): GlobalProductAttribute => {
  return product?.attributes?.nodes.find((node) =>
    ATTRIBUTES_BAG_ALLOWED.includes(
      (node as GlobalProductAttribute).slug as string,
    ),
  ) as GlobalProductAttribute;
};

export const cleanProductAttributeBoxOption = (
  productAttribute: GlobalProductAttribute | undefined,
  box: PaCaja | undefined,
): number => {
  if (
    !(
      productAttribute &&
      productAttribute.options &&
      productAttribute.options.length
    )
  )
    return 1;

  const value =
    productAttribute.options.find((option) => option === box?.slug) ?? '';
  const productBoxMtr = value?.replace('MTS', '').replace('-', '.').trim();
  return productBoxMtr ? parseFloat(productBoxMtr) : 1;
};

export const cleanProductAttributeBagOption = (
  productAttribute: GlobalProductAttribute | undefined,
): number => {
  if (!productAttribute) return 1;

  const value =
    productAttribute.options && productAttribute.options.length
      ? productAttribute.options[0]
      : '';
  const productBagKg = value?.replace(/\s|-|kgs|KGS|kg/g, '?').trim();
  return productBagKg ? parseFloat(productBagKg) : 1;
};

export const CATEGORY_CALCULATOR_ALLOWED = ['boquillas', 'juntas'];

export const getProductCategory = (
  product: Product | undefined,
  category: string,
) => {
  return product?.productCategories?.nodes.find(
    (node) => (node as ProductCategory).slug === category,
  );
};

export const calculateProductCustomDiscount = (
  product: ProductCustom | undefined,
): number => {
  if (!(product && product.price && product.regularPrice)) return 0;

  const price = currencyFormatter.unformat(product.price as string, {
    code: 'USD',
  });
  const regularPrice = currencyFormatter.unformat(
    product.regularPrice as string,
    { code: 'USD' },
  );

  return regularPrice - price;
};

export const calculateAlgoliaProductCustomDiscount = (
  product: AlgoliaHit | undefined,
): number => {
  if (!(product && product.price && product.regular_price)) return 0;

  return product.regular_price - product.price;
};

export const getStock = (product: SimpleProduct | undefined) => {
  return product?.stockQuantity as number;
};

export const generateProductVariableFilter = (
  node?: ProductVariantFilter,
  productVariantFilter: ProductVariantFilter[] = [],
  taxonomyName: string = '',
) => {
  if (node) {
    const filterList = productVariantFilter.filter(
      (_productVariantFilter) =>
        _productVariantFilter.taxonomyName !== node.taxonomyName,
    );
    filterList.push(node);
    return filterList;
  }
  return productVariantFilter.filter(
    (_productVariantFilter) =>
      _productVariantFilter.taxonomyName !== taxonomyName,
  );
};
