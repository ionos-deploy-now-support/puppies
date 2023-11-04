import Payment from './Payment';
import Wrapper from '../assets/wrappers/PaymentsContainer';
import { usePaymentsContext } from '../pages/PaymentsLayout';
import { useClientsContext } from '../pages/ClientsLayout';

const PaymentsContainer = () => {
  const { payments, results, clientId } = usePaymentsContext();
  const { clients } = useClientsContext();
  const client = clients.filter((client) => {
    return client._id === clientId;
  });
  const clientFirstName = client[0].clientFirstName;
  if (payments.length === 0) {
    return (
      <Wrapper>
        <h5>No payments entered yet for {clientFirstName}</h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {results} {results > 1 ? 'Payments' : 'Payment record'}
        {` for ${clientFirstName}`}
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
