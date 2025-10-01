import React, { ChangeEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSendContactFormMutation } from '@/utils/types/generated';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import PhoneInput from 'react-phone-number-input';

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));
const ShareBox = dynamic(() => import('@/components/utils/ShareBox'));

type ContactProps = {
  toogle: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

const initialState = {
  firstName: '',
  pdv: '',
  email: '',
  businessname: '',
  project: '',
  worktype: '',
  stage: '',
  direction: {},
  projectdescription: '',
  materials: {},
  pdvDirection: {},
  whatsapp: '',
};

const Contact: React.FC<ContactProps> = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const [isChecked, setChecked] = useState<boolean>(false);
  const [data, setData] = useState<any>(initialState);
  const [reset, setReset] = useState<boolean>(false);

  const [sendContactForm, { loading }] = useSendContactFormMutation({
    onCompleted: ({ sendContactForm }) => {
      if (sendContactForm?.success) {
        addToast('Mensaje enviado con éxito.', {
          appearance: 'success',
        });
        setReset(true);
      } else {
        addToast('Tenemos problemas para enviar el formulario.', {
          appearance: 'error',
        });
      }
    },
    onError: () => {
      addToast('Tenemos problemas para enviar el formulario.', {
        appearance: 'error',
      });
    },
  });
  const [error, setError] = useState('');
  const [project, setProject] = useState('');
  const [materials, setMaterials] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [direction, setDirection] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pdv, setPdv] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappError, setWhatsappError] = useState('');
  const [pdvDirection, setPdvDirection] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [businessName, setBusinessName] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'project') {
      setProject(event.target.value);
    }
    if (event.target.name === 'businessname') {
      setBusinessName(event.target.value);
    }

    if (event.target.name === 'firstName') {
      setFirstName(event.target.value);
    }

    if (event.target.value.trim() === '') {
      setError('El nombre completo es requerido');
    } else {
      setError('');
    }

    if (event.target.name === 'email') {
      setEmail(event.target.value);

      if (event.target.value.trim() === '') {
        setEmailError('El correo electrónico es requerido');
      } else {
        setEmailError('');
      }
    }
  };

  const handlePhoneChange = (value: string) => {
    setWhatsapp(value);

    setData((prevData: any) => ({
      ...prevData,
      whatsapp: value,
    }));

    console.log('datawhatsapp', data);

    if (!value) {
      setWhatsappError('El número de WhatsApp es requerido');
    } else {
      setWhatsappError('');
    }
  };

  const handlePhoneSecondaryChange = (value: string) => {
    setSecondaryPhone(value);

    setData((prevData: any) => ({
      ...prevData,
      secondaryPhone: value,
    }));
  };

  const handleMaterialsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setMaterials((prevMaterials) => [...prevMaterials, event.target.value]);
    } else {
      setMaterials((prevMaterials) =>
        prevMaterials.filter((material) => material !== event.target.value),
      );
    }
  };

  const handleChange = (event: { target: { value: any; checked: any } }) => {
    let newMaterials = [...materials];

    if (event.target.checked) {
      newMaterials.push(event.target.value as never);
    } else {
      newMaterials = newMaterials.filter(
        (material) => material !== event.target.value,
      );
    }

    setMaterials(newMaterials);

    setData({
      ...data,
      materials: newMaterials,
    });
  };

  const handlePdvChange = (event: any) => {
    setPdv(event.target.value);
    setData((prevData: any) => ({ ...prevData, pdv: event.target.value }));
  };

  const handlePdvDirectionChange = (event: {
    target: { value: any; checked: any };
  }) => {
    let newPdvDirection = [...(pdvDirection as any)];

    if (event.target.checked) {
      newPdvDirection.push(event.target.value as never);
    }

    setPdvDirection(newPdvDirection as any);

    setData({
      ...data,
      pdvDirection: newPdvDirection,
    });
  };

  const handleDirectionChange = (event: {
    target: { value: any; checked: any };
  }) => {
    let newDirection = [...(direction as any)];

    if (event.target.checked) {
      newDirection.push(event.target.value as never);
    }

    setDirection(newDirection as any);

    setData({
      ...data,
      direction: newDirection,
    });
  };

  useEffect(() => {
    setData((prevData: any) => ({
      ...prevData,
      materials: materials,
    }));
  }, [materials]);

  useEffect(() => {
    setData({
      firstName: '',
      pdv: '',
      email: '',
      businessname: '',
      project: '',
      worktype: '',
      stage: '',
      direction: '',
      projectdescription: '',
      materials: {},
      pdvDirection: {},
      whatsapp: '',
    });
    setFirstName('');
    setPdv('');
    setFirstName('');
    setSecondaryPhone('');
    setPdvDirection('');
    setWhatsapp('');
    setEmail('');
    setBusinessName('');
    setProject('');
    setChecked(false);
  }, [reset]);

  initialState.direction = [initialState.direction];

  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex - Contáctanos'}
        description={'Sanimex - Contáctanos'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="relative h-[200px] md:h-[340px] bg-cover bg-no-repeat bg-center bg-[url('../images/banner-contactanos-fix.png')]">
        <Container classes="w-full h-full  flex items-end">
          <div className="uppercase font-Century-Gothic font-bold text-[30px] leading-[30px] md:leading-[54px] md:text-[54px] text-white">
            Contáctanos
          </div>
        </Container>
      </div>
      <Container>
        <>
          <div className="lg:w-[1000px] my-4 md:my-[60px] mx-auto bg-[#F9F9F9] border border-[#B2B2B2]">
            <div className="px-4 lg:px-[165px] mt-[100px] mb-[59px]">
              <div className="uppercase mb-[40px] text-[24px] font-Century-Gothic-Bold text-center">
                Déjanos tus datos y te contactaremos
              </div>
              <div className=" grid grid-cols-2 gap-2">
                <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference col-span-2">
                  <label className="mb-1 pr-2 font-bold">Nombre completo</label>
                  <input
                    className="h-[32px] border border-[#DFDFDF]"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    required
                  />
                  {error && <p className="error text-[red]">{error}</p>}
                </div>

                <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference col-span-2">
                  <label className="mb-1 pr-2 font-bold">Razón social</label>
                  <input
                    className="h-[32px] border border-[#DFDFDF]"
                    type="text"
                    name="businessname"
                    value={businessName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference col-span-2">
                  <label className="mb-1 pr-2 font-bold">
                    Correo electrónico
                  </label>
                  <input
                    className="h-[32px] border border-[#DFDFDF]"
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                  {emailError && (
                    <p className="error text-[red]">{emailError}</p>
                  )}
                </div>
                <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference lg:col-span-1 col-span-2">
                  <label className="mb-1 pr-2 font-bold">WhatsApp</label>
                  <PhoneInput
                    style={{
                      height: '32px',
                      border: '1px solid #DFDFDF',
                      padding: '0px 0px 0px 10px',
                      backgroundColor: '#fff',
                    }}
                    defaultCountry="MX"
                    value={whatsapp}
                    onChange={handlePhoneChange}
                    countryCallingCodeEditable={false}
                  />

                  {whatsappError && (
                    <p className="error text-[red]">{whatsappError}</p>
                  )}
                </div>
                <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference  lg:col-span-1 col-span-2">
                  <label className="mb-1 pr-2  font-bold">
                    Teléfono secundario
                  </label>

                  <PhoneInput
                    style={{
                      height: '32px',
                      border: '1px solid #DFDFDF',
                      padding: '0px 0px 0px 10px',
                      backgroundColor: '#fff',
                    }}
                    defaultCountry="MX"
                    value={secondaryPhone}
                    onChange={handlePhoneSecondaryChange}
                    countryCallingCodeEditable={false}
                  />
                </div>

                <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference col-span-2">
                  <label className="mb-1 pr-2  font-bold">
                    Motivo de tu solicitud
                  </label>
                  <select
                    className="h-[32px] border border-[#DFDFDF]"
                    name="project"
                    value={project}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      onChange(event as any)
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Constructora">Constructora</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Mayorista">Mayorista</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {(project === 'Despacho' ||
                  project === 'Constructora' ||
                  project === 'Freelance') && (
                  <>
                    <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference col-span-2">
                      <label className="mb-1 pr-2  font-bold">
                        Tipo de obra
                      </label>
                      <select
                        className="h-[32px] border border-[#DFDFDF]"
                        name="worktype"
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                          onChange(event as any)
                        }
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Licitacion">Licitación</option>
                        <option value="Propuesta">Propuesta</option>
                        <option value="Obra en Ejecución">
                          Obra en Ejecución
                        </option>
                      </select>
                    </div>

                    <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference  col-span-2">
                      <label className="mb-1 pr-2  font-bold">
                        Etapa y descripción de la obra
                      </label>
                      <input
                        className="h-[32px] border border-[#DFDFDF]"
                        type="text"
                        name="stage"
                        onChange={onChange}
                      />
                    </div>

                    <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference  col-span-2">
                      <label className="mb-1 pr-2  font-bold">
                        Ubicación del proyecto
                      </label>
                      <div className="flex w-[100%]">
                        <div className="w-[50%]">
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Aguascalientes"
                              onChange={handleDirectionChange}
                            />{' '}
                            Aguascalientes
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Baja California"
                              onChange={handleDirectionChange}
                            />{' '}
                            Baja California
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Baja California Sur"
                              onChange={handleDirectionChange}
                            />{' '}
                            Baja California Sur
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Campeche"
                              onChange={handleDirectionChange}
                            />{' '}
                            Campeche
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Chiapas"
                              onChange={handleDirectionChange}
                            />{' '}
                            Chiapas
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Chihuahua"
                              onChange={handleDirectionChange}
                            />{' '}
                            Chihuahua
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Coahuila"
                              onChange={handleDirectionChange}
                            />{' '}
                            Coahuila
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Colima"
                              onChange={handleDirectionChange}
                            />{' '}
                            Colima
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Durango"
                              onChange={handleDirectionChange}
                            />{' '}
                            Durango
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Guanajuato"
                              onChange={handleDirectionChange}
                            />{' '}
                            Guanajuato
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Guerrero"
                              onChange={handleDirectionChange}
                            />{' '}
                            Guerrero
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Hidalgo"
                              onChange={handleDirectionChange}
                            />{' '}
                            Hidalgo
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Jalisco"
                              onChange={handleDirectionChange}
                            />{' '}
                            Jalisco
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Ciudad de México"
                              onChange={handleDirectionChange}
                            />{' '}
                            Ciudad de México
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Michoacán"
                              onChange={handleDirectionChange}
                            />{' '}
                            Michoacán
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Morelos"
                              onChange={handleDirectionChange}
                            />{' '}
                            Morelos
                          </div>
                        </div>

                        <div className="w-[50%]">
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Nayarit"
                              onChange={handleDirectionChange}
                            />{' '}
                            Nayarit
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Nuevo León"
                              onChange={handleDirectionChange}
                            />{' '}
                            Nuevo León
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Oaxaca"
                              onChange={handleDirectionChange}
                            />{' '}
                            Oaxaca
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Puebla"
                              onChange={handleDirectionChange}
                            />{' '}
                            Puebla
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Querétaro"
                              onChange={handleDirectionChange}
                            />{' '}
                            Querétaro
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Quintana Roo"
                              onChange={handleDirectionChange}
                            />{' '}
                            Quintana Roo
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="San Luis Potosí"
                              onChange={handleDirectionChange}
                            />{' '}
                            San Luis Potosí
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Sinaloa"
                              onChange={handleDirectionChange}
                            />{' '}
                            Sinaloa
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Sonora"
                              onChange={handleDirectionChange}
                            />{' '}
                            Sonora
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Tabasco"
                              onChange={handleDirectionChange}
                            />{' '}
                            Tabasco
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Tamaulipas"
                              onChange={handleDirectionChange}
                            />{' '}
                            Tamaulipas
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Tlaxcala"
                              onChange={handleDirectionChange}
                            />{' '}
                            Tlaxcala
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Veracruz"
                              onChange={handleDirectionChange}
                            />{' '}
                            Veracruz
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Yucatán"
                              onChange={handleDirectionChange}
                            />{' '}
                            Yucatán
                          </div>
                          <div className="mx-2">
                            <input
                              type="checkbox"
                              name="direction"
                              value="Zacatecas"
                              onChange={handleDirectionChange}
                            />{' '}
                            Zacatecas
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference col-span-2">
                      <label className="mb-1 pr-2  font-bold">
                        Materiales de interés
                      </label>
                      <div className="grid lg:grid-cols-2">
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Pisos"
                            onChange={handleChange}
                          />{' '}
                          Pisos
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Muros"
                            onChange={handleChange}
                          />{' '}
                          Muros
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Sanitarios"
                            onChange={handleChange}
                          />{' '}
                          Sanitarios
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Adhesivos"
                            onChange={handleChange}
                          />{' '}
                          Adhesivos
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Material de Instalación"
                            onChange={handleChange}
                          />{' '}
                          Material de Instalación
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Muebles para baño"
                            onChange={handleChange}
                          />{' '}
                          Muebles para baño
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Grifería"
                            onChange={handleChange}
                          />{' '}
                          Grifería
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Canceles"
                          />{' '}
                          Canceles
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Calentadores"
                            onChange={handleChange}
                          />{' '}
                          Calentadores
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Institucional"
                            onChange={handleChange}
                          />{' '}
                          Institucional
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Institucional"
                            onChange={handleChange}
                          />{' '}
                          Lavabos
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Tinas"
                            onChange={handleChange}
                          />{' '}
                          Tinas
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Accesorios"
                            onChange={handleChange}
                          />{' '}
                          Accesorios
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Espejos"
                            onChange={handleChange}
                          />{' '}
                          Espejos
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Tarjas"
                            onChange={handleChange}
                          />{' '}
                          Tarjas
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Coladeras"
                            onChange={handleChange}
                          />{' '}
                          Coladeras
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {project === 'Mayorista' && (
                  <>
                    <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference  col-span-2">
                      <label className="mb-1 pr-2 font-bold">
                        ¿Cuenta con Punto de Venta?
                      </label>
                      <select
                        className="h-[32px] border border-[#DFDFDF]"
                        name="pdv"
                        value={pdv}
                        onChange={handlePdvChange}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    {pdv === 'Si' && (
                      <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference  col-span-2">
                        <label className="mb-1 pr-2 font-bold">
                          ¿En dónde?
                        </label>
                        <div className="flex w-[100%]">
                          <div className="w-[50%]">
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Aguascalientes"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Aguascalientes
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Baja California"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Baja California
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Baja California Sur"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Baja California Sur
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Campeche"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Campeche
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Chiapas"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Chiapas
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Chihuahua"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Chihuahua
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Coahuila"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Coahuila
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Colima"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Colima
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Durango"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Durango
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Guanajuato"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Guanajuato
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Guerrero"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Guerrero
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Hidalgo"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Hidalgo
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Jalisco"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Jalisco
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Ciudad de México"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Ciudad de México
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Michoacán"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Michoacán
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Morelos"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Morelos
                            </div>
                          </div>

                          <div className="w-[50%]">
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Nayarit"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Nayarit
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Nuevo León"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Nuevo León
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Oaxaca"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Oaxaca
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Puebla"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Puebla
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Querétaro"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Querétaro
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Quintana Roo"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Quintana Roo
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="San Luis Potosí"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              San Luis Potosí
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Sinaloa"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Sinaloa
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Sonora"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Sonora
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Tabasco"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Tabasco
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Tamaulipas"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Tamaulipas
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Tlaxcala"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Tlaxcala
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Veracruz"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Veracruz
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Yucatán"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Yucatán
                            </div>
                            <div className="mx-2">
                              <input
                                type="checkbox"
                                name="pdvdirection"
                                value="Zacatecas"
                                onChange={handlePdvDirectionChange}
                              />{' '}
                              Zacatecas
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference  col-span-2">
                      <label className="mb-1 pr-2 font-bold">
                        Materiales Comercializados
                      </label>
                      <div className="grid lg:grid-cols-2">
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Piso Nacional"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Piso Nacional
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Piso Importado"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Piso Importado
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Piedra"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Piedra
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Adhesivo"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Adhesivo
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Sanitarios"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Sanitarios
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Grifería"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Grifería
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Calentadores"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Calentadores
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Tinas"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Tinas
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Vitroblock"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Vitroblock
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Muebles"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Muebles
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            name="materials"
                            value="Institucional"
                            onChange={handleMaterialsChange}
                          />{' '}
                          Institucional
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {project === 'Otro' && (
                  <>
                    <div className="text-[14px] font-Century-Gothic mb-3 flex flex-col preference  col-span-2">
                      <label className="mb-1 pr-2  font-bold">
                        Describe tu proyecto
                      </label>

                      <textarea
                        className="h-[100px] border border-[#DFDFDF]"
                        name="projectdescription"
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                          onChange(event as any)
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              <div className=" grid lg:grid-cols-2 gap-x-8  col-span-2">
                <div className="mb-[30px] text-[12px] font-Century-Gothic col-span-full flex preference">
                  <div className="flex mx-auto mt-8">
                    <input
                      className=" mr-2 border border-[#DFDFDF]"
                      type="checkbox"
                      name="cheese"
                      onChange={(event) => setChecked(event.target.checked)}
                    />
                    <label className=" self-center">
                      Acepto y autorizo el
                      <span>
                        <Link   className="underline mx-2" href={'/'}>
                          tratamiento de mis datos personales
                        </Link>
                      </span>
                      a sanimex
                    </label>
                  </div>
                </div>

                <div className="col-span-full flex place-items-center">
                  <button
                    className="mx-auto text-white text-[14px] w-[142px] h-[31px] bg-[#0033A1]"
                    disabled={!isChecked}
                    onClick={() =>
                      sendContactForm({
                        variables: {
                          data,
                        },
                      })
                    }
                  >
                    {loading ? (
                      <div className="flex justify-center w-full">
                        <svg
                          aria-hidden="true"
                          className="inline w- h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Enviar
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
        <ShareBox />
      </Container>
    </RootLayout>
  );
};

export default Contact;
