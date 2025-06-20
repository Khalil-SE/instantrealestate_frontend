import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getLoftyProperties } from "../../../services/loftyService";

const LoftyImportModal = ({ show, onClose, onImport }) => {
  const [loftyProperties, setLoftyProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoftyProperties = async () => {
    setLoading(true);
    try {
      const response = await getLoftyProperties();
      setLoftyProperties(response.results || []);
    } catch (err) {
      toast.error("Failed to load Lofty properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) fetchLoftyProperties();
  }, [show]);

  const handleImportClick = (property) => {
    onImport(property);     // pass property to parent
    onClose();              // close modal after import
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Import Property from Lofty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="table-responsive">
            <Table  bordered hover>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Price</th>
                  <th>Beds</th>
                  <th>Baths</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loftyProperties.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No properties found.
                    </td>
                  </tr>
                ) : (
                  loftyProperties.map((item) => (
                    <tr key={item.id}>
                      <td>{item.address}</td>
                      <td>${item.price}</td>
                      <td>{item.beds}</td>
                      <td>{item.baths}</td>
                      <td>
                        {item.is_selected ? (
                          <span className="text-success">Imported</span>
                        ) : (
                          <span className="text-muted">Not Imported</span>
                        )}
                      </td>
                      <td>
                        {item.is_selected ? (
                          <Button variant="secondary" size="sm" disabled>
                            Imported
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleImportClick(item)}
                          >
                            Import
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoftyImportModal;
