Title: Consolidate existing CV content into one inventory
Type: task
Status: resolved

## Question

Tom's CV content currently exists scattered across a LinkedIn export, one or more PDF resumes, and a separate "consulting CV." Before the CV data structure (#09) can be designed, someone needs to pull all of this together into one inventory: what sections exist (About, Experience, Education, Skills, Projects, Publications), what fields each entry has (dates, titles, descriptions, links), and where the source material currently lives.

This is Tom's task to drive (only he can judge what to keep/merge/cut across the sources), though an agent session can help extract text from the PDFs/export and organize it if he supplies the files.

## Answer

**Sources actually available**: two PDFs in `CVContent/` — `CV_eng.pdf` (general resume) and `Prevas_Tom_Andersson_CV__Test.pdf` (Prevas-internal consulting CV, with a headshot photo and granular per-client project history). No LinkedIn export was supplied after all.

**Curation decisions (resolved with Tom):**

- **About**: near-identical bios in both sources; keep a placeholder merge of the existing text for now — Tom will rewrite it himself later.
- **Projects**: include the full ~20-entry project/assignment history (chronological), plus a smaller "Cherry picks" featured subset. **Data-shape implication for #09**: each project entry needs a way to be marked "featured" (e.g. a boolean flag) so the same entries can populate both the full list and the highlights subset.
- **Skills**: use the flat categorized style from `CV_eng.pdf` (not the 1–4 proficiency-tier scale from the consulting CV), extended with tools/tech only mentioned in the consulting CV.
- **Contact info**: no personal email/phone/raw contact details on the public site.
- **Publications**: links found and confirmed:
  1. "A Comparative Analysis and Design of Controllers for Autonomous Bicycles" — 2021 European Control Conference — https://ieeexplore.ieee.org/document/9655223/
  2. "A Loop Shaping Method for Stabilising a Riderless Bicycle" — 2019 European Conference on Mobile Robots — https://ieeexplore.ieee.org/document/8870965/
  3. "Development of a Robust Cascade Controller for a Riderless Bicycle" — MDU Master's thesis. Not on IEEE Xplore (university theses aren't indexed there) — hosted on DiVA instead: http://mdh.diva-portal.org/smash/record.jsf?pid=diva2:1326415 (flag for Tom: the ticket originally assumed all-IEEE-Xplore links; this one is DiVA, worth confirming that's acceptable for #09's schema).

**Content inventory:**

- **About**: one bio paragraph — 6+ years as a systems/software developer for test systems (lab/production) and heavy industry; M.Sc. in Engineering (Robotics), specializing in signal processing, control theory, electronics, machine learning, and programming.

- **Experience** (employer-level, chronological): Prevas AB — In-house Software Developer, Aug 2022–Present (SICS group: control software for reheating furnaces and robot cells); Prevas AB — In-house Test System Developer, Aug 2019–Aug 2022; Mälardalens University — Research Engineer, Jun–Aug 2019 (bicycle thesis continuation); ABB Robotics — System Validation Technician, two summers (Jun–Aug 2016, Jun–Aug 2017); IKEA — Logistics Worker, Jul–Aug 2013.
  - Note: the consulting CV frames the whole post-2019 period as one continuous "Prevas AB — in-house developer and resource consultant" engagement, with the ~20 client projects as assignments underneath it, not separate jobs — recommend keeping Experience as the short employer-level list above, and putting the granular client engagements under **Projects** instead, so the same Prevas tenure isn't counted twice.

- **Projects** (all ~20 client/academic engagements, 2016–2026, each with title, client, date range, location, description, tech tags — full detail lives in the two source PDFs in `CVContent/`, not repeated here). Candidate "Cherry picks" featured subset for Tom to adjust: Sandvik Rock Tools Cell Manager (2025–2026, ongoing), SSAB FOCS overhaul (2024), Cytiva IFC test system (2020–2022), Celsa thermal camera integration (2023), Outokumpu cold rolling mill platform upgrade (2023–2024), plus the bicycle thesis project (2019) as a personal/academic highlight.

- **Skills** (flat, categorized, superset of both sources):
  - Programming: C#, LabVIEW, MATLAB, C, JavaScript, Fortran
  - Software & Tools: Microsoft SQL, Entity Framework, MediatR, Autofac, Git, Docker, Azure Pipelines, TestStand, Ollama, Office
  - Frameworks & Architecture: WPF, MVVM, Clean Architecture, Blazor, React.js, Bootstrap, NI Actor Framework, SAFe
  - Communication protocols: TCP/IP, OPC/UA, gRPC, HTTPS, RS-232, SPI, CAN, MQTT, Serial Communication, FTP
  - Domain: Signal Processing, Control Theory, Electronics, Embedded Systems, Machine Learning, System Identification, Robotic Path Planning, Sensor Systems, Sensor Fusion
  - Languages: Swedish (native), English (professional)

- **Education**: Mälardalens University, Västerås — M.Sc. in Engineering, Robotics — 2014–2019.

- **Publications**: the three entries above, each as title + venue/year + link.

- **Photo**: a headshot exists in the consulting CV. Not extracted as a standalone asset here — flag as a small follow-up task if Tom wants to use it (crop/export it as an image file) when building the About section.
