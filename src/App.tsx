import Hero from './components/Hero.tsx';
import Header from './components/Header'
import Explore from './components/Explore.tsx';

const App = () => {
  return (
    <main className='overflow-hidden'>
      <Header />
      <Hero />
      <Explore />
      {/* <section className='min-h-screen'></section> */}
    </main>
  )
}

export default App

