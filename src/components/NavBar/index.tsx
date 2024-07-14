import { FunctionComponent } from 'react'

import NavBarLg from '@components/NavBar/navBarLg'
import NavBarSm from '@components/NavBar/navBarSm'

const NavBar: FunctionComponent = () => {
  return (
    <>
      {/* Desktop Navigation */}
      <NavBarLg />
      {/* End Desktop Navigation */}

      {/* Mobile Navigation */}
      <NavBarSm />
      {/* End Mobile Navigation */}
    </>
  )
}

export default NavBar