import { GalleryAdminContainer, GalleryAdminSearchContainer } from '../components';

const GalleryAdmin = () => {
  return (
    <div className="litters-page">
      <GalleryAdminSearchContainer />
      <GalleryAdminContainer />
    </div>
  );
};

export default GalleryAdmin;
