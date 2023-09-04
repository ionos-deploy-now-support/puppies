import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
// import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleClientQuery = (id) => {
  return {
    queryKey: ['client', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/clients/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleClientQuery(params.id));
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
      await customFetch.put(`/clients/${params.id}`, data);
      queryClient.invalidateQueries(['clients']);

      toast.success('Client edited successfully');
      return redirect('/dashboard/clients');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const ClientEdit = () => {
  const id = useLoaderData();
  // const client = data.data;
  const {
    data: { client }
  } = useQuery(singleClientQuery(id));

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit client</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="clientFirstName"
            labelText="first name"
            defaultValue={client.clientFirstName}
          />
          <FormRow
            type="text"
            name="clientLastName"
            labelText="last name"
            defaultValue={client.clientLastName}
          />
          <FormRow
            type="email"
            name="clientEmail"
            labelText="email"
            defaultValue={client.clientEmail}
          />
          <FormRow
            type="text"
            name="clientPhone"
            labelText="phone"
            defaultValue={client.clientPhone}
          />
          <FormRow
            type="text"
            name="clientAddress1"
            labelText="address"
            defaultValue={client.clientAddress1}
          />
          <FormRow
            type="text"
            name="clientAddress2"
            labelText="additional address"
            defaultValue={client.clientAddress2}
          />
          <FormRow
            type="text"
            name="clientCity"
            labelText="city"
            defaultValue={client.clientCity}
          />
          <FormRow
            type="text"
            name="clientState"
            labelText="state"
            defaultValue={client.clientState}
          />
          <FormRow
            type="text"
            name="clientZip"
            labelText="zip code"
            defaultValue={client.clientZip}
          />
          <FormRow type="text" name="clientNote" labelText="special note" />
          <FormRow
            type="text"
            name="clientRole"
            labelText="client role"
            defaultValue={client.clientRole}
          />
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default ClientEdit;
