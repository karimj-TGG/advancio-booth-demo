-- Badge scan now also extracts title/company (2026-09-30), and the "Email my journey" form
-- collects name/title/company alongside email so a visitor who skipped the badge scan can
-- still supply them. Same schema-per-environment pattern as prior migrations.
do $$
declare
  target_schema text;
begin
  foreach target_schema in array array['booth', 'booth_test']
  loop
    execute format('alter table %I.sessions add column if not exists visitor_title text', target_schema);
    execute format('alter table %I.sessions add column if not exists visitor_company text', target_schema);
    execute format('alter table %I.follow_up_requests add column if not exists name text', target_schema);
    execute format('alter table %I.follow_up_requests add column if not exists title text', target_schema);
    execute format('alter table %I.follow_up_requests add column if not exists company text', target_schema);
  end loop;
end $$;

comment on column booth.sessions.visitor_title is 'Visitor-confirmed job title from an optional badge scan.';
comment on column booth.sessions.visitor_company is 'Visitor-confirmed company from an optional badge scan.';
comment on column booth.follow_up_requests.name is 'Full name provided (or confirmed) on the email-my-journey form.';
comment on column booth.follow_up_requests.title is 'Job title provided (or confirmed) on the email-my-journey form.';
comment on column booth.follow_up_requests.company is 'Company provided (or confirmed) on the email-my-journey form.';
