import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/Communication';
import CommunicationInfo from './CommunicationInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

day.extend(advancedFormat);

const Communication = ({
  _id,
  communicationDate,
  communicationType,
  communicationNote,
  client
}) => {
  const date = day(communicationDate).format('MMM Do, YYYY');
  console.log(client); //this is client id
  return (
    <Wrapper>
      <div className="content">
        <div className="content-center">
          <CommunicationInfo text={`Date: ${date}`} />
          <CommunicationInfo text={`Type: ${communicationType}`} />
          <CommunicationInfo text={`Message: ${communicationNote}`} />
        </div>
        <footer className="actions">
          <Link to={`../${client}/communication-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../${client}/communication-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Communication;
