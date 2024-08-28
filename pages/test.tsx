import { useEffect, useState } from 'react';

function Test() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${apiUrl}/api/chat`);
      
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Test;