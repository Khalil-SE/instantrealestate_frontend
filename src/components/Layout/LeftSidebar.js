"use client";

import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const LeftSidebar = ({ toggleActive }) => {
  const location = useLocation(); // Use `useLocation` to get the current path
  const pathname = location.pathname; // Extract `pathname` from location

  // Enable the dark sidebar exclusively for the /dashboard/beauty-salon/ page URL.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Only check or set the theme if we're on the beauty-salon page.
    if (pathname === "/dashboard/beauty-salon") {
      const storedTheme = localStorage.getItem("beautySalonSidebarTheme");
      if (storedTheme) {
        setIsDark(storedTheme === "dark");
      } else {
        // Default to dark theme and persist it in localStorage
        setIsDark(true);
        localStorage.setItem("beautySalonSidebarTheme", "dark");
      }
    } else {
      // For other pages, do not use localStorage for the theme
      setIsDark(false);
    }
  }, [pathname]);

  return (
    <>
      <div
        className={`sidebar-area ${
          pathname === "/dashboard/beauty-salon" && isDark ? "dark" : ""
        }`}
      >
        <div className="logo position-relative">
          <Link
            to="/dashboard/ecommerce"
            className="d-block text-decoration-none position-relative"
          >
            <img
              src="/images/logo-icon.png"
              alt="logo-icon"
              width={26}
              height={26}
            />
            <span className="logo-text fw-bold text-dark">Trezo</span>
          </Link>
          <button
            className="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y"
            onClick={toggleActive}
          >
            <i className="material-symbols-outlined fs-24">close</i>
          </button>
        </div>

        <div className="sidebar-menu">
          <div className="menu-title small text-uppercase">
            <span className="menu-title-text">MAIN</span>
          </div>

          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="material-symbols-outlined">dashboard</i>
                <span className="title">Dashboard</span>
                <span className="count">25</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/dashboard/ecommerce"
                      className={`menu-link ${
                        pathname === "/dashboard/ecommerce" ? "active" : ""
                      }`}
                    >
                      eCommerce
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/dashboard/crm"
                      className={`menu-link ${
                        pathname === "/dashboard/crm" ? "active" : ""
                      }`}
                    >
                      CRM
                      <span className="new tag">Hot</span>
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/dashboard/project-management"
                      className={`menu-link ${
                        pathname === "/dashboard/project-management"
                          ? "active"
                          : ""
                      }`}
                    >
                      Project Management
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/lms"
                      className={`menu-link ${
                        pathname === "/dashboard/lms" ? "active" : ""
                      }`}
                    >
                      LMS <span className="new tag">Top</span>
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/helpdesk"
                      className={`menu-link ${
                        pathname === "/dashboard/helpdesk" ? "active" : ""
                      }`}
                    >
                      HelpDesk
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/analytics"
                      className={`menu-link ${
                        pathname === "/dashboard/analytics" ? "active" : ""
                      }`}
                    >
                      Analytics
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/crypto"
                      className={`menu-link ${
                        pathname === "/dashboard/crypto" ? "active" : ""
                      }`}
                    >
                      Crypto
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/sales"
                      className={`menu-link ${
                        pathname === "/dashboard/sales" ? "active" : ""
                      }`}
                    >
                      Sales
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/hospital"
                      className={`menu-link ${
                        pathname === "/dashboard/hospital" ? "active" : ""
                      }`}
                    >
                      Hospital
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/marketing"
                      className={`menu-link ${
                        pathname === "/dashboard/marketing" ? "active" : ""
                      }`}
                    >
                      Marketing
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/nft"
                      className={`menu-link ${
                        pathname === "/dashboard/nft" ? "active" : ""
                      }`}
                    >
                      NFT
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/saas"
                      className={`menu-link ${
                        pathname === "/dashboard/saas" ? "active" : ""
                      }`}
                    >
                      SaaS
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/real-estate"
                      className={`menu-link ${
                        pathname === "/dashboard/real-estate" ? "active" : ""
                      }`}
                    >
                      Real Estate
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/shipment"
                      className={`menu-link ${
                        pathname === "/dashboard/shipment" ? "active" : ""
                      }`}
                    >
                      Shipment
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/finance"
                      className={`menu-link ${
                        pathname === "/dashboard/finance" ? "active" : ""
                      }`}
                    >
                      Finance
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/hrm"
                      className={`menu-link ${
                        pathname === "/dashboard/hrm" ? "active" : ""
                      }`}
                    >
                      HRM
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/school"
                      className={`menu-link ${
                        pathname === "/dashboard/school" ? "active" : ""
                      }`}
                    >
                      School
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/call-center"
                      className={`menu-link ${
                        pathname === "/dashboard/call-center" ? "active" : ""
                      }`}
                    >
                      Call Center
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/pos-system"
                      className={`menu-link ${
                        pathname === "/dashboard/pos-system" ? "active" : ""
                      }`}
                    >
                      POS System
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/podcast"
                      className={`menu-link ${
                        pathname === "/dashboard/podcast" ? "active" : ""
                      }`}
                    >
                      Podcast
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/social-media"
                      className={`menu-link ${
                        pathname === "/dashboard/social-media" ? "active" : ""
                      }`}
                    >
                      Social Media
                      <span className="tag">New</span>
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/doctor"
                      className={`menu-link ${
                        pathname === "/dashboard/doctor" ? "active" : ""
                      }`}
                    >
                      Doctor
                      <span className="tag">New</span>
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/beauty-salon"
                      className={`menu-link ${
                        pathname === "/dashboard/beauty-salon" ? "active" : ""
                      }`}
                    >
                      Beauty Salon
                      <span className="tag">New</span>
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/store-analytics"
                      className={`menu-link ${
                        pathname === "/dashboard/store-analytics"
                          ? "active"
                          : ""
                      }`}
                    >
                      Store Analytics
                      <span className="tag">New</span>
                    </Link>
                  </li>

                  <li className="menu-item mb-0">
                    <Link
                      to="/dashboard/restaurant"
                      className={`menu-link ${
                        pathname === "/dashboard/restaurant" ? "active" : ""
                      }`}
                    >
                      Restaurant
                      <span className="tag">New</span>
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <i className="material-symbols-outlined">note_stack</i>
                <span className="title">Front Pages</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <a href="/" className="menu-link">
                      Home
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/features"
                      className={`menu-link ${
                        pathname === "/features" ? "active" : ""
                      }`}
                    >
                      Features
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/team"
                      className={`menu-link ${
                        pathname === "/team" ? "active" : ""
                      }`}
                    >
                      Our Team
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/faq"
                      className={`menu-link ${
                        pathname === "/faq" ? "active" : ""
                      }`}
                    >
                      FAQ&apos;s
                    </a>
                  </li>

                  <li className="menu-item mb-0">
                    <a
                      href="/contact"
                      className={`menu-link ${
                        pathname === "/contact" ? "active" : ""
                      }`}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-title small text-uppercase">
              <span className="menu-title-text">APPS</span>
            </div>

            <div className="menu-item">
              <Link
                to="/apps/to-do-list"
                className={`menu-link ${
                  pathname === "/apps/to-do-list" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">
                  format_list_bulleted
                </i>
                <span className="title">To Do List</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to="/apps/calendar"
                className={`menu-link ${
                  pathname === "/apps/calendar" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">date_range</i>
                <span className="title">Calendar</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to="/apps/contacts"
                className={`menu-link ${
                  pathname === "/apps/contacts" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">contact_page</i>
                <span className="title">Contacts</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to="/apps/chat"
                className={`menu-link ${
                  pathname === "/apps/chat" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">chat</i>
                <span className="title">Chat</span>
              </Link>
            </div>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <i className="material-symbols-outlined">mail</i>
                <span className="title">Email</span>
                <span className="count bg-success-100 text-success">8</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/apps/email/inbox"
                      className={`menu-link ${
                        pathname === "/apps/email/inbox" ? "active" : ""
                      }`}
                    >
                      Inbox
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/email/compose"
                      className={`menu-link ${
                        pathname === "/apps/email/compose" ? "active" : ""
                      }`}
                    >
                      Compose
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/email/read-email"
                      className={`menu-link ${
                        pathname === "/apps/email/read-email" ? "active" : ""
                      }`}
                    >
                      Read Email
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/email/starred"
                      className={`menu-link ${
                        pathname === "/apps/email/starred" ? "active" : ""
                      }`}
                    >
                      Starred
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/email/snoozed"
                      className={`menu-link ${
                        pathname === "/apps/email/snoozed" ? "active" : ""
                      }`}
                    >
                      Snoozed
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/email/sent-mail"
                      className={`menu-link ${
                        pathname === "/apps/email/sent-mail" ? "active" : ""
                      }`}
                    >
                      Sent Mail
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/email/draft"
                      className={`menu-link ${
                        pathname === "/apps/email/draft" ? "active" : ""
                      }`}
                    >
                      Draft
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/email/important"
                      className={`menu-link ${
                        pathname === "/apps/email/important" ? "active" : ""
                      }`}
                    >
                      Important
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <Link
                to="/apps/kanban-board"
                className={`menu-link ${
                  pathname === "/apps/kanban-board" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">team_dashboard</i>
                <span className="title">Kanban Board</span>
              </Link>
            </div>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <i className="material-symbols-outlined">folder</i>
                <span className="title">File Manager</span>
                <span className="count">7</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/apps/file-manager"
                      className={`menu-link ${
                        pathname === "/apps/file-manager" ? "active" : ""
                      }`}
                    >
                      My Drive
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/file-manager/assets"
                      className={`menu-link ${
                        pathname === "/apps/file-manager/assets" ? "active" : ""
                      }`}
                    >
                      Assets
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/file-manager/projects"
                      className={`menu-link ${
                        pathname === "/apps/file-manager/projects"
                          ? "active"
                          : ""
                      }`}
                    >
                      Projects
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/file-manager/personal"
                      className={`menu-link ${
                        pathname === "/apps/file-manager/personal"
                          ? "active"
                          : ""
                      }`}
                    >
                      Personal
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/file-manager/applications"
                      className={`menu-link ${
                        pathname === "/apps/file-manager/applications"
                          ? "active"
                          : ""
                      }`}
                    >
                      Applications
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/file-manager/documents"
                      className={`menu-link ${
                        pathname === "/apps/file-manager/documents"
                          ? "active"
                          : ""
                      }`}
                    >
                      Documents
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/apps/file-manager/media"
                      className={`menu-link ${
                        pathname === "/apps/file-manager/media" ? "active" : ""
                      }`}
                    >
                      Media
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-title small text-uppercase">
              <span className="menu-title-text">PAGES</span>
            </div>

            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <i className="material-symbols-outlined">shopping_cart</i>
                <span className="title">eCommerce</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/ecommerce/products-grid"
                      className={`menu-link ${
                        pathname === "/ecommerce/products-grid" ? "active" : ""
                      }`}
                    >
                      Products Grid
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/products-list"
                      className={`menu-link ${
                        pathname === "/ecommerce/products-list" ? "active" : ""
                      }`}
                    >
                      Products List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/product-details"
                      className={`menu-link ${
                        pathname === "/ecommerce/product-details"
                          ? "active"
                          : ""
                      }`}
                    >
                      Product Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/create-product"
                      className={`menu-link ${
                        pathname === "/ecommerce/create-product" ? "active" : ""
                      }`}
                    >
                      Create Product
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/edit-product"
                      className={`menu-link ${
                        pathname === "/ecommerce/edit-product" ? "active" : ""
                      }`}
                    >
                      Edit Product
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/cart"
                      className={`menu-link ${
                        pathname === "/ecommerce/cart" ? "active" : ""
                      }`}
                    >
                      Cart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/checkout"
                      className={`menu-link ${
                        pathname === "/ecommerce/checkout" ? "active" : ""
                      }`}
                    >
                      Checkout
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/orders"
                      className={`menu-link ${
                        pathname === "/ecommerce/orders" ? "active" : ""
                      }`}
                    >
                      Orders
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/orders/details"
                      className={`menu-link ${
                        pathname === "/ecommerce/orders/details" ? "active" : ""
                      }`}
                    >
                      Orders Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/orders/create"
                      className={`menu-link ${
                        pathname === "/ecommerce/orders/create" ? "active" : ""
                      }`}
                    >
                      Create Order
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/orders/tracking"
                      className={`menu-link ${
                        pathname === "/ecommerce/orders/tracking"
                          ? "active"
                          : ""
                      }`}
                    >
                      Order Tracking
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/customers"
                      className={`menu-link ${
                        pathname === "/ecommerce/customers" ? "active" : ""
                      }`}
                    >
                      Customers
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/customers/details"
                      className={`menu-link ${
                        pathname === "/ecommerce/customers/details"
                          ? "active"
                          : ""
                      }`}
                    >
                      Customer Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/categories"
                      className={`menu-link ${
                        pathname === "/ecommerce/categories" ? "active" : ""
                      }`}
                    >
                      Categories
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/sellers"
                      className={`menu-link ${
                        pathname === "/ecommerce/sellers" ? "active" : ""
                      }`}
                    >
                      Sellers
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/sellers/details"
                      className={`menu-link ${
                        pathname === "/ecommerce/sellers/details"
                          ? "active"
                          : ""
                      }`}
                    >
                      Sellers Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/sellers/create"
                      className={`menu-link ${
                        pathname === "/ecommerce/sellers/create" ? "active" : ""
                      }`}
                    >
                      Create Seller
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/reviews"
                      className={`menu-link ${
                        pathname === "/ecommerce/reviews" ? "active" : ""
                      }`}
                    >
                      Reviews
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ecommerce/refunds"
                      className={`menu-link ${
                        pathname === "/ecommerce/refunds" ? "active" : ""
                      }`}
                    >
                      Refunds
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <i className="material-symbols-outlined">handshake</i>
                <span className="title">CRM</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/crm/contacts"
                      className={`menu-link ${
                        pathname === "/crm/contacts" ? "active" : ""
                      }`}
                    >
                      Contacts
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/crm/customers"
                      className={`menu-link ${
                        pathname === "/crm/customers" ? "active" : ""
                      }`}
                    >
                      Customers
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/crm/leads"
                      className={`menu-link ${
                        pathname === "/crm/leads" ? "active" : ""
                      }`}
                    >
                      Leads
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/crm/deals"
                      className={`menu-link ${
                        pathname === "/crm/deals" ? "active" : ""
                      }`}
                    >
                      Deals
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <i className="material-symbols-outlined">description</i>
                <span className="title">Project Management</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/project-management/project-overview"
                      className={`menu-link ${
                        pathname === "/project-management/project-overview"
                          ? "active"
                          : ""
                      }`}
                    >
                      Project Overview
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/project-management/projects-list"
                      className={`menu-link ${
                        pathname === "/project-management/projects-list"
                          ? "active"
                          : ""
                      }`}
                    >
                      Projects List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/project-management/create-project"
                      className={`menu-link ${
                        pathname === "/project-management/create-project"
                          ? "active"
                          : ""
                      }`}
                    >
                      Create Project
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/project-management/clients"
                      className={`menu-link ${
                        pathname === "/project-management/clients"
                          ? "active"
                          : ""
                      }`}
                    >
                      Clients
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/project-management/teams"
                      className={`menu-link ${
                        pathname === "/project-management/teams" ? "active" : ""
                      }`}
                    >
                      Teams
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/project-management/kanban-board"
                      className={`menu-link ${
                        pathname === "/project-management/kanban-board"
                          ? "active"
                          : ""
                      }`}
                    >
                      Kanban Board
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/project-management/users"
                      className={`menu-link ${
                        pathname === "/project-management/users" ? "active" : ""
                      }`}
                    >
                      Users
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>
                <i className="material-symbols-outlined">auto_stories</i>
                <span className="title">LMS</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/lms/courses"
                      className={`menu-link ${
                        pathname === "/lms/courses" ? "active" : ""
                      }`}
                    >
                      Courses List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/lms/courses/details"
                      className={`menu-link ${
                        pathname === "/lms/courses/details" ? "active" : ""
                      }`}
                    >
                      Course Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/lms/lesson-preview"
                      className={`menu-link ${
                        pathname === "/lms/lesson-preview" ? "active" : ""
                      }`}
                    >
                      Lesson Preview
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/lms/create-course"
                      className={`menu-link ${
                        pathname === "/lms/create-course" ? "active" : ""
                      }`}
                    >
                      Create Course
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/lms/edit-course"
                      className={`menu-link ${
                        pathname === "/lms/edit-course" ? "active" : ""
                      }`}
                    >
                      Edit Course
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/lms/instructors"
                      className={`menu-link ${
                        pathname === "/lms/instructors" ? "active" : ""
                      }`}
                    >
                      Instructors
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>
                <i className="material-symbols-outlined">support</i>
                <span className="title">Help Desk</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/helpdesk/tickets"
                      className={`menu-link ${
                        pathname === "/helpdesk/tickets" ? "active" : ""
                      }`}
                    >
                      Tickets
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/helpdesk/tickets/details"
                      className={`menu-link ${
                        pathname === "/helpdesk/tickets/details" ? "active" : ""
                      }`}
                    >
                      Ticket Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/helpdesk/agents"
                      className={`menu-link ${
                        pathname === "/helpdesk/agents" ? "active" : ""
                      }`}
                    >
                      Agents
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/helpdesk/reports"
                      className={`menu-link ${
                        pathname === "/helpdesk/reports" ? "active" : ""
                      }`}
                    >
                      Reports
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>
                <i className="material-symbols-outlined">store</i>
                <span className="title">NFT Marketplace</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/nft/marketplace"
                      className={`menu-link ${
                        pathname === "/nft/marketplace" ? "active" : ""
                      }`}
                    >
                      Marketplace
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/nft/explore-all"
                      className={`menu-link ${
                        pathname === "/nft/explore-all" ? "active" : ""
                      }`}
                    >
                      Explore All
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/nft/live-auction"
                      className={`menu-link ${
                        pathname === "/nft/live-auction" ? "active" : ""
                      }`}
                    >
                      Live Auction
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/nft/details"
                      className={`menu-link ${
                        pathname === "/nft/details" ? "active" : ""
                      }`}
                    >
                      NFT Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/nft/creators"
                      className={`menu-link ${
                        pathname === "/nft/creators" ? "active" : ""
                      }`}
                    >
                      Creators
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/nft/creators/details"
                      className={`menu-link ${
                        pathname === "/nft/creators/details" ? "active" : ""
                      }`}
                    >
                      Creator Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/nft/wallet-connect"
                      className={`menu-link ${
                        pathname === "/nft/wallet-connect" ? "active" : ""
                      }`}
                    >
                      Wallet Connect
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/nft/creact"
                      className={`menu-link ${
                        pathname === "/nft/creact" ? "active" : ""
                      }`}
                    >
                      Creact NFT
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="10">
              <Accordion.Header>
                <i className="material-symbols-outlined">real_estate_agent</i>
                <span className="title">Real Estate</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/real-estate/property-list"
                      className={`menu-link ${
                        pathname === "/real-estate/property-list"
                          ? "active"
                          : ""
                      }`}
                    >
                      Property List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/real-estate/property-details"
                      className={`menu-link ${
                        pathname === "/real-estate/property-details"
                          ? "active"
                          : ""
                      }`}
                    >
                      Property Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/real-estate/add-property"
                      className={`menu-link ${
                        pathname === "/real-estate/add-property" ? "active" : ""
                      }`}
                    >
                      Add Property
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/real-estate/agents"
                      className={`menu-link ${
                        pathname === "/real-estate/agents" ? "active" : ""
                      }`}
                    >
                      Agents
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/real-estate/agent-details"
                      className={`menu-link ${
                        pathname === "/real-estate/agent-details"
                          ? "active"
                          : ""
                      }`}
                    >
                      Agent Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/real-estate/add-agent"
                      className={`menu-link ${
                        pathname === "/real-estate/add-agent" ? "active" : ""
                      }`}
                    >
                      Add Agent
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/real-estate/customers"
                      className={`menu-link ${
                        pathname === "/real-estate/customers" ? "active" : ""
                      }`}
                    >
                      Customers
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="11">
              <Accordion.Header>
                <i className="material-symbols-outlined">calculate</i>
                <span className="title">Finance</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/finance/wallet"
                      className={`menu-link ${
                        pathname === "/finance/wallet" ? "active" : ""
                      }`}
                    >
                      Wallet
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/finance/transactions"
                      className={`menu-link ${
                        pathname === "/finance/transactions" ? "active" : ""
                      }`}
                    >
                      Transaction
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="12">
              <Accordion.Header>
                <i className="material-symbols-outlined">badge</i>
                <span className="title">Doctor</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/doctor/patients-list"
                      className={`menu-link ${
                        pathname === "/doctor/patients-list" ? "active" : ""
                      }`}
                    >
                      Patients List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/doctor/add-patient"
                      className={`menu-link ${
                        pathname === "/doctor/add-patient" ? "active" : ""
                      }`}
                    >
                      Add Patient
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/doctor/patient-details"
                      className={`menu-link ${
                        pathname === "/doctor/patient-details" ? "active" : ""
                      }`}
                    >
                      Patient Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/doctor/appointments"
                      className={`menu-link ${
                        pathname === "/doctor/appointments" ? "active" : ""
                      }`}
                    >
                      Appointments
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/doctor/prescriptions"
                      className={`menu-link ${
                        pathname === "/doctor/prescriptions" ? "active" : ""
                      }`}
                    >
                      Prescriptions
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/doctor/write-prescription"
                      className={`menu-link ${
                        pathname === "/doctor/write-prescription"
                          ? "active"
                          : ""
                      }`}
                    >
                      Write Prescription
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="13">
              <Accordion.Header>
                <i className="material-symbols-outlined">lunch_dining</i>
                <span className="title">Restaurant</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/restaurant/menus"
                      className={`menu-link ${
                        pathname === "/restaurant/menus" ? "active" : ""
                      }`}
                    >
                      Menus
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/restaurant/dish-details"
                      className={`menu-link ${
                        pathname === "/restaurant/dish-details" ? "active" : ""
                      }`}
                    >
                      Dish Details
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="14">
              <Accordion.Header>
                <i className="material-symbols-outlined">local_activity</i>
                <span className="title">Events</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/events"
                      className={`menu-link ${
                        pathname === "/events" ? "active" : ""
                      }`}
                    >
                      Events Grid
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/events/events-list"
                      className={`menu-link ${
                        pathname === "/events/events-list" ? "active" : ""
                      }`}
                    >
                      Events List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/events/details"
                      className={`menu-link ${
                        pathname === "/events/details" ? "active" : ""
                      }`}
                    >
                      Event Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/events/create-an-event"
                      className={`menu-link ${
                        pathname === "/events/create-an-event" ? "active" : ""
                      }`}
                    >
                      Create An Event
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/events/edit-an-event"
                      className={`menu-link ${
                        pathname === "/events/edit-an-event" ? "active" : ""
                      }`}
                    >
                      Edit An Event
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="15">
              <Accordion.Header>
                <i className="material-symbols-outlined">share</i>
                <span className="title">Social</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/social/profile"
                      className={`menu-link ${
                        pathname === "/social/profile" ? "active" : ""
                      }`}
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/social/settings"
                      className={`menu-link ${
                        pathname === "/social/settings" ? "active" : ""
                      }`}
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="16">
              <Accordion.Header>
                <i className="material-symbols-outlined">content_paste</i>
                <span className="title">Invoices</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/invoices"
                      className={`menu-link ${
                        pathname === "/invoices" ? "active" : ""
                      }`}
                    >
                      Invoices
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/invoices/details"
                      className={`menu-link ${
                        pathname === "/invoices/details" ? "active" : ""
                      }`}
                    >
                      Invoice Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/invoices/create"
                      className={`menu-link ${
                        pathname === "/invoices/create" ? "active" : ""
                      }`}
                    >
                      Create Invoice
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/invoices/edit"
                      className={`menu-link ${
                        pathname === "/invoices/edit" ? "active" : ""
                      }`}
                    >
                      Edit Invoice
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="17">
              <Accordion.Header>
                <i className="material-symbols-outlined">group_add</i>
                <span className="title">Users</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/users"
                      className={`menu-link ${
                        pathname === "/users" ? "active" : ""
                      }`}
                    >
                      Team Members
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/users/users-list"
                      className={`menu-link ${
                        pathname === "/users/users-list" ? "active" : ""
                      }`}
                    >
                      Users List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/users/add-user"
                      className={`menu-link ${
                        pathname === "/users/add-user" ? "active" : ""
                      }`}
                    >
                      Add User
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="18">
              <Accordion.Header>
                <i className="material-symbols-outlined">account_box</i>
                <span className="title">Profile</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/profile"
                      className={`menu-link ${
                        pathname === "/profile" ? "active" : ""
                      }`}
                    >
                      User Profile
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/profile/teams"
                      className={`menu-link ${
                        pathname === "/profile/teams" ? "active" : ""
                      }`}
                    >
                      Teams
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/profile/projects"
                      className={`menu-link ${
                        pathname === "/profile/projects" ? "active" : ""
                      }`}
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <Link
                to="/starter"
                className={`menu-link ${
                  pathname === "/starter" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">star</i>
                <span className="title">Starter</span>
              </Link>
            </div>

            <div className="menu-title small text-uppercase">
              <span className="menu-title-text">MODULES</span>
            </div>

            <Accordion.Item eventKey="19">
              <Accordion.Header>
                <i className="material-symbols-outlined">add_reaction</i>
                <span className="title">Icons</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/icons/material-symbols"
                      className={`menu-link ${
                        pathname === "/icons/material-symbols" ? "active" : ""
                      }`}
                    >
                      Material Icons
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/icons/remixicon"
                      className={`menu-link ${
                        pathname === "/icons/remixicon" ? "active" : ""
                      }`}
                    >
                      RemixIcon
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="20">
              <Accordion.Header>
                <i className="material-symbols-outlined">qr_code_scanner</i>
                <span className="title">UI Elements</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/ui-kit/accordion"
                      className={`menu-link ${
                        pathname === "/ui-kit/accordion" ? "active" : ""
                      }`}
                    >
                      Accordion
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/alerts"
                      className={`menu-link ${
                        pathname === "/ui-kit/alerts" ? "active" : ""
                      }`}
                    >
                      Alerts
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/avatar"
                      className={`menu-link ${
                        pathname === "/ui-kit/avatar" ? "active" : ""
                      }`}
                    >
                      Avatar
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/badges"
                      className={`menu-link ${
                        pathname === "/ui-kit/badges" ? "active" : ""
                      }`}
                    >
                      Badges
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/buttons"
                      className={`menu-link ${
                        pathname === "/ui-kit/buttons" ? "active" : ""
                      }`}
                    >
                      Buttons
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/cards"
                      className={`menu-link ${
                        pathname === "/ui-kit/cards" ? "active" : ""
                      }`}
                    >
                      Cards
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/carousel"
                      className={`menu-link ${
                        pathname === "/ui-kit/carousel" ? "active" : ""
                      }`}
                    >
                      Carousel
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/date-time-picker"
                      className={`menu-link ${
                        pathname === "/ui-kit/date-time-picker" ? "active" : ""
                      }`}
                    >
                      Date Time Picker
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/dropdowns"
                      className={`menu-link ${
                        pathname === "/ui-kit/dropdowns" ? "active" : ""
                      }`}
                    >
                      Dropdowns
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/images"
                      className={`menu-link ${
                        pathname === "/ui-kit/images" ? "active" : ""
                      }`}
                    >
                      Images
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/list-groups"
                      className={`menu-link ${
                        pathname === "/ui-kit/list-groups" ? "active" : ""
                      }`}
                    >
                      List Groups
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/navbars"
                      className={`menu-link ${
                        pathname === "/ui-kit/navbars" ? "active" : ""
                      }`}
                    >
                      Navbars
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/navs/"
                      className={`menu-link ${
                        pathname === "/ui-kit/navs" ? "active" : ""
                      }`}
                    >
                      Navs
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/progress-bars"
                      className={`menu-link ${
                        pathname === "/ui-kit/progress-bars" ? "active" : ""
                      }`}
                    >
                      Progress Bars
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ui-kit/videos"
                      className={`menu-link ${
                        pathname === "/ui-kit/videos" ? "active" : ""
                      }`}
                    >
                      Videos
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="21">
              <Accordion.Header>
                <i className="material-symbols-outlined">table_chart</i>
                <span className="title">Tables</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/tables/basic-table"
                      className={`menu-link ${
                        pathname === "/tables/basic-table" ? "active" : ""
                      }`}
                    >
                      Basic Table
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/tables/data-table"
                      className={`menu-link ${
                        pathname === "/tables/data-table" ? "active" : ""
                      }`}
                    >
                      Data Table
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="22">
              <Accordion.Header>
                <i className="material-symbols-outlined">forum</i>
                <span className="title">Forms</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/forms/basic-elements"
                      className={`menu-link ${
                        pathname === "/forms/basic-elements" ? "active" : ""
                      }`}
                    >
                      Basic Elements
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/forms/advanced-elements"
                      className={`menu-link ${
                        pathname === "/forms/advanced-elements" ? "active" : ""
                      }`}
                    >
                      Advanced Elements
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/forms/validation"
                      className={`menu-link ${
                        pathname === "/forms/validation" ? "active" : ""
                      }`}
                    >
                      Validation
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/forms/editors"
                      className={`menu-link ${
                        pathname === "/forms/editors" ? "active" : ""
                      }`}
                    >
                      Editors
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/forms/file-upload"
                      className={`menu-link ${
                        pathname === "/forms/file-upload" ? "active" : ""
                      }`}
                    >
                      File Upload
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="23">
              <Accordion.Header>
                <i className="material-symbols-outlined">pie_chart</i>
                <span className="title">Charts</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/charts/line"
                      className={`menu-link ${
                        pathname === "/charts/line" ? "active" : ""
                      }`}
                    >
                      Line Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/charts/area"
                      className={`menu-link ${
                        pathname === "/charts/area" ? "active" : ""
                      }`}
                    >
                      Area Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/charts/column"
                      className={`menu-link ${
                        pathname === "/charts/column" ? "active" : ""
                      }`}
                    >
                      Column Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/charts/mixed"
                      className={`menu-link ${
                        pathname === "/charts/mixed" ? "active" : ""
                      }`}
                    >
                      Mixed Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/charts/radialbar"
                      className={`menu-link ${
                        pathname === "/charts/radialbar" ? "active" : ""
                      }`}
                    >
                      Radialbar Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/charts/radar"
                      className={`menu-link ${
                        pathname === "/charts/radar" ? "active" : ""
                      }`}
                    >
                      Radar Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/charts/pie"
                      className={`menu-link ${
                        pathname === "/charts/pie" ? "active" : ""
                      }`}
                    >
                      Pie Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/charts/polar"
                      className={`menu-link ${
                        pathname === "/charts/polar" ? "active" : ""
                      }`}
                    >
                      Polar Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/charts/more"
                      className={`menu-link ${
                        pathname === "/charts/more" ? "active" : ""
                      }`}
                    >
                      More Chart
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="24">
              <Accordion.Header>
                <i className="material-symbols-outlined">lock</i>
                <span className="title">Authentication</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <a
                      href="/authentication/sign-in"
                      className={`menu-link ${
                        pathname === "/authentication/sign-in" ? "active" : ""
                      }`}
                    >
                      Sign In
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/authentication/sign-up"
                      className={`menu-link ${
                        pathname === "/authentication/sign-up" ? "active" : ""
                      }`}
                    >
                      Sign Up
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/authentication/forgot-password"
                      className={`menu-link ${
                        pathname === "/authentication/forgot-password"
                          ? "active"
                          : ""
                      }`}
                    >
                      Forgot Password
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/authentication/reset-password"
                      className={`menu-link ${
                        pathname === "/authentication/reset-password"
                          ? "active"
                          : ""
                      }`}
                    >
                      Reset Password
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/authentication/confirm-email"
                      className={`menu-link ${
                        pathname === "/authentication/confirm-email"
                          ? "active"
                          : ""
                      }`}
                    >
                      Confirm Email
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/authentication/lock-screen"
                      className={`menu-link ${
                        pathname === "/authentication/lock-screen"
                          ? "active"
                          : ""
                      }`}
                    >
                      Lock Screen
                    </a>
                  </li>

                  <li className="menu-item">
                    <a
                      href="/authentication/logout"
                      className={`menu-link ${
                        pathname === "/authentication/logout" ? "active" : ""
                      }`}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="25">
              <Accordion.Header>
                <i className="material-symbols-outlined">content_copy</i>
                <span className="title">Extra Pages</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/pricing-plan"
                      className={`menu-link ${
                        pathname === "/pricing-plan" ? "active" : ""
                      }`}
                    >
                      Pricing Plan
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/animation"
                      className={`menu-link ${
                        pathname === "/animation" ? "active" : ""
                      }`}
                    >
                      Animation
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/ratings"
                      className={`menu-link ${
                        pathname === "/ratings" ? "active" : ""
                      }`}
                    >
                      Ratings
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/toasts"
                      className={`menu-link ${
                        pathname === "/toasts" ? "active" : ""
                      }`}
                    >
                      Toasts
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/timeline"
                      className={`menu-link ${
                        pathname === "/timeline" ? "active" : ""
                      }`}
                    >
                      Timeline
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/extra-faq"
                      className={`menu-link ${
                        pathname === "/extra-faq" ? "active" : ""
                      }`}
                    >
                      FAQ&apos;s
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/testimonials"
                      className={`menu-link ${
                        pathname === "/testimonials" ? "active" : ""
                      }`}
                    >
                      Testimonials
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/gallery"
                      className={`menu-link ${
                        pathname === "/gallery" ? "active" : ""
                      }`}
                    >
                      Gallery
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/search"
                      className={`menu-link ${
                        pathname === "/search" ? "active" : ""
                      }`}
                    >
                      Search
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/blank-page"
                      className={`menu-link ${
                        pathname === "/blank-page" ? "active" : ""
                      }`}
                    >
                      Blank Page
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="26">
              <Accordion.Header>
                <i className="material-symbols-outlined">chat_error</i>
                <span className="title">Errors Pages</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <a
                      href="/not-found"
                      className={`menu-link ${
                        pathname === "/not-found" ? "active" : ""
                      }`}
                    >
                      404 Error
                    </a>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/internal-error"
                      className={`menu-link ${
                        pathname === "/internal-error" ? "active" : ""
                      }`}
                    >
                      Internal Error
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <Link
                to="/widgets"
                className={`menu-link ${
                  pathname === "/widgets" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">widgets</i>
                <span className="title">Widgets</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to="/maps"
                className={`menu-link ${pathname === "/maps" ? "active" : ""}`}
              >
                <i className="material-symbols-outlined">map</i>
                <span className="title">Maps</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to="/notifications"
                className={`menu-link ${
                  pathname === "/notifications" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">notifications</i>
                <span className="title">Notifications</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to="/members"
                className={`menu-link ${
                  pathname === "/members" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">people</i>
                <span className="title">Members</span>
              </Link>
            </div>

            <div className="menu-title small text-uppercase">
              <span className="menu-title-text">OTHERS</span>
            </div>

            <div className="menu-item">
              <Link
                to="/my-profile"
                className={`menu-link ${
                  pathname === "/my-profile" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">account_circle</i>
                <span className="title">My Profile</span>
              </Link>
            </div>

            <Accordion.Item eventKey="27">
              <Accordion.Header>
                <i className="material-symbols-outlined">settings</i>
                <span className="title">Settings</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to="/settings/account-settings"
                      className={`menu-link ${
                        pathname === "/settings/account-settings"
                          ? "active"
                          : ""
                      }`}
                    >
                      Account Settings
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/settings/change-password"
                      className={`menu-link ${
                        pathname === "/settings/change-password" ? "active" : ""
                      }`}
                    >
                      Change Password
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/settings/connections"
                      className={`menu-link ${
                        pathname === "/settings/connections" ? "active" : ""
                      }`}
                    >
                      Connections
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/settings/privacy-policy"
                      className={`menu-link ${
                        pathname === "/settings/privacy-policy" ? "active" : ""
                      }`}
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to="/settings/terms-conditions"
                      className={`menu-link ${
                        pathname === "/settings/terms-conditions"
                          ? "active"
                          : ""
                      }`}
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <a
                href="/authentication/logout"
                className={`menu-link ${
                  pathname === "/authentication/logout" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="title">Logout</span>
              </a>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
