import { FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { SORT_BY } from '../../../utils/constants';
import { Form, useSubmit, Link } from 'react-router-dom';
import { usePuppyHealthEventsContext } from '../pages/PuppyHealthEventsLayout';
import { BsPlusCircle } from 'react-icons/bs';

const PuppyHealthEventsAddSortContainer = () => {
  // const { searchValues } = usePuppyHealthEventsContext(); // there is no such thing in usePuppyHealthEventsContext()
  const { _id } = usePuppyHealthEventsContext();
  const puppyId = _id;
  // const { sort } = searchValues;
  const submit = useSubmit();

  return (
    <Wrapper>
      <Form className="form">
        <Link
          to={`/dashboard/litters/puppies/${puppyId}/puppy-health-event-add`}
          className="btn form-btn"
          style={{ marginTop: '-2rem', marginBottom: '2rem' }}>
          <span>
            <BsPlusCircle className="icon" />
            new health event
          </span>
        </Link>
        <hr style={{ marginTop: '-.4rem', marginBottom: '.8rem' }} />
        <div className="form-center">
          <FormRowSelect
            name="sort"
            labelText="sort by"
            defaultValue="{sort}"
            list={[...Object.values(SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PuppyHealthEventsAddSortContainer;
