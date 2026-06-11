export default function Paging({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const btnBase = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    borderRadius: '6px',
    cursor: 'pointer',
    border: '1px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
  }

  const activeBtn = {
    ...btnBase,
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    border: 'none',
    fontWeight: '500',
  }

  const arrowBtn = {
    ...btnBase,
    color: '#6B7280',
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', padding: '8px 0 0' }}>
      <button
        style={arrowBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          style={page === currentPage ? activeBtn : btnBase}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        style={arrowBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  )
}
