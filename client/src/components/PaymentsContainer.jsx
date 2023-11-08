import Payment from './Payment';
import Wrapper from '../assets/wrappers/PaymentsContainer';
import { usePaymentsContext } from '../pages/PaymentsLayout';
import { useClientsContext } from '../pages/ClientsLayout';
import { useContractsContext } from '../pages/ContractsLayout';
import { useParams } from 'react-router-dom';

const PaymentsContainer = () => {
  const { payments } = usePaymentsContext();
  const { clients } = useClientsContext();
  const { contracts } = useContractsContext();
  const params = useParams();
  const contractId = params.id;
  console.log(payments);
  console.log(clients);
  const contract = contracts.filter((contract) => {
    return contract._id === contractId;
  });
  const contractType = contract[0].contractType;
  console.log(contract);
  const clientId = contract[0].client;
  const client = clients.filter((client) => {
    return client._id === clientId;
  });
  const clientFirstName = client[0].clientFirstName;
  const contractPayments = payments.filter((payment) => {
    return payment.contract === contractId;
  });
  if (contractPayments.length === 0) {
    return (
      <Wrapper>
        <h5>
          No payments entered yet for {contractType} for {clientFirstName}
        </h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {contractPayments.length} {contractPayments.length > 1 ? 'Payments' : 'Payment record'}
        {` for ${clientFirstName}'s  ${contractType}`}
      </h5>
      <div className="payments">
        {payments.map((payment) => {
          return (
            <div key={payment._id}>
              <Payment key={payment._id} {...payment} />
              <hr />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default PaymentsContainer;
