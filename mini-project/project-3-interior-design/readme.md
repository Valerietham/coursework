# Mini-Project 3 Submission by Valerie Tham

---

## About the Project

This is a project management database system designed for an interior design company. It supports essential operations such as project tracking, staff assignment, and quotation and invoice management.

## Database Tables

A total of 8 tables were created:

1. clients
2. staff
3. project
4. project_assignments (junction table)
5. quotations
6. invoices
7. quotation_items
8. catalog

## Database Relationship

**One-to-many:**
• Clients → Projects: One client can have many projects
• Projects → Quotations: One project can have many quotations
• Quotations → Quotation Items: One quotation is made up of many items
• Catalog → Quotation Items: One quotation item belongs to an item in the product catalog

**One-to-One:**
• Quotation ↔ Invoice: Each quotation has one invoice

**many-to-many**
• Staff → Projects: One staff can have many projects, and one project can have many staff. A junction table of **project_assignments** is created to handle the many-to-many relationship

## Testing Instructions

1. Clone or download the repository
2. Run the following commands
   npm install
   npx sequelize db:migrate
   npx sequelize db:seed:all
   npm start
3. Test the endpoints using Postman

## Endpoints to test

1. **GET Find all the projects that are completed**
   http://localhost:8000/api/projects?status=complete

2. **PUT Change invoice status to paid**
   http://localhost:8000/api/invoices/:invoice_id/status
   { "status": "Paid" }

3. **POST Staff Login**
   http://localhost:8000/api/auth/login
   { "email": "valerie@design.com", "password": "password123"}

4. **PUT Delete Supplier “DesignHaus”**
   http://localhost:8000/api/catalog/supplier/delete
   { "supplier": "DesignHaus" }
