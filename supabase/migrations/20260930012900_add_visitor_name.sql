-- Optional, visitor-confirmed name from the badge-scan feature (2026-09-30). Never populated
-- from a raw photo server-side: the client only ever sends the name the visitor confirmed
-- after on-device OCR review. Same schema-per-environment pattern as prior migrations.
do $$
declare
  target_schema text;
begin
  foreach target_schema in array array['booth', 'booth_test']
  loop
    execute format('alter table %I.sessions add column if not exists visitor_name text', target_schema);
  end loop;
end $$;

comment on column booth.sessions.visitor_name is 'Visitor-confirmed name from an optional badge scan (on-device OCR). Never the raw photo.';
