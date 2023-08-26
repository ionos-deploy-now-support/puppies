import { Form, redirect, Link, useNavigate } from 'react-router-dom';
import { FormRow, Logo, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/LoginAndSignUpPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action =
  // (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/users/login', data);
      // queryClient.invalidateQueries();
      toast.success('Login successful');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

function Login() {
  const navigation = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method="post" className="form" action="">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          New?
          <Link to="/register" className="member-btn">
            Sign Up Here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}
export default Login;
