import { FunctionComponent, Suspense, lazy } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Layout from '@layout/index'
import { NotFound, Loading} from '@components/index'

import AuthRoute from './AuthRoute'
import PrivateRoute from './privateRoute'

const Articles = lazy(() => import('@pages/Articles'));
const CreateArticle = lazy(() => import('@pages/Articles/create'));
const EditArticle = lazy(() => import('@pages/Articles/edit'));
const ShowArticle = lazy(() => import('@pages/Articles/show'));
const SavedArticles = lazy(() => import('@pages/Users/SavedArticles'));
const Home = lazy(() => import('@pages/Home'));
const Threads = lazy(() => import('@pages/Threads'));
const CreateThread = lazy(() => import('@pages/Threads/create'));
const EditThread = lazy(() => import('@pages/Threads/edit'));
const ShowThread = lazy(() => import('@pages/Threads/show'));
const ArthoredArticles = lazy(() => import('@pages/Users/AuthoredViews/Articles'));
const ArthoredThreads = lazy(() => import('@pages/Users/AuthoredViews/Threads'));
const Profile = lazy(() => import('@pages/Users/Profile'));
const ProfileEdit = lazy(() => import('@pages/Users/Settings'));
const ShowUserPublicPosts = lazy(() => import('@pages/Users/show'));
const Search = lazy(() => import('@pages/Search'));

const Login = lazy(() => import('@pages/Auth/Login'));
const Register = lazy(() => import('@pages/Auth/Register'));

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index path='/' element={<Home />} />

      <Route path="/search" element={<Search />} />

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
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} />
    </Suspense>
  )
}

export default AppRoutes;