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
  let totalPayments = 0;
  if (contractPayments.length !== 0) {
    totalPayments = contractPayments
      .map((payment) => payment.paymentAmount)
      .reduce((a, b) => a + b);
  }
  const contractBalance = contract[0].contractPrice - totalPayments;
  if (contractPayments.length === 0) {
    return (
      <Wrapper>
        <h5>
          No payments entered yet for {contractType} puppy for {clientFirstName}
        </h5>
        <p> Balance: ${contractBalance}</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {contractPayments.length} {contractPayments.length > 1 ? 'Payments' : 'Payment record'}
        {` for ${clientFirstName}'s  ${contractType} puppy total $${totalPayments}`}
      </h5>
      <p> Balance: ${contractBalance}</p>
      <div className="payments">
        {contractPayments.map((payment) => {
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
