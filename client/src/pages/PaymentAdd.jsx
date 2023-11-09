import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useClientsContext } from './ClientsLayout';
import { PAYMENT_TYPE } from '../../../utils/constants';
import { useContractsContext } from './ContractsLayout';

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const contractId = params.id;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post(`/contracts/${contractId}/payments`, data);
      queryClient.invalidateQueries(['payments']);
      toast.success('Payment added successfully ');
      return redirect('../../');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const PaymentAdd = () => {
  let today = Date();
  const params = useParams();
  const contractId = params.id;
  const { contracts } = useContractsContext();
  const contract = contracts.filter((contract) => {
    return (contract._id = contractId);
  });
  const contractType = contract[0].contractType;
  const clientId = contract[0].client;
  const { clients } = useClientsContext();
  const client = clients.filter((client) => {
    return client._id === clientId;
  });
  const clientFirstName = client[0].clientFirstName;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h5 className="form-title">
          add payment for {contractType} puppy for {clientFirstName}{' '}
        </h5>
        <div className="form-center">
          <FormRow type="text" name="paymentDate" labelText="date" defaultValue={today} required />
          <FormRowSelect
            labelText="type"
            name="paymentType"
            defaultValue="Phone"
            list={Object.values(PAYMENT_TYPE)}
          />
          <FormRow type="text" name="paymentAmount" labelText="amount" />
          <FormRow type="text" name="paymentNote" labelText="message" />
          <input type="hidden" id="client" name="client" className="form-input" value={clientId} />
          <SubmitBtn formBtn btnText="add new payment" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PaymentAdd;
