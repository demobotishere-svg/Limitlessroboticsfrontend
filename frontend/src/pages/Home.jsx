import { lazy, Suspense } from 'react';
import Header from '../components/Header';
import HeroShowcase from '../components/HeroShowcase';
import StatsCounters from '../components/StatsCounters';
import InnovationsGrid from '../components/InnovationsGrid';
import CoursesGrid from '../components/CoursesGrid';
import ProductsGrid from '../components/ProductsGrid';
import ServicesTimeline from '../components/ServicesTimeline';
import TestimonialsHologramGrid from '../components/TestimonialsHologramGrid';
import PartnersBrandStrip from '../components/PartnersBrandStrip';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <Header />
      <main>
        <HeroShowcase />
        <StatsCounters />
        <InnovationsGrid />
        <CoursesGrid />
        <ProductsGrid />
        <ServicesTimeline />
        <TestimonialsHologramGrid />
        <PartnersBrandStrip />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
