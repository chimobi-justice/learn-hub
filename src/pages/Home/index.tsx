import { FunctionComponent } from 'react'

import HomeAuthUserPage from '@pages/Home/Authenticated'
import HomeSections from '@pages/Home/Public'
import { LOCAL_STORAGE_VALUES } from '@constant/Localstorage'

const Home: FunctionComponent = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_VALUES.ucType_);

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