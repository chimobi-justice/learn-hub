import NotFound from '@components/NotFound'
import Layout from '@layout/index'
import Articles from '@pages/Articles'
import CreateArticle from '@pages/Articles/create'
import EditArticle from '@pages/Articles/edit'
import ShowArticle from '@pages/Articles/show'
import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'
import Home from '@pages/Home'
import Threads from '@pages/Threads'
import CreateThread from '@pages/Threads/create'
import EditThread from '@pages/Threads/edit'
import ShowThread from '@pages/Threads/show'
import ArthoredArticles from '@pages/Users/AuthoredViews/Articles'
import ArthoredThreads from '@pages/Users/AuthoredViews/Threads'
import Profile from '@pages/Users/Profile'
import ProfileEdit from '@pages/Users/Settings'
import ShowUserPublicPosts from '@pages/Users/show'
import { FunctionComponent } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import AuthRoute from './AuthRoute'
import PrivateRoute from './privateRoute'
import Search from '@pages/Search'
import SavedArticles from '@pages/Users/SavedArticles'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path='/' element={<Home />} />
      
      <Route path="/search" element={<Search />} />

      <Route index path='/threads' element={<Threads />} />
      <Route index path='/threads/:slug/:id' element={<ShowThread />} />

      <Route index path='/articles' element={<Articles />} />
      <Route index path='/articles/:slug/:id' element={<ShowArticle />} />

      <Route index path='/user/:username' element={<ShowUserPublicPosts />} />

      {/* private route */}
      <Route path="/articles/new" element={<PrivateRoute element={<CreateArticle />} />} />
      <Route path="/articles/edit/:id" element={<PrivateRoute element={<EditArticle />} />} />
      <Route path="/me/articles/:username" element={<PrivateRoute element={<ArthoredArticles />} />} />

      <Route path="/threads/new" element={<PrivateRoute element={<CreateThread />} />} />
      <Route path="/threads/edit/:id" element={<PrivateRoute element={<EditThread />} />} />
      <Route path="/me/threads/:username" element={<PrivateRoute element={<ArthoredThreads />} />} />

      <Route path="/:username" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/:username/reading-list" element={<PrivateRoute element={<SavedArticles />} />} />
      <Route path="/me/settings/account/edit" element={<PrivateRoute element={<ProfileEdit />} />} />
      {/* end private route */}

      <Route path="/auth/login" element={<AuthRoute element={<Login />} />} />
      <Route path="/auth/register" element={<AuthRoute element={<Register />} />} />

      <Route index path='*' element={<NotFound />} />
    </Route>
  )
)

const AppRoutes: FunctionComponent = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default AppRoutes;