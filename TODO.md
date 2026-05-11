# TODO

- [ ] Update `src/components/map.html`
  - [ ] Replace hard-coded `locations` with the 4 support locations (Main Street Branch, Westside Hub, The Plaza ATM, Northside Branch)
  - [ ] Add `window.message` handler for `SET_ACTIVE_LOCATION` to update pinned location + UI
  - [ ] Add marker highlight for active location
- [ ] Update `src/pages/support.tsx`
  - [ ] Add React state for active location
  - [ ] Make location cards clickable; update active styles accordingly
  - [ ] Embed the map (use `src/components/map.html` via iframe) and postMessage selection changes to it
- [ ] Run dev server / verify interactions

