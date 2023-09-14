import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singlePuppyQuery = (id) => {
  return {
    queryKey: ['puppy', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/puppies/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singlePuppyQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('/dashboard/puppies');
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.put(`/puppies/${params.id}`, data);
      queryClient.invalidateQueries(['puppies']);
      toast.success('Puppy edited successfully');
      return redirect('/dashboard/puppies');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const PuppyEdit = () => {
  //grab puppy id from loader
  const id = useLoaderData();
  console.log(`From PuppyEdit puppy id is ${id}`);
  // having to drill deep into object to get to data wanted
  const puppy = useQuery(singlePuppyQuery(id)).data.data.data;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit puppy</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="puppyTempName"
            labelText="name"
            defaultValue={puppy.puppyTempName}
          />
          <FormRow
            type="text"
            name="puppyColor"
            labelText="color"
            defaultValue={puppy.puppyColor}
          />
          <FormRow type="text" name="puppySex" labelText="sex" defaultValue={puppy.puppySex} />
          <FormRow type="text" name="puppyDOB" labelText="born" defaultValue={puppy.puppyDOB} />
          <FormRow type="text" name="litter" labelText="litter" defaultValue={puppy.litter} />
          <FormRow
            type="text"
            name="puppySurvived"
            labelText="survived"
            defaultValue={puppy.puppySurvived}
          />
          <FormRow
            type="text"
            name="puppyCollar"
            labelText="collar"
            defaultValue={puppy.puppyCollar}
          />
          <FormRow type="text" name="puppyAKC" labelText="AKC" defaultValue={puppy.puppyAKC} />

          <FormRow
            type="text"
            name="puppyNewName"
            labelText="New Name"
            defaultValue={puppy.puppyNewName}
          />
          <FormRow
            type="text"
            name="puppyAsking"
            labelText="Asking Price"
            defaultValue={puppy.puppyAsking}
          />
          <FormRow
            type="text"
            name="puppyAvailable"
            labelText="available"
            defaultValue={puppy.puppyAvailable}
          />
          <FormRow type="text" name="puppyNote" labelText="note" defaultValue={puppy.puppyNote} />

          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PuppyEdit;
