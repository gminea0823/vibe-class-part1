import { useState } from 'react'
import { useNavigate } from 'react-router'
import DaumPostcode from 'react-daum-postcode'
import { checkUserId, signup } from '../api/userApi'

const C = {
  primary: '#6C5CE7',
  bgInput: '#F2F0F7',
  bgWhite: '#FFFFFF',
  bgGray: '#F5F5F7',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  borderInput: '#D1D5DB',
  borderLight: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
}

const inputStyle = {
  height: '44px',
  borderRadius: '8px',
  border: `1px solid ${C.borderInput}`,
  padding: '0 14px',
  fontSize: '14px',
  fontFamily: 'Noto Sans KR, sans-serif',
  color: C.textPrimary,
  backgroundColor: C.bgInput,
  outline: 'none',
  boxSizing: 'border-box',
  width: '100%',
}

const selectStyle = {
  height: '44px',
  borderRadius: '8px',
  border: `1px solid ${C.borderInput}`,
  padding: '0 10px',
  fontSize: '14px',
  fontFamily: 'Noto Sans KR, sans-serif',
  color: C.textPrimary,
  backgroundColor: C.bgInput,
  outline: 'none',
  boxSizing: 'border-box',
  flex: 1,
  cursor: 'pointer',
}

const btnStyle = {
  height: '44px',
  padding: '0 14px',
  backgroundColor: C.primary,
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: '600',
  fontFamily: 'Noto Sans KR, sans-serif',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  flexShrink: 0,
}

function FieldGroup({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontSize: '13px', fontWeight: '500', color: C.textPrimary, fontFamily: 'Noto Sans KR, sans-serif' }}>
        {label}
      </span>
      {children}
      {error && (
        <span style={{ fontSize: '12px', color: C.error, fontFamily: 'Noto Sans KR, sans-serif' }}>
          {error}
        </span>
      )}
    </div>
  )
}

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i)
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

export default function Join() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    userId: '',
    email: '',
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
    password: '',
    passwordConfirm: '',
    phonePrefix: '010',
    phone: '',
    postalCode: '',
    address: '',
    addressDetail: '',
  })

  const [errors, setErrors] = useState({})
  const [showPostcode, setShowPostcode] = useState(false)
  const [userIdCheck, setUserIdCheck] = useState(null) // null | 'available' | 'taken'

  const passwordMatch = !!form.passwordConfirm && form.password === form.passwordConfirm

  function set(field, value, errorKey) {
    setForm(prev => ({ ...prev, [field]: value }))
    const key = errorKey || field
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
    if (field === 'userId') setUserIdCheck(null)
  }

  async function handleUserIdCheck() {
    try {
      const res = await checkUserId(form.userId)
      if (res?.available === false || res?.duplicate === true || res?.isDuplicate === true) {
        setUserIdCheck('taken')
      } else {
        setUserIdCheck('available')
      }
    } catch (error) {
      if (error.response?.status === 409 || error.response?.status === 400) {
        setUserIdCheck('taken')
      } else {
        alert('서버 연결에 실패했습니다.')
      }
    }
  }

  function handleAddressSelect(data) {
    setForm(prev => ({ ...prev, address: data.address, postalCode: data.zonecode }))
    if (errors.address) setErrors(prev => ({ ...prev, address: '' }))
    setShowPostcode(false)
  }

  function validate() {
    const e = {}
    if (!form.email.trim()) e.email = '이메일을 입력하세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '올바른 이메일 형식을 입력하세요.'
    if (!form.name.trim()) e.name = '이름을 입력하세요.'
    if (!form.birthYear || !form.birthMonth || !form.birthDay) e.birth = '생년월일을 선택하세요.'
    if (!form.gender) e.gender = '성별을 선택하세요.'
    if (!form.password) e.password = '패스워드를 입력하세요.'
    else if (form.password.length < 8) e.password = '패스워드는 8자 이상 입력하세요.'
    if (!form.passwordConfirm) e.passwordConfirm = '패스워드 확인을 입력하세요.'
    else if (form.password !== form.passwordConfirm) e.passwordConfirm = '패스워드가 일치하지 않습니다.'
    if (!form.phone.trim()) e.phone = '핸드폰 번호를 입력하세요.'
    if (!form.address.trim()) e.address = '주소를 검색하세요.'
    return e
  }

  async function handleSubmit() {
    if (!form.userId.trim()) {
      setErrors(prev => ({ ...prev, userId: '아이디를 입력하세요.' }))
      return
    }
    if (userIdCheck === null) {
      alert('아이디 중복확인을 해주세요.')
      return
    }
    if (userIdCheck === 'taken') {
      setErrors(prev => ({ ...prev, userId: '이미 사용 중인 아이디입니다.' }))
      return
    }

    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    const birthDate = `${form.birthYear}-${String(form.birthMonth).padStart(2, '0')}-${String(form.birthDay).padStart(2, '0')}`
    const phone = `${form.phonePrefix}-${form.phone}`
    const gender = form.gender === '남성' ? '남자' : '여자'

    try {
      await signup({
        userId: form.userId,
        email: form.email,
        passwd: form.password,
        name: form.name,
        gender,
        birthDate,
        phone,
        postalCode: form.postalCode,
        address: form.address,
        addressDetail: form.addressDetail,
      })
      alert('회원가입이 완료되었습니다.')
      navigate('/login')
    } catch (error) {
      const msg = error.response?.data?.message || '회원가입에 실패했습니다.'
      alert(msg)
    }
  }

  const pwConfirmBorderColor = form.passwordConfirm
    ? (passwordMatch ? C.success : C.error)
    : C.borderInput

  const pwConfirmMessage = form.passwordConfirm
    ? (passwordMatch ? '패스워드가 일치합니다.' : '패스워드가 일치하지 않습니다.')
    : null

  const userIdBtnDisabled = !form.userId.trim()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bgGray }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80px',
        backgroundColor: C.primary,
      }}>
        <span style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', fontFamily: 'Noto Sans KR, sans-serif' }}>
          회원가입
        </span>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 16px 60px' }}>
        <div style={{
          width: '440px',
          backgroundColor: C.bgWhite,
          borderRadius: '12px',
          border: `1px solid ${C.borderLight}`,
          overflow: 'hidden',
        }}>
          {/* 상단 섹션 */}
          <div style={{ padding: '30px 30px 10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* 아이디 - 중복확인 포함 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: C.textPrimary, fontFamily: 'Noto Sans KR, sans-serif' }}>
                아이디
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  style={inputStyle}
                  placeholder="아이디를 입력하세요"
                  value={form.userId}
                  onChange={e => set('userId', e.target.value)}
                />
                <button
                  style={{
                    ...btnStyle,
                    backgroundColor: userIdBtnDisabled ? '#C4B5F4' : C.primary,
                    cursor: userIdBtnDisabled ? 'not-allowed' : 'pointer',
                  }}
                  onClick={handleUserIdCheck}
                  disabled={userIdBtnDisabled}
                >
                  중복확인
                </button>
              </div>
              {userIdCheck === 'available' && (
                <span style={{ fontSize: '12px', color: C.success, fontFamily: 'Noto Sans KR, sans-serif' }}>
                  사용 가능한 아이디입니다.
                </span>
              )}
              {userIdCheck === 'taken' && (
                <span style={{ fontSize: '12px', color: C.error, fontFamily: 'Noto Sans KR, sans-serif' }}>
                  이미 사용 중인 아이디입니다.
                </span>
              )}
              {!userIdCheck && errors.userId && (
                <span style={{ fontSize: '12px', color: C.error, fontFamily: 'Noto Sans KR, sans-serif' }}>
                  {errors.userId}
                </span>
              )}
            </div>

            <FieldGroup label="이메일" error={errors.email}>
              <input
                style={inputStyle}
                type="email"
                placeholder="이메일을 입력하세요"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="이름" error={errors.name}>
              <input
                style={inputStyle}
                placeholder="이름을 입력하세요"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="생년월일" error={errors.birth}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select style={selectStyle} value={form.birthYear}
                  onChange={e => set('birthYear', e.target.value, 'birth')}>
                  <option value="">년</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select style={selectStyle} value={form.birthMonth}
                  onChange={e => set('birthMonth', e.target.value, 'birth')}>
                  <option value="">월</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select style={selectStyle} value={form.birthDay}
                  onChange={e => set('birthDay', e.target.value, 'birth')}>
                  <option value="">일</option>
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </FieldGroup>

            <FieldGroup label="성별" error={errors.gender}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['남성', '여성'].map(g => (
                  <button
                    key={g}
                    style={{
                      flex: 1,
                      height: '44px',
                      backgroundColor: form.gender === g ? C.primary : '#FFFFFF',
                      color: form.gender === g ? '#FFFFFF' : C.textSecondary,
                      fontSize: '14px',
                      fontWeight: '500',
                      fontFamily: 'Noto Sans KR, sans-serif',
                      border: form.gender === g ? 'none' : `1px solid ${C.borderInput}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={() => set('gender', g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </FieldGroup>
          </div>

          {/* 하단 섹션 */}
          <div style={{ padding: '10px 30px 30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <FieldGroup label="패스워드" error={errors.password}>
              <input
                style={inputStyle}
                type="password"
                placeholder="8자 이상 입력"
                value={form.password}
                onChange={e => set('password', e.target.value)}
              />
            </FieldGroup>

            {/* 패스워드 확인 - 실시간 비교 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: C.textPrimary, fontFamily: 'Noto Sans KR, sans-serif' }}>
                패스워드 확인
              </span>
              <input
                style={{ ...inputStyle, borderColor: pwConfirmBorderColor }}
                type="password"
                placeholder="패스워드를 다시 입력하세요"
                value={form.passwordConfirm}
                onChange={e => set('passwordConfirm', e.target.value)}
              />
              {pwConfirmMessage ? (
                <span style={{ fontSize: '12px', color: passwordMatch ? C.success : C.error, fontFamily: 'Noto Sans KR, sans-serif' }}>
                  {pwConfirmMessage}
                </span>
              ) : errors.passwordConfirm ? (
                <span style={{ fontSize: '12px', color: C.error, fontFamily: 'Noto Sans KR, sans-serif' }}>
                  {errors.passwordConfirm}
                </span>
              ) : null}
            </div>

            <FieldGroup label="핸드폰 번호" error={errors.phone}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  style={{ ...selectStyle, flex: 'none', width: '82px' }}
                  value={form.phonePrefix}
                  onChange={e => set('phonePrefix', e.target.value)}
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="019">019</option>
                </select>
                <input
                  style={inputStyle}
                  placeholder="번호를 입력하세요"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                />
              </div>
            </FieldGroup>

            <FieldGroup label="우편번호">
              <input
                style={{ ...inputStyle, backgroundColor: '#F9F9F9', cursor: 'default', width: '160px' }}
                placeholder="우편번호"
                value={form.postalCode}
                readOnly
              />
            </FieldGroup>

            <FieldGroup label="주소" error={errors.address}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  style={{ ...inputStyle, backgroundColor: '#F9F9F9', cursor: 'default' }}
                  placeholder="주소 검색을 클릭하세요"
                  value={form.address}
                  readOnly
                />
                <button style={btnStyle} onClick={() => setShowPostcode(true)}>주소 검색</button>
              </div>
            </FieldGroup>

            <FieldGroup label="상세주소">
              <input
                style={inputStyle}
                placeholder="상세주소를 입력하세요"
                value={form.addressDetail}
                onChange={e => set('addressDetail', e.target.value)}
              />
            </FieldGroup>

            <button
              onClick={handleSubmit}
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: C.primary,
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '700',
                fontFamily: 'Noto Sans KR, sans-serif',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                marginTop: '4px',
              }}
            >
              회원가입
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: C.textSecondary, fontFamily: 'Noto Sans KR, sans-serif' }}>
                이미 계정이 있으신가요?
              </span>
              <span
                style={{ fontSize: '13px', fontWeight: '600', color: C.primary, fontFamily: 'Noto Sans KR, sans-serif', cursor: 'pointer' }}
                onClick={() => navigate('/login')}
              >
                로그인
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 다음 우편번호 팝업 */}
      {showPostcode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowPostcode(false)}
        >
          <div
            style={{ position: 'relative', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPostcode(false)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 10,
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#333',
              }}
            >
              ×
            </button>
            <DaumPostcode onComplete={handleAddressSelect} />
          </div>
        </div>
      )}
    </div>
  )
}
