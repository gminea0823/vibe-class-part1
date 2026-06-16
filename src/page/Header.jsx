import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import useAuthStore from '../store/authStore'

export default function Header() {
  const navigate = useNavigate()
  const { isLoggedIn, name, logout } = useAuthStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  function handleLogout() {
    logout()
    setDropdownOpen(false)
    navigate('/login')
  }

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
      {isLoggedIn ? (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              color: '#1A1A1A',
              cursor: 'pointer',
            }}
          >
            {name} ▾
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '44px',
                width: '140px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 100,
              }}
            >
              <div
                onClick={() => { navigate('/members'); setDropdownOpen(false) }}
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#1A1A1A',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                회원정보
              </div>
              <div
                onClick={handleLogout}
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#EF4444',
                  cursor: 'pointer',
                  borderTop: '1px solid #E5E7EB',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
      ) : (
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
      )}
    </header>
  )
}
