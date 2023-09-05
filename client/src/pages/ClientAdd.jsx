import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
// import { useOutletContext } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/clients', data);
      queryClient.invalidateQueries(['clients']);
      toast.success('Client added successfully ');
      return redirect('/dashboard/clients');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const ClientAdd = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add client</h4>
        <div className="form-center">
          <FormRow type="text" name="clientFirstName" labelText="first name" required />
          <FormRow type="text" name="clientLastName" labelText="last name" />
          <FormRow type="email" name="clientEmail" labelText="email" />
          <FormRow type="text" name="clientPhone" labelText="phone" />
          <FormRow type="text" name="clientAddress1" labelText="address" />
          <FormRow type="text" name="clientAddress2" labelText="additional address" />
          <FormRow type="text" name="clientCity" labelText="city" />
          <FormRow type="text" name="clientState" labelText="state" />
          <FormRow type="text" name="clientZip" labelText="zip code" />
          <FormRow type="text" name="clientNote" labelText="special note" />
          <FormRow type="text" name="clientRole" labelText="client role" defaultValue="customer" />
          <SubmitBtn formBtn btnText="add new client" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default ClientAdd;
