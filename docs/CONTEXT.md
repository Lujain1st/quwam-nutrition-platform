# Qawam — Project Context (Read This First)
This file is the single source of truth for architectural decisions made during
development. Any AI tool (Gemini, Claude, Copilot, etc.) working on this repo
should read this file before modifying code, and should not silently
override any decision listed here — flag a conflict instead of guessing.
Scope right now: Obesity, Normal Case only (no comorbidities). Disease-based
cases are a planned future extension, not implemented yet.

1. Inference engine: Fuzzy Logic — NOT Forward Chaining, NOT experta
The engine is a Mamdani Fuzzy Inference System, prototyped in MATLAB
(/matlab) and implemented for production in Python with scikit-fuzzy
(/backend/app/expert_system/obesity_expert_system.py).
An earlier requirements draft mentioned the Python experta library
(forward-chaining). That was written before the Fuzzy decision was finalized
with the supervising doctor and is superseded. Do not reintroduce
experta as the core inference mechanism.
If experta (or any rule-engine shell) is used at all, it may only serve as
an outer orchestration layer that calls the Fuzzy modules as a function —
never as a replacement for the Fuzzy computation itself.
2. Two Fuzzy modules exist, both BMI + Activity Level as inputs
Calorie deficit % → produces a Lower Target and an Upper Target
calorie value (always both, never one auto-picked — see rule 4).
Macro scenario classification → picks among 4 fixed scenarios
(not a continuous percentage):
Balanced: 50% carb / 25% protein / 25% fat
High-Protein: 45% carb / 30% protein / 25% fat
Moderate-Carb: 55% carb / 20% protein / 25% fat
High-Carb: 60% carb / 20% protein / 20% fat
These 4 scenarios come from Asmaa's pre-built reference table
(/data/portion_reference.xlsx), which has ready-made food-exchange
portions for every 100-kcal step from 1200 to 2800 kcal, for each scenario.
The Fuzzy engine does not compute portions from scratch — it classifies
the client into a scenario, then looks up the closest matching row in that
table for the actual food-exchange portions.
3. Minimum calorie floor: gender-differentiated, confirmed final
Male   floor = 1500 kcal
Female floor = 1200 kcal
This was confirmed explicitly with Asmaa after a real conflicting case
(a male client whose computed target fell to 1298 kcal under an earlier,
incorrect flat-1200 rule). Do not use a flat 1200 kcal floor for both sexes.
4. Never auto-select a single "best" option — show all plausible candidates
Confirmed decision from Asmaa (the specialist): whenever the engine finds two
or more plausible options at once (most commonly: which macro scenario fits,
or the Lower vs Upper calorie target), the system must present all of them
and let the specialist choose — it must not silently pick one on the
specialist's behalf. This applies throughout the UI (see EditGenerateScreen)
and the API response shape (return a list of candidates with match scores,
not a single value).
5. Data confirmation model: confirmed vs. draft
At patient self-registration, only name, national ID, and birth date
are saved as confirmed.
All other patient fields (weight, height, activity level, allergies, etc.)
are saved as draft until the specialist reviews and confirms them
during the live interview (InterviewScreen). Only then are they written
to the fields the expert system actually reads from.
6. Specialist roles: one account type, two independent permission flags
There is no separate "admin" account type. SPECIALIST has:

can_review_registrations — reviews and approves/rejects new specialist
sign-ups.
can_edit_knowledge_base — can add/edit Rule Base entries (the expert
system's rules).
Both flags are currently true on a single account (Asmaa's). The schema is
intentionally designed so these can be split onto separate people later
(e.g. hiring a dedicated admin) without any schema change — just flip the
flags on different accounts.

7. Appointments and video calls: fully external
The website only stores a Zoom link (plain text/URL) per appointment. It
does not host or embed any video call itself.
Do not build WebRTC, video hosting, or any live-call infrastructure — it is
explicitly out of scope.
8. i18n: every screen must support Arabic + English
All UI text must come from /frontend/src/i18n.js via the useLanguage()
hook. No hardcoded Arabic or English strings in JSX.
dir (rtl/ltr) switches automatically based on the selected language.
9. Deferred / explicitly out of scope for now
Follow-up portal (periodic weight logging, adherence notes) — schema
exists (FOLLOW_UP table) but no screen or endpoint yet.
Knowledge-base editing screen for can_edit_knowledge_base — not
designed yet.
Disease-based cases / comorbidities — Normal Case (obesity only) is the
entire current scope.
10. Reference documents in /docs
decision_rules_en.pdf — full clinical rule documentation (BMI, BMR/TDEE,
calorie deficit formulas, macro scenarios).
ERD_Diagram.png — entity-relationship diagram, matches /backend/app/models.
wireframes/ — approved screen designs; new screens should visually match
these unless a change is explicitly requested and documented here.
