import { FunctionComponent } from 'react'

import HeroSection from '@components/HeroSection'
import HomeThreads from '@pages/Home/Public/Threads'
import HomeArticles from '@pages/Home/Public/Articles'
import HomeAuthUserPage from '@pages/Home/Authenticated'
import { useUser } from '@context/userContext'

const Home: FunctionComponent = () => {
  const { user, isSuccess, isLoading } = useUser();

  return (
    <>
      {user && isSuccess && !isLoading ? (
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