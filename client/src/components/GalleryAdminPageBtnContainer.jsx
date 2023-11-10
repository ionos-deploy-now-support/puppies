import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGalleryAdminContext } from '../pages/GalleryAdminLayout';

const GalleryAdminPageBtnContainer = () => {
  const { numPages, currentPage } = useGalleryAdminContext();
  console.log(`displaying page ${currentPage} of ${numPages} page(s)`);

  // build simple array of pages numbers
  const pages = Array.from({ length: numPages }, (_, index) => {
    return index + 1;
  });

  // useLocation holds search params and pathname
  const { search, pathname } = useLocation();
  console.log(`search is ${search}, pathname is ${pathname}`);

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    console.log('hello from handlePageChange');
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    console.log(`searchParams = ${searchParams.toString()}`);
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
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default GalleryAdminPageBtnContainer;
