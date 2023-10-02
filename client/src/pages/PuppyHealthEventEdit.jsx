import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { usePuppyHealthEventsContext } from './PuppyHealthEventsLayout';

const singlePuppyHealthEventQuery = (puppyId, id) => {
  return {
    queryKey: ['puppy', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/puppies/${puppyId}/healthEvents/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  // async ({ params }) => {
  async ({ request }) => {
    console.log(request.url);
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    console.log(`Value of params from loader ${params}`);
    const puppyId = '646503dd6d2238deabe1bbf0';

    try {
      // await queryClient.ensureQueryData(singlePuppyHealthEventQuery(puppyId, params.id));
      const eventId = params.id;
      console.log(`From PuppyHealthEventEdit Loader healthEvent- id: ${eventId}`);
      return eventId, puppyId;
    } catch (error) {
      const eventId = params.id;
      console.log(eventId);
      toast.error(error?.response?.data?.message);
      return redirect(`/dashboard/litters/puppies/${puppyId}/puppy-health-event-edit/${eventId}`);
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const puppyId = '646503dd6d2238deabe1bbf0';
    try {
      await customFetch.put(`/puppies/${puppyId}/healthEvents/${params.id}`, data);
      queryClient.invalidateQueries(['puppy']);
      toast.success('Health event edited successfully');
      return redirect(`/dashboard/litters/puppies/${puppyId}/puppy-health-events`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const PuppyHealthEventEdit = () => {
  // console.log(usePuppyHealthEventsContext()); //UNDEFINED
  // console.log(data);
  // const puppyId = data.id;
  //grab healthEvent id from loader. Loader gets it from params
  const id = useLoaderData(); //it is pulling puppyId here
  const puppyId = id;
  const eventId = '64a2ef384f03fbc207c1d80d';
  console.log(`From PuppyHealthEventEdit puppy id is ${puppyId}`);
  const healthEvent = useQuery(singlePuppyHealthEventQuery(puppyId, eventId)).data.data.data;
  console.log(healthEvent);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>Puppy health event edit test</h4>
        <h4 className="form-title">edit health record for XXXX</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="eventDate"
            labelText="date"
            defaultValue={healthEvent.eventDate}
          />

          <FormRow
            type="text"
            name="description"
            labelText="description"
            defaultValue={healthEvent.description}
          />
          <FormRow
            type="text"
            name="grams"
            labelText="weight in grams"
            defaultValue={healthEvent.grams}
          />
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PuppyHealthEventEdit;
