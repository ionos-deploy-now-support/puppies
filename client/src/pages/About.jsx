import PageNav from '../components/PageNav';
import Wrapper from '../assets/wrappers/About';
import ContactUs from '../components/ContactUs';
function About() {
  return (
    <Wrapper>
      <PageNav />
      <div className="container">
        <h3>JW Farm</h3>
        <div className="img-frame">
          <img src="/img/site/jwfarmhouse.jpg" alt="jw farm photo" />
        </div>
        <p>
          JW Farm is located in Northern Alabama in the Tennessee River Valley in the friendly town
          of Hartselle along the I-65 corridor.
        </p>
        <div className="img-frame">
          <img src="/img/site/jackiangel.jpg" alt="jacki with puppy" />
        </div>
        <p>
          Jacki Williamson of JW Farm loves animals of all kinds. Jacki is a responsible breeder and
          has been raising American Kennel Club (AKC) registered Labrador Retrievers since 2020. JW
          Farm raises Labs of each of the three AKC standard Labrador colors: black, chocolate, and
          yellow. JW Farm typically raises just a few litters of puppies yearly.
        </p>
        <p>
          Jacki enjoys working the family farm growing organic vegetables and eggs for the local
          farmer's market.
        </p>

        <ContactUs />
      </div>
    </Wrapper>
  );
}

export default About;
