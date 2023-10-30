import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { CONTRACT_TYPE } from '../../../utils/constants';
import { useClientsContext } from './ClientsLayout';
import { useHomeContext } from './HomeLayout';

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
  const submit = useSubmit();
  const { clients } = useClientsContext();
  const { puppiesNoFilter, puppiesAvailable } = useHomeContext();
  const puppiesAvailableNames = puppiesAvailable.map((puppy) => ({
    key: puppy._id,
    value: puppy.puppyTempName
  }));
  //grab contract id from loader
  const contractId = useLoaderData();
  console.log(`contractId = ${contractId}`);
  const data = useQuery(puppiesAvailableQuery());
  console.log(`results of puppiesAvailableQuery = ${data}`);
  const contract = useQuery(singleContractQuery(contractId)).data.data.data;
  // const contract = useQuery(singleContractQuery(contractId));
  console.log(`contract holds ${JSON.stringify(contract)}`);
  const {
    contractOpen,
    contractClose,
    contractType,
    contractPrice,
    puppyPickOrder,
    puppy,
    puppyPickUp,
    contractNote,
    client
  } = contract;
  const clientId = client;
  const currentClient = clients.filter((item) => {
    return item._id === clientId;
  });
  const clientFirstName = currentClient[0].clientFirstName;

  const contractPuppy = puppiesNoFilter.filter((item) => {
    return item._id === puppy;
  });
  console.log(contractPuppy);
  const contractPuppyName = contractPuppy[0].puppyTempName;
  console.log(contractPuppyName);
  const mytest = false;

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit contract for {clientFirstName}</h4>
        <div className="form-center">
          <FormRow type="text" name="contractOpen" labelText="opened" defaultValue={contractOpen} />
          <FormRow
            type="text"
            name="contractClose"
            labelText="closed"
            defaultValue={contractClose}
          />
          <FormRowSelect
            labelText="type"
            name="contractType"
            defaultValue={contractType}
            list={Object.values(CONTRACT_TYPE)}
          />
          <FormRow
            type="text"
            name="contractPrice"
            labelText="price"
            defaultValue={contractPrice}
          />
          <FormRow
            type="text"
            name="puppyPickOrder"
            labelText="pick order"
            defaultValue={puppyPickOrder}
          />
          {contractPuppyName === 'A puppy not yet selected' ? (
            <div id="contractPuppyNameDropDown" className="form-row">
              <label htmlFor="puppy" className="form-label">
                puppy
              </label>
              <select
                name="puppy"
                id="puppy"
                className="form-select"
                onChange={(e) => {
                  submit(e.currentTarget.form);
                }}>
                {puppiesAvailableNames.map((item) => {
                  return (
                    <option key={item.key} value={item.key}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div id="contractPuppyPreviouslySelected" className="form-row">
              <label htmlFor="puppyTempName" className="form-label">
                puppy
              </label>
              <input
                type="text"
                id="puppyTempName"
                name="puppyTempName"
                className="form-input"
                defaultValue={contractPuppyName}
              />
            </div>
          )}

          {mytest ? (
            <FormRow type="text" name="test" labelText="test" defaultValue="true" />
          ) : (
            <FormRow type="text" name="test" labelText="test" defaultValue="false" />
          )}

          <FormRow
            type="text"
            name="puppyPickUp"
            labelText="puppy pick up"
            defaultValue={puppyPickUp}
          />
          <FormRow type="text" name="contractNote" labelText="note" defaultValue={contractNote} />
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default ContractEdit;
