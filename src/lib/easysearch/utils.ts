import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import pluralize from 'pluralize';
import {
  IProductStatus,
  IProductWhereInput,
} from '@/lib/easysearch/types/generated';
import { QueryObject, RouterQuery } from '@/lib/easysearch/types';
import omit from 'lodash/omit';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const productFilters = (
  search = '',
  color = '',
  brand = '',
  material = '',
  typologies = '',
  units = '',
  categories: string[] = [],
  variations?: { stock_status?: boolean },
) => {
  let where: IProductWhereInput = {
    status: IProductStatus.Publish,
  };
  let OR: IProductWhereInput[] = [];
  let AND: IProductWhereInput[] = [];

  if (search) {
    OR = [
      ...OR,
      {
        name: pluralize.singular(search),
      },
      {
        sku: pluralize.singular(search),
      },
      {
        description: pluralize.singular(search),
      },
    ];
  }

  if (color) {
    AND = [
      ...AND,
      {
        colors: color.split(','),
      },
    ];
  } else if (search) {
    OR = [
      ...OR,
      {
        colors: pluralize.singular(search),
      },
    ];
  }

  if (brand) {
    AND = [
      ...AND,
      {
        brands: brand.split(','),
      },
    ];
  } else if (search) {
    OR = [
      ...OR,
      {
        brands: pluralize.singular(search),
      },
    ];
  }

  if (material) {
    AND = [
      ...AND,
      {
        materials: material.split(','),
      },
    ];
  } else if (search) {
    OR = [
      ...OR,
      {
        materials: pluralize.singular(search),
      },
    ];
  }

  if (typologies) {
    AND = [
      ...AND,
      {
        typologies: typologies.split(','),
      },
    ];
  } else if (search) {
    OR = [
      ...OR,
      {
        typologies: pluralize.singular(search),
      },
    ];
  }

  if (units) {
    AND = [
      ...AND,
      {
        units: units.split(','),
      },
    ];
  } else if (search) {
    OR = [
      ...OR,
      {
        units: pluralize.singular(search),
      },
    ];
  }

  if (categories.length) {
    OR = [
      ...OR,
      {
        categories,
      },
    ];
  }

  if (variations?.stock_status !== undefined) {
    AND = [
      ...AND,
      {
        variations: {
          stock_status: variations.stock_status,
        },
      },
    ];
  }

  where = {
    ...where,
    OR,
    AND,
  };

  return where;
};

export const buildQuery = (object: QueryObject, routerQuery: RouterQuery) => {
  const { page, ...rest } = object;
  const query = Object.keys(rest).reduce<RouterQuery>(
    (acc, key) => {
      if (routerQuery[key] === rest[key] || rest[key] === '') {
        return omit(acc, key);
      } else {
        return { ...acc, [key]: rest[key] as string | string[] | undefined };
      }
    },
    { ...routerQuery },
  );

  if (page !== undefined) {
    query.page = page.toString();
  }

  return query;
};
