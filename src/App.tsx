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

import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'
import PrivateRoute from './Route/privateRoute'
import EditArticle from '@pages/Articles/edit'
import ArthoredArticles from '@pages/Users/AuthoredViews/Articles'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route index path='/forum' element={<Forum />} />
        <Route index path='/forum/:slug' element={<ShowForum />} />

        <Route index path='/articles' element={<Articles />} />
        <Route index path='/articles/:slug/:id' element={<ShowArticle />} />

        {/* private route */}
        <Route path="/articles/new" element={<PrivateRoute element={<CreateArticle />} />} />
        <Route path="/articles/edit/:id" element={<PrivateRoute element={<EditArticle />} />} />
        <Route path="/forum/new" element={<PrivateRoute element={<CreateForum />} />} />
        <Route path="/me/:username" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/me/settings/account/edit" element={<PrivateRoute element={<ProfileEdit />} />} />
        <Route path="/me/articles/:username" element={<PrivateRoute element={<ArthoredArticles />} />} />
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
