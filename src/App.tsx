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
import ShowArticle from '@pages/Articles/show'
import CreateArticle from '@pages/Articles/create'

import Profile from '@pages/Users/Profile'
import ProfileEdit from '@pages/Users/Settings'
import UserViews from '@pages/Users/UserViews'

import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'
import PrivateRoutes from './Route/privateRoute'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route index path='/forum' element={<Forum />} />
        <Route index path='/forum/:slug' element={<ShowForum />} />

        <Route index path='/articles' element={<Articles />} />
        <Route index path='/articles/:slug' element={<ShowArticle />} />

        {/* private route */}
        <Route path="/articles/new" element={<PrivateRoutes element={<CreateArticle />} />} />
        <Route path="/forum/new" element={<PrivateRoutes element={<CreateForum />} />} />
        <Route path="/me/:username" element={<PrivateRoutes element={<Profile />} />} />
        <Route path="/me/settings/account/edit" element={<PrivateRoutes element={<ProfileEdit />} />} />
        <Route path="/me/views/:username" element={<PrivateRoutes element={<UserViews />} />} />
        {/* end private route */}

        <Route index path='/auth/login' element={<Login />} />
        <Route index path='/auth/register' element={<Register />} />

        <Route index path='*' element={<NotFound />} />
      </Route>
    </>
  )
)

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App;
