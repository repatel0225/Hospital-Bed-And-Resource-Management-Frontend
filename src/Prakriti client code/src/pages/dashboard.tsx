import { useEffect, useState } from 'react';

interface Bed {
  _Id: string;
  wardNumber: string;
  bedNumber: string;
  status: 'available' | 'occupied' | 'reserved';
}

function Dashboard() {
  const [beds, setBeds] = useState<Bed[]>([]);

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/beds', {
        method: 'GET',
      });
      const data = await response.json();
      setBeds(data);
    } catch (error) {
      console.error('Error fetching beds:', error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Hospital Bed Availability Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {beds.map((bed) => (
          <div
            key={bed._Id}
            style={{
              width: '300px',
              margin: '10px',
              padding: '10px',
              backgroundColor: bed.status === 'available' ? 'lightgreen' : bed.status === 'occupied' ? 'salmon' : 'lightblue',
              color: 'black',
              textAlign: 'center',
            }}
          >
            {bed.wardNumber} - Bed {bed.bedNumber} - {bed.status}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;