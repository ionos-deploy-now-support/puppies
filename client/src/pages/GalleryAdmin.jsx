import { GalleryAdminContainer, GalleryAdminSearchContainer } from '../components';

const GalleryAdmin = () => {
  return (
    <div className="gallery-admin-page">
      <GalleryAdminSearchContainer />
      <GalleryAdminContainer />
      {/* <GalleryAdminPageBtnContainer /> */}
    </div>
  );
};

export default GalleryAdmin;
