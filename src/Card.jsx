import React, { useEffect, useState } from 'react';

const Card = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiURL = "http://172.105.55.211/api/packageApi.php?type=getHolidayPackage";
  const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRyYXZlbGFnZW50QGdtYWlsLmNvbSIsImlkIjoxMSwidXNlcnR5cGUiOiJ0cmF2ZWxfYWdlbnQiLCJleHAiOjE3MzAyNTk5MTh9.zi9WHid5zu48JhUXod1hPVZc7Cg79AX7JyuVMs3qFiU";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const result = await response.json();
        console.log(result.data); 
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading..</p>;
  }

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  const cardImageStyle = {
    width: '300px',
    height: '200px',
    borderRadius: '10px',
  };

  const cardTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  };

  return (
    <div style={containerStyle}>
      {data.map((item, index) => (
        <div key={index} style={cardStyle}>
          <h1 style={cardTitleStyle}>{item.title}</h1>
          <img style={cardImageStyle} src={item.images} alt={item.title} />
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;