-- Advancio booth experience: TEST environment sessions.
-- Same structure as schema "booth", served by the advancio-booth-test app at /booth_test.
-- Never copy production rows here. Test data is disposable.
create schema if not exists booth_test;

create table booth_test.sessions (
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

comment on column booth_test.sessions.expires_at is 'Unused in production; the test schema may be cleared at any time.';
comment on column booth_test.sessions.archived_at is 'Reserved for a future archive mechanism.';
comment on column booth_test.sessions.user_id is 'Reserved for future opt-in sign-in linking.';

create index sessions_path_idx on booth_test.sessions (path);
create index sessions_updated_at_idx on booth_test.sessions (updated_at desc);

-- Server-only access: RLS on with no policies; only the service role (which bypasses RLS) may use it.
alter table booth_test.sessions enable row level security;

revoke all on schema booth_test from public, anon, authenticated;
revoke all on all tables in schema booth_test from public, anon, authenticated;
grant usage on schema booth_test to service_role;
grant all on all tables in schema booth_test to service_role;
alter default privileges in schema booth_test grant all on tables to service_role;
