import styled from 'styled-components';

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: grid;
  align-items: center;
  justify-content: center;
  img {
    width: 50vw;
    max-width: 250px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
  .container {
    background-color: grey;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    padding: 2em;
  }
`;

export default Wrapper;
