import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { COMMUNICATION_TYPE } from '../../../utils/constants';

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
    const communicationId = params.communicationId;
    try {
      await queryClient.ensureQueryData(singleCommunicationQuery(communicationId));
      return communicationId;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('../');
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const communicationId = params.communicationId;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.put(`/communications/${communicationId}`, data);
      queryClient.invalidateQueries(['clientCommunications']);
      toast.success('Communication edited successfully');
      return redirect('../');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const CommunicationEdit = () => {
  //grab communication id from loader
  const communicationId = useLoaderData();
  console.log(`communicationId = ${communicationId}`);

  const communication = useQuery(singleCommunicationQuery(communicationId)).data.data.data;
  // const communication = useQuery(singleCommunicationQuery(communicationId));
  console.log(`communication holds ${JSON.stringify(communication)}`);
  const { communicationDate, communicationType, communicationNote } = communication;
  console.log(`Date ${communicationDate} Type ${communicationType} Note ${communicationNote}`);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit communication</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="communicationDate"
            labelText="date"
            defaultValue={communicationDate}
          />
          <FormRowSelect
            labelText="type"
            name="communicationType"
            defaultValue={communicationType}
            list={Object.values(COMMUNICATION_TYPE)}
          />
          <FormRow
            type="text"
            name="communicationNote"
            labelText="message"
            defaultValue={communicationNote}
          />
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default CommunicationEdit;
