# Elanco Tick Tracker – Elanco Technical Task (Frontend)
TickWatch is a UK-focused tick awareness and reporting tool designed for pet owners and vets.  
It visualises tick sightings on an interactive map, surfaces risk information, and provides educational content to help keep animals safe.

## 1. Project Outline

###  Purpose
- Help UK pet owners and vets **see where ticks are being reported**.
- Raise awareness of **tick-borne risks** using real-world data.
- Provide **practical guidance** on recognising and preventing ticks on animals.

### Key Features (MVP)

- **Interactive UK Map**
  - Displays tick sightings using data from the **Elanco Tick Sightings API**.
  - Each marker shows location, date, and basic details via a popup.

- **Sighting Details Panel**
  - Shows more information about a selected sighting (e.g. location, risk level, species where available).

- **Education / About Ticks Page**
  - Explains different tick species relevant to UK pets (e.g. *Ixodes ricinus*).
  - Embedded **Elanco YouTube video** to educate users about ticks.
  - “Read aloud” button using browser speech synthesis for accessibility.

- **Accessibility Focus**
  - Clear headings and layout.
  - Text-to-speech button for key sections.
  - Simple, high-contrast UI suitable for a wide audience.

### 🏠 1. Home Page / Dashboard

When you first open the app, you’ll land on the **TickWatch dashboard**.  
Here you will see:

- A **title and short description** explaining the purpose of TickWatch.
- A high-level overview of what the problem statement is (ticks):
  - View tick sightings on a map.
  - Learn about different tick species.
  - (Optionally) Navigate to “About Ticks” and “Report a Sighting”.

### 🗺️ 2. Exploring Tick Sightings on the Map

The **map section** is the core of the app.

1. Scroll to the **map** (labelled something like “UK tick sightings”).
2. You’ll see an interactive map of the UK with **markers**.
3. **Zoom and move the map**:
   - Use your mouse scroll wheel or trackpad to zoom in and out.
   - Click and drag to move around the map.
4. **Click a marker** to see more information, such as:
   - Location (e.g. city or area name)
   - Date of the sighting
   - Any additional details that are available from the API

If a **sighting details panel** is implemented, clicking a marker will also update the panel to show more structured information on the right or below the map.

---

### 📋 3. Viewing Sighting Details

When you select a marker:

- A small **popup** appears directly on the map.
  - Location name
  - Date
  - Risk level or severity (if provided)
  - Species information (where available)

You can click on different markers to quickly compare areas.

---

### 🎓 4. Learning About Ticks (About Ticks / Education Page)

From the home page you see:

- A button **“About Ticks”** 

Clicking this will take you to an **About Ticks** page, which includes:

- A short explanation of key UK tick species, such as:
  - *Ixodes ricinus*
  - *Ixodes hexagonus*
  - *Dermacentor reticulatus*
- Text content aimed at **pet owners**, explaining:
  - Where ticks are commonly found
  - How to check your pets
  - Basic prevention tips

---

### 🔊 5. Accessibility & Read-Aloud Features

TickWatch includes basic **accessibility features**:

- A **“Read aloud”** button on certain sections (for example, the Education section).
- When you click this button, the browser’s **speech synthesis** will read out the key text on the page.
- This helps:
  - Users with visual impairments
  - Users who prefer listening instead of reading
  - Older users who might find it easier to hear content

If your browser doesn’t support speech synthesis, the button will simply have no effect.

---

### ✍️ 6. Reporting a Sighting (Under Development)

If the **“Report a Sighting”** feature is present:

1. Click the **“Report a Sighting”** button or link from the main page.
2. You’ll be taken to a form where you can enter:
   - Location of the tick
   - Date of sighting
   - Optional details (e.g. species, severity, notes)
3. Submit the form to send your sighting (future versions may store this in a database like Supabase).

---

### ℹ️ 7. Known Limitations

- Map markers depend on the **Elanco Tick Sightings API**.  
  If the API is offline or slow, you may see:
  - A loading state
  - Fewer markers than expected
  - Or fallback demo data in some builds
- Some planned features (filters, full reporting, advanced charts) may be partially implemented or commented as “to be added”.

---

Overall:

- **Use the home page** to understand what the tool does.
- **Use the map** to explore where ticks are being reported.
- **Use the About Ticks page** to learn about species and prevention.
- **Use read-aloud buttons** if you prefer audio or need accessibility support.