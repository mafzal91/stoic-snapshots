-- Migration: Insert themes not yet in the database
-- Run this after migration-themes-colors.sql

INSERT INTO themes (name, likes, background, accent, "primary", secondary) VALUES
  ('coastal-breeze',   0, '#c3dbd9', '#bb6464', '#bb6464', '#cdb699'),
  ('fairy-forest',     0, '#235952', '#ecfbfc', '#ffc8bd', '#ffebd9'),
  ('silver-tide',      0, '#b2bfd5', '#c0d8d5', '#f5f3f3', '#dfdfdf'),
  ('golden-earth',     0, '#f7ad45', '#657c6a', '#bb3e00', '#657c6a'),
  ('pale-serenity',    0, '#986d8d', '#87a8a4', '#efe3d0', '#d9cab3'),
  ('retro-hour',       0, '#9cb4cc', '#d3cedf', '#f2d7d9', '#748da6'),
  ('teal-blossom',     0, '#d7f7f5', '#75cac3', '#2a6171', '#f34573'),
  ('meadow-glow',      0, '#f3f0d7', '#cee5d0', '#7a4a20', '#ffbf86'),
  ('midnight-orchid',  0, '#470938', '#1a3e59', '#f2d6eb', '#5c94bd'),
  ('citrus-violet',    0, '#ecffc9', '#64fed6', '#7871bf', '#82a6ee'),
  ('deep-sea',         0, '#2b4450', '#497285', '#dfebed', '#f78536'),
  ('steel-amber',      0, '#dddddd', '#3c8dad', '#125d98', '#f5a962'),
  ('cobalt-ember',     0, '#125d98', '#3c8dad', '#f5a962', '#dddddd'),
  ('ember-dune',       0, '#bb6464', '#c3dbd9', '#cdb699', '#c8f2ef'),
  ('ocean-glow',       0, '#56a7a7', '#a0dbdb', '#fcea90', '#f9fbfc'),
  ('desert-haze',      0, '#f5e9d8', '#3e2c23', '#e76f2e', '#2fa4d7'),
  ('apricot-bliss',    0, '#f09c67', '#f7e0a3', '#fffde8', '#4c8492')
ON CONFLICT (name) DO NOTHING;
