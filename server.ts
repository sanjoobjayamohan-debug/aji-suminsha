import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const CONFIG_FILE = path.join(DATA_DIR, 'wedding-config.json');
const RSVPS_FILE = path.join(DATA_DIR, 'rsvps.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Default initial config
const DEFAULT_CONFIG = {
  hero: {
    groomName: "Aji",
    brideName: "Sumisha",
    tagline: "A celebration of love, partnership, and the quiet beauty of forever.",
    subtag: "We are getting married",
    weddingDate: "2026-11-14",
    weddingTime: "16:30",
    dateDisplay: "Saturday, November 14, 2026",
    timeDisplay: "4:30 PM PST",
    locationDisplay: "High Grove Estate, Sonoma",
    heroImage: "/src/assets/images/wedding_hero_couple_1791278997692.jpg",
    countdownEnabled: true
  },
  story: {
    sectionTag: "Our Journey Together",
    title: "A Story Written in Shared Moments",
    leadText: "We believe that the deepest connections are formed not by grand spectacles, but through steady understanding, gentle humor, and an unwavering commitment to grow alongside one another.",
    paragraphs: [
      "Aji and Sumisha first crossed paths over a casual exchange about minimalist architecture and jazz in 2019. What began as an afternoon coffee quickly expanded into hours of spontaneous debate, shared curiosities, and an effortless sense of ease.",
      "Through seven years of shared dreams, long coast road trips, culinary experiments, and quiet Sunday mornings, we discovered a partnership that feels both grounding and liberating."
    ],
    quote: "Finding home not in a place, but in a person.",
    storyImage: "/src/assets/images/couple_story_portrait_1791279010681.jpg",
    milestones: [
      { id: "m1", number: "01", label: "First Met", title: "Autumn 2019", desc: "A quiet coffee shop in the historic quarter." },
      { id: "m2", "number": "02", label: "The First Journey", title: "Spring 2021", desc: "Pacific Coast highway road trip under open skies." },
      { id: "m3", "number": "03", label: "The Lifelong Promise", title: "Winter 2025", desc: "A private sunset pledge on the Sonoma headlands." }
    ]
  },
  itinerary: {
    sectionTag: "Celebration Schedule",
    title: "The Order of Events",
    subtitle: "A relaxed evening dedicated to togetherness, warmth, curated cuisine, and joyous dancing.",
    events: [
      {
        id: "e1",
        time: "4:30 PM",
        title: "Guest Arrival & Welcome Refreshments",
        desc: "Gather on the Olive Grove Terrace for artisanal spritzes, sparkling water, and acoustic background strings.",
        location: "Olive Grove Terrace",
        icon: "GlassWater"
      },
      {
        id: "e2",
        time: "5:15 PM",
        title: "The Secular Union & Vow Exchange",
        desc: "An intimate, modern secular ceremony focusing on love, mutual commitments, and shared poetry.",
        location: "The Glasshouse Pavilion",
        icon: "Heart"
      },
      {
        id: "e3",
        time: "6:00 PM",
        title: "Sunset Cocktail Hour & Hors d’Oeuvres",
        desc: "Craft cocktails, regional wine selections, and light seasonal bites overlooking the valley at dusk.",
        location: "Veranda & Lawn",
        icon: "Sparkles"
      },
      {
        id: "e4",
        time: "7:30 PM",
        title: "Celebration Dinner & Heartfelt Toasts",
        desc: "A thoughtfully curated multi-course seasonal feast served family-style with organic wine pairings.",
        location: "The Main Glass Dining Hall",
        icon: "Clock"
      },
      {
        id: "e5",
        time: "9:00 PM",
        title: "Celebration Party, Music & Dancing",
        desc: "Dancing under the stars, decadent dessert buffet, and late-night artisan espresso bar.",
        location: "Grand Ballroom & Courtyard",
        icon: "Sparkles"
      }
    ],
    notes: [
      { title: "Dress Code", desc: "Modern Cocktail / Formal in neutral, muted earthy tones." },
      { title: "Atmosphere", desc: "Secular, warm, and heartfelt celebration of love and community." },
      { title: "Transportation", desc: "Complimentary shuttles from downtown Sonoma hotels starting at 3:45 PM." }
    ]
  },
  venue: {
    sectionTag: "Destination & Setting",
    venueName: "The Glasshouse at High Grove",
    tagline: "Sonoma Valley Sanctuary",
    description: "Perched on a gentle ridge overlooking rolling vineyards, the Glasshouse pairs clean architectural lines with expansive glass doors that open directly to the evening breeze and starlit horizons.",
    address: "1200 Vista Crest Way, Sonoma Ridge, CA 95476",
    valet: "Complimentary on-site valet parking available upon arrival at the main gates.",
    shuttle: "Departs every 20 minutes from the Sonoma Mission Inn between 3:45 PM and 11:30 PM.",
    airports: "SFO (1 hr 15 min), OAK (1 hr), or STS Santa Rosa (35 min).",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100346.90693557997!2d-122.51865449999999!3d38.2918591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085aa4b47eb0821%3A0x600c0f8626600c0!2sSonoma%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    googleMapsUrl: "https://maps.google.com/?q=Sonoma+Valley+California"
  },
  gallery: {
    sectionTag: "Visual Moments",
    title: "Photographic Memories",
    subtitle: "Glimpses of quiet smiles, contemporary light, and our shared path.",
    items: [
      {
        id: "g1",
        src: "/src/assets/images/wedding_hero_couple_1791278997692.jpg",
        category: "portraits",
        title: "Golden Hour on the Terrace",
        caption: "A serene embrace during sunset at High Grove.",
        alt: "Aji and Sumisha on a scenic modernist terrace"
      },
      {
        id: "g2",
        src: "/src/assets/images/couple_story_portrait_1791279010681.jpg",
        category: "moments",
        title: "Laughter in the Courtyard",
        caption: "Unrehearsed joy and quiet smiles in the garden.",
        alt: "Couple laughing affectionately in a museum courtyard"
      },
      {
        id: "g3",
        src: "/src/assets/images/gallery_moments_portrait_1791279024238.jpg",
        category: "portraits",
        title: "Serenity & Quiet Promises",
        caption: "Understated closeness captured in soft natural daylight.",
        alt: "Intimate fine art portrait of Aji and Sumisha"
      },
      {
        id: "g4",
        src: "/src/assets/images/gallery_venue_setting_1791279040592.jpg",
        category: "setting",
        title: "The Glasshouse Tablescape",
        caption: "Curated botanicals and candlelit minimalism for the celebration dinner.",
        alt: "Modern minimalist wedding dinner setting with warm candles"
      }
    ]
  },
  rsvp: {
    sectionTag: "Kindly Respond",
    title: "Join in the Celebration",
    subtitle: "Please let us know if you will be able to celebrate with us by October 1, 2026.",
    deadline: "October 1, 2026",
    allowPlusOne: true,
    dietaryEnabled: true
  },
  footer: {
    text: "With immense gratitude for your love, friendship, and presence in our lives. We cannot wait to celebrate together.",
    subtext: "Designed with elegance, love & simplicity."
  }
};

const DEFAULT_RSVPS = [
  {
    id: "seed-1",
    name: "Rohan & Ananya",
    email: "rohan.ananya@example.com",
    attending: true,
    guestCount: 2,
    dietary: "Vegetarian",
    message: "So incredibly overjoyed for you both! Looking forward to celebrating this beautiful next chapter.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "seed-2",
    name: "David Miller",
    email: "david.m@example.com",
    attending: true,
    guestCount: 1,
    dietary: "None",
    message: "Aji & Sumisha, your partnership is an inspiration to all of us. Cannot wait for the evening in Sonoma!",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "seed-3",
    name: "Priya & Siddharth",
    email: "priya.s@example.com",
    attending: true,
    guestCount: 2,
    dietary: "Gluten-Free",
    message: "Sending all our love and warmest wishes. Counting down the days to celebrate together!",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  }
];

// Helper functions for reading & writing config
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('Error reading wedding config file, using defaults', err);
  }
  // Initialize file
  saveConfig(DEFAULT_CONFIG);
  return DEFAULT_CONFIG;
}

function saveConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving wedding config file', err);
  }
}

function loadRsvps() {
  try {
    if (fs.existsSync(RSVPS_FILE)) {
      const data = fs.readFileSync(RSVPS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading RSVPs file, using defaults', err);
  }
  saveRsvps(DEFAULT_RSVPS);
  return DEFAULT_RSVPS;
}

function saveRsvps(rsvps: any[]) {
  try {
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving RSVPs file', err);
  }
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '15mb' }));
  app.use('/uploads', express.static(UPLOADS_DIR));

  // Image upload endpoint
  app.post('/api/upload', (req, res) => {
    try {
      const { image, filename } = req.body;
      if (!image) {
        return res.status(400).json({ success: false, message: 'No image data provided' });
      }

      const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.json({ success: true, url: image });
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'png';
      const cleanName = (filename || 'photo').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 25);
      const fileName = `${cleanName}-${Date.now()}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, fileName);

      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      res.json({
        success: true,
        message: 'Image uploaded successfully',
        url: `/uploads/${fileName}`
      });
    } catch (err: any) {
      console.error('Error handling upload', err);
      res.status(500).json({ success: false, message: err.message || 'Upload failed' });
    }
  });

  // ==========================================
  // BACKEND API ROUTES FOR SECTION CUSTOMIZATION
  // ==========================================

  // 1. Get entire wedding website configuration
  app.get('/api/wedding', (req, res) => {
    const config = loadConfig();
    res.json({
      success: true,
      data: config,
      updatedAt: new Date().toISOString()
    });
  });

  // 2. Update wedding website configuration (partial or full)
  app.put('/api/wedding', (req, res) => {
    try {
      const currentConfig = loadConfig();
      const updates = req.body;

      if (!updates || typeof updates !== 'object') {
        return res.status(400).json({ success: false, message: 'Invalid payload' });
      }

      // Merge deep sections safely
      const mergedConfig = {
        hero: { ...currentConfig.hero, ...(updates.hero || {}) },
        story: { ...currentConfig.story, ...(updates.story || {}) },
        itinerary: { ...currentConfig.itinerary, ...(updates.itinerary || {}) },
        venue: { ...currentConfig.venue, ...(updates.venue || {}) },
        gallery: { ...currentConfig.gallery, ...(updates.gallery || {}) },
        rsvp: { ...currentConfig.rsvp, ...(updates.rsvp || {}) },
        footer: { ...currentConfig.footer, ...(updates.footer || {}) }
      };

      saveConfig(mergedConfig);

      res.json({
        success: true,
        message: 'Wedding customization saved successfully',
        data: mergedConfig
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
  });

  // 3. Reset customization to initial defaults
  app.post('/api/wedding/reset', (req, res) => {
    saveConfig(DEFAULT_CONFIG);
    res.json({
      success: true,
      message: 'Reset all sections to defaults',
      data: DEFAULT_CONFIG
    });
  });

  // 4. Update a single section specifically
  app.patch('/api/wedding/section/:sectionName', (req, res) => {
    const { sectionName } = req.params;
    const currentConfig = loadConfig();

    if (!(sectionName in currentConfig)) {
      return res.status(404).json({ success: false, message: `Section '${sectionName}' not found` });
    }

    currentConfig[sectionName as keyof typeof currentConfig] = {
      ...currentConfig[sectionName as keyof typeof currentConfig],
      ...req.body
    };

    saveConfig(currentConfig);

    res.json({
      success: true,
      message: `Section '${sectionName}' updated successfully`,
      data: currentConfig[sectionName as keyof typeof currentConfig]
    });
  });

  // ==========================================
  // BACKEND API ROUTES FOR RSVPs
  // ==========================================

  // 5. Get all RSVPs & summary stats
  app.get('/api/rsvps', (req, res) => {
    const rsvps = loadRsvps();
    const attendingCount = rsvps.filter((r: any) => r.attending).length;
    const decliningCount = rsvps.filter((r: any) => !r.attending).length;
    const totalGuests = rsvps.reduce((acc: number, r: any) => acc + (r.attending ? (Number(r.guestCount) || 1) : 0), 0);

    res.json({
      success: true,
      data: rsvps,
      stats: {
        totalResponses: rsvps.length,
        attendingCount,
        decliningCount,
        totalGuests
      }
    });
  });

  // 6. Submit a new RSVP
  app.post('/api/rsvps', (req, res) => {
    const { name, email, attending, guestCount, dietary, message } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const rsvps = loadRsvps();
    const checkInCode = `AS-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newEntry = {
      id: 'rsvp-' + Date.now(),
      checkInCode,
      name: name.trim(),
      email: email.trim(),
      attending: attending === true || attending === 'attending',
      guestCount: Math.max(1, Number(guestCount) || 1),
      dietary: dietary ? String(dietary).trim() : '',
      message: message ? String(message).trim() : '',
      checkedIn: false,
      createdAt: new Date().toISOString()
    };

    rsvps.unshift(newEntry);
    saveRsvps(rsvps);

    res.status(201).json({
      success: true,
      message: 'RSVP recorded successfully',
      data: newEntry
    });
  });

  // 7. Toggle check-in status
  app.patch('/api/rsvps/:id/checkin', (req, res) => {
    const { id } = req.params;
    const rsvps = loadRsvps();
    const target = rsvps.find((r: any) => r.id === id || r.checkInCode === id);

    if (!target) {
      return res.status(404).json({ success: false, message: 'RSVP not found' });
    }

    target.checkedIn = req.body.checkedIn !== undefined ? Boolean(req.body.checkedIn) : !target.checkedIn;
    target.checkedInAt = target.checkedIn ? new Date().toISOString() : null;
    saveRsvps(rsvps);

    res.json({ success: true, message: 'Check-in status updated', data: target });
  });

  // 8. Delete an RSVP
  app.delete('/api/rsvps/:id', (req, res) => {
    const { id } = req.params;
    let rsvps = loadRsvps();
    const initialLen = rsvps.length;
    rsvps = rsvps.filter((r: any) => r.id !== id);

    if (rsvps.length === initialLen) {
      return res.status(404).json({ success: false, message: 'RSVP not found' });
    }

    saveRsvps(rsvps);
    res.json({ success: true, message: 'RSVP deleted successfully' });
  });

  // 8. Export RSVPs as CSV
  app.get('/api/rsvps/export', (req, res) => {
    const rsvps = loadRsvps();
    const headers = ['ID', 'Name', 'Email', 'Attending', 'Guest Count', 'Dietary Requirements', 'Message', 'Submission Date'];
    const rows = rsvps.map((r: any) => [
      `"${r.id}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      r.attending ? 'Attending' : 'Declining',
      r.guestCount || 1,
      `"${(r.dietary || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${r.createdAt || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row: any[]) => row.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="wedding-rsvps.csv"');
    res.send(csvContent);
  });

  // ==========================================
  // VITE / STATIC SERVING
  // ==========================================
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Wedding Backend Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
