-- Optional, consent-based email delivery of a visitor's summary (FR-10 in docs/PROJECT_HANDOFF.md).
-- Created in both booth (production) and booth_test so the two environments stay in parity.
do $$
declare
  target_schema text;
begin
  foreach target_schema in array array['booth', 'booth_test']
  loop
    execute format($ddl$
      create table %1$I.follow_up_requests (
        id                   uuid primary key default gen_random_uuid(),
        session_id           text not null references %1$I.sessions (id) on delete cascade,
        email                text not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
        consent_text_version text not null,
        consented_at         timestamptz not null default now(),
        delivery_status       text not null default 'pending' check (delivery_status in ('pending','sent','failed')),
        resend_message_id    text,
        error                text,
        created_at           timestamptz not null default now()
      )
    $ddl$, target_schema);

    execute format('create index follow_up_requests_session_idx on %I.follow_up_requests (session_id)', target_schema);
    execute format('alter table %I.follow_up_requests enable row level security', target_schema);
    execute format('revoke all on %I.follow_up_requests from public, anon, authenticated', target_schema);
    execute format('grant all on %I.follow_up_requests to service_role', target_schema);
  end loop;
end $$;

comment on column booth.follow_up_requests.email is 'Visitor-supplied, opt-in. Used only to deliver the requested summary email.';
comment on column booth.follow_up_requests.consent_text_version is 'Identifies which consent copy was shown, e.g. summary-email-v1.';
