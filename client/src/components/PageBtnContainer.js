import { useAppContext } from '../context/appContext'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })
  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    changePage(newPage)
  }
  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPages
    }
    changePage(newPage)
  }
  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft /> Prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber, index) => {
          return (
            <button
              type='button'
              key={index}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        Next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
export default PageBtnContainer