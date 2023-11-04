import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useClientsContext } from './ClientsLayout';
import { PAYMENT_TYPE } from '../../../utils/constants';

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const contractId = params.id;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post(`/contracts/${contractId}/payments`, data);
      queryClient.invalidateQueries(['contractPayments']);
      toast.success('Payment added successfully ');
      return redirect('../');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

//THIS NEEDS LOTS OF WORK - COPIED IN - NEED REFACTOR
const PaymentAdd = () => {
  let today = Date();
  const params = useParams();
  const clientId = params.id;
  const { clients } = useClientsContext();
  const client = clients.filter((client) => {
    return client._id === clientId;
  });
  const clientFirstName = client[0].clientFirstName;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add payment for {clientFirstName} </h4>
        <div className="form-center">
          <FormRow type="text" name="paymentDate" labelText="date" defaultValue={today} required />
          <FormRowSelect
            labelText="type"
            name="paymentType"
            defaultValue="Phone"
            list={Object.values(PAYMENT_TYPE)}
          />
          <FormRow type="text" name="paymentNote" labelText="message" />

          <SubmitBtn formBtn btnText="add new payment" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PaymentAdd;
