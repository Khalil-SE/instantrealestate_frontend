import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Form, Spinner } from "react-bootstrap";
import { getAllInstaBots, deleteInstaBot } from "../../../services/instabotService";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { toast } from "react-toastify";
import { ROUTES } from "../../../config/routes";
// import { toast } from "react-toastify";
// import InstaBotFormModal from "../../components/Modal/InstaBotFormModal";

import styles from "./InstaBotTable.module.css";



const InstaBotManagement = () => {

    const navigate = useNavigate();

  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
//   const [selectedBot, setSelectedBot] = useState(null);
//   const [modalType, setModalType] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [botToDelete, setBotToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // const fetchBots = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await getAllInstaBots({
  //       page: currentPage,
  //       search: searchQuery,
  //     });
  //     setBots(data.results);
  //     setTotalPages(Math.ceil(data.count / 10));
  //   } catch (error) {
  //     console.error("Error fetching bots:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBots();
  // }, [currentPage, searchQuery]);
  const fetchBots = useCallback(async () => {
  setLoading(true);
  try {
    const data = await getAllInstaBots({
      page: currentPage,
      search: searchQuery,
    });
    setBots(data.results);
    setTotalPages(Math.ceil(data.count / 10));
  } catch (error) {
    console.error("Error fetching bots:", error);
  } finally {
    setLoading(false);
  }
}, [currentPage, searchQuery]); // Dependencies that affect the fetch

useEffect(() => {
  fetchBots();
}, [fetchBots]); // Clean and valid now

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async () => {
    if (!botToDelete) return;
    try {
      setDeleting(true);
      await deleteInstaBot(botToDelete);
      toast.success("InstaBot deleted successfully");
      fetchBots();
    } catch (err) {
        toast.error("Failed to delete InstaBot");
      console.error("Failed to delete InstaBot", err);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-3 mb-4 position-relative">
      <div className="mb-4">
        <h4 className="fs-20 mb-1">Your InstaBots</h4>
        <p className="fs-15">Create and manage your social bots here.</p>
      </div>

      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 mb-lg-4">
            <Form className="position-relative table-src-form">
              <Form.Control
                type="text"
                placeholder="Search by keyword"
                value={searchQuery}
                onChange={handleSearch}
              />
              <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">
                search
              </span>
            </Form>

            <button
              onClick={() => {
                // setModalType("add");
                navigate(ROUTES.USER.INSTABOT.CREATE_INSTABOT)
                // setSelectedBot(null);
              }}
              className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
            >
              <span className="py-sm-1 d-block fw-semibold">
                <i className="ri-add-line d-none d-sm-inline-block"></i>{" "}
                <span>Create InstaBot</span>
              </span>
            </button>
          </div>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="default-table-area all-products">
              <div className="table-responsive">
                <Table className={`table align-middle ${styles.gradientTable}`}>
                  {/* className="table align-middle ${styles.gradientTable}" */}
                  
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Keyword</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bots.map((bot) => (
                      <tr key={bot.id}>
                        <td>{bot.id}</td>
                        <td>{bot.keyword?.text || "N/A"}</td>
                        <td>{bot.title}</td>
                        <td>
                          <span className={`badge bg-opacity-10 p-2 fs-12 fw-medium text-capitalize ${
                            bot.status === "active" ? "finished" : "cancelled"
                          }`}>
                            {bot.status}
                          </span>
                        </td>
                        <td>{bot.message_type}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            {/* <button
                              onClick={() => {
                                // setModalType("view");
                                // setSelectedBot(bot);
                              }}
                              className="btn btn-sm btn-link text-primary"
                            >
                              <span className="material-symbols-outlined fs-16">
                                visibility
                              </span>
                            </button> */}
                            <button
                              onClick={() => {
                                // setModalType("edit");
                                navigate( ROUTES.USER.INSTABOT.GET_EDIT_INSTABOT_URL( bot.id));
                                // setSelectedBot(bot);
                              }}
                              className="btn btn-sm btn-link text-body"
                            >
                              <span className="material-symbols-outlined fs-16">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                setBotToDelete(bot.id);
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

              <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
                <span className="fs-12 fw-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <nav>
                  <ul className="pagination mb-0">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        «
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className="page-item">
                        <button
                          className={`page-link ${
                            i + 1 === currentPage ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
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

      {/* <InstaBotFormModal
        show={!!modalType}
        mode={modalType}
        botData={selectedBot}
        onHide={() => setModalType(null)}
        onSubmitSuccess={() => {
          setModalType(null);
          fetchBots();
        }}
      /> */}

      <ConfirmModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        body="Are you sure you want to delete this InstaBot?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
      />
    </div>
  );
};

export default InstaBotManagement;
