# Team Management Implementation Guide

## What changed

- Admin users remain the super-admin identity source.
- Team members are stored separately with password hashing and explicit permissions.
- Permission checks are enforced in middleware, route handlers, and server-rendered pages.

## Database

- Run `npx prisma migrate dev --name add-team-management`.
- Seed permissions with `node scripts/seed-permissions.ts`.

## Auth

- Super Admin login still uses the `AdminUser` table.
- Team member logins use the new `TeamMember` table.
- Sessions carry `role`, `type`, and `permissions`.

## Access control

- Super Admin bypasses permission checks.
- Team members only see actions and routes allowed by their assigned permissions.

## Notes

- The implementation intentionally keeps lead CRUD logic server-side.
- Analytics and settings are stubbed as permission-gated placeholders for now.