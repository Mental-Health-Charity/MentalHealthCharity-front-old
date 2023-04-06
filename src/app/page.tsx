import Image from 'next/image'
import Hero from './home/hero/Hero.component';
import About from './home/about/About.component';
import InfoGrid from './home/infogrid/InfoGrid.component';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <InfoGrid />
    </>
  )
}

export default Home;