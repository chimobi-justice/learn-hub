import { FunctionComponent } from 'react'

import HomeAuthUserPage from '@pages/Home/Authenticated'
import HomeSections from '@pages/Home/Public'

const Home: FunctionComponent = () => {
  const token = localStorage.getItem('ucType_');

  return (
    <>
    {token ? (
        <HomeAuthUserPage />
      ): (
        <HomeSections />
      )}
    </>
    )
}

export default Home;