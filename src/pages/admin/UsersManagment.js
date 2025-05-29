import React, { useEffect, useState, useCallback } from "react";
import { Card, Table, Form, Spinner } from "react-bootstrap";
import { getAllUsers, deleteUser } from "../../services/userService";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import UserFormModal from "../../components/Modal/UserFormModal";

const UsersManagment = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);



  // Safe fetchUsers with useCallback
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllUsers({
        page: currentPage,
        search: searchQuery,
      });
      setUsers(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  // useEffect depends on fetchUsers (safe now)
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  // const fetchUsers = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await getAllUsers({
  //       page: currentPage,
  //       search: searchQuery,
  //     });
  //     setUsers(data.results);
  //     setTotalPages(Math.ceil(data.count / 10));
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, [currentPage, searchQuery]);

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
    if (!userToDelete) return;
    try {
      setDeleting(true);
      await deleteUser(userToDelete);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user", err);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-3 mb-4 position-relative">
      <div className="mb-4">
        <h4 className="fs-20 mb-1">Users Management</h4>
        <p className="fs-15">You have full control on users here.</p>
      </div>

      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 mb-lg-4">
            <Form className="position-relative table-src-form">
              <Form.Control
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={handleSearch}
              />
              <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">
                search
              </span>
            </Form>

            <button
              onClick={() => {
                setModalType("add");
                setSelectedUser(null);
              }}
              className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
            >
              <span className="py-sm-1 d-block">
                <i className="ri-add-line d-none d-sm-inline-block"></i>{" "}
                <span>Add New User</span>
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
                <Table className="table align-middle">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone_number || "N/A"}</td>
                        <td>
                          <span
                            className={`badge bg-opacity-10 p-2 fs-12 fw-medium text-capitalize ${
                              user.status === "active"
                                ? "finished"
                                : "cancelled"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td>{user.role}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <button
                              onClick={() => {
                                setModalType("view");
                                setSelectedUser(user);
                              }}
                              className="btn btn-sm btn-link text-primary"
                            >
                              <span className="material-symbols-outlined fs-16">
                                visibility
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                setModalType("edit");
                                setSelectedUser(user);
                              }}
                              className="btn btn-sm btn-link text-body"
                            >
                              <span className="material-symbols-outlined fs-16">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                setUserToDelete(user.id);
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

      <UserFormModal
        show={!!modalType}
        mode={modalType}
        userData={selectedUser}
        onHide={() => setModalType(null)}
        onSubmitSuccess={() => {
          setModalType(null);
          fetchUsers();
        }}
      />

      {/* <ConfirmModal
        show={showDeleteConfirm}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      /> */}

      <ConfirmModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        body="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
      />
    </div>
  );
};

export default UsersManagment;
