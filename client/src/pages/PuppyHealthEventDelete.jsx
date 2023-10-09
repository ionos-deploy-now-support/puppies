import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/healthEvents/${params.id}`);
      queryClient.invalidateQueries(['puppy']);
      toast.success('health event deleted successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    return redirect(`/dashboard/litters/puppies`);
  };
