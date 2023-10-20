import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { COMMUNICATION_TYPE } from '../../../utils/constants';

const singleContractQuery = (id) => {
  return {
    queryKey: ['contract', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/contracts/${id}`);
      return data;
    }
  };
};

const puppiesAvailableQuery = () => {
  return {
    queryKey: ['puppies-available'],
    queryFn: async () => {
      const { data } = await customFetch.get(`/puppies/puppies-available`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const contractId = params.contractId;
    try {
      await queryClient.ensureQueryData(singleContractQuery(contractId));
      return contractId;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('../');
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const contractId = params.contractId;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.put(`/contracts/${contractId}`, data);
      queryClient.invalidateQueries(['clientContracts']);
      toast.success('Contract edited successfully');
      return redirect('../');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const ContractEdit = () => {
  //grab contract id from loader
  const contractId = useLoaderData();
  console.log(`contractId = ${contractId}`);
  const data = useQuery(puppiesAvailableQuery());
  console.log(`results of puppiesAvailableQuery = ${JSON.stringify(data)}`);
  const contract = useQuery(singleContractQuery(contractId)).data.data.data;
  // const contract = useQuery(singleContractQuery(contractId));
  console.log(`contract holds ${JSON.stringify(contract)}`);
  const { contractDate, contractType, contractNote } = contract;
  console.log(`Date ${contractDate} Type ${contractType} Note ${contractNote}`);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit contract</h4>
        <div className="form-center">
          <FormRow type="text" name="contractDate" labelText="date" defaultValue={contractDate} />
          <FormRowSelect
            labelText="type"
            name="contractType"
            defaultValue={contractType}
            list={Object.values(COMMUNICATION_TYPE)}
          />
          <FormRow
            type="text"
            name="contractNote"
            labelText="message"
            defaultValue={contractNote}
          />
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default ContractEdit;
