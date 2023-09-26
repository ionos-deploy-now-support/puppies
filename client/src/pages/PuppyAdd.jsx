import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useSubmit } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useLittersContext } from '../pages/LittersLayout';
import { PUPPY_SEX, PUPPY_COLOR, TRUE_FALSE } from '../../../utils/constants';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/puppies', data);
      queryClient.invalidateQueries(['puppies']);
      toast.success('Puppy added successfully ');
      return redirect('/dashboard/litters/puppies');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const PuppyAdd = () => {
  const { litters } = useLittersContext();
  const litterNames = litters.map((litter) => ({ key: litter._id, value: litter.litterName }));
  let today = Date();
  const submit = useSubmit();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add puppy</h4>
        <div className="form-center">
          <FormRow type="text" name="puppyTempName" labelText="name *" />
          <FormRowSelect
            labelText="sex *"
            name="puppySex"
            defaultValue="F"
            list={Object.values(PUPPY_SEX)}
          />
          <FormRowSelect
            labelText="color *"
            name="puppyColor"
            defaultValue="black"
            list={Object.values(PUPPY_COLOR)}
          />
          <FormRow type="text" name="puppyDOB" labelText="born *" defaultValue={today} />
          <div className="form-row">
            <label htmlFor="litter" className="form-label">
              litter *
            </label>
            <select
              name="litter"
              id="litter"
              className="form-select"
              defaultValue={litters[0]}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}>
              {litterNames.map((item) => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <FormRowSelect
            labelText="survived"
            name="puppySurvived"
            defaultValue="true"
            list={Object.values(TRUE_FALSE)}
          />
          <FormRow type="text" name="puppyCollar" labelText="color of collar *" />
          <FormRow type="text" name="puppyAKC" labelText="AKC" />
          <FormRow
            type="text"
            name="puppyNewName"
            labelText="New Name"
            defaultValue="TBD by new owner"
          />
          <FormRow type="text" name="puppyAsking" labelText="Asking Price $" defaultValue="800" />
          <FormRowSelect
            labelText="available"
            name="puppyAvailable"
            defaultValue="true"
            list={Object.values(TRUE_FALSE)}
          />
          <FormRow type="text" name="puppyNote" labelText="note" />
          <SubmitBtn formBtn btnText="add new puppy" />
          <p>* Required</p>
        </div>
      </Form>
    </Wrapper>
  );
};
export default PuppyAdd;
