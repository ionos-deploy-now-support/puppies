import { FaLocationArrow, FaCalendarAlt, FaPhone, FaStickyNote } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/GalleryItem';
import GalleryItemInfo from './GalleryItemInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const GalleryItem = ({
  _id,
  galleryItemFirstName,
  galleryItemLastName,
  galleryItemEmail,
  galleryItemPhone,
  galleryItemAddress1,
  galleryItemAddress2,
  galleryItemCity,
  galleryItemState,
  galleryItemZip,
  galleryItemNote,
  createdAt
}) => {
  const date = day(createdAt).format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{galleryItemFirstName.charAt(0)}</div>
        <div className="info">
          <h5>{`${galleryItemFirstName} ${galleryItemLastName}`}</h5>
          <p>{galleryItemCity}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <GalleryItemInfo icon={<FaPhone />} text={galleryItemPhone} />
          <GalleryItemInfo icon={<MdEmail />} text={galleryItemEmail} />
          <GalleryItemInfo icon={<FaCalendarAlt />} text={`Since: ${date}`} />
          <GalleryItemInfo
            icon={<FaLocationArrow />}
            text={`${galleryItemAddress1}
            ${galleryItemAddress2}
            ${galleryItemCity}   ${galleryItemState} ${galleryItemZip}`}
          />
          <GalleryItemInfo icon={<FaStickyNote />} text={galleryItemNote} />
        </div>
        <footer className="actions">
          <Link to={`../galleryItems/galleryItem-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Link to={`../galleryItems/${_id}/communications`} className={`btn edit-btn`}>
            Communications
          </Link>
          <Link to={`../galleryItems/${_id}/contracts`} className={`btn edit-btn`}>
            Contracts
          </Link>
          <Form method="post" action={`../galleryItems/galleryItem-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default GalleryItem;
