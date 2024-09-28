import { FunctionComponent } from 'react'

import HeroSection from '@components/HeroSection'
import HomeThreads from '@pages/Home/Public/Threads'
import HomeArticles from '@pages/Home/Public/Articles'
import HomeAuthUserPage from '@pages/Home/Authenticated'

const Home: FunctionComponent = () => {
  const token = localStorage.getItem('ucType_');

  return (
    <>
    {token ? (
        <HomeAuthUserPage />
      ): (
        <>
          <HeroSection />
          <HomeThreads />
          <HomeArticles />
        </>
      )}
    </>
    )
}

export default Home;