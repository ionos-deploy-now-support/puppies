import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/payments/${params.paymentId}`);
      queryClient.invalidateQueries(['contractPayments']);

      toast.success('Payment deleted successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    return redirect('../');
  };
