import { createContext, useCallback, useContext, useState } from 'react';
import { plans } from '../config/site.js';

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const recommended = plans.find((p) => p.recommended) ?? plans[0];
  const [selectedId, setSelectedId] = useState(recommended.id);

  // Elige el plan y lleva al usuario a la sección de contacto conservándolo.
  const choosePlan = useCallback((id) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => document.getElementById('cta-whatsapp')?.focus({ preventScroll: true }), 700);
    });
  }, []);

  const selectedPlan = plans.find((p) => p.id === selectedId) ?? recommended;

  return (
    <PlanContext.Provider value={{ selectedId, selectedPlan, setSelectedId, choosePlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
