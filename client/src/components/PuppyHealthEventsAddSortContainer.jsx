import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { usePuppyHealthEventsContext } from '../pages/PuppyHealthEventsLayout';
import { BsPlusCircle } from 'react-icons/bs';

const PuppyHealthEventsAddSortContainer = () => {
  const { puppyObj } = usePuppyHealthEventsContext();
  const puppyId = puppyObj._id;
  const submit = useSubmit();

  return (
    <Wrapper>
      <Form className="form">
        <Link
          to={`/dashboard/litters/puppies/${puppyId}/puppy-health-events/puppy-health-event-add`}
          className="btn form-btn"
          style={{ marginTop: '-2rem', marginBottom: '2rem' }}>
          <span>
            <BsPlusCircle className="icon" />
            new health event
          </span>
        </Link>
        <hr style={{ marginTop: '-.4rem', marginBottom: '.8rem' }} />
      </Form>
    </Wrapper>
  );
};
export default PuppyHealthEventsAddSortContainer;
