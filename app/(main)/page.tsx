// app/page.tsx
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Popular from '@/components/Popular/Popular';
import TravellersList from '@/components/TravellersList/TravellersList';
import Join from '@/components/Join/Join';

export default async function MainPage() {
  return (
    <>
      <Hero />
      <About />
      <Popular />
      <TravellersList /> {/* Серверний компонент */}
      <Join />
    </>
  );
}
