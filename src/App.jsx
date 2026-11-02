import { MotionConfig } from 'framer-motion';
import { PlanProvider } from './context/PlanContext.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import Diagnostico from './sections/Diagnostico.jsx';
import Competencia from './sections/Competencia.jsx';
import Crecimiento from './sections/Crecimiento.jsx';
import Propuesta from './sections/Propuesta.jsx';
import Produccion from './sections/Produccion.jsx';
import Contenido from './sections/Contenido.jsx';
import Plan90 from './sections/Plan90.jsx';
import Planes from './sections/Planes.jsx';
import Metricas from './sections/Metricas.jsx';
import Metodologia from './sections/Metodologia.jsx';
import Cierre from './sections/Cierre.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <PlanProvider>
        <a href="#diagnostico" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-navy">
          Saltar al contenido
        </a>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Diagnostico />
          <Competencia />
          <Crecimiento />
          <Propuesta />
          <Produccion />
          <Contenido />
          <Plan90 />
          <Planes />
          <Metricas />
          <Metodologia />
          <Cierre />
        </main>
        <Footer />
      </PlanProvider>
    </MotionConfig>
  );
}
