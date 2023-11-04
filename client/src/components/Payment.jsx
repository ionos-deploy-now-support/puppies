import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/Payment';
import PaymentInfo from './PaymentInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { usePaymentsContext } from '../pages/PaymentsLayout';

day.extend(advancedFormat);

const Payment = ({ _id, paymentDate, paymentType, paymentNote }) => {
  const date = day(paymentDate).format('MMM Do, YYYY');
  const { payments } = usePaymentsContext();
  const contractId = payments[0].contract;
  return (
    <Wrapper>
      <div className="content">
        <div className="content-center">
          <PaymentInfo text={`Date: ${date}`} />
          <PaymentInfo text={`Type: ${paymentType}`} />
          <PaymentInfo text={`Message: ${paymentNote}`} />
        </div>
        <footer className="actions">
          <Link to={`../${contractId}/payments/payment-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../${contractId}/payments/payment-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Payment;
