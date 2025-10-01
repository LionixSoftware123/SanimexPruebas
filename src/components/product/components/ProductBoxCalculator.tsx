import React, { useEffect, useState } from 'react';
import {
  SimpleProduct,
  PaCaja,
  VariableProduct,
} from '@/utils/types/generated';
import { useToasts } from 'react-toast-notifications';
import Calculator from '@/images/icon-caja.svg';
import IconCalcWhite from '@/images/icon-calculadora-white.svg';
import {
  cleanProductAttributeBoxOption,
  getProductAttributeBox,
} from '@/modules/product/product-utils';

type ProductBoxCalculatorProps = {
  product?: SimpleProduct;
  onQuantity?: (quantity: number) => void;
  quantity?: number;
  active?: boolean;
  variantBox?: PaCaja;
  variantProduct?: VariableProduct;
  clear?: boolean;
};

const ProductBoxCalculator: React.FC<ProductBoxCalculatorProps> = ({
  product,
  quantity = 0,
  onQuantity = () => {},
  active = true,
  variantBox,
  variantProduct,
  clear,
}) => {
  const [mtr, setMtr] = useState(0);
  const [box, setBox] = useState(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const { addToast } = useToasts();

  const calculateData = () => {
    const stockQuantity = variantProduct
      ? variantProduct.stockQuantity
      : product?.stockQuantity;
    const productAttributeBox = getProductAttributeBox(product);
    const productBox =
      (product?.allPaCaja?.edges.map((edge) => edge.node) as PaCaja[]) || [];
    let _box = productBox.find((_productBox) => _productBox);
    if (variantBox) _box = variantBox;
    if (!stockQuantity) {
      return addToast('El producto no se encuentra disponible', {
        appearance: 'error',
      });
    }

    if (mtr <= 0) {
      return addToast('El metraje tiene que ser mayor a 0', {
        appearance: 'error',
      });
    }
    const quantityBox =
      mtr / cleanProductAttributeBoxOption(productAttributeBox, _box);
    if (Math.ceil(quantityBox) > stockQuantity) {
      return addToast(
        `Solo hay ${
          stockQuantity === 1 ? 'disponible' : 'disponibles'
        } ${stockQuantity} ${
          stockQuantity === 1 ? 'unidad' : 'unidades'
        } de este producto`,
        {
          appearance: 'error',
        },
      );
    }

    setBox(Math.ceil(quantityBox));
    onQuantity(Math.ceil(quantityBox));
    setShowMessage(true);
  };

  const updateQuantity = (checked: boolean) => {
    const stockQuantity = variantProduct
      ? variantProduct.stockQuantity
      : product?.stockQuantity;
    const additionalQuantity = Math.ceil(quantity * 0.1);

    if (quantity + additionalQuantity > (stockQuantity || 0)) {
      return addToast(
        `Solo hay ${
          stockQuantity === 1 ? 'disponible' : 'disponibles'
        } ${stockQuantity} ${
          stockQuantity === 1 ? 'unidad' : 'unidades'
        } de este producto`,
        {
          appearance: 'error',
        },
      );
    }

    if (checked) onQuantity(quantity + additionalQuantity);
    else onQuantity(box);
    setChecked(checked);
  };

  useEffect(() => {
    setMtr(0);
  }, [clear]);

  return (
    <div>
      <div className="flex font-Century-Gothic-Bold text-[16px] mb-4">
        <Calculator className="mr-4 lg:block hidden" />
        ¿Cuántas cajas debo comprar?
      </div>
      <div className="flex border-b-[#B2B2B2] border rounded-[5px] h-[45px] w-full bg-[#F9F9F9] items-center justify-between px-1 lg:px-3 py-2">
        <div className="hidden lg:block text-[14px] font-Century-Gothic lg:mr-2">
          Indica los m<sup>2</sup> del área a cubrir
        </div>
        <div className="lg:hidden text-[12px] font-Century-Gothic ">
          Indica los metros cuadrados.
        </div>
        <div className="h-full border-l mr-2"></div>
        <div className="flex items-center justify-between">
          <input
            value={mtr}
            onChange={(event) => {
              const value = parseInt(event.target.value);
              setShowMessage(false);
              setMtr(value);
            }}
            type="number"
            className="w-[20px] lg:w-[50px] border-t-[#B2B2B2] border-b-[#B2B2B2] border h-[22px] mr-2 text-[#F17523] text-end font-bold pr-1"
          />
          m<sup className="block">2</sup>
          {active ? (
            <button
              onClick={() => calculateData()}
              className="rounded-[5px] bg-[#0033A1] h-[30px] flex items-center text-white text-[14px] px-4 justify-center ml-2"
            >
              Calcular
              <IconCalcWhite className="ml-4   transparent" />
            </button>
          ) : (
            <div className="rounded-[5px] bg-[#0033A1] bg-opacity-60 h-[30px] flex items-center text-white text-[14px] px-4 justify-center ml-2">
              Calcular
              <IconCalcWhite className="ml-4   transparent" />
            </div>
          )}
        </div>
      </div>
      <div className="py-6 font-Century-Gothic-Bold">
        <div className="flex flex-row gap-4">
          <div className="flex py-2 lg:py-0">
            <button
              onClick={() => {
                updateQuantity(!checked);
              }}
              className="rounded-[2px] border border-[#919191] w-[12px] h-[12px] mx-2 flex self-center"
            >
              <div
                className={`${
                  checked ? 'bg-[#F17523]' : 'bg-white'
                } rounded-[2px] mx-auto flex self-center  w-[8px] h-[8px]`}
              ></div>
            </button>
            <span className="text-[#111111] text-[10px] flex self-center">
              Agregar material
            </span>
          </div>
          <label className="lg:flex text-[#B2B2B2]  text-[10px] text-end">
            Recomendamos un 10% adicional por cortes, zoclos y reemplazos
          </label>
        </div>
        {showMessage ? (
          <div className="text-[14px] text-[#000] my-3 ml-2">
            Necesitaras <span className="text-[#F17523]">{box} cajas</span> para
            los <span>{mtr}</span> m<sup>2</sup>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductBoxCalculator;
