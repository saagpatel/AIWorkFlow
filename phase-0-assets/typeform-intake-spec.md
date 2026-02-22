# Typeform Intake Form Specification

**Form Title:** AI Workflow Assessment
**Description:** Tell us about your team and workflows so we can prepare for our conversation.

---

## Section 1: Contact Information

| # | Question | Field Type | Required | Notes |
|---|----------|-----------|----------|-------|
| 1 | What's your full name? | Short Text | Yes | |
| 2 | What's your work email? | Email | Yes | Validate email format |
| 3 | What's your job title? | Short Text | Yes | |
| 4 | What company do you work for? | Short Text | Yes | |
| 5 | How large is your company? | Multiple Choice | Yes | Options: 1-10, 11-50, 51-200, 201-500, 500+ |

---

## Section 2: Company Context

| # | Question | Field Type | Required | Notes |
|---|----------|-----------|----------|-------|
| 6 | What industry are you in? | Dropdown | Yes | Options: SaaS/Technology, Financial Services, Healthcare, E-commerce/Retail, Professional Services, Manufacturing, Education, Other |
| 7 | What does your team primarily do? | Multiple Choice | Yes | Options: Operations, Customer Support, Engineering, Sales, HR/People Ops, Finance, Marketing, Other |
| 8 | How many people are on your immediate team? | Number | Yes | Min: 1, Max: 500 |

---

## Section 3: Current Pain Points

| # | Question | Field Type | Required | Notes |
|---|----------|-----------|----------|-------|
| 9 | What are your team's biggest time sinks? | Long Text | Yes | Placeholder: "Describe the repetitive tasks that eat up your team's week — ticket routing, status updates, report generation, data entry, etc." |
| 10 | Roughly how many hours per week does your team spend on these manual tasks? | Multiple Choice | Yes | Options: Less than 5 hours, 5-10 hours, 10-20 hours, 20-40 hours, 40+ hours |
| 11 | Have you tried automating any of these workflows before? | Multiple Choice | Yes | Options: No — haven't tried yet, Yes — with some success, Yes — but it didn't work well, Yes — we have some automations but need more |
| 12 | If yes, what did you try and what happened? | Long Text | No | Conditional: show only if Q11 is not "No" |

---

## Section 4: Tool Stack

| # | Question | Field Type | Required | Notes |
|---|----------|-----------|----------|-------|
| 13 | Which tools does your team use daily? | Multiple Choice (multi-select) | Yes | Options: Slack, Microsoft Teams, Jira, Asana, Linear, Notion, Confluence, Google Workspace, Microsoft 365, Salesforce, HubSpot, Zendesk, Intercom, GitHub/GitLab, Custom/Internal Tools, Other |
| 14 | Any other tools not listed above? | Short Text | No | |
| 15 | How comfortable is your team with adopting new tools or workflows? | Rating | Yes | 1-5 scale: 1 = Very resistant, 5 = Very open |

---

## Section 5: Budget & Timeline

| # | Question | Field Type | Required | Notes |
|---|----------|-----------|----------|-------|
| 16 | How urgently do you need to address these workflow problems? | Multiple Choice | Yes | Options: ASAP — it's costing us real money, Within 1-2 months, Within a quarter, Just exploring for now |
| 17 | Do you have budget allocated for workflow improvement? | Multiple Choice | Yes | Options: Yes — approved budget ready, Likely — need to get approval, Not yet — need to build a case, Just exploring costs |

---

## Section 6: Engagement Interest

| # | Question | Field Type | Required | Notes |
|---|----------|-----------|----------|-------|
| 18 | Which engagement sounds like the best fit? | Multiple Choice | Yes | Options below with descriptions |

**Options for Q18:**
- **AI Audit ($1,500)** — 2-hour deep-dive + 5-page report with prioritized automation recommendations
- **Implementation Sprint ($3,500-5,000)** — Audit + build 2-3 automations in 2 weeks
- **Monthly Retainer ($3,000-8,000/mo)** — Ongoing optimization and new automation builds
- **Not sure yet** — I'd like to discuss options

### Conditional Logic for Q18:

**If "AI Audit":**

| # | Question | Field Type | Required |
|---|----------|-----------|----------|
| 19a | What's the single workflow you'd most want us to look at during the audit? | Long Text | Yes |

**If "Implementation Sprint":**

| # | Question | Field Type | Required |
|---|----------|-----------|----------|
| 19b | Which 2-3 workflows would you want automated first? | Long Text | Yes |
| 20b | When would you ideally want to start the sprint? | Date | Yes |

**If "Monthly Retainer":**

| # | Question | Field Type | Required |
|---|----------|-----------|----------|
| 19c | What does ongoing automation support look like for your team? | Long Text | Yes |
| 20c | How many new automations do you anticipate needing per month? | Multiple Choice | Yes |

Options for 20c: 1-2, 3-5, 5+, Not sure

---

## Section 7: Closing

| # | Question | Field Type | Required |
|---|----------|-----------|----------|
| 21 | Anything else you'd like us to know before our call? | Long Text | No |

---

## Form Settings

- **Progress bar:** Proportional (shows % complete)
- **Thank you screen:** "Thanks! We'll review your responses before our call so we can hit the ground running. You'll hear from us within 1 business day."
- **Notifications:** Email notification to consultant on each submission
- **Redirect:** After completion, redirect to Calendly booking link
