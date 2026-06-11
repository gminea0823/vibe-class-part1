import { Outlet } from 'react-router'
import Header from './Header'

export default function MainPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      <Header />
      <Outlet />
    </div>
  )
}
