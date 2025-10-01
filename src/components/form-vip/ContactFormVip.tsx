import React, { useState } from 'react';
import Link from 'next/link';

type ContactFormVipProps = {
  onFormSubmit: (formData: any) => void;
};

const companyOptions = [
  'German Concepts',
  'Surface Care Solutions',
  'Allapsa',
  'American Standard | Grohe',
  'Aquaforte',
  'Bemis',
  'Castel',
  'Ceramosa',
  'Chudej',
  'Cocemex | Dune',
  'Corona',
  'Crest',
  'D Arredi',
  'Doscien',
  'Fauno',
  'Fila',
  'Firenze',
  'Formacryl',
  'Frazzy',
  'Greda',
  'Hansgrohe',
  'Hernan',
  'Izuzzu',
  'Lamosa',
  'Libra',
  'Magamex',
  'Moldupiso',
  'Niasa',
  'Novaimagen',
  'Perdura/Solutek',
  'Porcelanite',
  'Redtools',
  'Rheem',
  'Royomex',
  'Rugo',
  'Tamex',
  'Tendenzza',
  'Uniblock',
  'GSA',
  'SA',
  'Otros (Indicar)',
];

const DefaultCompanyOptions = [
  'German Concepts',
  'Surface Care Solutions',
  'Allapsa',
  'American Standard | Grohe',
  'Aquaforte',
  'Bemis',
  'Castel',
  'Ceramosa',
  'Chudej',
  'Cocemex | Dune',
  'Corona',
  'Crest',
  'D Arredi',
  'Doscien',
  'Fauno',
  'Fila',
  'Firenze',
  'Formacryl',
  'Frazzy',
  'Greda',
  'Hansgrohe',
  'Hernan',
  'Izuzzu',
  'Lamosa',
  'Libra',
  'Magamex',
  'Moldupiso',
  'Niasa',
  'Novaimagen',
  'Perdura/Solutek',
  'Porcelanite',
  'Redtools',
  'Rheem',
  'Royomex',
  'Rugo',
  'Tamex',
  'Tendenzza',
  'Uniblock',
  'GSA',
  'SA',
];

const isPredefinedCompany = (company: string) =>
  DefaultCompanyOptions.includes(company);

const ContactFormVip: React.FC<ContactFormVipProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    employee: '',
    whatsapp: '',
    referral: '',
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-transparent   font-Century-Gothic">
      <form onSubmit={handleSubmit}>
        <FormField
          label="Nombre completo"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Correo electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-left">
            Empresa a la que perteneces
          </label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-left"
            required
          >
            <option value="">Selecciona una empresa</option>
            {companyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            {!isPredefinedCompany(formData.company) && formData.company && (
              <option value={formData.company}>{formData.company}</option>
            )}
          </select>
        </div>
        {!isPredefinedCompany(formData.company) && (
          <FormField
            label="Indica la Empresa a la que perteneces"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Indica el nombre de la empresa"
            required
          />
        )}
        {formData.company && (
          <FormField
            label="Numero de Empleado"
            type="text"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            placeholder="Indica el numero de Empleado"
            required
          />
        )}
        <FormField
          label="WhatsApp"
          type="number"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-left">
            ¿Cómo te enteraste de nuestra venta especial?
          </label>
          <select
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-left"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Amigos">Amigos</option>
            <option value="Familiar">Familiar</option>
            <option value="Conocido">Conocido</option>
            <option value="Empresa">Empresa</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="form-checkbox"
              required
            />
            <Link
              href="/terminos-y-condiciones"
              className="text-left items-center justify-center flex"
            >
              <span className="ml-2 text-gray-700 text-[10px]">
                He entendido, autorizo y acepto las bases y condiciones de la
                Promoción “Venta Especial Sanimex”
              </span>
            </Link>
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-3 py-2 bg-[#1C355E] text-white rounded-md hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  placeholder = '',
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-left">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-md"
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default ContactFormVip;
