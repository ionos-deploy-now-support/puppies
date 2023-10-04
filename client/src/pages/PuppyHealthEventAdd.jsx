import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { usePuppyHealthEventsContext } from './PuppyHealthEventsLayout';

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const puppyId = params.id;
    const formData = await request.formData();
    const data = Object.fromEntries(formData); //well-formed data Object from form inputs
    console.log(JSON.stringify(data));
    try {
      await customFetch.post(`/${puppyId}/healthEvents`, data);
      queryClient.invalidateQueries(['healthEvents']);
      toast.success('health event added successfully ');
      return redirect(`/dashboard/litters/puppies/${puppyId}/puppy-health-events`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const PuppyHealthEventAdd = () => {
  const params = useParams();
  const { puppyObj } = usePuppyHealthEventsContext();
  const puppy = puppyObj._id;
  let today = Date();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add health event</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="puppy" className="form-label"></label>
            <input
              type="hidden"
              id="puppy"
              name="puppy"
              className="form-input"
              defaultValue={puppy}
              required
            />
          </div>
          <FormRow type="text" name="eventDate" labelText="date" defaultValue={today} />
          <FormRow type="text" name="grams" />
          <FormRow type="text" name="description" />

          <SubmitBtn formBtn btnText="add new health record" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PuppyHealthEventAdd;
