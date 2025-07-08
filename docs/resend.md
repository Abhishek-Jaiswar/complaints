# Resend Email Integration

This project uses [Resend](https://resend.com/) to send transactional emails when a complaint raised or on change status.

---

## **Why I Chose Resend**

I chose **Resend** because it provides a simple, modern, developer-friendly API for sending transactional emails — without complex SMTP setup or deliverability headaches.

**Key reasons:**

- **Fast integration:** Resend works well with Next.js Api routes or Server Actions.
- **Better deliverability:** Handles the hard parts like domain verification and spam compliance.
- **Supports React Emails:** I can write email templates as React components.
- **Clear pricing:** Simple and transparent pricing model with a generous free tier for testing.

Overall, Resend fits perfectly for projects that need to send reliable notifications like complaint status updates, user onboarding, or admin alerts — all with minimal setup.

---

## **How it works**

- After an admin updates a complaint, the API route calls the Resend API.
- Resend sends an email to notify the user (or admin in this case) in our case the notification will be sent to admin as mentioned in the **SRS docs**.
- **Important NOTE**: Current setup of resend service sent transactional emails to only admin, not users, to do so user needs to enter a valid email.
  - In the **API** Route i have hardcoded my **RESEND** varified email , Currently i dont have a domain to attach for sending emails.

  - Consider following snippet:-

  /api/complaints/users
  ```bash
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev", //Default mail from provider
    to: [adminEmail] || "youremail@example.com", // as we dont verify our domain to send emails we are using own verified email
    subject: ` New ${priority} Priority Complaint: ${title}`,
    react: ComplaintNotificationEmail({
      title,
      description,
      ...
    }),
  });

  if (error) {
    console.error("Email sending error:", error);
  }
  ```

---

## **How To Setup Resend**

1. **Create a Resend account:**  
   [https://resend.com/](https://resend.com/)

2. **Get your API key:**
   - Go to **API Keys** in your Resend dashboard.
   - Click **Create API Key**.
   - Copy the key.

3. **Add it to your `.env`**

   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```

---

## **Using it in code**

Example usage in `route.ts`:

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "user@example.com",
  subject: "Subject of email",
  react: YourEmailTemplate,
});
```

---
