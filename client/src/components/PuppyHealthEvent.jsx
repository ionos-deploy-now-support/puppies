import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/PuppyHealthEvent';
import PuppyHealthEventInfo from './PuppyHealthEventInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { usePuppyHealthEventsContext } from '../pages/PuppyHealthEventsLayout';
day.extend(advancedFormat);

const PuppyHealthEvent = ({ _id, eventDate, description, grams, puppy }) => {
  const date = day(eventDate).format('MMM Do, YYYY');
  // const { data } = usePuppyHealthEventsContext();
  // const puppyId = data.id;
  // console.log(puppyId);
  console.log(puppy);
  return (
    <Wrapper>
      <div className="content">
        <div className="content-center">
          <PuppyHealthEventInfo text={`Date: ${date}`} />
          <PuppyHealthEventInfo text={`Description: ${description}`} />
          <PuppyHealthEventInfo text={`Weight in grams: ${grams}`} />
        </div>
        <footer className="actions">
          <Link to={`../${puppy}/puppy-health-event-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../${puppy}/puppy-health-event-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default PuppyHealthEvent;
