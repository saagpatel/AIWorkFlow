# Zapier Automation Specifications

---

## Automation A: Typeform → Notion CRM

**Purpose:** Automatically create a new lead in the Notion CRM database when someone submits the intake form.

### Trigger

- **App:** Typeform
- **Event:** New Entry
- **Form:** AI Workflow Assessment (intake form)

### Action

- **App:** Notion
- **Event:** Create Database Item
- **Database:** Client Pipeline

### Field Mapping

| Typeform Field | Notion Column | Notes |
|---------------|---------------|-------|
| Q1: Full name | Contact Name | Direct map |
| Q2: Work email | Contact Email | Direct map |
| Q3: Job title | Contact Title | Direct map |
| Q4: Company name | Company | Direct map (Title column) |
| Q5: Company size | Company Size | Direct map (Select) |
| Q6: Industry | Industry | Direct map (Select) |
| Q7: Team function | Notes | Prepend "Team: {value}" |
| Q9: Biggest time sinks | Pain Points | Direct map |
| Q10: Hours on manual tasks | Notes | Append "Manual hours/week: {value}" |
| Q13: Tools used daily | Tools Used | Map each selected tool to Multi-select |
| Q16: Urgency | Priority | Map: "ASAP" → High, "1-2 months" → Medium, "Within a quarter" → Low, "Exploring" → Low |
| Q18: Engagement interest | Engagement Type | Map: "AI Audit ($1,500)" → AI Audit ($1,500), "Implementation Sprint ($3,500-5,000)" → Implementation Sprint ($3,500-5,000), "Monthly Retainer ($3,000-8,000/mo)" → Monthly Retainer ($3,000-8,000/mo), "Not sure yet" → leave empty |
| (auto) | Stage | Set to "Lead" |
| (auto) | Source | Set to "Inbound (Typeform)" |
| (auto) | First Contact Date | Set to current date/time |
| (auto) | Next Follow-up | Set to current date/time (follow up same day) |
| Typeform response URL | Typeform Response | Direct map (URL) |

### Additional Steps

1. **Filter** (optional): Skip test/internal submissions — filter out entries where email contains your own domain
2. **Formatter** (optional): Combine Q7 (team function) + Q10 (hours) + Q21 (anything else) into a single Notes string

### Testing Checklist

- [ ] Submit a test form entry
- [ ] Verify Notion row created with correct Stage ("Lead") and Source ("Inbound (Typeform)")
- [ ] Verify all fields mapped correctly
- [ ] Verify Priority mapping works (ASAP → High)
- [ ] Verify Engagement Type maps correctly for each option
- [ ] Check that "Not sure yet" leaves Engagement Type empty

---

## Automation B: Calendly → Slack

**Purpose:** Post a notification to the #sales Slack channel when a new discovery call is booked.

### Trigger

- **App:** Calendly
- **Event:** Invitee Created
- **Event Type:** Discovery Call (or your specific Calendly event name)

### Action

- **App:** Slack
- **Event:** Send Channel Message
- **Channel:** #sales

### Message Template

```
:calendar: New Discovery Call Booked

*Name:* {invitee_name}
*Email:* {invitee_email}
*Company:* {answer_1}
*Scheduled:* {event_start_time} ({event_timezone})
*Event:* {event_name}

<{event_uri}|View in Calendly>
```

### Field Mapping

| Calendly Field | Slack Message Variable | Notes |
|---------------|----------------------|-------|
| Invitee Name | {invitee_name} | From invitee payload |
| Invitee Email | {invitee_email} | From invitee payload |
| Custom Question: "Company" | {answer_1} | Add "What company are you with?" as a Calendly custom question |
| Event Start Time | {event_start_time} | Format: "Mon, Feb 24 at 2:00 PM" |
| Invitee Timezone | {event_timezone} | e.g., "America/New_York" |
| Event Type Name | {event_name} | e.g., "Discovery Call" |
| Event URI | {event_uri} | Link to Calendly event details |

### Slack Message Settings

- **Channel:** #sales
- **Bot Name:** Calendly Bot (or your preferred name)
- **Bot Icon:** :calendar: emoji
- **Unfurl links:** Off

### Calendly Setup Required

Add these custom questions to your Discovery Call event type:
1. "What company are you with?" (Required, Short text)
2. "What's your biggest workflow pain point?" (Optional, Long text)

### Testing Checklist

- [ ] Book a test discovery call on Calendly
- [ ] Verify Slack message posts to #sales
- [ ] Verify all fields display correctly
- [ ] Verify the Calendly link works
- [ ] Check timezone displays correctly
- [ ] Confirm company name shows from custom question

---

## Zapier Setup Notes

- Both Zaps require Zapier Starter plan or higher (multi-step for Automation A)
- Connect Typeform, Notion, Calendly, and Slack accounts in Zapier before building
- Turn on Zaps only after successful test runs
- Set up error notifications in Zapier to email you if either Zap fails
