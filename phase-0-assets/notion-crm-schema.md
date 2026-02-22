# Notion CRM Database Schema

## Database Name: Client Pipeline

---

## Columns

| Column | Type | Options / Config |
|--------|------|-----------------|
| Company | Title | Primary column |
| Contact Name | Text | |
| Contact Email | Email | |
| Contact Title | Text | |
| Stage | Select | Lead, Discovery Call, Proposal Sent, Negotiating, Won, Delivering, Completed, Lost |
| Engagement Type | Select | AI Audit ($1,500), Implementation Sprint ($3,500-5,000), Monthly Retainer ($3,000-8,000/mo) |
| Deal Value | Number | Format: US Dollar |
| Source | Select | LinkedIn, Referral, Inbound (Typeform), Cold Outreach, Event/Conference, Other |
| Company Size | Select | 1-10, 11-50, 51-200, 201-500, 500+ |
| Industry | Select | SaaS/Technology, Financial Services, Healthcare, E-commerce/Retail, Professional Services, Manufacturing, Education, Other |
| Tools Used | Multi-select | Slack, Teams, Jira, Asana, Linear, Notion, Salesforce, HubSpot, Zendesk, GitHub, Other |
| Pain Points | Text | Summary from intake form |
| First Contact Date | Date | |
| Last Contact Date | Date | |
| Next Follow-up | Date | |
| Discovery Call Date | Date | |
| Proposal Sent Date | Date | |
| Start Date | Date | |
| End Date | Date | |
| Calendly Link | URL | Link to scheduled meeting |
| Typeform Response | URL | Link to intake form submission |
| Proposal/SOW | URL | Link to Google Doc |
| Stripe Invoice | URL | Link to Stripe invoice |
| Notes | Text | Running notes, call summaries |
| Lost Reason | Select | Price, Timing, Chose Competitor, No Budget, Went In-house, Ghosted, Other |
| Priority | Select | High, Medium, Low |

---

## Views

### 1. Pipeline (Board View)

- **Group by:** Stage
- **Columns visible:** Company, Contact Name, Engagement Type, Deal Value, Next Follow-up
- **Sort:** Next Follow-up (ascending)
- **Filter:** Stage is not "Completed" and Stage is not "Lost"

### 2. All Leads (Table View)

- **Columns visible:** Company, Contact Name, Stage, Engagement Type, Deal Value, Source, First Contact Date, Last Contact Date
- **Sort:** Last Contact Date (descending)
- **Filter:** None (show all)

### 3. Active Engagements (Table View)

- **Columns visible:** Company, Contact Name, Engagement Type, Deal Value, Start Date, End Date, Stage
- **Sort:** Start Date (descending)
- **Filter:** Stage is "Won" or Stage is "Delivering"

### 4. Follow-ups Due (Table View)

- **Columns visible:** Company, Contact Name, Stage, Next Follow-up, Notes, Priority
- **Sort:** Next Follow-up (ascending)
- **Filter:** Next Follow-up is on or before today AND Stage is not "Won" AND Stage is not "Completed" AND Stage is not "Lost"

### 5. Revenue Tracker (Table View)

- **Columns visible:** Company, Engagement Type, Deal Value, Stage, Start Date, End Date
- **Sort:** Start Date (descending)
- **Filter:** Stage is "Won" or Stage is "Delivering" or Stage is "Completed"

---

## Stage Definitions

| Stage | Meaning | Action Required |
|-------|---------|----------------|
| Lead | New contact, no conversation yet | Send outreach or respond to inbound |
| Discovery Call | Call scheduled or completed | Prepare/send proposal |
| Proposal Sent | SOW delivered, awaiting response | Follow up within 3 days |
| Negotiating | Active discussion on scope/price | Respond within 24 hours |
| Won | Signed + paid deposit | Begin engagement |
| Delivering | Work in progress | Complete deliverables |
| Completed | All deliverables handed off | Request testimonial, check for retainer upsell |
| Lost | Did not convert | Log reason, add to nurture list |

---

## Setup Instructions

1. Create a new Notion database (full page)
2. Add each column with the specified type and options
3. Create each view using the filters and sorts above
4. Set the Pipeline board view as the default view
5. Bookmark the database in your Notion sidebar
