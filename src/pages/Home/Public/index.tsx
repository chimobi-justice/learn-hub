import { FunctionComponent, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQueryClient } from '@tanstack/react-query'

import HeroSection from '@components/HeroSection'
import { getArticles } from '@services/articles'
import { getThreads } from '@services/threads'

const HomeSections: FunctionComponent = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['articles'],
      queryFn: () => getArticles(1),
      staleTime: 1000 * 60 * 5
    })

    queryClient.prefetchQuery({
      queryKey: ['threads'],
      queryFn: () => getThreads(1),
      staleTime: 1000 * 60 * 5
    })
  }, [queryClient]);

  return (
    <>
      <Helmet>
        <title>learn-hub - A portal for problem solving, knowledge sharing and community builders, join others for sharing knowledge</title>
        <meta name="keywords" content="Lists of Articles and threads." />
        <meta name="description" content="A portal for problem solving, knowledge sharing and community builders, join others for sharing knowledge."/>
      </Helmet>

      <HeroSection />
    </>
  )
}

export default HomeSections;