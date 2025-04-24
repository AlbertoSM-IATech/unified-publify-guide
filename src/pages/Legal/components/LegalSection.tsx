
import React from 'react';

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export const LegalSection = ({ title, children }: LegalSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-foreground">{title}</h2>
      <div className="text-muted-foreground space-y-3">
        {children}
      </div>
    </section>
  );
};
