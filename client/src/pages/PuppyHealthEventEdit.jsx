import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { usePuppyHealthEventsContext } from './PuppyHealthEventsLayout';

const singlePuppyHealthEventQuery = (id) => {
  return {
    queryKey: ['puppy', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/healthEvents/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    // async ({ request }) => {
    //   console.log(request.url);
    //   const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    try {
      await queryClient.ensureQueryData(singlePuppyHealthEventQuery(params.id));
      console.log(`From PuppyHealthEventEdit Loader healthEvent- id: ${params.id}`);
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect(`/dashboard/litters/puppies`);
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.put(`/healthEvents/${params.id}`, data);
      queryClient.invalidateQueries(['puppy']);
      toast.success('Health event edited successfully');
      return redirect(`/dashboard/litters/puppies`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const PuppyHealthEventEdit = () => {
  const { data } = usePuppyHealthEventsContext(); //brings in puppy object
  const { puppyTempName } = data; //pull out puppy id and name

  //grab healthEvent id from loader. Loader gets it from params
  const id = useLoaderData(); //need healthEvent id -it was pulling puppyId here - now undefined
  console.log(id);
  // const eventId = '64a2ef384f03fbc207c1d80d';

  // const healthEvent = useQuery(singlePuppyHealthEventQuery(puppyId, eventId)).data.data.data;
  // console.log(healthEvent);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit health record for {puppyTempName}</h4>
        <div className="form-center">
          <FormRow type="text" name="eventDate" labelText="date" defaultValue="{}" />

          <FormRow
            type="text"
            name="description"
            labelText="description"
            defaultValue="{healthEvent.description}"
          />
          <FormRow
            type="text"
            name="grams"
            labelText="weight in grams"
            defaultValue="{healthEvent.grams}"
          />
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PuppyHealthEventEdit;
