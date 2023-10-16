import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleCommunicationQuery = (id) => {
  return {
    queryKey: ['communication', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/communications/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleCommunicationQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('/dashboard/clients');
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.put(`/communications/${params.id}`, data);
      queryClient.invalidateQueries(['communications']);
      toast.success('Communication edited successfully');
      return redirect('/dashboard/clients');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const CommunicationEdit = () => {
  //grab client id from loader
  const id = useLoaderData();
  console.log(`user id is ${id}`);
  const communication = useQuery(singleCommunicationQuery(id)).data.data.data;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit communication</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="communicationDate"
            labelText="datee"
            defaultValue={communication.communicationDate}
          />
          <FormRow
            type="text"
            name="communicationType"
            labelText="type"
            defaultValue={communication.communicationType}
          />
          <FormRow
            type="text"
            name="communicationNote"
            labelText="message"
            defaultValue={communication.communicationNote}
          />
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default CommunicationEdit;
