import LittersList from '../components/LittersList';
import PageNav from '../components/PageNav';
import { useEffect, useState } from 'react';
const BASE_URL = 'https://puppies-api-ek0y.onrender.com';
function Litters() {
  const [litters, setLitters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchLitters() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/litters`);
        let response = await res.json();
        console.log(response.data.litters);
        setLitters(response.data.litters);
      } catch {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }
    fetchLitters();
  }, []);
  return (
    <main>
      <p>This is the Litters page</p>
      <LittersList litters={litters} isLoading={isLoading} />
    </main>
  );
}

export default Litters;
