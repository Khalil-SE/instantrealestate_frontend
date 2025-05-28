import React, {useState, useEffect} from "react";
import { fetchLoftyProperties } from "../../../services/loftyService"; // Adjust the import path as necessary

const LoftyProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchLoftyProperties()
        .then((data) => {
          setProperties(data?.data || []);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch properties.");
          setLoading(false);
        });
    }, []);
  
    if (loading) return <div className="text-blue-500">Loading properties...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!properties.length) return <div>No properties found.</div>;
  
    return (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">MLS ID</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="py-2 px-4 border-b">{property.mls_id}</td>
                <td className="py-2 px-4 border-b">{property.address?.full_address}</td>
                <td className="py-2 px-4 border-b">${property.price}</td>
                <td className="py-2 px-4 border-b">{property.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default LoftyProperties;