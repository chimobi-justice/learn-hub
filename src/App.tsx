import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Layout from '@layout/index'
import Home from '@pages/Home'
import Forum from '@pages/Forum'
import ShowSingleForum from '@pages/Forum/show'
import NotFound from '@components/NotFound'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route index path='/forum' element={<Forum />} />
        <Route index path='/forum/:slug' element={<ShowSingleForum />} />

        <Route index path='*' element={<NotFound />} />
      </Route>
    </>
  )
)

const App = () => {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App;
