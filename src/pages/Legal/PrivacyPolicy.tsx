
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';

export const PrivacyPolicy = () => {
  return (
    <PageLayout 
      title="Política de Privacidad" 
      subtitle="Última actualización: [Fecha]"
    >
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">1. Información que Recopilamos</h2>
          <p>// Placeholder para información recopilada</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">2. Uso de la Información</h2>
          <p>// Placeholder para uso de información</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">3. Protección de Datos</h2>
          <p>// Placeholder para protección de datos</p>
        </section>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
