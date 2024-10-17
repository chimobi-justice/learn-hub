import { FunctionComponent } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Layout from '@layout/index'
import { NotFound } from '@components/index'

import AuthRoute from './AuthRoute'
import PrivateRoute from './privateRoute'
import Articles from '@pages/Articles'
import CreateArticle from '@pages/Articles/create'
import EditArticle from '@pages/Articles/edit'
import ShowArticle from '@pages/Articles/show'
import SavedArticles from '@pages/Users/SavedArticles'
import Home from '@pages/Home'
import Threads from '@pages/Threads'
import CreateThread from '@pages/Threads/create'
import EditThread from '@pages/Threads/edit'
import ShowThread from '@pages/Threads/show'
import ArthoredArticles from '@pages/Users/AuthoredViews/Articles'
import ArthoredThreads from '@pages/Users/AuthoredViews/Threads'
import Profile from '@pages/Users/Profile'
import ProfileEdit from '@pages/Users/Settings'
import FollowingUsers from '@pages/Users/FollowingUsers'
import ShowUserPublicPosts from '@pages/Users/show'
import Search from '@pages/Search'
import FollowPeople from '@pages/FollowPeople'

import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index path='/' element={<Home />} />

      <Route path="/search" element={<Search />} />

      <Route path="/follow/people/suggestions" element={<FollowPeople />} />

      <Route index path='/threads' element={<Threads />} />
      <Route index path='/threads/:slug/:id' element={<ShowThread />} />

      <Route index path='/articles' element={<Articles />} />
      <Route index path='/articles/:slug/:id' element={<ShowArticle />} />

      <Route index path='/user/:username' element={<ShowUserPublicPosts />} />

      {/* private route */}
      <Route element={<PrivateRoute />}>
        <Route path="/articles/new" element={<CreateArticle />} />
        <Route path="/articles/edit/:id" element={<EditArticle />} />
        <Route path="/me/articles/:username" element={<ArthoredArticles />} />

        <Route path="/threads/new" element={<CreateThread />} />
        <Route path="/threads/edit/:id" element={<EditThread />} />
        <Route path="/me/threads/:username" element={<ArthoredThreads />} />

        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/reading-list" element={<SavedArticles />} />
        <Route path="/me/settings/account/edit" element={<ProfileEdit />} />
        <Route path="/me/users/:name" element={<FollowingUsers />} />
      </Route>
      {/* end private route */}

      <Route element={<AuthRoute />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>

      <Route index path='*' element={<NotFound />} />
    </Route>
  )
)

const AppRoutes: FunctionComponent = () => {
  return <RouterProvider router={routes} />;
}

export default AppRoutes;