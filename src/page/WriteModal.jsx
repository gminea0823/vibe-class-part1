import { useState } from 'react'

const MAX_CONTENT_LENGTH = 800

export default function WriteModal({ onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function handleContentChange(e) {
    if (e.target.value.length <= MAX_CONTENT_LENGTH) {
      setContent(e.target.value)
    }
  }

  function handleSave() {
    if (!title.trim() || !content.trim()) return
    onSave({ title: title.trim(), content: content.trim() })
    onClose()
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
            글쓰기
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              color: '#6B7280',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Title Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
            글제목
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={{
              height: '44px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              padding: '0 14px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              color: '#1A1A1A',
              outline: 'none',
              boxSizing: 'border-box',
              width: '100%',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#1A1A1A')}
            onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
          />
        </div>

        {/* Content Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
              글 내용
            </span>
            <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>
              {content.length} / {MAX_CONTENT_LENGTH}
            </span>
          </div>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력하세요 (최대 800자)"
            style={{
              height: '220px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              padding: '12px 14px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              color: '#1A1A1A',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box',
              width: '100%',
              lineHeight: '1.6',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#1A1A1A')}
            onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#FFFFFF',
              color: '#1A1A1A',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            style={{
              padding: '10px 20px',
              backgroundColor: !title.trim() || !content.trim() ? '#D1D5DB' : '#3B82F6',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              border: 'none',
              borderRadius: '6px',
              cursor: !title.trim() || !content.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
