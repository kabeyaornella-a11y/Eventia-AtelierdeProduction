---
name: Eventia invitation engine specs
description: Architecture, data model, and animation stack for the digital invitation engine from the Project Bible (11 PDFs in passation)
---

## Architecture
Scene-based narrative system. Invitation = ordered sequence of cinematic modules.

### Scene types
Intro → Opening (Envelope/Curtain) → Hero → Story → Timeline → Locations → Dress Code → RSVP → Gallery

Each scene has: initial state, entry animation, interactive phase, exit animation, triggers (scroll/click/delay/RSVP response).

## Animation stack
- **GSAP** — timeline/complex sync
- **Three.js / WebGL** — 3D effects, shaders
- **SVG** — masks, handwriting draw
- **Canvas** — particles (gold dust, petals, fireworks)

### Signature animation effects
Envelope Reveal (2D/3D), Wax Seal Break, Ribbon Untie, Curtain/Veil Reveal, Jewelry Box Open, Portrait Ink Reveal, Slot Machine, Scratch Card, Music Box

### Text effects
Handwriting draw (real-time), letter-by-letter reveal, shimmer, engraving

## Save the Date — short-form version
Collection → Concept → Real-time customization → Share (QR, WhatsApp, Video export)
Interactive mechanics: slot machine, travel ticket, music box, wax seal scratch

## Data model (Supabase SaaS)
- User, Client, Event, Collection, Template
- Scene, Component, Instance (per-event settings), Media, Version
- Guest, FamilyGroup, RSVP (conditional logic), TablePlan, Message/Guestbook
- Order, Publication (signed guest links), Payment, PhysicalAtelier
- Security: signed guest links per guest, private access for table plans

## Competitor HTML files available
Location: `/tmp/unzipped/`
- `concurrent/` — 4 competitor site HTMLs (TheDigitalInvite, TheDigitalYes, Webgency, WoowInvite)
- `demo_invitations/` — 20+ TheDigitalYes invitation demos (beach, nautical, finca, dolcevita, africa, majestic, daynight, boho, bridgerton, maldives, floral, oasis, tropical, lace…)
- `passation/` — 11-part Eventia Project Bible PDFs (architecture, configurators, animations, roadmap)

## Performance target
60 FPS mobile, lazy loading, asset compression per mobile performance budget
