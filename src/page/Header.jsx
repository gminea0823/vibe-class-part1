import { NavLink, useNavigate } from 'react-router'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '64px',
        padding: '0 40px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', height: '100%' }}>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
          MyApp
        </span>
        <NavLink
          to="/board"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            fontSize: '15px',
            fontWeight: isActive ? '600' : '500',
            color: isActive ? '#3B82F6' : '#1A1A1A',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            borderBottom: isActive ? '2px solid #3B82F6' : '2px solid transparent',
          })}
        >
          게시판
        </NavLink>
        <NavLink
          to="/members"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            fontSize: '15px',
            fontWeight: isActive ? '600' : '500',
            color: isActive ? '#3B82F6' : '#1A1A1A',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            borderBottom: isActive ? '2px solid #3B82F6' : '2px solid transparent',
          })}
        >
          회원정보
        </NavLink>
      </div>
      <div style={{ flex: 1 }} />
      <button
        onClick={() => navigate('/login')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 24px',
          backgroundColor: '#3B82F6',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        로그인
      </button>
    </header>
  )
}
