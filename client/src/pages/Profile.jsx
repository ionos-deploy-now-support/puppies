import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext, redirect } from 'react-router-dom';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    try {
      await customFetch.patch('/users/updateMe', formData);
      queryClient.invalidateQueries(['user']);
      toast.success('Profile updated successfully');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return null;
    }
  };

const Profile = () => {
  const { user } = useOutletContext();

  const { name, email, photo } = user;

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow type="email" name="email" defaultValue={email} />
          <img
            src={`/img/users/${photo}`}
            alt={`photo of ${name}`}
            width="200"
            className="img-round"
          />
          <div className="form-row">
            <label htmlFor="photo" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input type="file" id="photo" name="photo" className="form-input" accept="image/*" />
          </div>
          <SubmitBtn formBtn btnText="save changes" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
