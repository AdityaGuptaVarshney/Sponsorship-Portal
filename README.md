#  Sponsorship Portal

A powerful web application built with **Next.js 15**, **TailwindCSS 4**, **Firebase**, and **Cloudflare R2**, designed to manage complex **Finance** and **Deliverables** workflows for multi-department event-based organizations.

---

##  Overview

This system is a **Finance and Deliverables Tracker** that streamlines the management of **multiple MoUs (Memorandums of Understanding)** between organizations and sponsors. Designed to support both **cash and in-kind contributions**, it enables detailed tracking of financial performance and deliverables across departments.

Originally developed for **Paradox 25**, a large-scale college fest, the system successfully handled:

- ₹19 Lakhs in cash contributions  
- ₹60 Lakhs in in-kind deliverables  
- 43 MoUs from sponsoring companies  
- 100+ individual deliverables  
- 40+ users across 12+ departments  

---
![image](https://github.com/user-attachments/assets/9d3fd936-86da-4948-bbb9-0491d557af80)

##  Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/)  
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)  
- **Backend**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Functions)  
- **Storage**: [Cloudflare R2](https://developers.cloudflare.com/r2/) for document and proof uploads  

---

##  Key Features

###  Role-Based Access Control
![image](https://github.com/user-attachments/assets/29e46cb1-a59f-4622-b364-8019b7793710)
- Support for Admins, Finance, and Department Users
- Role-based UI and permissions
- Dynamic user role assignment per department
- Firebase Authentication (Email/Password, Google signIn OAuth)


###  Sponsor Mou Management
![image](https://github.com/user-attachments/assets/cc38de84-8060-4699-b4b8-4a475db0846c)
![image](https://github.com/user-attachments/assets/c25dcf25-84b8-4bcb-a790-f1c9b512d42a)

- Add New Sponsor
- Upload and view Sponsor Mou pdf

###  Deliverables Management
![image](https://github.com/user-attachments/assets/39232053-670d-4812-b399-5af91c3914ab)
![image](https://github.com/user-attachments/assets/625d3a24-f30c-45ec-b0d6-4d6324aac56d)

- Track deliverables tied to sponsor MoUs
- Classify as **standard** or **cost-associated**
  ![image](https://github.com/user-attachments/assets/3969266f-26a5-4070-bc69-f986a5f12117)

- Assign deliverables to specific departments
- Upload additional information as image, pdf , video


###  Proof Approval System
![WhatsApp Image 2025-07-04 at 01 30 24_64f44b81](https://github.com/user-attachments/assets/5f00712c-25f2-4355-8ca3-8405568a29f9)
![WhatsApp Image 2025-07-04 at 01 30 24_9a659a1e](https://github.com/user-attachments/assets/e5f37ce5-ef49-48fe-bdd9-022a840c03ee)

- Upload proofs for each deliverable (image, video, PDF)
- Cloudflare R2-backed storage with preview and download
- Multi-level approval workflows

  
###  Financial Tracking
![image](https://github.com/user-attachments/assets/7c52f56c-0445-4044-827c-660065966e2d)

- Manage **cash** and **in-kind** values per MoU
- Track sponsor commitments and fulfillment
- Monitor department-specific financial impact
- Monitor Profit and Cost Breakdowns

###  Performance Monitoring
![image](https://github.com/user-attachments/assets/aafe43c3-6bc0-4371-a478-c4101319b8e8)

- **Finance Performance**: Track received vs expected contributions  
- **Department Performance**: Evaluate delivery rates and quality  
- Real-time dashboard and analytics  


---

##  Real-World Use Case
![image](https://github.com/user-attachments/assets/c55438b1-bed0-4e4b-ab18-3b996029406a)

> **Paradox 25** – A major college fest  
> Managed ₹19L cash + ₹60L in-kind value from 43 sponsors  
> Supported 12+ departments (e.g., Outreach, Hospitality, Finance, Multimedia, WebOps, Security, Student Relations)  
> Enabled over 40 users to collaborate on 100+ deliverables with transparent finance and deliverables tracking

---

## 🙌 Contributors

Built with the help of Sponsorship Team and Tech Leads at **Paradox 25**, with inputs from multiple departments and stakeholders.

---

## 🏁 Getting Started

1. Clone the repository  
2. Set up Firebase config in `.env.local`
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
   FIREBASE_PROJECT_ID
   FIREBASE_PRIVATE_KEY
   FIREBASE_CLIENT_EMAIL
   R2_ACCESS_KEY_ID
   R2_SECRET_ACCESS_KEY
   R2_BUCKET_NAME
   R2_ACCOUNT_ID
   R2_REGION
   R2_ENDPOINT
   ```
3. Configure Cloudflare R2 bucket and keys  
4. Run locally:

```bash
npm install
npm run dev
```
5. Run the initialisation script under scripts to create users

