import ImageGallery from 'react-image-gallery';
import Wrapper from '../assets/wrappers/Carousel';

const Carousel = () => {
  //ImageGallery expects an array of objects as a prop (original, thumbnail, fullscreen)
  const pics = [
    { original: '/img/users/user-649f49decb19fdee16e0803d-1694226661832.jpg' },
    { original: '/img/users/user-649f4994cb19fdee16e08037-1693017968556.jpg' },
    { original: '/img/users/user-649f335556253270fade2198-1692922688373.jpeg' }
  ];

  return (
    <Wrapper>
      <ImageGallery items={pics} showThumbnails={false} />
    </Wrapper>
  );
};
export default Carousel;
