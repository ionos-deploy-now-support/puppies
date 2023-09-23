import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleLitterQuery = (id) => {
  return {
    queryKey: ['litter', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/litters/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleLitterQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('/dashboard/litters');
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.put(`/litters/${params.id}`, data);
      queryClient.invalidateQueries(['litters']);
      toast.success('Litter edited successfully');
      return redirect('/dashboard/litters');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const LitterEdit = () => {
  //grab litter id from loader
  const id = useLoaderData();
  console.log(`From LitterEdit litter id is ${id}`);
  // having to drill deep into object to get to data wanted
  const litter = useQuery(singleLitterQuery(id)).data.data.data;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit litter</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="litterName"
            labelText="name"
            defaultValue={litter.litterName}
          />
          <FormRow
            type="text"
            name="litterAKC"
            labelText="litter AKC"
            defaultValue={litter.litterAKC}
          />
          <FormRow type="text" name="sireName" labelText="sire" defaultValue={litter.sireName} />
          <FormRow type="text" name="damName" labelText="dam" defaultValue={litter.damName} />
          <FormRow
            type="text"
            name="litterConceived"
            labelText="conceived"
            defaultValue={litter.litterConceived}
          />
          <FormRow
            type="text"
            name="litterDelivered"
            labelText="delivered"
            defaultValue={litter.litterDelivered}
          />
          <FormRow
            type="text"
            name="femalesBorn"
            labelText="# females"
            defaultValue={litter.femalesBorn || '0'}
          />

          <FormRow
            type="text"
            name="femalesSurvived"
            labelText="# females survived"
            defaultValue={litter.femalesSurvived || '0'}
          />
          <FormRow
            type="text"
            name="malesBorn"
            labelText="# males"
            defaultValue={litter.femalesBorn || '0'}
          />
          <FormRow
            type="text"
            name="malesSurvived"
            labelText="# males survived"
            defaultValue={litter.malesSurvived || '0'}
          />
          <FormRow
            type="text"
            name="puppiesBlack"
            labelText="black"
            defaultValue={litter.puppiesBlack || '0'}
          />
          <FormRow
            type="text"
            name="puppiesChocolate"
            labelText="chocolate"
            defaultValue={litter.puppiesChocolate || '0'}
          />
          <FormRow
            type="text"
            name="puppiesYellow"
            labelText="yellow"
            defaultValue={litter.puppiesYellow || '0'}
          />
          <FormRow
            type="text"
            name="litterNote"
            labelText="note"
            defaultValue={litter.litterNote}
          />

          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default LitterEdit;
