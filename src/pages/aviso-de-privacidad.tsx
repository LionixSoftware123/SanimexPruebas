import dynamic from 'next/dynamic';

import React from 'react';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));

const AvisoPrivacidad: React.FC = () => {
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Aviso de privacidad'}
        description={'Aviso de privacidad'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="font-Century-Gothic bg-cover bg-no-repeat bg-center bg-[url('../images/banner-aviso-priv.webp')] h-[200px] lg:h-[400px] w-full">
        <Container classes="w-full h-full  flex items-end">
          <div className=" text-[30px] leading-[30px] md:leading-[64px] md:text-[64px] text-white font-bold">
            Aviso de privacidad
          </div>
        </Container>
      </div>
      <Container>
        <div className="text-center mx-auto lg:w-[500px] h-[160px] items-center flex">
          AVISO DE PRIVACIDAD DE DATOS PERSONALES PARA COLABORADORES DE GRUPO
          SANIMEX AYUNTAMIENTO, S.A. DE C.V.
        </div>
      </Container>
      <Container classes="text-[#777777] mb-8">
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="mb-6">
            De conformidad con lo establecido en la Ley Federal de Protección de
            Datos Personales en Posesión de Particulares, le informamos que
            Grupo Sanimex Ayuntamiento, S.A. de C.V. (en adelante “GSA” o
            “nosotros”), con domicilio en Av. Via Morelos, km 15.5, Santa Clara
            Coatitla, C.P. 55540, Ecatepec de Morelos, Estado de México, será
            responsable del tratamiento de sus Datos Personales.
          </div>
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            1. Información Proporcionada por el Titular
          </div>
          <div className="pb-2">
            Hacemos de su conocimiento que derivado de la colaboración para
            poner a disposición de los clientes de GSA una lista de prestadores
            de servicios de colocación de pisos, acabados y accesorios para
            baños, GSA podrá solicitarle los siguientes datos generales: {'(i)'}{' '}
            nombre completo, {'(ii)'} Registro Federal de Contribuyentes,{' '}
            {'(iii)'} correo electrónico, {'(iv)'} domicilio, {'(v)'} número de
            teléfono, {'(vi)'} comprobantes e historial curricular, académico
            y/o profesional, {'(vii)'} cartas de recomendación, {'(viii)'}{' '}
            identificación oficial, y {'(ix)'} referencias personales.
          </div>
          <div className="pb-2">
            Al firmar este aviso de privacidad, usted otorga su consentimiento
            expreso para que tratemos sus Datos Personales. En caso de que usted
            no otorgue su consentimiento expreso para el tratamiento de sus
            Datos Personales (incluyendo sensibles y financieros), podríamos
            vernos imposibilitados para ofrecerle promoción ante nuestros
            clientes que requieran sus servicios de colocación de pisos,
            acabados y accesorios para baños.
          </div>
          <div className="pb-2">
            Le informamos que sus Datos Personales serán puestos a disposición
            de nuestros clientes mediante una aplicación informática propia o de
            terceros, en la que nuestros clientes podrán elegir los servicios de
            usted u otros colaboradores.
          </div>
        </div>
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            2. Medidas de Seguridad
          </div>
          <div className="pb-2">
            Tenga la seguridad de que GSA tomará las medidas de seguridad
            administrativas, técnicas y físicas establecidas por la Ley Federal
            de Protección de Datos Personales en Posesión de Particulares y su
            Reglamento para proteger su información y así evitar su daño,
            pérdida, destrucción, robo, extravío, alteración y/o tratamiento no
            autorizado.
          </div>
          <div className="pb-2">
            En caso de que GSA almacene y lleve a cabo el tratamiento de sus
            Datos Personales a través de sistemas informáticos o a través de
            Internet, hacemos de su conocimiento que derivado de que las
            comunicaciones electrónicas no son totalmente seguras y que
            cualquier sistema informático se encuentra expuesto a posibles
            vulnerabilidades que puedan afectar su funcionamiento o seguridad,
            GSA no puede garantizar que no haya daños, pérdidas, destrucciones,
            extravíos, alteraciones o tratamientos no autorizados.
          </div>
        </div>
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            3. Obtención de los Datos Personales
          </div>
          <div className="">
            GSA podrá recabar sus Datos Personales ya sea directamente cuando
            usted así nos los proporcione y/o a través de otros medios tal y
            como lo es el correo electrónico y nuestro sitio web, o cuando usted
            comparte documentación con nosotros. GSA no utiliza cookies, web
            beacons o medios remotos de comunicación electrónica, óptica o de
            otra tecnología que permitan recabar datos de manera automática.
          </div>
        </div>
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            4. Finalidad del Tratamiento de Datos
          </div>
          <div className="mb-6">
            Los Datos Personales que GSA obtenga, serán utilizados única y
            exclusivamente para las finalidades de participación en el programa
            informático de selección de prestadores de servicios para la
            colocación de acabados y accesorios para baños por parte de nuestros
            clientes; así como realizar evaluaciones, manejo, aprovechamiento,
            remisión, disposición y almacenamiento.
          </div>
          <div className="mb-6">
            Conforme a lo anterior, GSA tratará sus datos personales para las
            siguientes finalidades que dan origen o se consideran necesarias
            para la existencia, mantenimiento y cumplimiento de la colaboración
            entre usted y GSA: {'(i)'} el análisis de una posible contratación
            por parte de nuestros clientes de los servicios ofrecidos por usted
            como colocador de pisos, acabados y accesorios para baños; {'(ii)'}{' '}
            identificarlo como un prestador de servicios independientes sin
            subordinación alguna a GSA; {'(iii)'} que nuestros clientes lo
            contacten en caso de ser seleccionado para prestarle servicios
            independientes para la colocación de pisos, acabados y accesorios
            para baños; {'(iv)'} enviarle ofertas de servicios de nuestros
            clientes; {'(v)'} crear bases de datos{' '}
            {
              '(incluyendo bases de datos respecto de los datos sensibles que recabamos)'
            }{' '}
            para fines administrativos, de gestión de proveedores y prestadores
            de servicios; {'(vi)'} proporcionar información requerida por entes
            o autoridades gubernamentales o en cumplimiento de leyes o
            normatividad aplicable al negocio de GSA en los Estados Unidos
            Mexicanos o en el extranjero; {'(vii)'} atender cualquier queja,
            pregunta o comentario realizado por usted; y {'(viii)'} enviarle
            notificaciones de modificaciones a este aviso de privacidad.
          </div>
          <div className="">
            Adicionalmente, su información personal será utilizada para: (i)
            enviarle información acerca de GSA, sus filiales y accionistas en
            México y alrededor del mundo; (ii) proporcionar su información a
            terceros interesados en realizar negocios; y (iii) llevar a cabo
            fines publicitarios o de prospección comercial de GSA, sus filiales
            y accionistas en México o alrededor del mundo o terceros. Las
            finalidades antes mencionadas, no cuentan con la característica de
            dar origen o ser necesarias para la existencia, mantenimiento y
            cumplimiento de la colaboración entre GSA y usted,
          </div>
        </div>
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            5. Transferencia de Datos
          </div>
          <div className="mb-6">
            Le informamos que, para las finalidades de participación y selección
            en el programa de promoción de sus servicios independientes hacia
            nuestros clientes, sus Datos Personales podrán ser compartidos
            únicamente con aquellos clientes que accedan al programa informático
            de promoción de servicios de colocación de pisos, acabados y
            accesorios para baños.
          </div>
          <div className="">
            GSA se reserva el derecho de compartir sus Datos Personales con
            autoridades administrativas, judiciales o gubernamentales de
            cualquier tipo, en México o en el extranjero, siempre que así se
            establezca por mandato judicial o administrativo o que una ley así
            lo determine. De igual forma, como parte de las obligaciones de las
            partes derivadas de la relación de colaboración comercial con
            nosotros, queda entendido que GSA estará facultada para transferir
            sus Datos Personales a terceros con quienes comercialice pisos,
            acabados cerámicos y accesorios para baños (clientes), así como
            abogados, contadores y prestadores de servicios que utilicen sus
            Datos Personales por cuenta de GSA y únicamente conforme a las
            instrucciones de GSA. GSA no requiere su consentimiento para estas
            transferencias.
          </div>
        </div>
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            6. Derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO)
          </div>
          <div className="mb-8">
            Le recordamos que usted es dueño de sus Datos Personales por lo que
            usted o su representante legal, debidamente acreditado, podrá
            ejercer los derechos de acceso a los Datos Personales que poseemos y
            a los detalles del tratamiento de los mismos, de rectificación en
            caso de que estén incompletos o sean inexactos, de cancelación en
            caso de que considere que no se requieren para alguna de las
            finalidades señaladas en el presente Aviso de Privacidad, estén
            siendo utilizados para finalidades que no hayan sido consentidas u
            de oposición al tratamiento de los Datos Personales que nos haya
            proporcionado para fines específicos, poniéndose en contacto con
            nuestro Departamento de Datos Personales en el domicilio citado en
            este Aviso de Privacidad o en el correo electrónico
            gsadatospersonlaes@sanimex.com.mx Para efectos de lo anterior
            anexamos a la presente el formato de solicitud de ejercicio de
            derechos, la cual usted podrá solicitar en cualquier momento a
            nuestro departamento de datos personales.
          </div>
          <div className="">
            En términos de la ley aplicable, cualquier solicitud de ejercicio de
            los derechos mencionados deberá necesariamente proporcionar e
            indicar: (i) su nombre y domicilio; (ii) una copia de su
            identificación oficial (pasaporte, credencial de elector o licencia
            de conducir), (iii) la descripción clara y precisa de los Datos
            Personales a los que desea acceder o que desea rectificar, cancelar
            u oponerse y cualquier otro elemento que facilite la localización de
            los mismos, así como, (iv) cualquier otro requisito establecido por
            la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares y/o demás disposiciones aplicables.
          </div>
        </div>
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            7. Limitación del uso o divulgación de sus Datos Personales
          </div>
          <div className="">
            Usted tiene derecho de limitar el uso o divulgación de sus Datos
            Personales para las finalidades que no son necesarias para nuestra
            relación jurídica, por lo que, si usted ya no desea recibir
            comunicaciones o promociones nuestras, por favor envíenos un correo
            electrónico o postal dirigido al Departamento de Datos Personales,
            indicándonos dicha situación y a efecto de que se le inscriba en un
            listado de exclusión del cual se le otorgará una constancia
            electrónica o física, según nos lo solicite.
          </div>
        </div>
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            8. Revocación del consentimiento
          </div>
          <div className="">
            Usted podrá revocar en cualquier momento el consentimiento que nos
            haya otorgado para el tratamiento de sus Datos Personales poniéndose
            en contacto con nuestro Departamento de Datos Personales, ya sea a
            través de nuestro número telefónico, correo electrónico o de manera
            presencial en nuestras oficinas, haciéndonos saber tal situación. Le
            informamos que en caso de que usted nos revoque su consentimiento
            para el tratamiento de sus Datos Personales (incluyendo
            patrimoniales, financieros y sensibles), nos veremos imposibilitados
            para continuar nuestra relación jurídica de colaboración.
          </div>
        </div>
        <div className="border border-[#E7E7E7] p-6 mb-6">
          <div className="font-Bold mb-4 text-[18px] font-bold text-[#2d2a2a]">
            9. Cambios al Aviso de Privacidad
          </div>
          <div className="mb-4">
            GSA se reserva su derecho a realizar cambios en el presente aviso de
            privacidad, los cuales serán dados a conocer a través de la página
            www.sanimex.com.mx o le serán notificados vía el correo electrónico
            que usted nos proporcionó.
          </div>
          <div className="mb-4">
            En cualquier caso, usted tendrá el derecho a cancelar y/o rectificar
            sus Datos Personales, así como a limitar su uso y divulgación en
            caso de modificaciones a los términos de este Aviso de Privacidad.
          </div>
          <div className="mb-4">
            GSA no es responsable de la inexactitud de información que usted nos
            proporcione, por lo que GSA no se considerará responsable por los
            daños y perjuicios que pudieran ocasionarse por el uso de dicha
            información
          </div>
          <div className="mb-4">
            Este Aviso de Privacidad, el tratamiento de sus Datos Personales y/o
            todos los documentos relacionados se rigen por la Ley Federal de
            Protección de Datos Personales en Posesión de los Particulares y la
            demás normativa de los Estados Unidos Mexicanos.
          </div>
          <div className="mb-4">
            La aceptación de este Aviso de Privacidad o celebración de un
            contrato de cualquier naturaleza con GSA, una vez puesto a
            disposición el Aviso de Privacidad implica una aceptación expresa,
            por escrito, de los términos del mismo y su sometimiento expreso a
            los tribunales de la Ciudad de México, para cualquier controversia o
            reclamación derivada del mismo, por lo que se entiende la renuncia a
            cualquier otra jurisdicción que por motivo de domicilio, presente o
            futuro pudiera corresponderle.
          </div>
          <div className="">
            Si usted considera que su derecho de protección de Datos Personales
            ha sido lesionado por alguna conducta de nuestros empleados o de
            nuestras actuaciones o respuestas, presume que en el tratamiento de
            sus datos personales existe alguna violación a las disposiciones
            previstas en la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares, podrá interponer la queja o denuncia
            correspondiente ante el Instituto Federal de Acceso a la Información
            y Protección de Datos, para mayor información visite www.ifai.org.mx
          </div>
        </div>
      </Container>
    </RootLayout>
  );
};

export default AvisoPrivacidad;
