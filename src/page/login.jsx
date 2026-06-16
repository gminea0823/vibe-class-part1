import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '../api/userApi'
import useAuthStore from '../store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    try {
      const data = await login(userId, password)
      setAuth(data)
      navigate('/')
    } catch {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  function handleJoin() {
    navigate('/join')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
          padding: '0 32px',
          background: 'linear-gradient(to right, #1E3A8A, #3B82F6)',
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', fontFamily: 'Inter, sans-serif' }}>
          Logo
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Home', 'About', 'Contact'].map((label) => (
            <span
              key={label}
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}
            >
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* Login Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Login Card */}
        <div
          style={{
            width: '400px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Title Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: '700', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
              로그인
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#6B7280',
                fontFamily: 'Inter, sans-serif',
                textAlign: 'center',
              }}
            >
              이메일로 로그인하세요
            </span>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* UserId Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
                아이디
              </span>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
                style={{
                  height: '44px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  padding: '0 14px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#1A1A1A',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  boxSizing: 'border-box',
                  width: '100%',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1A1A1A')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
              />
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
                비밀번호
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                style={{
                  height: '44px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  padding: '0 14px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#1A1A1A',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  boxSizing: 'border-box',
                  width: '100%',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1A1A1A')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
              />
            </div>

            {/* Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span
                style={{ fontSize: '13px', color: '#2563EB', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}
              >
                비밀번호 찾기
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            style={{
              height: '46px',
              width: '100%',
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            로그인
          </button>

          {/* Signup Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
              계정이 없으신가요?
            </span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#2563EB', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}
              onClick={handleJoin}>
              회원가입
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
