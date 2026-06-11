import { useNavigate } from 'react-router'

function LayoutListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
      <path d="M14 4h7" />
      <path d="M14 9h7" />
      <path d="M14 15h7" />
      <path d="M14 20h7" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export default function Maine() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '80px 0 60px',
        }}
      >
        <h1
          style={{
            fontSize: '40px',
            fontWeight: '700',
            color: '#1A1A1A',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            margin: 0,
          }}
        >
          환영합니다
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#6B7280',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            margin: 0,
          }}
        >
          게시판과 회원정보를 관리할 수 있는 플랫폼입니다
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '24px',
          padding: '0 80px 64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flex: 1,
            padding: '32px 32px 40px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              backgroundColor: '#EFF6FF',
              borderRadius: '10px',
            }}
          >
            <LayoutListIcon />
          </div>
          <span
            onClick={() => navigate('/board')}
            style={{ fontSize: '20px', fontWeight: '600', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}
          >
            게시판
          </span>
          <p style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'Inter, sans-serif', lineHeight: '1.5', margin: 0 }}>
            공지사항, 자유게시판 등 다양한 게시판을 관리하세요.
          </p>
        </div>

        <div
          onClick={() => navigate('/members')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flex: 1,
            padding: '32px 32px 40px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              backgroundColor: '#EFF6FF',
              borderRadius: '10px',
            }}
          >
            <UsersIcon />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '600', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
            회원정보
          </span>
          <p style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'Inter, sans-serif', lineHeight: '1.5', margin: 0 }}>
            회원 목록 조회, 정보 수정 및 권한을 관리하세요.
          </p>
        </div>
      </div>
    </div>
  )
}
