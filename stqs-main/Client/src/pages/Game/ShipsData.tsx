import { useEffect, useState } from "react"
import axios from "axios";

function ShipsData() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/api/ship/shipList');
        console.log(response.data.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      Ship1
    </div>
  )
}

export default ShipsData