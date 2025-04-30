<div align="center">

# Software Requirements Specification (SRS) for KSRTC Website

</div>

**Team Members:**  
- Kurt Sony Rebello (Roll No: am.ai.u4aid23046)  
- R Kiran (Roll No: am.ai.u4aid23053)  
- Salwan Subair (Roll No: am.ai.u4aid23055)  
- Abhijith Krishna (Roll No: am.ai.u4aid23037)  

**Program:** AI & Data Science  
**Semester:** 4  
**Course Code / Course Name:** 23AID215 - User Interface Design  

---

## 1. Introduction

### 1.1 Purpose
This document provides a detailed specification of the software requirements for the KSRTC website, a web-based solution intended to streamline bus transport bookings for the Kerala State Road Transport Corporation. It aims to define the system’s capabilities, ensuring that it meets the needs of both customers booking tickets and administrators managing operations. The SRS serves as a foundational guide for the development team to design and implement the website effectively.

### 1.2 Scope
The KSRTC website will offer a user-friendly platform for customers to register, search for bus routes, select seats, and complete bookings with integrated payment options. It will also include an administrative section to oversee bus schedules, routes, and customer bookings. Built using React, Next.js, HTML, and CSS, the website will prioritize a responsive design to accommodate various devices, ensuring accessibility and ease of use. This project focuses on creating an intuitive interface with backend integration, simulating dynamic functionalities through dynamic pages.

### 1.3 Definitions, Acronyms, and Abbreviations
- "KSRTC": Kerala State Road Transport Corporation, the entity overseeing the bus transport system.  
- "HTML": HyperText Markup Language.  
- "CSS": Cascading Style Sheets.  
- "React": A JavaScript library for building user interfaces.  
- "Next.js": A React framework for server-side rendering and static site generation.  
- "UI": User Interface, a critical focus of this project.

### 1.4 References
- React Documentation: https://react.dev/  
- Next.js Documentation: https://nextjs.org/docs  

---

## 2. Overall Description

### 2.1 Product Perspective
The KSRTC website is envisioned as an accessible web application that modernizes the process of booking bus tickets. It integrates key entities such as buses, routes, seats, customers, bookings, and payments into a cohesive system, providing a seamless experience for users. The ER diagram provides a reference for the data structure, ensuring alignment with a potential future database-driven system. The implementation leverages React and Next.js for a dynamic front-end design.

### 2.2 Product Functions
The primary capabilities of the website include enabling customers to create accounts and log in securely to access booking services. Users will be able to search for routes by entering their travel origin and destination, view available buses, and choose seats based on availability. The system will also support booking confirmations and offer payment options, including cash and card payments, with a clear confirmation process. For administrators, a dedicated section will allow oversight of bus schedules, seat availability, and booking statuses, presented through dynamic pages rendered using React and Next.js.

### 2.3 User Characteristics
The website caters to two main user groups. Customers, the primary users, are expected to have basic internet skills and will interact with the system to book tickets. Administrators, representing KSRTC staff, will use the system to monitor and manage operational details, requiring an interface that is straightforward and efficient.

### 2.4 Constraints
Development incorporates React and Next.js alongside CSS, as mandated by the course requirements, enabling a dynamic yet static-compatible implementation. The website must function effectively across major browsers such as Chrome and Firefox and adapt to different screen sizes for a consistent experience.

---

## 3. Specific Requirements

### 3.1 Functional Requirements
The KSRTC website will feature a navigation system accessible from all pages, linking to essential sections like home, route search, booking management, and contact information, implemented using React components and Next.js routing. A registration page will collect user details such as first name, last name, address, phone numbers, and email to create unique customer profiles, as inspired by the ER diagram. The route search functionality will display available travel options by referencing routes (source, destination, distance), including bus details (registration number, type, capacity) and associated seats (seat number, reservation status). A seat selection interface will allow users to choose seats based on availability. Booking pages will guide users through reserving seats and confirming their travel plans, storing details like booking date, customer, bus, route, seat, and payment information. Payment pages will present options for completing transactions, supporting both cash and card payments, capturing details like amount, payment date, and payment type. An admin section will simulate management tasks, such as viewing route schedules, seat availability, and booking summaries, using pre-designed layouts within React components.

### 3.2 Non-Functional Requirements
The website must perform efficiently, with pages rendering in less time on a standard internet connection, leveraging Next.js server-side rendering and static generation capabilities. Usability is a priority, ensuring that navigation and interactions are intuitive for all users. The design will incorporate accessibility features, such as clear text, logical structure, and semantic HTML, to support diverse audiences, including those using screen readers.

### 3.3 Design Constraints
Visually, the website will reflect an identity through a color scheme, paired with readable, web-safe fonts, styled using CSS within a React and Next.js framework. The layout will emphasize a minimalist design with simplicity and consistency, adhering to user interface design principles taught in the course.

---

## 4. Appendices

### 4.1 Assumptions
This project assumes that users have reliable internet access and modern browsers to interact with the website. The website does not require server-side processing at this stage, as it focuses on front-end development with simulated backend integration.

### 4.2 User Screens
The main user screens include:  
- Home Page: Displays an overview of the KSRTC website with navigation links.  
- Route Search Page: Allows users to input source and destination to view available buses.  
- Seat Selection Page: Displays available seats for a selected bus.  
- Booking Page: Guides users through the booking confirmation process.  
- Payment Page: Offers options for cash or card payments.  
- Admin Dashboard: Simulates management tasks like viewing schedules and bookings.  
User interface sketches for these screens will be provided separately.

### 4.3 Additional Considerations
A key aspect of the project is its reliance on a relational data structure, as referenced in the ER diagram. The structure includes entities like customers (first name, last name, address, phone numbers, email), buses (registration number, type, capacity), routes (source, destination, distance), seats (seat number, reservation status), bookings (booking date, customer, bus, route, seat, payment), and payments (amount, payment date, type, with subtypes for cash and card payments). This structure informs the design of forms and displays, ensuring alignment with realistic booking workflows.
