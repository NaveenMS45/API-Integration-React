import './App.css';
import {useState, useEffect} from 'react'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>COVID-19 Stats in India</h1>
          <p>Total cases: {data.data.summary.total}</p>
          <p>Total deaths: {data.data.summary.deaths}</p>
          <p>Total discharged: {data.data.summary.discharged}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <h2>Regional Information:</h2>
          <ul>
            {data.data.regional.map((item, index) => (
              <li key={index}>
                <p>State: {item.loc}</p>
                <p>Confirmed cases: {item.confirmedCasesIndian}</p>
                <p>Deaths: {item.deaths}</p>
                <p>Recovered: {item.discharged}</p>
              </li>
            ))}
          </ul>
    </div>
  );
}

export default App