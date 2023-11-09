import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { PAYMENT_TYPE } from '../../../utils/constants';
import { useClientsContext } from './ClientsLayout';
import { useContractsContext } from './ContractsLayout';

const singlePaymentQuery = (id) => {
  return {
    queryKey: ['payment', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/payments/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const paymentId = params.paymentId;
    try {
      await queryClient.ensureQueryData(singlePaymentQuery(paymentId));
      return paymentId;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('../');
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const paymentId = params.paymentId;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.put(`/payments/${paymentId}`, data);
      queryClient.invalidateQueries(['payments']);
      toast.success('Payment edited successfully');
      return redirect('../../');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const PaymentEdit = () => {
  const paymentId = useLoaderData();
  const payment = useQuery(singlePaymentQuery(paymentId)).data.data.data;
  console.log(`payment details ${JSON.stringify(payment)}`);
  const { paymentDate, paymentMethod, paymentAmount, paymentNote } = payment;
  const params = useParams();
  const contractId = params.id;
  console.log(`contractId = ${contractId}`);
  const { contracts } = useContractsContext();
  const paymentContract = contracts.filter((contract) => {
    return contract._id === contractId;
  });
  const contractType = paymentContract[0].contractType;
  const { clients } = useClientsContext();
  const client = clients.filter((client) => {
    return client._id === payment.client;
  });
  const clientFirstName = client[0].clientFirstName;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h5 className="form-title">
          edit payment for {contractType} for {clientFirstName}
        </h5>
        <div className="form-center">
          <FormRow type="text" name="paymentDate" labelText="date" defaultValue={paymentDate} />
          <FormRowSelect
            labelText="type"
            name="paymentMethod"
            defaultValue={paymentMethod}
            list={Object.values(PAYMENT_TYPE)}
          />
          <FormRow
            type="text"
            name="paymentAmount"
            labelText="amount"
            defaultValue={paymentAmount}
          />
          <FormRow type="text" name="paymentNote" labelText="message" defaultValue={paymentNote} />
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PaymentEdit;
