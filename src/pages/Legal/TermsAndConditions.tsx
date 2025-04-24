
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { LegalSection } from './components/LegalSection';

export const TermsAndConditions = () => {
  return (
    <PageLayout 
      title="Términos y Condiciones" 
      subtitle="Última actualización: [Fecha]"
    >
      <div className="space-y-8">
        <LegalSection title="1. Introducción">
          <p>// Placeholder para introducción</p>
        </LegalSection>

        <LegalSection title="2. Aceptación de Términos">
          <p>// Placeholder para aceptación de términos</p>
        </LegalSection>

        <LegalSection title="3. Derechos y Responsabilidades">
          <p>// Placeholder para derechos y responsabilidades</p>
        </LegalSection>
      </div>
    </PageLayout>
  );
};

export default TermsAndConditions;
