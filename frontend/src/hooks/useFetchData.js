import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth0 } from './auth';

const useFetchData = (endpoint, dependencies = []) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    // Set up a cancellation source
    let didCancel = false;

    setIsLoading(true);
    async function getData() {
      try {
        const token = await getTokenSilently();

        // Create request headers with token authorization
        const headers = { 'Authorization': `Bearer ${token}` };

        const fetchedData = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/${endpoint}`, { headers });
        if (!didCancel) { // Ignore if we started fetching something else
          setData(fetchedData.data);
          setIsLoading(false);
        }
      } catch (err) {
        // Is this error because we cancelled it ourselves?
        if (axios.isCancel(err)) {
          console.log(`call was cancelled`);
        } else {
          console.error(err);
        }
        setIsLoading(false);
      }
    }
    getData();
    return () => { didCancel = true; }; // Remember if we start fetching something else
    // eslint-disable-next-line
  }, dependencies);

  return [data, isLoading];
}

export default useFetchData;