import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getBoardDetail, updateBoard, deleteBoards } from '../api/boardApi'
import useAuthStore from '../store/authStore'

export default function BoardDetail() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const [post, setPost] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  useEffect(() => {
    fetchDetail()
  }, [boardId])

  async function fetchDetail() {
    try {
      const res = await getBoardDetail(boardId)
      setPost(res.data)
      setTitle(res.data.title)
      setContents(res.data.contents)
    } catch {
      alert('게시글을 불러오는데 실패했습니다.')
    }
  }

  async function handleUpdate() {
    try {
      await updateBoard(boardId, title, contents)
      alert('수정되었습니다.')
      setEditMode(false)
      fetchDetail()
    } catch {
      alert('수정에 실패했습니다.')
    }
  }

  async function handleDelete() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await deleteBoards([Number(boardId)])
      navigate('/board')
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  if (!post) return null

  const inputStyle = {
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    padding: '10px 14px',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    color: '#1A1A1A',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
  }

  return (
    <div style={{ padding: '32px 40px', backgroundColor: '#F9FAFB', minHeight: 'calc(100vh - 64px)' }}>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* 제목 */}
        {editMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = '#1A1A1A')}
            onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
          />
        ) : (
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
            {post.title}
          </h2>
        )}

        {/* 메타 정보 */}
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
            글쓴이: <strong style={{ color: '#1A1A1A' }}>{post.writer}</strong>
          </span>
          <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
            조회수: <strong style={{ color: '#1A1A1A' }}>{post.readCount}</strong>
          </span>
          <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
            작성일: <strong style={{ color: '#1A1A1A' }}>{post.createAt?.slice(0, 10)}</strong>
          </span>
        </div>

        {/* 내용 */}
        {editMode ? (
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            style={{ ...inputStyle, height: '240px', resize: 'none', padding: '12px 14px', lineHeight: '1.6' }}
            onFocus={(e) => (e.target.style.borderColor = '#1A1A1A')}
            onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
          />
        ) : (
          <p style={{ margin: 0, fontSize: '14px', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {post.contents}
          </p>
        )}

        {/* 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
          {isLoggedIn && !editMode && (
            <>
              <button
                onClick={() => setEditMode(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Inter, sans-serif',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '10px 20px',
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
          {isLoggedIn && editMode && (
            <>
              <button
                onClick={handleUpdate}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Inter, sans-serif',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                저장
              </button>
              <button
                onClick={() => { setEditMode(false); setTitle(post.title); setContents(post.contents) }}
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
            </>
          )}
          <button
            onClick={() => navigate('/board')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6B7280',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            목록
          </button>
        </div>
      </div>
    </div>
  )
}
