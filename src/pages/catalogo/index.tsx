import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
//import { pdfjs } from 'react-pdf';
import PdfViewer from '@/components/utils/PdfViewer';

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));

const CataloguePage = () => {
  const router = useRouter();
  //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex - Catalogo'}
        description={'Sanimex - Catalogo'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />

      <Container>
        <PdfViewer />
      </Container>
    </RootLayout>
  );
};

export default CataloguePage;
