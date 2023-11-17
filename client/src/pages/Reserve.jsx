import PageNav from '../components/PageNav';
import Wrapper from '../assets/wrappers/Reserve';
import ContactUs from '../components/ContactUs';
function Reserve() {
  return (
    <Wrapper>
      <main>
        <PageNav />
        <div className="container">
          <h3>Reserve Your Puppy Today</h3>
          <p>
            We collect a non-refundable $200 deposit to reserve a puppy. When you place a deposit
            you will be asked to select a puppy sex and a puppy color (black, chocolate, yellow).
            Pick of the litter is determined by the order deposits are received.
          </p>
          <p>
            Example: Let's say you want a chocolate female AKC Labrador puppy. If no deposits on a
            chocolate female puppy have been placed, upon receipt of your deposit you would be given
            first pick of the chocolate females. As first pick, you could select your puppy at any
            time. If you were second pick, you would select your puppy after the customer holding
            first pick made their choice... and so on.
          </p>
          <p>
            The fastest way to place your deposit is to call us and pay via Venmo, Zelle, or PayPal.
            You can also place your deposit in person with cash or a local check. Puppies are picked
            up by appointment following their 6 week vet check. Final payment is due when you pick
            up your puppy. If you need your puppy shipped you will have to make your own pet courier
            arrangements.
          </p>
          <p>
            Let us know if you would like to see more photos of a particular puppy. We look forward
            to hearing from you. Give us a call.
          </p>

          <ContactUs />
        </div>
      </main>
    </Wrapper>
  );
}

export default Reserve;
