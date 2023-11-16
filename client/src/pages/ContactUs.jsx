import PageNav from '../components/PageNav';
import Wrapper from '../assets/wrappers/Reserve';
import ContactUs from '../components/ContactUs';
function About() {
  return (
    <Wrapper>
      <PageNav />
      <div className="container">
        <h3>We look forward to hearing from you</h3>
        <ContactUs />
      </div>
    </Wrapper>
  );
}

export default About;
