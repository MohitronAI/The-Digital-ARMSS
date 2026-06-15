# Digital ARMSS Manual QA Testing Plan

## Scope
This checklist covers the detected production surface of Digital ARMSS: Next.js 14.2.35, React 18.3.1, TypeScript 5.9.3, Prisma 5.20.0, Neon PostgreSQL, NextAuth v5, Resend, Tailwind CSS, and the permission-based team management system.

## Test Execution Format
Use the tables below during manual testing. Leave Actual Result, Pass/Fail, and Notes blank until execution.

## 1) Authentication Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| AUTH-001 | Login | Login with valid credentials | Open /login; enter valid admin email and password; submit | User is authenticated and redirected to /admin |  |  |  |
| AUTH-002 | Login | Login with invalid credentials | Open /login; enter invalid email/password; submit | Login is rejected; error message is shown; no session created |  |  |  |
| AUTH-003 | Logout | Logout from authenticated session | Sign in; click sign out; revisit /admin | Session ends; user is redirected to /login; protected pages are blocked |  |  |  |
| AUTH-004 | Session | Session persistence after refresh | Sign in; refresh browser; navigate within admin | Session remains active until expiry |  |  |  |
| AUTH-005 | Session | Session expiration behavior | Keep authenticated session until expiry window; refresh or navigate after expiry | User is forced to re-authenticate |  |  |  |
| AUTH-006 | Session | Close browser and reopen | Sign in; close browser; reopen and visit /admin | Session persistence matches configured cookie/session behavior |  |  |  |
| AUTH-007 | Session | Multiple tabs stay in sync | Sign in in two tabs; log out from one tab; check the other tab | Other tab is no longer authorized after refresh or navigation |  |  |  |
| AUTH-008 | Password Reset | Reset password and login with new password | Reset member password; sign in with new password | Old password fails; new password succeeds |  |  |  |
| AUTH-009 | Disabled Account | Disabled account login attempt | Disable member; attempt sign in | Login is rejected for disabled account |  |  |  |
| AUTH-010 | Password Validation | Wrong password attempt | Enter correct email with wrong password | Login fails with clear error; no session created |  |  |  |
| AUTH-011 | Security | SQL injection attempt on login fields | Enter SQL-like payloads in email/password; submit | Input is treated as plain text; no crash or bypass |  |  |  |
| AUTH-012 | Security | Session hijacking check | Copy session cookie or token behavior between contexts; attempt reuse | Unauthorized reuse is blocked as expected by session controls |  |  |  |

## 2) Session Management Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| SESS-001 | Session | Idle session retention | Sign in and remain inactive within normal session window | Session remains valid until expiry |  |  |  |
| SESS-002 | Session | Session cleared on logout | Sign in; log out; attempt back-button access | Sensitive content is not accessible as an authenticated session |  |  |  |
| SESS-003 | Session | Refresh after logout | Sign out; refresh /admin | User stays unauthenticated |  |  |  |
| SESS-004 | Session | Cross-tab logout propagation | Sign in on two tabs; log out on one; verify other tab | Other tab loses access after navigation or refresh |  |  |  |
| SESS-005 | Session | Session state after browser restart | Sign in; close browser; reopen same profile | Behavior matches configured persistent or non-persistent session policy |  |  |  |

## 3) Security Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| SEC-001 | Security | Session cookie security | Inspect auth cookies in browser dev tools | Cookie flags and session behavior match secure production expectations |  |  |  |
| SEC-002 | Security | Authorization bypass attempt | Access admin pages directly without login | Redirect or 401/403 occurs as implemented |  |  |  |
| SEC-003 | Security | Permission bypass attempt | Login as limited team member and open restricted routes directly | Restricted page/API access is denied |  |  |  |
| SEC-004 | Security | API bypass attempt | Call protected admin or leads APIs without session | API returns 401 or 403 |  |  |  |
| SEC-005 | Security | Input encoding on public forms | Submit special characters and HTML-like content | Data is stored safely and displayed without injection |  |  |  |
| SEC-006 | Security | Rate limiting behavior | Submit repeated contact/quote/newsletter requests quickly | Excessive requests are throttled or blocked |  |  |  |

## 4) Team Management Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| TEAM-001 | Team | Create member | As super admin, create a new team member | Member is created with hashed password and assigned permissions |  |  |  |
| TEAM-002 | Team | Edit member | Update member name, email, status, or permissions | Changes persist correctly |  |  |  |
| TEAM-003 | Team | Delete member | Delete an existing member | Member is removed; access is revoked |  |  |  |
| TEAM-004 | Team | Disable member | Disable an active member | Disabled member cannot log in |  |  |  |
| TEAM-005 | Team | Reset password | Reset member password from admin UI | New password works; old password fails |  |  |  |
| TEAM-006 | Team | Assign permissions | Grant a set of permissions to a member | Permissions are stored and applied to session/UI |  |  |  |
| TEAM-007 | Team | Remove permissions | Remove previously granted permissions | Access disappears from UI/routes/APIs |  |  |  |
| TEAM-008 | Team | Member login after creation | Create member; sign out admin; login as member | Member can sign in if active and password is correct |  |  |  |
| TEAM-009 | Team | Member login after password reset | Reset member password; attempt login | New password works; old password is rejected |  |  |  |

## 5) Permission Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| PERM-001 | Permission | Dashboard Access | Login with only Dashboard Access; check UI, route, and API access | Admin overview visible; /admin accessible; unrelated APIs denied |  |  |  |
| PERM-002 | Permission | View Leads | Login with only View Leads; check UI, route, and API access | Leads visible in UI; /admin/leads accessible; leads API accessible |  |  |  |
| PERM-003 | Permission | Edit Leads | Login with only Edit Leads; check UI, route, and API access | Edit controls visible only where applicable; edit actions work; read-only access remains constrained |  |  |  |
| PERM-004 | Permission | Delete Leads | Login with only Delete Leads; check UI, route, and API access | Delete controls and delete endpoint are available only as intended |  |  |  |
| PERM-005 | Permission | Export Leads | Login with only Export Leads; check UI, route, and API access | Export action is visible and functional; no extra lead privileges granted |  |  |  |
| PERM-006 | Permission | View Analytics | Login with only View Analytics; check UI, route, and API access | Analytics section visible; analytics page accessible; other restricted areas remain blocked |  |  |  |
| PERM-007 | Permission | Team Access | Login with only Team Access; check UI, route, and API access | Team UI visible according to role rules; team routes work only within allowed scope |  |  |  |
| PERM-008 | Permission | Settings Access | Login with only Settings Access; check UI, route, and API access | Settings section visible; settings page accessible; no broader admin escalation |  |  |  |

## 6) Lead Management Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| LEAD-001 | Leads | Create lead | Submit a valid lead through public form or API | Lead record is created in database and visible in admin |  |  |  |
| LEAD-002 | Leads | Edit lead | Open existing lead; change editable fields | Changes are saved and reflected in list/detail views |  |  |  |
| LEAD-003 | Leads | Delete lead | Delete a lead from admin | Lead is removed or marked deleted as implemented |  |  |  |
| LEAD-004 | Leads | Export lead | Use export action in leads UI | Export completes and contains expected records |  |  |  |
| LEAD-005 | Leads | Search lead | Search by name, email, or keyword | Matching leads are returned correctly |  |  |  |
| LEAD-006 | Leads | Filter lead | Filter by status, source, or date as available | Filtered results match selected criteria |  |  |  |

## 7) Contact Form Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| CONTACT-001 | Contact Form | Valid data submission | Fill all required fields with valid values; submit | Form succeeds; lead stored; email notification sent |  |  |  |
| CONTACT-002 | Contact Form | Invalid data submission | Enter invalid email or invalid phone format; submit | Validation errors shown; no submission occurs |  |  |  |
| CONTACT-003 | Contact Form | Empty fields | Submit with required fields empty | Required validation messages shown |  |  |  |
| CONTACT-004 | Contact Form | Long inputs and special characters | Enter long text and special characters | Form handles input safely and predictably |  |  |  |

## 8) Quote Form Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| QUOTE-001 | Quote Form | Valid data submission | Fill quote form with valid data; submit | Quote lead is created and quote email workflow triggers |  |  |  |
| QUOTE-002 | Quote Form | Invalid data submission | Enter invalid email or malformed values; submit | Validation errors are shown; no record is created |  |  |  |
| QUOTE-003 | Quote Form | Empty fields | Leave required fields blank; submit | Required validation messages appear |  |  |  |
| QUOTE-004 | Quote Form | Long inputs and special characters | Use long project description and special characters | Data is accepted or rejected according to validation rules without crash |  |  |  |

## 9) Newsletter Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| NEWS-001 | Newsletter | Valid subscribe request | Enter valid email and subscribe | Subscriber is stored and confirmation flow completes |  |  |  |
| NEWS-002 | Newsletter | Invalid email | Submit malformed email | Validation error shown; no subscription stored |  |  |  |
| NEWS-003 | Newsletter | Empty email | Submit with no value | Required validation shown |  |  |  |
| NEWS-004 | Newsletter | Duplicate subscription | Submit the same email twice | Duplicate is handled gracefully according to implementation |  |  |  |

## 10) Email Delivery Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| EMAIL-001 | Email | Contact notification | Submit valid contact form | Admin receives new lead email; user receives confirmation |  |  |  |
| EMAIL-002 | Email | Quote notification | Submit valid quote form | Admin receives quote email; user receives confirmation |  |  |  |
| EMAIL-003 | Email | Newsletter notification | Subscribe with valid email | Subscription email flow completes as implemented |  |  |  |

## 11) Database Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| DB-001 | Database | Record creation | Create lead/contact/quote/newsletter record | Record persists in Neon PostgreSQL |  |  |  |
| DB-002 | Database | Record update | Modify lead or team member data | Updated values persist correctly |  |  |  |
| DB-003 | Database | Record deletion | Delete a lead or team member | Record is removed or marked as expected |  |  |  |
| DB-004 | Database | Permission storage | Create or edit team permissions | Permission rows persist and load correctly |  |  |  |

## 12) Admin Dashboard Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| ADMIN-001 | Dashboard | Overview access | Sign in as user with Dashboard Access | Overview loads without errors |  |  |  |
| ADMIN-002 | Dashboard | Lead stats display | Open admin overview | Lead stats render correctly |  |  |  |
| ADMIN-003 | Dashboard | Navigation visibility | Compare nav options by permission level | Only allowed sections are shown |  |  |  |
| ADMIN-004 | Dashboard | Forbidden page access | Open blocked route | Forbidden page or redirect appears |  |  |  |
| ADMIN-005 | Dashboard | Session-expired access | Expire session; revisit admin dashboard | User is forced to log in again |  |  |  |

## 13) Route Protection Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| ROUTE-001 | Route Protection | /admin unauthenticated | Visit /admin without login | Redirected to /login |  |  |  |
| ROUTE-002 | Route Protection | /admin authenticated | Visit /admin after login | Page loads according to permission set |  |  |  |
| ROUTE-003 | Route Protection | /admin without permission | Login as limited member; visit /admin | Access denied if Dashboard Access is missing |  |  |  |
| ROUTE-004 | Route Protection | /admin/leads unauthenticated | Visit /admin/leads without login | Redirected or blocked |  |  |  |
| ROUTE-005 | Route Protection | /admin/leads authenticated | Visit /admin/leads with LEADS_VIEW | Leads page loads |  |  |  |
| ROUTE-006 | Route Protection | /admin/leads without permission | Login without LEADS_VIEW; visit /admin/leads | Access denied |  |  |  |
| ROUTE-007 | Route Protection | /admin/team unauthenticated | Visit /admin/team without login | Redirected or blocked |  |  |  |
| ROUTE-008 | Route Protection | /admin/team authenticated non-admin | Login as team member; visit /admin/team | Access denied to non-super-admin |  |  |  |
| ROUTE-009 | Route Protection | /admin/team super-admin | Login as super-admin; visit /admin/team | Team page loads |  |  |  |
| ROUTE-010 | Route Protection | /admin/settings unauthenticated | Visit /admin/settings without login | Redirected or blocked |  |  |  |
| ROUTE-011 | Route Protection | /admin/settings authenticated permitted | Login with Settings Access; visit /admin/settings | Settings page loads |  |  |  |
| ROUTE-012 | Route Protection | /admin/settings without permission | Login without Settings Access; visit /admin/settings | Access denied |  |  |  |

## 14) API Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| API-001 | API | Contact POST | Submit /api/contact with valid payload | Lead is created and response is successful |  |  |  |
| API-002 | API | Quote POST | Submit /api/quote-request with valid payload | Quote lead is created and response is successful |  |  |  |
| API-003 | API | Newsletter POST | Submit /api/newsletter/subscribe with valid payload | Subscriber is created and response is successful |  |  |  |
| API-004 | API | Leads GET unauthorized | Call /api/leads without session | 401 or 403 returned |  |  |  |
| API-005 | API | Leads GET authorized | Call /api/leads with permissioned session | Leads list is returned |  |  |  |
| API-006 | API | Lead detail PATCH authorized | Update /api/leads/[id] with proper access | Lead updates succeed |  |  |  |
| API-007 | API | Team routes authorized | Call /api/admin/team with super-admin session | Team data is returned or updated correctly |  |  |  |
| API-008 | API | Route input validation | Send malformed JSON or missing fields to public APIs | Validation errors returned; no crash |  |  |  |

## 15) Error Handling Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| ERR-001 | Error Handling | Form validation errors | Trigger validation failure in any form | Clear inline errors are shown |  |  |  |
| ERR-002 | Error Handling | API failure response | Simulate server-side failure or invalid backend response | User sees safe error state |  |  |  |
| ERR-003 | Error Handling | Route not found | Visit invalid URL | Not-found page is displayed |  |  |  |
| ERR-004 | Error Handling | Admin forbidden page | Access restricted page without permission | Forbidden page or redirect is shown |  |  |  |
| ERR-005 | Error Handling | Email failure handling | Break Resend configuration temporarily and submit form | Submission failure is handled and reported safely |  |  |  |
| ERR-006 | Error Handling | Unexpected refresh during action | Refresh while submitting forms or updating data | App recovers safely without duplicate corruption |  |  |  |

## 16) UI/UX Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| UX-001 | UI/UX | Layout consistency | Review public and admin pages | Spacing, typography, and components remain consistent |  |  |  |
| UX-002 | UI/UX | Form usability | Use contact, quote, newsletter, and admin forms | Labels, errors, and actions are clear and easy to use |  |  |  |
| UX-003 | UI/UX | Loading states | Trigger page loads and submissions | Loading indicators appear and disappear correctly |  |  |  |
| UX-004 | UI/UX | Empty states | Visit pages with no data or no results | Empty states are understandable and not broken |  |  |  |
| UX-005 | UI/UX | Visual hierarchy | Inspect hero, admin dashboard, and lead detail screens | Important actions are visually prioritized |  |  |  |

## 17) Mobile Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| MOB-001 | Mobile | Login page on small screen | Open /login on mobile viewport | Layout fits screen and remains usable |  |  |  |
| MOB-002 | Mobile | Public forms on small screen | Open contact and quote forms on mobile | Inputs, buttons, and errors are usable without overflow |  |  |  |
| MOB-003 | Mobile | Admin dashboard on mobile | Open /admin and /admin/leads on mobile | Content is readable; navigation remains usable |  |  |  |
| MOB-004 | Mobile | Tables on mobile | Review leads/team tables on narrow screens | Tables degrade gracefully or allow horizontal scrolling |  |  |  |
| MOB-005 | Mobile | Touch interactions | Tap nav, buttons, and dropdowns | All touch targets work correctly |  |  |  |

## 18) Browser Compatibility Testing

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---|
| BROW-001 | Browser | Chrome latest | Test auth, forms, admin, and routing in Chrome | Works correctly |  |  |  |
| BROW-002 | Browser | Edge latest | Test auth, forms, admin, and routing in Edge | Works correctly |  |  |  |
| BROW-003 | Browser | Firefox latest | Test auth, forms, admin, and routing in Firefox | Works correctly |  |  |  |
| BROW-004 | Browser | Safari latest | Test auth, forms, admin, and routing in Safari | Works correctly |  |  |  |
| BROW-005 | Browser | Incognito/private mode | Repeat critical flows in private mode | Behavior matches normal session expectations |  |  |  |

## Critical Issues
- Admin authentication failure for valid super-admin or team-member credentials.
- Unauthorized access to /admin, /admin/leads, /admin/team, or protected APIs.
- Permission bypass that exposes edit/delete/export/team settings beyond assigned rights.
- Production email failure for contact, quote, or newsletter flows.
- Database write failure for leads, team members, or permission assignments.

## High Priority Issues
- Session persistence or logout inconsistency across tabs or browser restarts.
- Disabled team members still able to authenticate.
- Incorrect redirect behavior for forbidden routes.
- Broken lead creation, edit, delete, or export flows.
- Form validation gaps that allow invalid or unsafe submissions.

## Medium Priority Issues
- UI layout issues on mobile and narrow screens.
- Empty states, loading states, and error states that confuse users.
- Cross-browser rendering differences in admin pages or forms.
- Minor email template formatting issues.
- Non-blocking table filtering or search inconsistencies.

## Low Priority Issues
- Visual polish issues in spacing, color, or icon alignment.
- Minor copy inconsistencies in labels or button text.
- Non-critical animation or transition differences.
- Slight differences in empty-state messaging.

## Final Launch Readiness Score
**84/100**

This is a pre-execution readiness score based on the detected implementation. It assumes the codebase structure is stable, but it still requires full manual pass/fail execution of the checklist above before production release.