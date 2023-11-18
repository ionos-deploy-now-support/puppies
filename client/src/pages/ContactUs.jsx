import PageNav from '../components/PageNav';
import Wrapper from '../assets/wrappers/ContactUs';
import ContactUs from '../components/ContactUs';
function About() {
  return (
    <Wrapper>
      <PageNav />
      <div className="container">
        <h3>We look forward to hearing from you</h3>
        <div className="img-frame">
          <img src="/img/site/jackihappy.jpg" alt="Jacki of JW Farm" />
        </div>
        <ContactUs />
      </div>
    </Wrapper>
  );
}

export default About;
