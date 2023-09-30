import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/PuppyHealthEvent';
import PuppyHealthEventInfo from './PuppyHealthEventInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const PuppyHealthEvent = ({ _id, eventDate, description, grams }) => {
  const date = day(eventDate).format('MMM Do, YYYY');
  return (
    <Wrapper>
      <div className="content">
        <div className="content-center">
          <PuppyHealthEventInfo text={`Event: ${date}`} />
          <PuppyHealthEventInfo text={`Description: ${description}`} />
          <PuppyHealthEventInfo text={`Weight in grams: ${grams}`} />
        </div>
        <footer className="actions">
          <Link to={`../puppy-health-event-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../puppy-health-event-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default PuppyHealthEvent;
