import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getBoards, deleteBoards, createBoard } from '../api/boardApi'
import useAuthStore from '../store/authStore'
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
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [checkedIds, setCheckedIds] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchBoards(currentPage)
  }, [currentPage])

  async function fetchBoards(page) {
    try {
      const res = await getBoards(page, ITEMS_PER_PAGE)
      setPosts(res.data ?? [])
      setTotalPages(res.totalPages || 1)
    } catch {
      alert('게시글을 불러오는데 실패했습니다.')
    }
  }

  async function handleSave({ title, content }) {
    try {
      await createBoard(title, content)
      setCurrentPage(1)
      fetchBoards(1)
    } catch {
      alert('게시글 등록에 실패했습니다.')
    }
  }

  async function handleDelete() {
    if (checkedIds.length === 0) {
      alert('삭제할 게시글을 선택하십시오')
      return
    }
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await deleteBoards(checkedIds)
      setCheckedIds([])
      fetchBoards(currentPage)
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  const allChecked = posts.length > 0 && posts.every((item) => checkedIds.includes(item.boardId))

  function toggleAll() {
    if (allChecked) {
      setCheckedIds((prev) => prev.filter((id) => !posts.find((item) => item.boardId === id)))
    } else {
      setCheckedIds((prev) => [...new Set([...prev, ...posts.map((item) => item.boardId)])])
    }
  }

  function toggleOne(boardId) {
    setCheckedIds((prev) => prev.includes(boardId) ? prev.filter((id) => id !== boardId) : [...prev, boardId])
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
        {isLoggedIn && (
          <>
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
              onClick={handleDelete}
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
          </>
        )}
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
              {isLoggedIn && <Checkbox checked={allChecked} onChange={toggleAll} />}
            </div>
            <div style={cellStyle('80px')}><span style={headerText}>글번호</span></div>
            <div style={{ ...cellStyle('auto', 'flex-start'), flex: 1, padding: '0 16px' }}><span style={headerText}>글제목</span></div>
            <div style={cellStyle('120px')}><span style={headerText}>글쓴이</span></div>
            <div style={cellStyle('100px')}><span style={headerText}>조회수</span></div>
            <div style={cellStyle('160px')}><span style={headerText}>최종수정일</span></div>
          </div>

          {/* Data Rows */}
          {posts.map((row) => (
            <div
              key={row.boardId}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '48px',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              <div style={cellStyle('48px')}>
                {isLoggedIn && <Checkbox checked={checkedIds.includes(row.boardId)} onChange={() => toggleOne(row.boardId)} />}
              </div>
              <div style={cellStyle('80px')}><span style={bodyText()}>{row.boardId}</span></div>
              <div style={{ ...cellStyle('auto', 'flex-start'), flex: 1, padding: '0 16px' }}>
                <span
                  onClick={() => navigate(`/board/${row.boardId}`)}
                  style={{ ...bodyText('#1A1A1A'), cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {row.title}
                </span>
              </div>
              <div style={cellStyle('120px')}><span style={bodyText()}>{row.writer}</span></div>
              <div style={cellStyle('100px')}><span style={bodyText()}>{row.readCount}</span></div>
              <div style={cellStyle('160px')}><span style={bodyText()}>{row.createAt?.slice(0, 10)}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Paging
        currentPage={currentPage}
        totalItems={totalPages * ITEMS_PER_PAGE}
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
