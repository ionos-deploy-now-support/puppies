import { FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link, useSubmit } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import { useCommunicationsContext } from '../pages/CommunicationsLayout';
import { SORT_COMMS_BY } from '../../../utils/constants';

const CommunicationsAddSortContainer = () => {
  const { clientId, searchValues } = useCommunicationsContext();
  console.log(searchValues);
  const { sort } = searchValues;
  const submit = useSubmit();
  return (
    <Wrapper>
      <Form className="form">
        <Link
          to={`/dashboard/clients/${clientId}/communications/communication-add`}
          className="btn form-btn"
          style={{ marginTop: '-2rem', marginBottom: '2rem' }}>
          <span>
            <BsPlusCircle className="icon" />
            new communication
          </span>
        </Link>
        <hr style={{ marginTop: '-.4rem', marginBottom: '.8rem' }} />
        <div className="form-center">
          <FormRowSelect
            name="sort"
            labelText="sort by"
            defaultValue={sort}
            list={[...Object.values(SORT_COMMS_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
        </div>
      </Form>
    </Wrapper>
  );
};
export default CommunicationsAddSortContainer;
