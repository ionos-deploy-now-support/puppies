import { Form, redirect, Link } from 'react-router-dom';
import { FormRow, Logo, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/LoginAndSignUpPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/users/signup', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    console.log(error);
    //optional chaining to catch where error is coming from
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form" action="">
        <Logo />
        <h4>SignUp</h4>
        <FormRow type="text" name="name" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <FormRow type="password" name="passwordConfirm" labelText="Verify Password" />
        <SubmitBtn btnText="sign up" />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
