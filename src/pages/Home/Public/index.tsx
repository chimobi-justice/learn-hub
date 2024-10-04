import { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet-async'

import HeroSection from '@components/HeroSection'
import HomeThreads from '@pages/Home/Public/Threads'
import HomeArticles from '@pages/Home/Public/Articles'

const HomeSections: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>learn-hub - A portal for problem solving, knowledge sharing and community builders, join others for sharing knowledge</title>
        <meta name="keywords" content="Lists of Articles and threads." />
        <meta name="description" content="A portal for problem solving, knowledge sharing and community builders, join others for sharing knowledge."/>
      </Helmet>

      <HeroSection />
      <HomeThreads />
      <HomeArticles />
    </>
  )
}

export default HomeSections;