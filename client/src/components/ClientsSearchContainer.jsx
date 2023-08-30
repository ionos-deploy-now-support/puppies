import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { SORT_BY } from '../../../utils/constants';
import { useClientsContext } from '../pages/Clients';

const ClientsSearchContainer = () => {
  const { searchValues } = useClientsContext();
  const { search, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="search by client first name"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            name="sort"
            defaultValue="newest"
            list={[...Object.values(SORT_BY)]}
            // onChange={(e) => {
            //   submit(e.currentTarget.form);
            // }}
          />
          <Link to="/dashboard/clients" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          <SubmitBtn formBtn btnText="search now" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default ClientsSearchContainer;
