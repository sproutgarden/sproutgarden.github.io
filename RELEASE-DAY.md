# Release day: Sprout 1.1 on the website

Do this only once Sprout 1.1 is live on the App Store. Until then `site-1.1-launch` stays unmerged and `main` keeps describing 1.0.

**Rule for this repo: never use `rm`, `rm -rf`, `rmdir` or `unlink`. To retire a file use `git mv <file> _retired/`.**

What the 1.1 branch changes on top of `main`: painted plants everywhere, the ten-plant seed shop, eight painted scenes, a "What's new in 1.1" section, the Open Graph image, the Smart App Banner tag, and the notes below. Everything that is only true from 1.1 on is marked with ONE css class, `v11-tag`, and written in future tense. Steps 3 and 4 undo exactly that.

## 1. Merge

```bash
cd ~/"Documents/SwiftUI Projects/sprout-site"
git fetch origin
git checkout main
git pull --ff-only origin main
git merge --no-ff origin/site-1.1-launch -m "Website: Sprout 1.1 release"
```

Resolve conflicts by keeping main's badge/footer markup and the `style.css?v=` links (step 6 bumps the number anyway).

## 2. Check the merge before editing

```bash
grep -c 'class="v11-tag"' index.html      # expect 6
grep -c 'v11-tag' style.css                # expect 4 lines (comment + 3 rules)
cmp notes.json <(git show origin/main:notes.json) && echo "notes.json still equals the old main (good, step 5 edits it)"
```

## 3. Remove the pills (elements and CSS)

```bash
python3 - <<'PY'
import re
s=open('index.html',encoding='utf-8').read()
s,n=re.subn(r' ?<span class="v11-tag">arriving in update 1\.1</span>','',s)
print("pills removed:",n)           # expect 6
open('index.html','w',encoding='utf-8').write(s)
c=open('style.css',encoding='utf-8').read()
i=c.index('/* ===== 1.1 pre-release pill')
j=c.index('.pro li .v11-tag,.pro-in li .v11-tag{margin-left:6px;font-size:11px}\n')+len('.pro li .v11-tag,.pro-in li .v11-tag{margin-left:6px;font-size:11px}\n')
c=c[:i]+c[j:]
assert 'v11-tag' not in c
open('style.css','w',encoding='utf-8').write(c)
PY
grep -rn "v11-tag" index.html style.css || echo "no v11-tag left"
```

## 4. Future tense back to present

These are every line that was softened, in `index.html`. The first column is what the page says now, the second is what it must say after release.

| Where | Now (future) | After release (present) |
|---|---|---|
| Scenes paragraph (1) | `Your shelf will stand in a painted scene, and the scenes will be alive:` | `Your shelf stands in a painted scene, and the scenes are alive:` |
| Scenes paragraph (2) | `The Cottage garden will be yours from the start. The rest will be bought with Sunlight in the Shop's Scenes tab; three of them will be in the Pro collection.` | `The Cottage garden is yours from the start. The rest are bought with Sunlight in the Shop's Scenes tab; three of them are in the Pro collection.` |
| Shop paragraph | `The Shop will have two tabs, Seeds and Scenes, and everything in it will be bought with Sunlight you earned. Tap a packet to watch it grow.` | `The Shop has two tabs, Seeds and Scenes, and everything in it is bought with Sunlight you earned. Tap a packet to watch it grow.` |
| Sunlight card | `Spend it on seeds and, with 1.1, scenes.` | `Spend it on seeds and scenes.` |
| Pro paragraph | `and for the Pro collection: four rare seeds today, and three scenes in 1.1.` | `and for the Pro collection: four rare seeds and three scenes.` |
| Pro list item | `and the Moonbloom, and, in 1.1, the Lake dock, Rainy terrace and Fuji veranda scenes</li>` | `and the Moonbloom, and the Lake dock, Rainy terrace and Fuji veranda scenes</li>` |
| Gold pot paragraph | `with a running total, and from 1.1 in whichever scene you choose.` | `with a running total, in whichever scene you have chosen.` |
| What's new bullet 1 | `The window and its views will become scenes:` | `The window and its views have become scenes:` |
| What's new bullet 2 | `All ten plants and their pots will be painted, stage by stage, on Today, on the Shelf and in the Shop.` | `All ten plants and their pots are painted now, stage by stage, on Today, on the Shelf and in the Shop.` |
| What's new bullet 3 | `Rain and drifting clouds, falling leaves, fireflies, a butterfly now and then and a hot air balloon will bring the scenes to life, and the plants will sway in the breeze.` | `Rain and drifting clouds, falling leaves, fireflies, a butterfly now and then, a hot air balloon, and plants that sway in the breeze.` |
| What's new bullet 4 | `Your first minutes in Sprout will open on a painted window, from a dark room to a golden evening.` | `Your first minutes in Sprout open on a painted window, from a dark room to a golden evening.` |

Do it with this script (it stops if any line is not found exactly once):

```bash
python3 - <<'PY'
pairs=[
 [
  "Your shelf will stand in a painted scene, and the scenes will be alive:",
  "Your shelf stands in a painted scene, and the scenes are alive:"
 ],
 [
  "The Cottage garden will be yours from the start. The rest will be bought with Sunlight in the Shop's Scenes tab; three of them will be in the Pro collection.",
  "The Cottage garden is yours from the start. The rest are bought with Sunlight in the Shop's Scenes tab; three of them are in the Pro collection."
 ],
 [
  "The Shop will have two tabs, Seeds and Scenes, and everything in it will be bought with Sunlight you earned. Tap a packet to watch it grow.",
  "The Shop has two tabs, Seeds and Scenes, and everything in it is bought with Sunlight you earned. Tap a packet to watch it grow."
 ],
 [
  "Spend it on seeds and, with 1.1, scenes.",
  "Spend it on seeds and scenes."
 ],
 [
  "and for the Pro collection: four rare seeds today, and three scenes in 1.1.",
  "and for the Pro collection: four rare seeds and three scenes."
 ],
 [
  "and the Moonbloom, and, in 1.1, the Lake dock, Rainy terrace and Fuji veranda scenes</li>",
  "and the Moonbloom, and the Lake dock, Rainy terrace and Fuji veranda scenes</li>"
 ],
 [
  "with a running total, and from 1.1 in whichever scene you choose.",
  "with a running total, in whichever scene you have chosen."
 ],
 [
  "The window and its views will become scenes:",
  "The window and its views have become scenes:"
 ],
 [
  "All ten plants and their pots will be painted, stage by stage, on Today, on the Shelf and in the Shop.",
  "All ten plants and their pots are painted now, stage by stage, on Today, on the Shelf and in the Shop."
 ],
 [
  "Rain and drifting clouds, falling leaves, fireflies, a butterfly now and then and a hot air balloon will bring the scenes to life, and the plants will sway in the breeze.",
  "Rain and drifting clouds, falling leaves, fireflies, a butterfly now and then, a hot air balloon, and plants that sway in the breeze."
 ],
 [
  "Your first minutes in Sprout will open on a painted window, from a dark room to a golden evening.",
  "Your first minutes in Sprout open on a painted window, from a dark room to a golden evening."
 ]
]

s=open('index.html',encoding='utf-8').read()
for future,present in pairs:
    assert s.count(future)==1,(s.count(future),future[:60])
    s=s.replace(future,present)
open('index.html','w',encoding='utf-8').write(s)
print("flipped",len(pairs))
PY
```

Also read the page once for anything that still says "will", "in 1.1" or "arriving":

```bash
grep -n -i -E "will (stand|be|have|become|bring|open|sway)|in 1\.1|arriving|with 1\.1|from 1\.1" index.html | cut -c1-160
```

The headings "What's new in 1.1" and "Eight painted scenes." stay as they are, only without the pill.

## 5. Put the 1.1 letter into notes.json

The letter waits in `notes-1.1-letter.json`. Set the date to the release day, put the note first in `notes.json`, keep the format of the existing notes, then retire the waiting file.

```bash
python3 - <<'PY'
import json,datetime
letter=json.load(open('notes-1.1-letter.json',encoding='utf-8'))['notes'][0]
letter['date']=datetime.date.today().isoformat()          # the release day
d=json.load(open('notes.json',encoding='utf-8'))
assert all(n['id']!=letter['id'] for n in d['notes'])
d['notes'].insert(0,letter)
json.dump(d,open('notes.json','w',encoding='utf-8'),indent=2,ensure_ascii=False)
open('notes.json','a').write('\n')
json.load(open('notes.json',encoding='utf-8'))          # must parse
print([n['id'] for n in d['notes']])
PY
git mv notes-1.1-letter.json _retired/notes-1.1-letter.json
```

The app only shows a note whose `minAppVersion` is not above the app's version and which has not expired. The letter has neither, so every version sees it. It shows after the app's next fetch (once per 24 hours, on launch or foreground).

## 6. Bump the stylesheet version and push

```bash
python3 - <<'PY'
import datetime,re
v=datetime.date.today().strftime('%Y%m%d')+'r'
for f in ['index.html','privacy.html','terms.html','support.html']:
    s=open(f,encoding='utf-8').read()
    s,n=re.subn(r'style\.css\?v=[0-9a-z]+','style.css?v='+v,s); assert n==1,f
    open(f,'w',encoding='utf-8').write(s)
print("css version",v)
PY
git add -A
git status --short
git commit -m "Website: Sprout 1.1 is out (pills removed, present tense, 1.1 letter live)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git push origin main
```

## 7. Verify the live site (wait about two minutes for Pages)

```bash
for i in $(seq 1 30); do h=$(curl -s "https://sproutgarden.github.io/?cb=$RANDOM"); echo "$h" | grep -q "plants/pk_cactus.webp" && break; sleep 20; done
echo "pills left: $(echo "$h" | grep -c 'v11-tag')   (expect 0)"
echo "coming soon: $(echo "$h" | grep -o -i 'coming soon' | wc -l)   (expect 0)"
echo "window view: $(echo "$h" | grep -o -i 'window view' | wc -l)   (expect 0)"
echo "badge links: $(echo "$h" | grep -o 'apps.apple.com/app/id6821127488' | wc -l)   (expect 4)"
echo "smart banner: $(echo "$h" | grep -c 'apple-itunes-app')   (expect 1)"
curl -s -o /dev/null -w "og-image %{http_code} %{content_type}\n" https://sproutgarden.github.io/assets/og-image.jpg
curl -s https://sproutgarden.github.io/notes.json | python3 -c "import json,sys;print([n['id'] for n in json.load(sys.stdin)['notes']])"
curl -s "https://sproutgarden.github.io/$(echo "$h" | grep -o 'style.css?v=[0-9a-z]*' | head -1)" | grep -c "v11-tag"    # expect 0
```

Then look at https://sproutgarden.github.io on a phone and on a laptop: hero, scenes, Pro, What's new, footer. Share a link in Messages once to see the preview card (title, description, image).

## 8. Check the Garden Post in the app

A release build fetches `notes.json` on launch and whenever the app comes to the foreground, at most once per 24 hours, so a real iPhone may take a day to show the letter. To see it at once:

- Debug build on the simulator: launch with `-debugRun postFetchNow` (fetches now, ignoring the 24 hours) and, if needed, `-debugRun postClearRead`. The red flag on the letterbox goes up and "Sprout 1.1 is here" is the first card in The Garden Post.
- Release build: delete the app and install it again (a new install has no last-fetch time), open it, and look at the letterbox on Today.
- The letter's button is "Rate Sprout" and opens the App Store review page for `id6821127488`.

## Rollback

`git revert -m 1 <merge commit>` then push. Pages is back to the 1.0 site in about two minutes. Remember to bump `style.css?v=` again so no one keeps the cached stylesheet.
