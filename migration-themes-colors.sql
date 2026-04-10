-- Migration: Add color columns to themes table
-- Run this in the Supabase Dashboard SQL Editor

-- Step 1: Add columns as nullable first
ALTER TABLE themes
  ADD COLUMN IF NOT EXISTS background VARCHAR(7),
  ADD COLUMN IF NOT EXISTS accent VARCHAR(7),
  ADD COLUMN IF NOT EXISTS "primary" VARCHAR(7),
  ADD COLUMN IF NOT EXISTS secondary VARCHAR(7);

-- Step 2: Populate existing rows with color data
UPDATE themes SET background='#151c25', accent='#bead9a', "primary"='#f6f5eb', secondary='#807872' WHERE name='dark';
UPDATE themes SET background='#f6f5eb', accent='#bead9a', "primary"='#151c25', secondary='#807872' WHERE name='light';
UPDATE themes SET background='#f3f4ed', accent='#536162', "primary"='#424642', secondary='#c06014' WHERE name='rustic-sunrise';
UPDATE themes SET background='#1f201d', accent='#a4b0b1', "primary"='#ff9025', secondary='#71776e' WHERE name='rustic-sunset';
UPDATE themes SET background='#f6f6f6', accent='#ffe2e2', "primary"='#cc7373', secondary='#aaaaaa' WHERE name='soft-whisper';
UPDATE themes SET background='#1e1e1e', accent='#552525', "primary"='#a93c3c', secondary='#888888' WHERE name='shadowed-embrace';
UPDATE themes SET background='#8294c4', accent='#ffead2', "primary"='#ffead2', secondary='#dbdfea' WHERE name='celestial-delight';
UPDATE themes SET background='#2b3749', accent='#4e5478', "primary"='#c1b890', secondary='#6e728f' WHERE name='dusk-serenade';
UPDATE themes SET background='#00005c', accent='#c060a1', "primary"='#f0caa3', secondary='#c060a1' WHERE name='deep-plum';
UPDATE themes SET background='#050529', accent='#8d366f', "primary"='#d1a77d', secondary='#8d366f' WHERE name='nightfall-noir';
UPDATE themes SET background='#fff3e2', accent='#fa9884', "primary"='#e74646', secondary='#fa9884' WHERE name='peaches-and-cream';
UPDATE themes SET background='#eff5f5', accent='#497174', "primary"='#eb6440', secondary='#497174' WHERE name='terra-cotta-dreams';
UPDATE themes SET background='#c3dbd9', accent='#bb6464', "primary"='#bb6464', secondary='#cdb699' WHERE name='coastal-breeze';
UPDATE themes SET background='#235952', accent='#ecfbfc', "primary"='#ffc8bd', secondary='#ffebd9' WHERE name='fairy-forest';
UPDATE themes SET background='#b2bfd5', accent='#c0d8d5', "primary"='#f5f3f3', secondary='#dfdfdf' WHERE name='silver-tide';
UPDATE themes SET background='#f7ad45', accent='#657c6a', "primary"='#bb3e00', secondary='#657c6a' WHERE name='golden-earth';
UPDATE themes SET background='#986d8d', accent='#87a8a4', "primary"='#efe3d0', secondary='#d9cab3' WHERE name='pale-serenity';
UPDATE themes SET background='#9cb4cc', accent='#d3cedf', "primary"='#f2d7d9', secondary='#748da6' WHERE name='retro-hour';
UPDATE themes SET background='#d7f7f5', accent='#75cac3', "primary"='#2a6171', secondary='#f34573' WHERE name='teal-blossom';
UPDATE themes SET background='#f3f0d7', accent='#cee5d0', "primary"='#7a4a20', secondary='#ffbf86' WHERE name='meadow-glow';
UPDATE themes SET background='#470938', accent='#1a3e59', "primary"='#f2d6eb', secondary='#5c94bd' WHERE name='midnight-orchid';
UPDATE themes SET background='#ecffc9', accent='#64fed6', "primary"='#7871bf', secondary='#82a6ee' WHERE name='citrus-violet';
UPDATE themes SET background='#2b4450', accent='#497285', "primary"='#dfebed', secondary='#f78536' WHERE name='deep-sea';
UPDATE themes SET background='#dddddd', accent='#3c8dad', "primary"='#125d98', secondary='#f5a962' WHERE name='steel-amber';
UPDATE themes SET background='#125d98', accent='#3c8dad', "primary"='#f5a962', secondary='#dddddd' WHERE name='cobalt-ember';
UPDATE themes SET background='#bb6464', accent='#c3dbd9', "primary"='#cdb699', secondary='#c8f2ef' WHERE name='ember-dune';
UPDATE themes SET background='#56a7a7', accent='#a0dbdb', "primary"='#fcea90', secondary='#f9fbfc' WHERE name='ocean-glow';
UPDATE themes SET background='#f5e9d8', accent='#3e2c23', "primary"='#e76f2e', secondary='#2fa4d7' WHERE name='desert-haze';
UPDATE themes SET background='#f09c67', accent='#f7e0a3', "primary"='#fffde8', secondary='#4c8492' WHERE name='apricot-bliss';

-- Step 3: Verify all rows are populated before setting NOT NULL
-- (Run this SELECT first to confirm 0 rows have NULL colors)
-- SELECT name FROM themes WHERE background IS NULL OR accent IS NULL OR "primary" IS NULL OR secondary IS NULL;

-- Step 4: Set NOT NULL constraints
ALTER TABLE themes
  ALTER COLUMN background SET NOT NULL,
  ALTER COLUMN accent SET NOT NULL,
  ALTER COLUMN "primary" SET NOT NULL,
  ALTER COLUMN secondary SET NOT NULL;
