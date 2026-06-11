import { useState } from 'react'
import boardData from '../assets/mock/boardData'
import Paging from './Paging'
import WriteModal from './WriteModal'

function Checkbox({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '4px',
        border: checked ? 'none' : '1.5px solid #D1D5DB',
        backgroundColor: checked ? '#3B82F6' : '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
          <path d="M1 3.5L4 6.5L10 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

const ITEMS_PER_PAGE = 10

export default function Board() {
  const [posts, setPosts] = useState([...boardData])
  const [currentPage, setCurrentPage] = useState(1)
  const [checkedIds, setCheckedIds] = useState([])
  const [showModal, setShowModal] = useState(false)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const pageItems = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  function handleSave({ title, content }) {
    const newPost = {
      no: posts.length > 0 ? posts[0].no + 1 : 1,
      title,
      content,
      author: '관리자',
      views: 0,
      date: new Date().toISOString().slice(0, 10),
    }
    setPosts((prev) => [newPost, ...prev])
    setCurrentPage(1)
  }

  const allChecked = pageItems.length > 0 && pageItems.every((item) => checkedIds.includes(item.no))

  function toggleAll() {
    if (allChecked) {
      setCheckedIds((prev) => prev.filter((id) => !pageItems.find((item) => item.no === id)))
    } else {
      setCheckedIds((prev) => [...new Set([...prev, ...pageItems.map((item) => item.no)])])
    }
  }

  function toggleOne(no) {
    setCheckedIds((prev) => prev.includes(no) ? prev.filter((id) => id !== no) : [...prev, no])
  }

  const cellStyle = (width, justify = 'center') => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: justify,
    width,
    height: '100%',
  })

  const headerText = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Inter, sans-serif',
  }

  const bodyText = (color = '#6B7280') => ({
    fontSize: '13px',
    color,
    fontFamily: 'Inter, sans-serif',
  })

  return (
    <div style={{ padding: '32px 40px', backgroundColor: '#F9FAFB', minHeight: 'calc(100vh - 64px)' }}>
      {/* Title Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ fontSize: '22px', fontWeight: '700', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
          게시판
        </span>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '8px 20px',
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
          글쓰기
        </button>
        <button
          onClick={() => {
            setPosts((prev) => prev.filter((item) => !checkedIds.includes(item.no)))
            setCheckedIds([])
            setCurrentPage(1)
          }}
          style={{
            padding: '8px 20px',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          삭제
        </button>
      </div>

      {/* Table */}
      <div style={{ height: '528px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '48px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <div style={cellStyle('48px')}>
            <Checkbox checked={allChecked} onChange={toggleAll} />
          </div>
          <div style={cellStyle('80px')}><span style={headerText}>글번호</span></div>
          <div style={{ ...cellStyle('auto', 'flex-start'), flex: 1, padding: '0 16px' }}><span style={headerText}>글제목</span></div>
          <div style={cellStyle('120px')}><span style={headerText}>글쓴이</span></div>
          <div style={cellStyle('100px')}><span style={headerText}>조회수</span></div>
          <div style={cellStyle('160px')}><span style={headerText}>최종수정일</span></div>
        </div>

        {/* Data Rows */}
        {pageItems.map((row) => (
          <div
            key={row.no}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '48px',
              borderBottom: '1px solid #E5E7EB',
            }}
          >
            <div style={cellStyle('48px')}>
              <Checkbox checked={checkedIds.includes(row.no)} onChange={() => toggleOne(row.no)} />
            </div>
            <div style={cellStyle('80px')}><span style={bodyText()}>{row.no}</span></div>
            <div style={{ ...cellStyle('auto', 'flex-start'), flex: 1, padding: '0 16px' }}>
              <span style={bodyText('#1A1A1A')}>{row.title}</span>
            </div>
            <div style={cellStyle('120px')}><span style={bodyText()}>{row.author}</span></div>
            <div style={cellStyle('100px')}><span style={bodyText()}>{row.views}</span></div>
            <div style={cellStyle('160px')}><span style={bodyText()}>{row.date}</span></div>
          </div>
        ))}
      </div>
      </div>

      {/* Pagination */}
      <Paging
        currentPage={currentPage}
        totalItems={posts.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {showModal && (
        <WriteModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
