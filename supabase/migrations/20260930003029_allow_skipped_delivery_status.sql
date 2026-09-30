-- The test app (schema booth_test) never sends real email outside an allowlist; those
-- attempts are logged as "skipped" rather than "failed" (see docs/MARKETING_PLATFORM.md,
-- Test environment: "log-and-drop everything else").
do $$
declare
  target_schema text;
begin
  foreach target_schema in array array['booth', 'booth_test']
  loop
    execute format(
      'alter table %1$I.follow_up_requests drop constraint follow_up_requests_delivery_status_check',
      target_schema
    );
    execute format(
      $sql$alter table %1$I.follow_up_requests add constraint follow_up_requests_delivery_status_check check (delivery_status in ('pending','sent','failed','skipped'))$sql$,
      target_schema
    );
  end loop;
end $$;
