import { FunctionComponent } from 'react'

import HeroSection from '@components/HeroSection'
import HomeThreads from '@pages/Home/Threads'
import HomeArticles from '@pages/Home/Articles'

const Home: FunctionComponent = () => {
  return (
    <>
      <HeroSection />
      <HomeThreads />
      <HomeArticles />
    </>
  )
}

export default Home;