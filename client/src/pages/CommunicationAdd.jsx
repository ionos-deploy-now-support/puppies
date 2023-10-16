import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/communications', data);
      queryClient.invalidateQueries(['communications']);
      toast.success('Client added successfully ');
      return redirect('/dashboard/clients');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const CommunicationAdd = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add communication</h4>
        <div className="form-center">
          <FormRow type="text" name="communicationDate" labelText="date" required />
          <FormRow type="text" name="communicationType" labelText="type" />
          <FormRow type="email" name="communicationNote" labelText="message" />

          <SubmitBtn formBtn btnText="add new communication" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default CommunicationAdd;
