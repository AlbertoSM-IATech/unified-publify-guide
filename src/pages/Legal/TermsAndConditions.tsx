
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';

export const TermsAndConditions = () => {
  return (
    <PageLayout 
      title="Términos y Condiciones" 
      subtitle="Última actualización: [Fecha]"
    >
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">1. Introducción</h2>
          <p>// Placeholder para introducción</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">2. Aceptación de Términos</h2>
          <p>// Placeholder para aceptación de términos</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">3. Derechos y Responsabilidades</h2>
          <p>// Placeholder para derechos y responsabilidades</p>
        </section>
      </div>
    </PageLayout>
  );
};

export default TermsAndConditions;
