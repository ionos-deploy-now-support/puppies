import { FaLocationArrow, FaCalendarAlt, FaPhone, FaStickyNote } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/Client';
import ClientInfo from './ClientInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Client = ({
  _id,
  clientFirstName,
  clientLastName,
  clientEmail,
  clientPhone,
  clientAddress1,
  clientAddress2,
  clientCity,
  clientState,
  clientZip,
  clientNote,
  createdAt
}) => {
  const date = day(createdAt).format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{clientFirstName.charAt(0)}</div>
        <div className="info">
          <h5>{`${clientFirstName} ${clientLastName}`}</h5>
          <p>{clientCity}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ClientInfo icon={<FaPhone />} text={clientPhone} />
          <ClientInfo icon={<MdEmail />} text={clientEmail} />
          <ClientInfo icon={<FaCalendarAlt />} text={`Since: ${date}`} />
          <ClientInfo
            icon={<FaLocationArrow />}
            text={`${clientAddress1}
            ${clientAddress2}
            ${clientCity}   ${clientState} ${clientZip}`}
          />
          <ClientInfo icon={<FaStickyNote />} text={clientNote} />
        </div>
        <footer className="actions">
          <Link to={`../client-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../client-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete client" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Client;
