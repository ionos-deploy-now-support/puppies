import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { SORT_BY } from '../../../utils/constants';
import { Form, useSubmit, Link } from 'react-router-dom';
import { usePuppiesContext } from '../pages/PuppiesLayout';
import { BsPlusCircle } from 'react-icons/bs';

const PuppyHealthEventsSearchContainer = () => {
  const { searchValues } = usePuppiesContext();
  const { search, sort } = searchValues;
  const submit = useSubmit(); //invokes the useSubmit hook

  // debounce feature controls how often form is submitted during key input
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <Link
          to="/dashboard/litters/puppy-health-event-add"
          className="btn form-btn"
          style={{ marginTop: '-2rem', marginBottom: '2rem' }}>
          <span>
            <BsPlusCircle className="icon" />
            new health event
          </span>
        </Link>
        <hr style={{ marginTop: '-.4rem', marginBottom: '.8rem' }} />
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="search description"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="sort"
            labelText="sort by"
            defaultValue={sort}
            list={[...Object.values(SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link
            to="/dashboard/litters/puppy"
            className="btn form-btn delete-btn"
            onClick={(e) => e.currentTarget.form.reset()}>
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default PuppyHealthEventsSearchContainer;
