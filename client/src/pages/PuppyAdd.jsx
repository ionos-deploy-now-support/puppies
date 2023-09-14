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
      await customFetch.post('/puppies', data);
      queryClient.invalidateQueries(['puppies']);
      toast.success('Puppy added successfully ');
      return redirect('/dashboard/puppies');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const PuppyAdd = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add puppy</h4>
        <div className="form-center">
          <FormRow type="text" name="puppyTempName" labelText="name" />
          <FormRow type="text" name="puppyColor" labelText="color" />
          <FormRow type="text" name="puppySex" labelText="sex" />
          <FormRow type="text" name="puppyDOB" labelText="born" defaultValue={Date.now()} />
          <FormRow type="text" name="puppyLitter" labelText="litter" />
          <FormRow type="text" name="puppySurvived" labelText="survived" defaultValue="true" />
          <FormRow type="text" name="puppyCollar" labelText="collar" />
          <FormRow type="text" name="puppyAKC" labelText="AKC" />
          <FormRow type="text" name="puppyNewName" labelText="New Name" />
          <FormRow type="text" name="puppyAsking" labelText="Asking Price" />
          <FormRow type="text" name="puppyAvailable" labelText="available" defaultValue="true" />
          <FormRow type="text" name="puppyNote" labelText="note" />
          <SubmitBtn formBtn btnText="add new puppy" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PuppyAdd;
