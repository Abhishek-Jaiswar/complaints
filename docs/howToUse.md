## How to Use the Application

### 1. Raise a Complaint (User)

- Open the web application in your browser.
- Navigate to the **Raise Complaint**.
- Fill out all required fields:
  - **Title** — short summary of the issue.
  - **Description** — detailed information about the complaint.
  - **Category** — select the relevant category if applicable.
  - **Priority** — choose the urgency level (High, Medium, Low).

- Submit the form.
- The complaint is saved to the database, and a notification email is automatically sent to the admin.

### IMPORTANT

In the current configuration of the resend email service is sent to **_my email_**, as i have **_RESEND_** varified email.

- **Why it happens**: Because **_RESEND_** requires **CUSTOM DOMAIN** with smtp setup to send transactional emails dynamicaly and unfortunatly i dont have a domain, as i dont have domain so i hardcoded it.

- **Actions you can take**: If you run this application localy in your system, here's a instructions you can consider:
  - Navigate to **/api/complaints/user** this api route has email integration, what you have to do is just change the **FROM** and **TO** and add your configured emails.
  - That's it now email will be dynamicaly

---

### 2️ Admin Dashboard

### Log in as an **Admin** (authentication via cookies/JWT).

Here's a guide how you can find admin login page

- Open the application in any browser.
- Navigate to the URL bar.
- Just add the **/admin**.
- The admin login will be displayed.

#### How can you access admin panel
- navigate to /admin
- enter the following credentials
- email:  abhishek@gmail.com
- password: 123456
#### Note

You can't create account as a admin even if this application has **_RBAC_** authentication model, Here's why.

- In this complaint system there will be only one admisitration who manages the customers or users complaints
- If i add the **\*Registration** from admin then any user can become admin which is not intended.
- **What i did to create admin**, I have manualy seeded the database for admin, so that application integrity should be maintained and one admin who manages all the complaints.

---

### 3️ Update or Respond to Complaints (Admin)

- On the **Admin Dashbaord** page, you can:
 - See all the complaints reaied by users or customers.
 - Update the **status** and add relvent **replies** of a complaint (e.g.,Your complaint has been reviewed and you'll get update soon, description -> Pending → In Progress → Resolved).
  - add an **Admin Reply Title** and **Admin Reply Description** for more context.

- Submit the update.
- The system sends an automatic email notification to the user with the updated details and the admin’s reply.
- In the current email setup i dont send emails to user but there i have implemented and commented it when a domain will be available to me i will add this feature

---

This flow ensures transparent communication between users and admins, and keeps all complaint updates well-tracked and notified via email.

**Tip:** Make sure you have configured your **email service** (like Resend or SMTP) and **MongoDB connection** before using the app.
