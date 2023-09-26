import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePuppiesContext } from '../pages/PuppiesLayout';

const PuppiesPageBtnContainer = () => {
  const {
    data: { numPages, currentPage }
  } = usePuppiesContext();
  const pages = Array.from({ length: numPages }, (_, index) => {
    return index + 1;
  });
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  console.log(search, pathname);
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numPages;
          handlePageChange(prevPage);
        }}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${pageNumber === currentPage && 'active'}`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numPages) nextPage = 1;
          handlePageChange(nextPage);
        }}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};
export default PuppiesPageBtnContainer;
