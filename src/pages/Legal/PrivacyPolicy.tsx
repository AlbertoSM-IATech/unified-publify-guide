
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { LegalSection } from './components/LegalSection';

export const PrivacyPolicy = () => {
  return (
    <PageLayout 
      title="Política de Privacidad" 
      subtitle="Última actualización: [Fecha]"
    >
      <div className="space-y-8">
        <LegalSection title="1. Información que Recopilamos">
          <p>// Placeholder para información recopilada</p>
        </LegalSection>

        <LegalSection title="2. Uso de la Información">
          <p>// Placeholder para uso de información</p>
        </LegalSection>

        <LegalSection title="3. Protección de Datos">
          <p>// Placeholder para protección de datos</p>
        </LegalSection>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
