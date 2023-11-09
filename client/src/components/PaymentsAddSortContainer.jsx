import { FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link, useParams, useSubmit } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import { usePaymentsContext } from '../pages/PaymentsLayout';
import { SORT_PAYMENTS_BY } from '../../../utils/constants';
import { useContractsContext } from '../pages/ContractsLayout';
import { useClientsContext } from '../pages/ClientsLayout';

const PaymentsAddSortContainer = () => {
  const { searchValues } = usePaymentsContext();
  console.log(searchValues);
  const { sort } = searchValues;
  const submit = useSubmit();
  const params = useParams();
  const contractId = params.id;
  const { contracts } = useContractsContext();
  const paymentContract = contracts.filter((contract) => {
    return contract._id === contractId;
  });
  const contractType = paymentContract[0].contractType;
  const clientId = paymentContract[0].client;
  const { clients } = useClientsContext();
  const client = clients.filter((client) => {
    return client._id === clientId;
  });
  const clientFirstName = client[0].clientFirstName;
  return (
    <Wrapper>
      <Form className="form">
        <Link
          to={`/dashboard/clients/${clientId}/contracts/${contractId}/payments/payment-add`}
          className="btn form-btn"
          style={{ marginTop: '-2rem', marginBottom: '2rem' }}>
          <span>
            <BsPlusCircle className="icon" />
            new payment for {contractType} puppy for {clientFirstName}
          </span>
        </Link>
        <hr style={{ marginTop: '-.4rem', marginBottom: '.8rem' }} />
        <div className="form-center">
          <FormRowSelect
            name="sort"
            labelText="sort by"
            defaultValue={sort}
            list={[...Object.values(SORT_PAYMENTS_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
        </div>
      </Form>
    </Wrapper>
  );
};
export default PaymentsAddSortContainer;
