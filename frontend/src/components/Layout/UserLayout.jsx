import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router'

const UserLayout = () => {
  return (
    <>
        {/* Header */}
        <Header />
        {/* Main Content */}
        <main className=' mt-25'>
          <Outlet />
        </main>
        {/* Footer */}
        <Footer />
    </>
  )
}

export default UserLayout