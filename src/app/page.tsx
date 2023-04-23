import Image from 'next/image';
import Hero from '../common/components/home/hero/Hero.component';
import About from '../common/components/home/about/About.component';
import InfoGrid from '@/common/components/infoGrid/InfoGrid.component';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <InfoGrid />
    </>
  );
}

export default Home;
