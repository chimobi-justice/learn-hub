import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Layout from '@layout/index'
import Home from '@pages/Home'
import Forum from '@pages/Forum'
import ShowForum from '@pages/Forum/show'
import CreateForum from '@pages/Forum/create'
import NotFound from '@components/NotFound'
import Articles from '@pages/Articles'
import ShowSingleArticle from '@pages/Articles/show'

import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route index path='/forum' element={<Forum />} />
        <Route index path='/forum/:slug' element={<ShowForum />} />
        <Route index path='/forum/new' element={<CreateForum />} />

        <Route index path='/articles' element={<Articles />} />
        <Route index path='/articles/:slug' element={<ShowSingleArticle />} />

        <Route index path='/auth/login' element={<Login />} />
        <Route index path='/auth/register' element={<Register />} />

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
