import GalleryItem from './GalleryItem';
import Wrapper from '../assets/wrappers/GalleryAdminContainer';
import { useGalleryAdminContext } from '../pages/GalleryAdminLayout';
import GalleryAdminsPageBtnContainer from './GalleryAdminPageBtnContainer';
const GalleryAdminContainer = () => {
  const { data } = useGalleryAdminContext();
  const galleryItems = data.data.docs;
  const { results, filteredResults, numPages } = data;
  console.log(galleryItems, results);

  if (galleryItems.length === 0) {
    return (
      <Wrapper>
        <h2>No items to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {results} gallery item{results > 1 && 's '}{' '}
        {filteredResults !== results && `and found ${filteredResults} matching search`}
      </h5>
      <div className="galleryItems">
        {galleryItems.map((item) => {
          return <GalleryAdmin key={item._id} {...item} />;
        })}
      </div>
      {numPages > 1 && <GalleryAdminsPageBtnContainer />}
    </Wrapper>
  );
};
export default GalleryAdminContainer;
