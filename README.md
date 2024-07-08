# ClinicConnect

A robust web platform designed for clinics, allowing patients to seamlessly book and cancel appointments while enabling doctors to efficiently manage appointments with advanced sorting and filtering options. Security is ensured using Spring Security with JWT, addressing issues like concurrent logins and enforcing a fixed number of appointments per slot. The platform leverages Spring Data JPA for efficient database querying and utilizes JavaMailSender to send timely notifications to user email IDs. This comprehensive solution streamlines appointment management, enhancing the overall user experience for both patients and healthcare providers.


Tools used: React.js, Spring-Boot, mysql

## Functionalities Implemented
1) <b>Enhanced security with JWT:</b> Implemented JSON Web Tokens for robust security, addressing issues like concurrent logins and protected webpages.
2) <b>Integrated RBAC with JWT:</b> Minimized database querying by embedding Role-Based Access Control within JWT, ensuring efficient and secure access management.
3) <b>Utilized Spring Data JPA:</b> Efficiently managed data querying, enhancing the backend performance and data handling.
4) <b>Designed a responsive frontend</b> using React.js, ensuring optimal user experience across various devices, including mobiles, tablets, laptops, and desktops.
5) <b>Automated booking confirmations:</b> Employed JavaMailSender to send booking confirmation emails, improving user communication and engagement.


## Video Demonstration

https://github.com/SRDhanush16/ClinicConnect/assets/141258864/f6dd63ba-0c4e-4ede-8101-5fea3b52ab9e

## Previous Versions
Transitioned from MVC to REST architecture: Initially developed with Thymeleaf in MVC architecture, later restructured to a RESTful architecture for better scalability and maintainability.


