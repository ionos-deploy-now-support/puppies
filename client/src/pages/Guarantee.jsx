import PageNav from '../components/PageNav';
import Wrapper from '../assets/wrappers/Guarantee';
import ContactUs from '../components/ContactUs';
function Guarantee() {
  return (
    <Wrapper>
      <PageNav />
      <div className="container">
        <h3>Our puppy guarantee</h3>
        <p>
          Our puppies are the offspring of parents that are registered with the American Kennel Club
          (AKC). Our litters are AKC registered and your puppy can be registered with the AKC if you
          wish to register your puppy.
        </p>
        <p>
          Our puppies are fed a premium puppy food. They are de-wormed regularly and are vet checked
          at six weeks old. They come to you with their first round of puppy shots and they are
          micro-chipped.
        </p>
        <p>
          The parents of our puppies have been DNA tested which proved they are 100% Labrador
          Retriever and that they do not carry markers for any major disease or defect.
        </p>
        <ContactUs />
      </div>
    </Wrapper>
  );
}

export default Guarantee;
