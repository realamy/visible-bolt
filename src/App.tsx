import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Freelancers from '@/pages/Freelancers'
import Profile from '@/pages/Profile'
import Settings from '@/pages/Settings'
import DashboardLayout from '@/pages/dashboard/layout'
import FreelancerDashboard from '@/pages/dashboard/freelancer/overview'
import ClientDashboard from '@/pages/dashboard/client/overview'
import { useAuth } from '@/contexts/auth-context'
import SignInPage from '@/pages/auth/sign-in'
import SignUpPage from '@/pages/auth/sign-up'
import AuthLayout from '@/layouts/auth-layout'
import { cn } from '@/lib/utils'

function App() {
  const { pathname } = useLocation()
  const isDashboard = pathname.startsWith('/dashboard')
  const isAuth = pathname.startsWith('/auth')
  const { user } = useAuth()

  const DashboardOverview = user?.role === 'freelancer' ? FreelancerDashboard : ClientDashboard

  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased", 
      isDashboard && "h-screen overflow-hidden")}>
      {!isAuth && !isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="projects" element={<DashboardOverview />} />
          <Route path="messages" element={<DashboardOverview />} />
          <Route path="earnings" element={<DashboardOverview />} />
          <Route path="reviews" element={<DashboardOverview />} />
          <Route path="settings" element={<Settings />} />
          {user?.role === 'client' && (
            <>
              <Route path="freelancers" element={<DashboardOverview />} />
              <Route path="contracts" element={<DashboardOverview />} />
            </>
          )}
        </Route>
      </Routes>
      {!isAuth && !isDashboard && <Footer />}
      {!isAuth && <MobileNav />}
    </div>
  )
}

export default App
