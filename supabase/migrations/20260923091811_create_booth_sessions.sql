-- Advancio booth experience: anonymous journey sessions.
-- Lives in its own schema so other marketing projects sharing this database stay isolated.
create schema if not exists booth;

create table booth.sessions (
  id            text primary key check (id ~ '^[a-zA-Z0-9_-]{8,80}$'),
  path          text,
  current_view  text not null default 'home',
  step          integer,
  slide         integer,
  answers       jsonb not null default '[]'::jsonb,
  viewed_slides jsonb not null default '[]'::jsonb,
  summary       jsonb,
  payload       jsonb not null,
  source        text not null default 'itc-booth',
  user_id       uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  expires_at    timestamptz,
  archived_at   timestamptz
);

comment on column booth.sessions.expires_at is 'Unused. Sessions are retained indefinitely by owner decision.';
comment on column booth.sessions.archived_at is 'Reserved for a future archive mechanism; nothing deletes rows.';
comment on column booth.sessions.user_id is 'Reserved for future opt-in sign-in linking.';

create index sessions_path_idx on booth.sessions (path);
create index sessions_updated_at_idx on booth.sessions (updated_at desc);

-- Server-only access: RLS on with no policies; only the service role (which bypasses RLS) may use it.
alter table booth.sessions enable row level security;

revoke all on schema booth from public, anon, authenticated;
revoke all on all tables in schema booth from public, anon, authenticated;
grant usage on schema booth to service_role;
grant all on all tables in schema booth to service_role;
alter default privileges in schema booth grant all on tables to service_role;
