import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SigninPage from './auth/sign-in/SigninPage'
import Home from './home/Home'
import Dashboard from './dashboard/Dashboard'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/EditResume'
import ViewResume from './my-resume/ViewResume'
import About from './components/custom/About'
import Features from './components/custom/Features'
import Contact from './components/custom/Contact'
import Terms from './components/custom/Terms'
import FAQ from './components/custom/FAQ'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLSHABLE_KEY;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/resume/:resumeId/edit" element={<EditResume />} />
      </Route>
      <Route path="" element={<Home />} />
      <Route path='/my-resume/:resumeId/view' element={<ViewResume />} />

      <Route path="auth/sign-in" element={<SigninPage />} />
      <Route path="about" element={<About />} />
      <Route path="features" element={<Features />} />
      <Route path="contact" element={<Contact />} />
      <Route path="terms" element={<Terms />} />
      <Route path="faq" element={<FAQ />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
