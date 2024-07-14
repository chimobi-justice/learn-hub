import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { NavBar, Footer } from '@components/index'

const Layout: FunctionComponent = () => {
  return (
    <Box>
      <NavBar />

      <Box as="main">
        <Outlet />
      </Box>

      <Footer />
    </Box>
  )
}

export default Layout;