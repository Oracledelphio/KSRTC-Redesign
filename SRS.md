<div align="center">

# Software Requirements Specification (SRS) for KSRTC Bus Reservation System

</div>

*Team Members:*  
- Kurt Sony Rebello (Roll No: am.ai.u4aid23046)  
- R Kiran (Roll No: am.ai.u4aid23053)  
- Salwan Subair (Roll No: am.ai.u4aid23055)  
- Abhijith Krishna (Roll No: am.ai.u4aid23037)  

*Program:* Artificial Intelligence & Data Science  
*Semester:* 4  
*Course Code / Course Name:* 23AID215 – User Interface Design  
*Title:* Software Requirements Specification (SRS) for KSRTC Bus Reservation System  
*Date:* 25.04.2025  
*Document Version:* Ver 1.0  

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) outlines the requirements for the KSRTC Bus Reservation System, a web-based platform designed to enhance the bus booking process for the Kerala State Road Transport Corporation (KSRTC). The system aims to automate tasks like seat reservations, route scheduling, staff management, ticketing, and payments, offering a user-friendly and secure experience for customers while providing administrative tools for staff and managers. This document serves as a blueprint for the development team to build the system effectively.

### 1.2 Scope
The KSRTC Bus Reservation System is a full-featured platform serving customers, drivers, conductors, and administrators. It enables customers to register, browse routes, select seats, book tickets, and make payments through an intuitive interface. For staff and administrators, it provides tools to manage bus schedules, routes, employee assignments, and reservations. The system uses React, Next.js, and Tailwind CSS for a responsive, mobile-first frontend, with PostgreSQL as the backend database. The design follows a relational structure guided by an Entity Relationship (ER) diagram, supporting both dynamic frontend rendering and backend integration.

### 1.3 Definitions, Acronyms, and Abbreviations
- *KSRTC*: Kerala State Road Transport Corporation  
- *CSS*: Cascading Style Sheets  
- *React*: JavaScript library for user interfaces  
- *Next.js*: React framework for server-side rendering and static site generation  
- *Tailwind CSS*: Utility-first CSS framework  
- *SRS*: Software Requirements Specification  
- *ERD*: Entity Relationship Diagram  
- *SQL*: Structured Query Language  
- *PostgreSQL*: Open-source relational database  
- *UI*: User Interface  

### 1.4 References
- React Documentation: [https://react.dev/](https://react.dev/)  
- Next.js Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)  
- Tailwind CSS Documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)  

---

## 2. Overall Description

### 2.1 Product Perspective
The KSRTC Bus Reservation System is a modular web application built using a full-stack approach . It integrates a React-based frontend with Next.js for routing and server-side rendering, styled with Tailwind CSS, and a PostgreSQL database for data management. The system connects entities like customers, employees (drivers, conductors, managers), buses, routes, seats, reservations, payments, and login credentials into a unified platform. Below is a sample project configuration:

json
{
  "name": "ksrtc",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.4.2",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "eslint": "^9.25.1",
    "eslint-config-next": "14.4.2",
    "@eslint/eslintrc": "^3.3.1",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0"
  }
}
`

### 2.2 Product Functions

The system provides the following key features:

- *User Registration and Authentication*: Secure sign-up and login with encrypted passwords (using bcrypt) and JWT-based role-specific access.
- *Route Browsing*: Real-time route search with filters for source, destination, and schedule.
- *Seat Reservation*: Interactive seat selection with dynamic availability updates.
- *Bus and Staff Management*: Admin tools to assign buses, routes, drivers, and conductors.
- *Payment Gateway Integration*: Secure payments.
- *Analytics and Admin Oversight*: Dashboards for monitoring bookings, routes, staff, and revenue.

### 2.3 User Characteristics

- *Customers*: Need an easy-to-use interface for booking and payments; basic internet skills required.
- *Employees (Drivers, Conductors)*: Access schedules and assignments via a simple interface.
- *Administrators (Managers)*: Manage routes, schedules, buses, employees, and analytics with full control.

### 2.4 Constraints

- Frontend must use React, Next.js, and Tailwind CSS.
- Backend must use PostgreSQL with strict data constraints.
- Secure HTTPS endpoints required, targeting Chrome and Firefox.

---

## 3. Specific Requirements

### 3.1 Functional Requirements

- *Authentication System*: JWT-based login for customers, employees, and managers.
- *Real-Time Reservation Engine*: Manages bookings with concurrent validation.
- *Seat Availability Algorithm*: Tracks seat status efficiently in PostgreSQL.
- *Route Management*: UI for scheduling and mapping buses to routes.
- *Role-Based Dashboards*: Custom UIs based on user roles.
- *User Registration*: Collects customer details for unique profiles.
- *Booking and Payment*: Guides users through seat booking and payment options.
- *Ticket Generation*: Creates PDF tickets with booking details.
- *Navigation System*: Links all key sections using React and Next.js.

### 3.2 Non-Functional Requirements

- *Performance*: Sub-1s page loads with lazy loading and server-side rendering.
- *Availability*: 99.9% uptime goal.
- *Usability*: Simple, consistent design for all users.

### 3.3 Design Constraints

- Mobile-first design with Tailwind CSS styling.
- Reusable React components with hooks.
- PostgreSQL tables with strict constraints (e.g., NOT NULL, UNIQUE).

---

## 4. Appendices

### 4.1 Assumptions and Dependencies

- Users have stable internet and modern browsers.
- PostgreSQL hosted on a cloud platform (e.g., Supabase).
- Payment gateways support required currency.
- External libraries kept updated for security.
- State management via React Context API or Redux.

### 4.2 User Screens

- *Home Page*: System overview and navigation.
- *Route Search Page*: Search buses by source and destination.
- *Seat Selection Page*: Displays available seats.
- *Booking Page*: Confirms reservations.
- *Payment Page*: Processes payments securely.
- *Admin Dashboard*: Manages schedules, buses, and staff.

### 4.3 Additional Considerations

The system relies on a relational data structure with entities like customers, employees, buses, routes, seats, reservations, and payments. This structure supports realistic booking workflows and aligns with the ER diagram, guiding the design of forms, displays, and database models.

---
