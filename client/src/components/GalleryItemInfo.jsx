import Wrapper from '../assets/wrappers/GalleryItemInfo';

const GalleryItemInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="gallery-item-icon">{icon}</span>
      <span className="gallery-item-text">{text}</span>
    </Wrapper>
  );
};
export default GalleryItemInfo;
