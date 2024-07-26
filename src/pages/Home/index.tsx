import { FunctionComponent } from 'react'

import HeroSection from '@components/HeroSection'
import HomeForum from '@pages/Home/Forum'
import HomeArticles from '@pages/Home/Articles'

const Home: FunctionComponent = () => {
  return (
    <>
      <HeroSection />
      <HomeForum />
      <HomeArticles />
    </>
  )
}

export default Home;