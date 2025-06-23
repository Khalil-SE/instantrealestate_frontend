import React, { useEffect, useState, useCallback } from "react";
import { Card, Table, Form, Spinner } from "react-bootstrap";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { toast } from "react-toastify";

import ToggleButton from "react-toggle-button";

import {
  getAllProperties,
  deleteProperty,
  updateProperty,
} from "../../../services/propertyService";

import PropertyFormModal from "./PropertyFormModal";
import LoftyImportModal from "./LoftyImportModal";

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalMode, setModalMode] = useState("add");

  const [showLoftyModal, setShowLoftyModal] = useState(false);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProperties({
        page: currentPage,
        search: searchQuery,
      });
      setProperties(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleToggleStatus = async (property) => {
    const newStatus = property.status === "active" ? "inactive" : "active";
    try {
      await updateProperty(property.id, { status: newStatus });
      toast.success(`Property ${newStatus}`);
      fetchProperties();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!propertyToDelete) return;
    try {
      setDeleting(true);
      await deleteProperty(propertyToDelete);
      toast.success("Property deleted successfully");
      fetchProperties();
    } catch (err) {
      toast.error("Failed to delete property");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCreate = () => {
    setSelectedProperty(null);
    setModalMode("add");
    setShowFormModal(true);
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setModalMode("edit");
    setShowFormModal(true);
  };

  const handleImportLoftyProperty = (loftyProperty) => {
    const transformed = {
      ...loftyProperty,
      price: loftyProperty.price || 0,
      beds: loftyProperty.beds || 0,
      baths: loftyProperty.baths || 0,
      sqft: loftyProperty.sqft || 0,
      lot_size: 0,
      url: "",
      keyword: "",
      button1_text: "",
      button1_url: "",
      button2_text: "",
      button2_url: "",
      email_recipients: [],
    };
    // console.log(transformed);

    setSelectedProperty(transformed);
    setModalMode("add");
    setShowFormModal(true);
    setShowLoftyModal(false);
  };

  return (
    <div className="shadow-sm bg-white p-4 rounded-4 mb-4 position-relative">
      <div className="mb-4">
        <h4 className="fs-20 mb-1">Your Properties</h4>
        <p className="fs-15">Create and manage your real estate properties.</p>
      </div>

      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 mb-lg-4">
            <Form className="position-relative table-src-form">
              <Form.Control
                type="text"
                placeholder="Search by address"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">
                search
              </span>
            </Form>

            <div className="d-flex gap-2">
              <button
                onClick={() => setShowLoftyModal(true)}
                className="btn btn-outline-secondary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
              >
                <span className="py-sm-1 d-block fw-semibold">
                  <i className="ri-upload-cloud-line d-none d-sm-inline-block"></i>{" "}
                  Import from Lofty
                </span>
              </button>

              <button
                onClick={handleCreate}
                className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
              >
                <span className="py-sm-1 d-block fw-semibold">
                  <i className="ri-add-line d-none d-sm-inline-block"></i>{" "}
                  Create Property
                </span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="default-table-area all-products">
              <div className="table-responsive">
                <Table className={`table align-middle`}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Address</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Beds</th>
                      <th>Baths</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => (
                      <tr key={property.id}>
                        <td>{property.id}</td>
                        <td>{property.address}</td>
                        <td>${property.price}</td>
                        <td>
                          <ToggleButton
                            inactiveLabel={<i class="ri-close-line"></i>}
                            activeLabel={<i class="ri-check-line"></i>}
                            value={property.status === "active"}
                            onToggle={(value) => {
                              handleToggleStatus(property);
                              // self.setState({
                              //   value: !value,
                              // });
                            }}
                            colors={{
                              activeThumb: {
                                base: "rgb(250,250,250)",
                              },
                              inactiveThumb: {
                                base: "rgb(62,130,247)",
                              },
                              active: {
                                base: "rgb(62,130,247)",
                                hover: "rgb(177, 191, 215)",
                              },
                              inactive: {
                                // base: 'rgb(65,66,68)',
                                base: "rgb(95,96,98)",
                                hover: "rgb(177, 191, 215)",
                              },
                            }}
                          />
                          {/* <Form.Check
                            type="switch"
                            id={`toggle-${property.id}`}
                            checked={property.status === "active"}
                            onChange={() => handleToggleStatus(property)}
                            label={property.status}
                          /> */}
                        </td>
                        <td>{property.beds}</td>
                        <td>{property.baths}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <button
                              onClick={() => handleEdit(property)}
                              className="btn btn-sm btn-link text-body"
                            >
                              <span className="material-symbols-outlined fs-16">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                setPropertyToDelete(property.id);
                                setShowDeleteConfirm(true);
                              }}
                              className="btn btn-sm btn-link text-danger"
                            >
                              <span className="material-symbols-outlined fs-16">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <span className="fs-12 fw-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <nav>
                  <ul className="pagination mb-0">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                      >
                        «
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className="page-item">
                        <button
                          className={`page-link ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages}
                      >
                        »
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      <PropertyFormModal
        show={showFormModal}
        mode={modalMode}
        initialData={selectedProperty}
        onHide={() => setShowFormModal(false)}
        onSubmitSuccess={fetchProperties}
      />

      <LoftyImportModal
        show={showLoftyModal}
        onClose={() => setShowLoftyModal(false)}
        onImport={handleImportLoftyProperty}
      />

      <ConfirmModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        body="Are you sure you want to delete this property?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
      />
    </div>
  );
};

export default PropertyManagement;

// import React, { useEffect, useState, useCallback } from "react";
// // import { useNavigate } from "react-router-dom";
// import { Card, Table, Form, Spinner } from "react-bootstrap";
// import ConfirmModal from "../../../components/Modal/ConfirmModal";
// import { toast } from "react-toastify";
// // import { ROUTES } from "../../../config/routes";
// // import styles from "./PropertyTable.module.css";

// import {
//   getAllProperties,
//   deleteProperty,
//   updateProperty,
// } from "../../../services/propertyService";

// import PropertyFormModal from "./PropertyFormModal";

// const PropertyManagement = () => {
//   //   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [propertyToDelete, setPropertyToDelete] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   const [showFormModal, setShowFormModal] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null); // null means "create"
//   const [modalMode, setModalMode] = useState("add"); // "edit" or "add"

//   const fetchProperties = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await getAllProperties({
//         page: currentPage,
//         search: searchQuery,
//       });
//       setProperties(data.results);
//       setTotalPages(Math.ceil(data.count / 10));
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchQuery]);

//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   const handleToggleStatus = async (property) => {
//     const newStatus = property.status === "active" ? "inactive" : "active";
//     try {
//       await updateProperty(property.id, { status: newStatus });
//       toast.success(`Property ${newStatus}`);
//       fetchProperties();
//     } catch (err) {
//       toast.error("Failed to update status");
//     }
//   };

//   const handleDelete = async () => {
//     if (!propertyToDelete) return;
//     try {
//       setDeleting(true);
//       await deleteProperty(propertyToDelete);
//       toast.success("Property deleted successfully");
//       fetchProperties();
//     } catch (err) {
//       toast.error("Failed to delete property");
//     } finally {
//       setDeleting(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const handleCreate = () => {
//     setSelectedProperty(null);
//     setModalMode("add");
//     setShowFormModal(true);
//   };

//   const handleEdit = (property) => {
//     setSelectedProperty(property);
//     setModalMode("edit");
//     setShowFormModal(true);
//   };

//   return (
//     <div className="bg-white p-4 rounded-3 mb-4 position-relative">
//       <div className="mb-4">
//         <h4 className="fs-20 mb-1">Your Properties</h4>
//         <p className="fs-15">Create and manage your real estate properties.</p>
//       </div>

//       <Card className="bg-white border-0 rounded-3 mb-4">
//         <Card.Body className="p-4">
//           <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 mb-lg-4">
//             <Form className="position-relative table-src-form">
//               <Form.Control
//                 type="text"
//                 placeholder="Search by address"
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//               <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">
//                 search
//               </span>
//             </Form>

//             <button
//               //   onClick={() => navigate(ROUTES.USER.PROPERTY.CREATE)}
//               onClick={handleCreate}
//               className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
//             >
//               <span className="py-sm-1 d-block fw-semibold">
//                 <i className="ri-add-line d-none d-sm-inline-block"></i>{" "}
//                 <span>Create Property</span>
//               </span>
//             </button>
//           </div>

//           {loading ? (
//             <div className="text-center my-5">
//               <Spinner animation="border" variant="primary" />
//             </div>
//           ) : (
//             <div className="default-table-area all-products">
//               <div className="table-responsive">
//                 <Table className={`table align-middle`}>
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Address</th>
//                       <th>Price</th>
//                       <th>Status</th>
//                       <th>Beds</th>
//                       <th>Baths</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {properties.map((property) => (
//                       <tr key={property.id}>
//                         <td>{property.id}</td>
//                         <td>{property.address}</td>
//                         <td>${property.price}</td>
//                         <td>
//                           <Form.Check
//                             type="switch"
//                             id={`toggle-${property.id}`}
//                             checked={property.status === "active"}
//                             onChange={() => handleToggleStatus(property)}
//                             label={property.status}
//                           />
//                         </td>
//                         <td>{property.beds}</td>
//                         <td>{property.baths}</td>
//                         <td>
//                           <div className="d-flex align-items-center gap-1">
//                             <button
//                               onClick={() => handleEdit(property)}
//                               //   onClick={() =>
//                               //     navigate(
//                               //       ROUTES.USER.PROPERTY.EDIT(property.id)
//                               //     )
//                               //   }
//                               className="btn btn-sm btn-link text-body"
//                             >
//                               <span className="material-symbols-outlined fs-16">
//                                 edit
//                               </span>
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setPropertyToDelete(property.id);
//                                 setShowDeleteConfirm(true);
//                               }}
//                               className="btn btn-sm btn-link text-danger"
//                             >
//                               <span className="material-symbols-outlined fs-16">
//                                 delete
//                               </span>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>

//               <div className="d-flex justify-content-between align-items-center flex-wrap">
//                 <span className="fs-12 fw-medium">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <nav>
//                   <ul className="pagination mb-0">
//                     <li className="page-item">
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage((p) => p - 1)}
//                         disabled={currentPage === 1}
//                       >
//                         «
//                       </button>
//                     </li>
//                     {[...Array(totalPages)].map((_, i) => (
//                       <li key={i} className="page-item">
//                         <button
//                           className={`page-link ${
//                             currentPage === i + 1 ? "active" : ""
//                           }`}
//                           onClick={() => setCurrentPage(i + 1)}
//                         >
//                           {i + 1}
//                         </button>
//                       </li>
//                     ))}
//                     <li className="page-item">
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage((p) => p + 1)}
//                         disabled={currentPage === totalPages}
//                       >
//                         »
//                       </button>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       <PropertyFormModal
//         show={showFormModal}
//         mode={modalMode}
//         propertyData={selectedProperty}
//         onHide={() => setShowFormModal(false)}
//         onSubmitSuccess={fetchProperties}
//       />

//       <ConfirmModal
//         show={showDeleteConfirm}
//         onClose={() => setShowDeleteConfirm(false)}
//         onConfirm={handleDelete}
//         title="Confirm Deletion"
//         body="Are you sure you want to delete this property?"
//         confirmText="Delete"
//         cancelText="Cancel"
//         loading={deleting}
//       />
//     </div>
//   );
// };

// export default PropertyManagement;
