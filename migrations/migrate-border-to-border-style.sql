-- Data migration: border (boolean) -> border_style (enum)
-- Maps existing download_settings rows from setting='border' (value 'true'/'false')
-- to setting='border_style' (value 'corners'/'none').
-- Safe to re-run: only updates rows still keyed as 'border'.

UPDATE download_settings AS d
SET setting = 'border_style',
    value = CASE WHEN d.value = 'true' THEN 'corners' ELSE 'none' END
WHERE d.setting = 'border'
  AND NOT EXISTS (
    SELECT 1 FROM download_settings AS e
    WHERE e.event_id = d.event_id AND e.setting = 'border_style'
  );

-- Drop any remaining legacy 'border' rows that couldn't migrate
-- because a 'border_style' row already existed for the same event_id.
DELETE FROM download_settings WHERE setting = 'border';
