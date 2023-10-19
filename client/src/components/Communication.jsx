import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/Communication';
import CommunicationInfo from './CommunicationInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useCommunicationsContext } from '../pages/CommunicationsLayout';

day.extend(advancedFormat);

const Communication = ({ _id, communicationDate, communicationType, communicationNote }) => {
  const date = day(communicationDate).format('MMM Do, YYYY');
  const { communications } = useCommunicationsContext();
  const clientId = communications[0].client;
  return (
    <Wrapper>
      <div className="content">
        <div className="content-center">
          <CommunicationInfo text={`Date: ${date}`} />
          <CommunicationInfo text={`Type: ${communicationType}`} />
          <CommunicationInfo text={`Message: ${communicationNote}`} />
        </div>
        <footer className="actions">
          <Link
            to={`../${clientId}/communications/communication-edit/${_id}`}
            className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../${clientId}/communications/communication-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Communication;
