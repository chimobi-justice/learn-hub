import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Layout from '@layout/index'

import Home from '@pages/Home'
import NotFound from '@components/NotFound'

import Threads from '@pages/Threads'
import ShowThread from '@pages/Threads/show'
import CreateThread from '@pages/Threads/create'
import EditThread from '@pages/Threads/edit'
import ArthoredThreads from '@pages/Users/AuthoredViews/Threads'

import Profile from '@pages/Users/Profile'
import ProfileEdit from '@pages/Users/Settings'

import Articles from '@pages/Articles'
import EditArticle from '@pages/Articles/edit'
import ArthoredArticles from '@pages/Users/AuthoredViews/Articles'
import ShowArticle from '@pages/Articles/show'
import CreateArticle from '@pages/Articles/create'

import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'

import PrivateRoute from './Route/privateRoute'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route index path='/threads' element={<Threads />} />
        <Route index path='/threads/:slug/:id' element={<ShowThread />} />

        <Route index path='/articles' element={<Articles />} />
        <Route index path='/articles/:slug/:id' element={<ShowArticle />} />

        {/* private route */}
        <Route path="/articles/new" element={<PrivateRoute element={<CreateArticle />} />} />
        <Route path="/articles/edit/:id" element={<PrivateRoute element={<EditArticle />} />} />
        <Route path="/me/articles/:username" element={<PrivateRoute element={<ArthoredArticles />} />} />

        <Route path="/threads/new" element={<PrivateRoute element={<CreateThread />} />} />
        <Route path="/threads/edit/:id" element={<PrivateRoute element={<EditThread />} />} />
        <Route path="/me/threads/:username" element={<PrivateRoute element={<ArthoredThreads />} />} />

        <Route path="/me/:username" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/me/settings/account/edit" element={<PrivateRoute element={<ProfileEdit />} />} />
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
