import Hero from './components/Hero.tsx';
import Header from './components/Header'
import Explore from './components/Explore.tsx';
import Adventures from './components/Adventures.tsx';

const App = () => {
  return (
    <main className='overflow-hidden bg-blue-50'>
      <Header />
      <Hero />
      <Explore />
      <Adventures />
    </main>
  )
}

export default App

