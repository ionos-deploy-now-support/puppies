import styled from 'styled-components';

const Wrapper = styled.section`
  overflow-y: hidden;
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  h3 {
    margin-top: 2em;
    margin-bottom: 2em;
  }
  p {
    font-weight: bold;
    line-height: 1.5;
    font-size: clamp(0.75rem, 1.5vw, 1.5rem);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  img {
    display: block;
    margin: auto;

    padding: 1em;
    width: 95%;
  }
  .img-frame {
    background-color: #030b33;
    margin-left: 1em;
    width: 80%;
    margin-bottom: 1em;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Wrapper;
