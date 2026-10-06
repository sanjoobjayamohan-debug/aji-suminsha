/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import QRCode from 'qrcode';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Camera,
  Check,
  Send,
  ExternalLink,
  ChevronRight,
  Maximize2,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Download,
  Info,
  Car,
  GlassWater,
  Sliders,
  Save,
  RotateCcw,
  Plus,
  Minus,
  Trash2,
  Users,
  Image as ImageIcon,
  Edit3,
  Layers,
  Map,
  FileText,
  QrCode,
  Printer,
  Search,
  CheckCircle2,
  Share2
} from 'lucide-react';

// Default generated imagery
import heroImageDefault from './assets/images/wedding_hero_couple_1791278997692.jpg';
import storyImageDefault from './assets/images/couple_story_portrait_1791279010681.jpg';
import momentImageDefault from './assets/images/gallery_moments_portrait_1791279024238.jpg';
import venueImageDefault from './assets/images/gallery_venue_setting_1791279040592.jpg';

// Designer branding & Upload components
import CirkkleLogo from './components/CirkkleLogo.tsx';
import ImageUploadZone from './components/ImageUploadZone.tsx';

interface Milestone {
  id: string;
  number: string;
  label: string;
  title: string;
  desc: string;
}

interface EventItem {
  id: string;
  time: string;
  title: string;
  desc: string;
  location: string;
  icon?: string;
}

interface NoteItem {
  title: string;
  desc: string;
}

interface GalleryItem {
  id: string;
  src: string;
  category: string;
  title: string;
  caption: string;
  alt: string;
}

interface WeddingConfig {
  hero: {
    groomName: string;
    brideName: string;
    tagline: string;
    subtag: string;
    weddingDate: string;
    weddingTime: string;
    dateDisplay: string;
    timeDisplay: string;
    locationDisplay: string;
    heroImage: string;
    countdownEnabled: boolean;
  };
  story: {
    sectionTag: string;
    title: string;
    leadText: string;
    paragraphs: string[];
    quote: string;
    storyImage: string;
    milestones: Milestone[];
  };
  itinerary: {
    sectionTag: string;
    title: string;
    subtitle: string;
    events: EventItem[];
    notes: NoteItem[];
  };
  venue: {
    sectionTag: string;
    venueName: string;
    tagline: string;
    description: string;
    address: string;
    valet: string;
    shuttle: string;
    airports: string;
    mapEmbedUrl: string;
    googleMapsUrl: string;
  };
  gallery: {
    sectionTag: string;
    title: string;
    subtitle: string;
    items: GalleryItem[];
  };
  rsvp: {
    sectionTag: string;
    title: string;
    subtitle: string;
    deadline: string;
    allowPlusOne: boolean;
    dietaryEnabled: boolean;
  };
  footer: {
    text: string;
    subtext: string;
  };
}

interface RsvpItem {
  id: string;
  checkInCode?: string;
  name: string;
  email: string;
  attending: boolean;
  guestCount: number;
  dietary: string;
  message: string;
  checkedIn?: boolean;
  checkedInAt?: string;
  createdAt: string;
}

// Framer Motion Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const DEFAULT_INITIAL_CONFIG: WeddingConfig = {
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
    heroImage: heroImageDefault,
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
    storyImage: storyImageDefault,
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
        src: heroImageDefault,
        category: "portraits",
        title: "Golden Hour on the Terrace",
        caption: "A serene embrace during sunset at High Grove.",
        alt: "Aji and Sumisha on a scenic modernist terrace"
      },
      {
        id: "g2",
        src: storyImageDefault,
        category: "moments",
        title: "Laughter in the Courtyard",
        caption: "Unrehearsed joy and quiet smiles in the garden.",
        alt: "Couple laughing affectionately in a museum courtyard"
      },
      {
        id: "g3",
        src: momentImageDefault,
        category: "portraits",
        title: "Serenity & Quiet Promises",
        caption: "Understated closeness captured in soft natural daylight.",
        alt: "Intimate fine art portrait of Aji and Sumisha"
      },
      {
        id: "g4",
        src: venueImageDefault,
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

export default function App() {
  // Live Config loaded from backend
  const [config, setConfig] = useState<WeddingConfig>(DEFAULT_INITIAL_CONFIG);

  // Customizer Drawer State
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [activeCustomizerTab, setActiveCustomizerTab] = useState<'hero' | 'story' | 'itinerary' | 'venue' | 'gallery' | 'rsvps'>('hero');
  const [draftConfig, setDraftConfig] = useState<WeddingConfig>(DEFAULT_INITIAL_CONFIG);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Backend RSVPs
  const [rsvps, setRsvps] = useState<RsvpItem[]>([]);
  const [rsvpStats, setRsvpStats] = useState({ totalResponses: 0, attendingCount: 0, decliningCount: 0, totalGuests: 0 });

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ambient sound
  const [ambientAudioActive, setAmbientAudioActive] = useState(false);

  // Gallery
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'portraits' | 'moments' | 'setting'>('all');

  // RSVP Form submission state
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    attending: 'attending',
    guestCount: '1',
    dietary: '',
    message: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

  // QR Code State for confirmed guest
  const [generatedPass, setGeneratedPass] = useState<{
    code: string;
    name: string;
    guestCount: number;
    dietary: string;
    qrUrl: string;
  } | null>(null);

  // Lookup existing QR pass modal
  const [lookupModalOpen, setLookupModalOpen] = useState(false);
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 1. Fetch Backend Config on mount
  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/wedding');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          const merged = {
            ...DEFAULT_INITIAL_CONFIG,
            ...json.data,
            hero: { ...DEFAULT_INITIAL_CONFIG.hero, ...(json.data.hero || {}) },
            story: { ...DEFAULT_INITIAL_CONFIG.story, ...(json.data.story || {}) },
            itinerary: { ...DEFAULT_INITIAL_CONFIG.itinerary, ...(json.data.itinerary || {}) },
            venue: { ...DEFAULT_INITIAL_CONFIG.venue, ...(json.data.venue || {}) },
            gallery: { ...DEFAULT_INITIAL_CONFIG.gallery, ...(json.data.gallery || {}) },
            rsvp: { ...DEFAULT_INITIAL_CONFIG.rsvp, ...(json.data.rsvp || {}) },
            footer: { ...DEFAULT_INITIAL_CONFIG.footer, ...(json.data.footer || {}) },
          };
          setConfig(merged);
          setDraftConfig(merged);
        }
      }
    } catch (err) {
      console.warn('Backend not yet reachable, using defaults', err);
    }
  };

  // 2. Fetch Backend RSVPs
  const fetchRsvps = async () => {
    try {
      const res = await fetch('/api/rsvps');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setRsvps(json.data);
          if (json.stats) setRsvpStats(json.stats);
        }
      }
    } catch (err) {
      console.warn('Error fetching RSVPs', err);
    }
  };

  useEffect(() => {
    fetchConfig();
    fetchRsvps();
  }, []);

  // Check if user has an existing saved pass in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aji_sumisha_checkin_pass');
    if (saved) {
      try {
        setGeneratedPass(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Update countdown
  useEffect(() => {
    const targetString = `${config.hero.weddingDate || '2026-11-14'}T${config.hero.weddingTime || '16:30'}:00`;
    const targetDate = new Date(targetString).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [config.hero.weddingDate, config.hero.weddingTime]);

  // Generate QR Code URL from Check-in Data
  const createCheckInQr = async (code: string, name: string, count: number) => {
    const payload = JSON.stringify({
      code,
      name,
      count,
      event: `${config.hero.groomName} & ${config.hero.brideName} Wedding`,
      venue: config.venue.venueName,
      date: config.hero.weddingDate,
    });

    try {
      const qrDataUrl = await QRCode.toDataURL(payload, {
        width: 320,
        margin: 2,
        color: {
          dark: '#1F1E1D',
          light: '#FAF9F6',
        },
        errorCorrectionLevel: 'M',
      });
      return qrDataUrl;
    } catch (err) {
      console.error('Failed to generate QR code', err);
      return '';
    }
  };

  // Handle Backend Customizer Save
  const handleSaveConfig = async () => {
    setIsSavingConfig(true);
    setSaveSuccessMessage(null);
    try {
      const res = await fetch('/api/wedding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftConfig),
      });

      if (res.ok) {
        const json = await res.json();
        setConfig(json.data);
        setSaveSuccessMessage('Customizations successfully saved to backend!');
        setTimeout(() => setSaveSuccessMessage(null), 4000);
      } else {
        alert('Failed to save customization to backend.');
      }
    } catch (err) {
      console.error('Error saving config', err);
      alert('Could not connect to backend server to save.');
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Handle Backend Reset
  const handleResetConfig = async () => {
    if (!window.confirm('Reset all sections back to original default settings?')) return;
    try {
      const res = await fetch('/api/wedding/reset', { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        setConfig(json.data);
        setDraftConfig(json.data);
        setSaveSuccessMessage('All sections reset to defaults.');
        setTimeout(() => setSaveSuccessMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle RSVP Submit to Backend + Generate QR Check-in Code
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name.trim() || !rsvpForm.email.trim()) return;

    setIsSubmittingRsvp(true);
    try {
      const isAttending = rsvpForm.attending === 'attending';
      const guestCountNum = Math.max(1, Number(rsvpForm.guestCount) || 1);

      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rsvpForm.name.trim(),
          email: rsvpForm.email.trim(),
          attending: isAttending,
          guestCount: guestCountNum,
          dietary: rsvpForm.dietary.trim(),
          message: rsvpForm.message.trim(),
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const created = json.data;
        const checkCode = created.checkInCode || `AS-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;

        // Generate QR code if attending
        if (isAttending) {
          const qrUrl = await createCheckInQr(checkCode, created.name, guestCountNum);
          const passData = {
            code: checkCode,
            name: created.name,
            guestCount: guestCountNum,
            dietary: created.dietary || '',
            qrUrl,
          };
          setGeneratedPass(passData);
          localStorage.setItem('aji_sumisha_checkin_pass', JSON.stringify(passData));
        } else {
          setGeneratedPass(null);
        }

        setRsvpSubmitted(true);
        fetchRsvps();
      } else {
        alert('Could not submit RSVP. Please try again.');
      }
    } catch (err) {
      console.error('Error posting RSVP', err);
      setRsvpSubmitted(true);
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  // Retrieve an existing pass by email
  const handleLookupPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    const found = rsvps.find(
      (r) => r.email.toLowerCase().trim() === lookupEmail.toLowerCase().trim()
    );

    if (!found) {
      setLookupError('No RSVP found for this email address. Please submit an RSVP below.');
      return;
    }

    if (!found.attending) {
      setLookupError('This RSVP is marked as declining attendance.');
      return;
    }

    const checkCode = found.checkInCode || `AS-${found.id.slice(-6).toUpperCase()}`;
    const qrUrl = await createCheckInQr(checkCode, found.name, found.guestCount || 1);
    const passData = {
      code: checkCode,
      name: found.name,
      guestCount: found.guestCount || 1,
      dietary: found.dietary || '',
      qrUrl,
    };
    setGeneratedPass(passData);
    setLookupModalOpen(false);
    setRsvpSubmitted(true);
  };

  // Toggle check-in in customizer
  const handleToggleCheckIn = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/rsvps/${id}/checkin`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkedIn: !currentStatus }),
      });
      if (res.ok) {
        fetchRsvps();
      }
    } catch (e) {
      console.error('Error toggling check-in', e);
    }
  };

  // Ambient sound synthesizer
  const toggleAmbientAudio = () => {
    try {
      if (!ambientAudioActive) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        (window as any).__ambientAudioCtx = audioCtx;
        (window as any).__ambientOsc = osc;
        setAmbientAudioActive(true);
      } else {
        if ((window as any).__ambientOsc) {
          (window as any).__ambientOsc.stop();
          (window as any).__ambientAudioCtx?.close();
        }
        setAmbientAudioActive(false);
      }
    } catch (e) {
      setAmbientAudioActive(!ambientAudioActive);
    }
  };

  // Calendar .ics download
  const downloadCalendarEvent = () => {
    const dStr = (config.hero.weddingDate || '2026-11-14').replace(/-/g, '');
    const tStr = (config.hero.weddingTime || '16:30').replace(/:/g, '') + '00';
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aji & Sumisha Wedding//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${config.hero.groomName} & ${config.hero.brideName} Wedding Celebration`,
      `DESCRIPTION:${config.hero.tagline}`,
      `LOCATION:${config.venue.venueName}, ${config.venue.address}`,
      `DTSTART:${dStr}T${tStr}`,
      `DTEND:${dStr}T235900`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${config.hero.groomName}-and-${config.hero.brideName}-Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const galleryItems = config.gallery.items || [];
  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2A29] flex flex-col font-sans selection:bg-[#EAE5DC]">

      {/* ======================================================== */}
      {/* TOP BAR CONTRACT WITH SECTION CUSTOMIZER TRIGGER        */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/92 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Zone 1: Wordmark */}
          <a
            href="#hero"
            className="font-serif text-2xl tracking-wide font-normal text-[#1F1E1D] hover:opacity-80 transition-opacity"
          >
            {config.hero.groomName} <span className="italic text-[#8C8275]">&amp;</span> {config.hero.brideName}
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-normal text-[#66635F]">
            <a href="#story" className="hover:text-[#1F1E1D] transition-colors">Our Story</a>
            <a href="#itinerary" className="hover:text-[#1F1E1D] transition-colors">Schedule</a>
            <a href="#venue" className="hover:text-[#1F1E1D] transition-colors">Venue</a>
            <a href="#gallery" className="hover:text-[#1F1E1D] transition-colors">Gallery</a>
            <a href="#rsvp" className="hover:text-[#1F1E1D] transition-colors">RSVP &amp; QR Pass</a>
            <a href="#wishes" className="hover:text-[#1F1E1D] transition-colors">Wishes</a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5">
            {/* Backend Section Customizer Button */}
            <button
              onClick={() => {
                setDraftConfig(JSON.parse(JSON.stringify(config)));
                setCustomizerOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#2C2A29] bg-[#EFECE6] border border-[#DCD6CA] rounded-md hover:bg-[#E5E0D5] transition-colors"
              title="Customize all website sections via Backend API"
            >
              <Sliders size={14} className="text-[#8C8275]" />
              <span className="hidden sm:inline">Customize Sections</span>
            </button>

            {/* Ambient Music Toggle */}
            <button
              onClick={toggleAmbientAudio}
              className="p-2.5 rounded-full border border-[#DCD6CA] text-[#66635F] hover:text-[#1F1E1D] hover:border-[#8C8275] transition-colors"
              title={ambientAudioActive ? 'Mute ambient harmony' : 'Play ambient audio'}
              aria-label="Toggle ambient atmosphere"
            >
              {ambientAudioActive ? <Volume2 size={16} className="text-[#8C8275]" /> : <VolumeX size={16} />}
            </button>

            {/* Quick Check-in Pass access button */}
            {generatedPass && (
              <a
                href="#rsvp"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors"
                title="View your generated venue check-in QR pass"
              >
                <QrCode size={13} />
                <span>My Pass</span>
              </a>
            )}

            {/* RSVP Button */}
            <a
              href="#rsvp"
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF9F6] bg-[#2C2A29] rounded-md hover:bg-[#43403E] transition-colors whitespace-nowrap shadow-xs"
            >
              RSVP
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2C2A29]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : (
                <div className="w-5 flex flex-col gap-1.5 items-end">
                  <span className="w-5 h-0.5 bg-[#2C2A29]"></span>
                  <span className="w-3.5 h-0.5 bg-[#2C2A29]"></span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E4DC] bg-[#FAF9F6] px-6 py-6 flex flex-col gap-4 text-base font-medium">
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-[#66635F] hover:text-[#1F1E1D]">Our Story</a>
            <a href="#itinerary" onClick={() => setMobileMenuOpen(false)} className="text-[#66635F] hover:text-[#1F1E1D]">Schedule</a>
            <a href="#venue" onClick={() => setMobileMenuOpen(false)} className="text-[#66635F] hover:text-[#1F1E1D]">Venue</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-[#66635F] hover:text-[#1F1E1D]">Gallery</a>
            <a href="#rsvp" onClick={() => setMobileMenuOpen(false)} className="text-[#66635F] hover:text-[#1F1E1D]">RSVP &amp; QR Pass</a>
            <a href="#wishes" onClick={() => setMobileMenuOpen(false)} className="text-[#66635F] hover:text-[#1F1E1D]">Wishes</a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setDraftConfig(JSON.parse(JSON.stringify(config)));
                setCustomizerOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-medium uppercase tracking-wider border border-[#DCD6CA] rounded-md bg-[#EFECE6]"
            >
              <Sliders size={14} /> Customize Sections
            </button>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* 1. HERO SECTION (WITH FRAMER MOTION ANIMATION)           */}
      {/* ======================================================== */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={config.hero.heroImage || heroImageDefault}
            alt={`${config.hero.groomName} & ${config.hero.brideName}`}
            className="w-full h-full object-cover object-center filter brightness-[0.92]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/90 via-[#1A1918]/45 to-[#1A1918]/30" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-[#FAF9F6] flex flex-col items-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs uppercase tracking-[0.25em] font-medium text-[#DCD6CA] mb-4"
          >
            {config.hero.subtag || "We are getting married"}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1.05] text-white max-w-3xl"
          >
            {config.hero.groomName}{' '}
            <span className="font-serif italic font-normal text-[#E8E2D5]">&amp;</span>{' '}
            {config.hero.brideName}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-base sm:text-lg md:text-xl font-light text-[#E8E4DC] max-w-xl mx-auto leading-relaxed"
          >
            {config.hero.tagline}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium tracking-wide text-[#DCD6CA] bg-[#1A1918]/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10"
          >
            <span>{config.hero.dateDisplay}</span>
            <span aria-hidden="true" className="opacity-50">·</span>
            <span>{config.hero.timeDisplay}</span>
            <span aria-hidden="true" className="opacity-50">·</span>
            <span>{config.hero.locationDisplay}</span>
          </motion.div>

          {config.hero.countdownEnabled && (
            <motion.div
              variants={fadeInUp}
              className="mt-12 grid grid-cols-4 gap-3 sm:gap-6 max-w-md w-full"
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="bg-black/30 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl flex flex-col items-center"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-light tabular-nums text-white">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#C4BDB0] mt-1">
                    {unit.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#rsvp"
              className="px-7 py-3 text-xs font-semibold uppercase tracking-wider bg-white text-[#1F1E1D] rounded-md hover:bg-[#EAE5DC] transition-colors shadow-lg"
            >
              Confirm Attendance &amp; Get QR Pass
            </a>
            <button
              onClick={downloadCalendarEvent}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wider border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <Calendar size={14} />
              Add to Calendar
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/60 text-[11px] tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-0.5 h-6 bg-white/30 mt-2 relative overflow-hidden">
            <div className="w-full h-1/2 bg-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. OUR STORY (FRAMER MOTION SCROLL ANIMATION)            */}
      {/* ======================================================== */}
      <motion.section
        id="story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        className="py-24 sm:py-32 px-6 bg-[#FAF9F6]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C8275]">
              {config.story.sectionTag}
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-light text-[#1F1E1D]">
              {config.story.title}
            </h2>
            <div className="w-12 h-0.5 bg-[#8C8275]/40 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Image */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="relative group">
                <div className="overflow-hidden rounded-2xl bg-[#EFECE6] border border-[#E8E4DC] shadow-sm">
                  <img
                    src={config.story.storyImage || storyImageDefault}
                    alt={`${config.hero.groomName} and ${config.hero.brideName}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {config.story.quote && (
                  <div className="absolute -bottom-4 -right-4 bg-[#F2EFE9] border border-[#DCD6CA] p-4 rounded-xl shadow-md hidden sm:block max-w-[210px]">
                    <p className="font-serif italic text-sm text-[#43403E] leading-snug">
                      "{config.story.quote}"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Narrative text */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6 text-[#524F4B]"
            >
              <p className="text-lg sm:text-xl font-serif text-[#1F1E1D] leading-relaxed">
                {config.story.leadText}
              </p>

              {config.story.paragraphs?.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Milestones */}
              {config.story.milestones?.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#E8E4DC] grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {config.story.milestones.map((m) => (
                    <div key={m.id || m.number}>
                      <span className="text-xs font-serif italic text-[#8C8275]">
                        {m.number}. {m.label}
                      </span>
                      <h4 className="text-sm font-semibold text-[#1F1E1D] mt-1">{m.title}</h4>
                      <p className="text-xs text-[#706C67] mt-1">{m.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ======================================================== */}
      {/* 3. EVENT SCHEDULE (FRAMER MOTION SCROLL ANIMATION)       */}
      {/* ======================================================== */}
      <motion.section
        id="itinerary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        className="py-24 sm:py-32 px-6 bg-[#F5F2EB] border-y border-[#E8E4DC]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C8275]">
              {config.itinerary.sectionTag}
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-light text-[#1F1E1D]">
              {config.itinerary.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#66635F]">
              {config.itinerary.subtitle}
            </p>
          </div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {config.itinerary.events?.map((ev, idx) => (
              <motion.div
                key={ev.id || idx}
                variants={fadeInUp}
                className="bg-[#FAF9F6] border border-[#E8E4DC] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#D5CEBF] transition-colors shadow-xs"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#EFECE6] border border-[#DCD6CA] flex items-center justify-center shrink-0 text-[#2C2A29]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#8C8275] uppercase tracking-wider">
                      <span>{ev.time}</span>
                      <span>·</span>
                      <span>{ev.location}</span>
                    </div>
                    <h3 className="text-xl font-serif text-[#1F1E1D] font-normal mt-1">
                      {ev.title}
                    </h3>
                    <p className="text-sm text-[#66635F] mt-2 max-w-xl leading-relaxed">
                      {ev.desc}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block self-center">
                  <span className="text-xs uppercase tracking-wider text-[#8C8275] bg-[#EFECE6] px-3.5 py-1.5 rounded-md font-medium whitespace-nowrap">
                    {ev.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {config.itinerary.notes?.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-[#66635F] pt-8 border-t border-[#E8E4DC]"
            >
              {config.itinerary.notes.map((note, idx) => (
                <div key={idx} className="p-4 bg-[#FAF9F6]/80 rounded-lg border border-[#E8E4DC]">
                  <span className="font-semibold text-[#1F1E1D] block mb-1">{note.title}</span>
                  {note.desc}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* ======================================================== */}
      {/* 4. VENUE & MAP (FRAMER MOTION SCROLL ANIMATION)          */}
      {/* ======================================================== */}
      <motion.section
        id="venue"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        className="py-24 sm:py-32 px-6 bg-[#FAF9F6]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C8275]">
              {config.venue.sectionTag}
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-light text-[#1F1E1D]">
              {config.venue.venueName}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#66635F]">
              {config.venue.address}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-5 bg-[#F5F2EB] border border-[#E8E4DC] rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8C8275]">
                  Venue Highlights
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#1F1E1D] mt-2">
                  {config.venue.tagline}
                </h3>
                <p className="text-sm text-[#66635F] mt-3 leading-relaxed">
                  {config.venue.description}
                </p>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#524F4B]">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#8C8275] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1F1E1D] block">Address</strong>
                      {config.venue.address}
                    </div>
                  </div>
                  {config.venue.valet && (
                    <div className="flex items-start gap-3">
                      <Car size={18} className="text-[#8C8275] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1F1E1D] block">Valet &amp; Parking</strong>
                        {config.venue.valet}
                      </div>
                    </div>
                  )}
                  {config.venue.shuttle && (
                    <div className="flex items-start gap-3">
                      <Info size={18} className="text-[#8C8275] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1F1E1D] block">Shuttle Details</strong>
                        {config.venue.shuttle}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E8E4DC] flex flex-wrap gap-3">
                <a
                  href={config.venue.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(config.venue.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C2A29] text-[#FAF9F6] text-xs uppercase tracking-wider font-semibold rounded-md hover:bg-[#43403E] transition-colors"
                >
                  <MapPin size={14} />
                  Open in Google Maps
                </a>
                <button
                  onClick={downloadCalendarEvent}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#DCD6CA] text-[#2C2A29] text-xs uppercase tracking-wider font-medium rounded-md hover:bg-[#EFECE6] transition-colors"
                >
                  <Download size={14} />
                  Save Itinerary
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="lg:col-span-7 bg-[#EFECE6] border border-[#E8E4DC] rounded-2xl overflow-hidden relative min-h-[380px] flex flex-col"
            >
              <iframe
                title="Venue Location Map"
                src={config.venue.mapEmbedUrl}
                className="w-full h-full min-h-[380px] border-0 filter grayscale-[40%] contrast-[105%]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#FAF9F6]/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E8E4DC] shadow-md flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8C8275] animate-ping" />
                <div>
                  <p className="text-xs font-semibold text-[#1F1E1D]">{config.venue.venueName}</p>
                  <p className="text-[11px] text-[#706C67]">Celebration Sanctuary</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ======================================================== */}
      {/* 5. PHOTO GALLERY (FRAMER MOTION SCROLL ANIMATION)        */}
      {/* ======================================================== */}
      <motion.section
        id="gallery"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        className="py-24 sm:py-32 px-6 bg-[#F5F2EB] border-t border-[#E8E4DC]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C8275]">
              {config.gallery.sectionTag}
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-light text-[#1F1E1D]">
              {config.gallery.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#66635F]">
              {config.gallery.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'portraits', label: 'Portraits' },
              { id: 'moments', label: 'Candid Moments' },
              { id: 'setting', label: 'The Setting' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setGalleryFilter(tab.id as any)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  galleryFilter === tab.id
                    ? 'bg-[#2C2A29] text-[#FAF9F6]'
                    : 'bg-[#FAF9F6] text-[#66635F] hover:text-[#1F1E1D] border border-[#E8E4DC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#EFECE6] border border-[#E8E4DC] shadow-xs aspect-4/5"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#DCD6CA] font-medium">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg font-normal text-white mt-0.5 leading-snug">
                    {item.title}
                  </h4>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#EAE5DC]">
                    <Maximize2 size={13} />
                    <span>Expand view</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activePhotoIndex !== null && filteredGallery[activePhotoIndex] && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActivePhotoIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#1A1918] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="aspect-16/10 max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={filteredGallery[activePhotoIndex].src}
                  alt={filteredGallery[activePhotoIndex].alt}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-[#1F1E1D] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-normal">
                    {filteredGallery[activePhotoIndex].title}
                  </h3>
                  <p className="text-xs text-[#C4BDB0] mt-1">
                    {filteredGallery[activePhotoIndex].caption}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#999] tabular-nums">
                    {activePhotoIndex + 1} of {filteredGallery.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setActivePhotoIndex((activePhotoIndex - 1 + filteredGallery.length) % filteredGallery.length)
                      }
                      className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() =>
                        setActivePhotoIndex((activePhotoIndex + 1) % filteredGallery.length)
                      }
                      className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.section>

      {/* ======================================================== */}
      {/* 6. RSVP & QR CODE CHECK-IN SECTION                       */}
      {/* ======================================================== */}
      <motion.section
        id="rsvp"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        className="py-24 sm:py-32 px-6 bg-[#FAF9F6]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C8275]">
              {config.rsvp.sectionTag}
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-light text-[#1F1E1D]">
              {config.rsvp.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#66635F]">
              {config.rsvp.subtitle}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setLookupModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#8C8275] hover:text-[#1F1E1D] underline underline-offset-4"
              >
                <Search size={13} />
                <span>Already RSVP'd? Retrieve your Venue QR Pass</span>
              </button>
            </div>
          </div>

          <div className="bg-[#FAF9F6] border border-[#E8E4DC] rounded-2xl p-8 sm:p-12 shadow-sm relative">
            {rsvpSubmitted ? (
              <div className="py-4">
                {/* Check-in QR Pass display */}
                {generatedPass ? (
                  <div className="space-y-8">
                    <div className="text-center max-w-md mx-auto">
                      <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="font-serif text-3xl font-normal text-[#1F1E1D]">
                        You're On The Guest List!
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#66635F]">
                        Here is your official digital check-in pass. Present this QR code to the welcome host upon arrival at High Grove.
                      </p>
                    </div>

                    {/* Physical/Digital Pass Card */}
                    <div className="max-w-md mx-auto bg-[#FAF9F6] border-2 border-[#DCD6CA] rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                      {/* Top pass header */}
                      <div className="flex items-start justify-between border-b border-[#E8E4DC] pb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8C8275] block">
                            VIP Wedding Pass
                          </span>
                          <h4 className="font-serif text-xl font-normal text-[#1F1E1D] mt-0.5">
                            {config.hero.groomName} &amp; {config.hero.brideName}
                          </h4>
                          <p className="text-[11px] text-[#706C67]">
                            {config.hero.dateDisplay} · {config.venue.venueName}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-mono tracking-wider bg-[#EFECE6] px-2 py-1 rounded text-[#524F4B]">
                            {generatedPass.code}
                          </span>
                        </div>
                      </div>

                      {/* Scannable QR Code */}
                      <div className="my-6 flex flex-col items-center">
                        <div className="p-3 bg-white rounded-xl border border-[#E0DBD0] shadow-2xs">
                          <img
                            src={generatedPass.qrUrl}
                            alt={`Check-in QR Code for ${generatedPass.name}`}
                            className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                          />
                        </div>
                        <span className="mt-2 text-[10px] uppercase font-mono tracking-wider text-[#8C8275]">
                          Code: {generatedPass.code}
                        </span>
                      </div>

                      {/* Guest credentials */}
                      <div className="pt-4 border-t border-[#E8E4DC] space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#706C67]">Guest Name:</span>
                          <span className="font-semibold text-[#1F1E1D]">{generatedPass.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#706C67]">Party Size:</span>
                          <span className="font-semibold text-[#1F1E1D]">
                            {generatedPass.guestCount} {generatedPass.guestCount === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>
                        {generatedPass.dietary && (
                          <div className="flex justify-between">
                            <span className="text-[#706C67]">Dietary Note:</span>
                            <span className="font-semibold text-[#8C8275]">{generatedPass.dietary}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-[#706C67]">Check-in Zone:</span>
                          <span className="font-semibold text-[#1F1E1D]">Olive Grove Welcome Desk</span>
                        </div>
                        <div className="pt-2.5 mt-2 border-t border-[#E8E4DC] flex items-center justify-between text-[10px] text-[#706C67]">
                          <span>Digital pass system</span>
                          <div className="flex items-center gap-1.5 text-[#1F1E1D]">
                            <span className="text-[#8C8275]">by</span>
                            <CirkkleLogo className="h-3 w-auto text-[#1F1E1D]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pass Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={generatedPass.qrUrl}
                        download={`${generatedPass.name.replace(/\s+/g, '_')}_Wedding_Pass.png`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#2C2A29] text-white rounded-md hover:bg-[#43403E] transition-colors shadow-sm"
                      >
                        <Download size={14} />
                        Download QR Pass
                      </a>
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wider border border-[#DCD6CA] rounded-md hover:bg-[#EFECE6] transition-colors"
                      >
                        <Printer size={14} />
                        Print Pass
                      </button>
                      <button
                        onClick={() => {
                          setRsvpSubmitted(false);
                          setRsvpForm({
                            name: '',
                            email: '',
                            attending: 'attending',
                            guestCount: '1',
                            dietary: '',
                            message: '',
                          });
                        }}
                        className="px-4 py-2.5 text-xs font-medium text-[#706C67] hover:text-[#1F1E1D] transition-colors"
                      >
                        Submit Another Response
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Declining attendance thank you state */
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-[#EFECE6] border border-[#DCD6CA] text-[#2C2A29] rounded-full flex items-center justify-center mx-auto mb-5">
                      <Heart size={24} className="text-[#8C8275]" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1F1E1D]">
                      Thank You, {rsvpForm.name}
                    </h3>
                    <p className="mt-3 text-sm text-[#66635F] max-w-md mx-auto leading-relaxed">
                      We will truly miss having you with us on our wedding day, but thank you warmly for taking the time to share your love and wishes!
                    </p>
                    <div className="mt-8">
                      <button
                        onClick={() => setRsvpSubmitted(false)}
                        className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider border border-[#DCD6CA] rounded-md hover:bg-[#EFECE6] transition-colors"
                      >
                        Back to Form
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="guest-name"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#524F4B] mb-2"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      required
                      placeholder="e.g. Jordan Sterling"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F5F2EB] border border-[#E0DBD0] rounded-lg text-sm text-[#1F1E1D] focus:outline-hidden focus:border-[#8C8275] focus:ring-1 focus:ring-[#8C8275]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-email"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#524F4B] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="guest-email"
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={rsvpForm.email}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F5F2EB] border border-[#E0DBD0] rounded-lg text-sm text-[#1F1E1D] focus:outline-hidden focus:border-[#8C8275] focus:ring-1 focus:ring-[#8C8275]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524F4B] mb-3">
                    Will You Be Attending? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-center justify-center gap-2 p-3.5 rounded-lg border cursor-pointer text-sm font-medium transition-all ${
                        rsvpForm.attending === 'attending'
                          ? 'border-[#2C2A29] bg-[#EFECE6] text-[#1F1E1D] font-semibold'
                          : 'border-[#E0DBD0] bg-[#FAF9F6] text-[#66635F] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="attending"
                        checked={rsvpForm.attending === 'attending'}
                        onChange={() => setRsvpForm({ ...rsvpForm, attending: 'attending' })}
                        className="sr-only"
                      />
                      <Check size={16} className={rsvpForm.attending === 'attending' ? 'opacity-100' : 'opacity-0'} />
                      <span>Joyfully Attending</span>
                    </label>

                    <label
                      className={`flex items-center justify-center gap-2 p-3.5 rounded-lg border cursor-pointer text-sm font-medium transition-all ${
                        rsvpForm.attending === 'declining'
                          ? 'border-[#2C2A29] bg-[#EFECE6] text-[#1F1E1D] font-semibold'
                          : 'border-[#E0DBD0] bg-[#FAF9F6] text-[#66635F] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="declining"
                        checked={rsvpForm.attending === 'declining'}
                        onChange={() => setRsvpForm({ ...rsvpForm, attending: 'declining' })}
                        className="sr-only"
                      />
                      <X size={16} className={rsvpForm.attending === 'declining' ? 'opacity-100' : 'opacity-0'} />
                      <span>Regretfully Declining</span>
                    </label>
                  </div>
                </div>

                {rsvpForm.attending === 'attending' && config.rsvp.allowPlusOne && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Interactive + and - stepper for Number of Guests */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#524F4B] mb-2">
                        Number of Attending Guests
                      </label>
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#F5F2EB] border border-[#E0DBD0] rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-[#8C8275]" />
                          <span className="text-sm font-semibold text-[#1F1E1D] tabular-nums">
                            {rsvpForm.guestCount} {Number(rsvpForm.guestCount) === 1 ? 'Guest' : 'Guests'}
                          </span>
                          <span className="text-[11px] text-[#706C67] hidden sm:inline">
                            {Number(rsvpForm.guestCount) === 1 ? '(Self)' : `(+${Number(rsvpForm.guestCount) - 1} Companion)`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const current = Math.max(1, Number(rsvpForm.guestCount) || 1);
                              if (current > 1) {
                                setRsvpForm({ ...rsvpForm, guestCount: String(current - 1) });
                              }
                            }}
                            disabled={Number(rsvpForm.guestCount) <= 1}
                            className="w-8 h-8 rounded-md bg-[#FAF9F6] border border-[#DCD6CA] text-[#2C2A29] flex items-center justify-center hover:bg-[#EFECE6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
                            aria-label="Decrease number of guests"
                            title="Decrease guest count"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold tabular-nums text-[#1F1E1D]">
                            {rsvpForm.guestCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Math.max(1, Number(rsvpForm.guestCount) || 1);
                              if (current < 10) {
                                setRsvpForm({ ...rsvpForm, guestCount: String(current + 1) });
                              }
                            }}
                            disabled={Number(rsvpForm.guestCount) >= 10}
                            className="w-8 h-8 rounded-md bg-[#FAF9F6] border border-[#DCD6CA] text-[#2C2A29] flex items-center justify-center hover:bg-[#EFECE6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
                            aria-label="Increase number of guests"
                            title="Increase guest count"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {config.rsvp.dietaryEnabled && (
                      <div>
                        <label
                          htmlFor="dietary-pref"
                          className="block text-xs uppercase tracking-wider font-semibold text-[#524F4B] mb-2"
                        >
                          Dietary Preferences
                        </label>
                        <input
                          id="dietary-pref"
                          type="text"
                          placeholder="e.g. Vegetarian, Gluten-Free, Vegan, Allergies"
                          value={rsvpForm.dietary}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F5F2EB] border border-[#E0DBD0] rounded-lg text-sm text-[#1F1E1D] focus:outline-hidden focus:border-[#8C8275]"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="guest-message"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#524F4B] mb-2"
                  >
                    Warm Wishes &amp; Congratulatory Note
                  </label>
                  <textarea
                    id="guest-message"
                    rows={4}
                    placeholder="Leave a heartfelt message for the couple..."
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F2EB] border border-[#E0DBD0] rounded-lg text-sm text-[#1F1E1D] focus:outline-hidden focus:border-[#8C8275] focus:ring-1 focus:ring-[#8C8275]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingRsvp}
                    className="w-full py-3.5 bg-[#2C2A29] text-white rounded-lg text-xs uppercase tracking-widest font-semibold hover:bg-[#43403E] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSubmittingRsvp ? (
                      <span>Generating QR Pass &amp; Saving...</span>
                    ) : (
                      <>
                        <QrCode size={16} />
                        <span>Send Response &amp; Generate Venue QR Pass</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* ======================================================== */}
      {/* 7. WISHES / GUESTBOOK BOARD (FRAMER MOTION SCROLL)       */}
      {/* ======================================================== */}
      <motion.section
        id="wishes"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        className="py-20 px-6 bg-[#F5F2EB] border-t border-[#E8E4DC]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C8275]">
              Love &amp; Well Wishes
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-light text-[#1F1E1D]">
              Messages for {config.hero.groomName} &amp; {config.hero.brideName}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#66635F]">
              Heartfelt messages and congratulations from family and friends.
            </p>
          </div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rsvps
              .filter((r) => r.message && r.message.trim().length > 0)
              .map((entry) => (
                <motion.div
                  key={entry.id}
                  variants={fadeInUp}
                  className="bg-[#FAF9F6] border border-[#E8E4DC] p-6 rounded-xl flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8C8275] mb-3">
                      <span className="font-semibold text-[#1F1E1D]">{entry.name}</span>
                      <span>
                        {entry.createdAt
                          ? new Date(entry.createdAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'Recently'}
                      </span>
                    </div>
                    <p className="text-sm font-serif italic text-[#43403E] leading-relaxed">
                      "{entry.message}"
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#EFECE6] flex items-center justify-between text-[11px] text-[#706C67]">
                    <div className="flex items-center gap-1.5">
                      <Heart size={12} className="text-[#8C8275] fill-[#8C8275]/20" />
                      <span>{entry.attending ? 'Attending Celebration' : 'Warm Wishes Sent'}</span>
                    </div>
                    {entry.dietary && (
                      <span className="text-[10px] text-[#8C8275] italic">{entry.dietary}</span>
                    )}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ======================================================== */}
      {/* 8. FOOTER                                                */}
      {/* ======================================================== */}
      <footer className="py-16 px-6 bg-[#1F1E1D] text-[#FAF9F6]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-wide">
            {config.hero.groomName}{' '}
            <span className="italic font-serif text-[#C4BDB0]">&amp;</span>{' '}
            {config.hero.brideName}
          </h3>

          <p className="mt-3 text-xs uppercase tracking-widest text-[#A8A196]">
            {config.hero.dateDisplay} · {config.venue.venueName}
          </p>

          <div className="w-16 h-px bg-[#43403E] my-8" />

          <p className="text-xs text-[#8C867D] max-w-md leading-relaxed">
            {config.footer.text}
          </p>

          <div className="mt-8 flex items-center gap-6 text-xs text-[#A8A196]">
            <a href="#hero" className="hover:text-white transition-colors">Back to Top</a>
            <span aria-hidden="true">·</span>
            <a href="#story" className="hover:text-white transition-colors">Story</a>
            <span aria-hidden="true">·</span>
            <a href="#itinerary" className="hover:text-white transition-colors">Schedule</a>
            <span aria-hidden="true">·</span>
            <a href="#rsvp" className="hover:text-white transition-colors">RSVP &amp; QR Pass</a>
          </div>

          {/* Designer Branding: cirkkle */}
          <div className="mt-12 pt-8 border-t border-[#3E3C3A] w-full max-w-sm flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C867D] font-medium">
              Designed by
            </span>
            <div className="flex items-center gap-2 py-1">
              <CirkkleLogo className="h-7 w-auto text-white hover:opacity-80 transition-opacity" />
            </div>
            <p className="text-[10px] text-[#66635F] tracking-wide">
              {config.footer.subtext}
            </p>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* LOOKUP QR PASS MODAL                                     */}
      {/* ======================================================== */}
      {lookupModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLookupModalOpen(false)}
        >
          <div
            className="max-w-md w-full bg-[#FAF9F6] rounded-2xl p-6 sm:p-8 border border-[#DCD6CA] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <QrCode size={18} className="text-[#8C8275]" />
                <h3 className="font-serif text-xl font-normal text-[#1F1E1D]">
                  Retrieve Check-in Pass
                </h3>
              </div>
              <button
                onClick={() => setLookupModalOpen(false)}
                className="p-1 text-[#706C67] hover:text-[#1F1E1D]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#66635F] mb-5">
              Enter the email address you used when submitting your RSVP to display or re-download your venue QR pass.
            </p>

            <form onSubmit={handleLookupPass} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#524F4B] mb-1.5">
                  Your RSVP Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@example.com"
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F2EB] border border-[#E0DBD0] rounded-lg text-sm"
                />
              </div>

              {lookupError && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200">
                  {lookupError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2C2A29] text-white rounded-lg text-xs uppercase tracking-widest font-semibold hover:bg-[#43403E] transition-colors"
              >
                Find &amp; Display QR Pass
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. BACKEND SECTION CUSTOMIZATION DRAWER                  */}
      {/* ======================================================== */}
      {customizerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-2xl bg-[#FAF9F6] h-full shadow-2xl flex flex-col border-l border-[#DCD6CA] overflow-hidden">
            {/* Customizer Header */}
            <div className="p-5 border-b border-[#E8E4DC] bg-[#F5F2EB] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sliders size={18} className="text-[#8C8275]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl font-normal text-[#1F1E1D]">
                      Section Customizer
                    </h3>
                    <div className="flex items-center gap-1.5 pl-2 border-l border-[#DCD6CA]">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C8275]">by</span>
                      <CirkkleLogo className="h-3.5 w-auto text-[#1F1E1D]" />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#706C67]">
                    Live customization persisted to Express server (`/api/wedding`)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetConfig}
                  className="px-3 py-1.5 text-xs font-medium text-[#706C67] hover:text-[#1F1E1D] border border-[#DCD6CA] rounded-md hover:bg-[#EFECE6] transition-colors flex items-center gap-1"
                  title="Reset all fields to defaults"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
                <button
                  onClick={() => setCustomizerOpen(false)}
                  className="p-1.5 text-[#66635F] hover:text-[#1F1E1D] rounded-md hover:bg-[#EAE5DC]"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Customizer Tab Selector */}
            <div className="flex items-center overflow-x-auto border-b border-[#E8E4DC] bg-[#FAF9F6] px-4 py-2 gap-1 text-xs font-medium shrink-0">
              {[
                { id: 'hero', label: '1. Hero & Couple' },
                { id: 'story', label: '2. Our Story' },
                { id: 'itinerary', label: '3. Itinerary' },
                { id: 'venue', label: '4. Venue & Map' },
                { id: 'gallery', label: '5. Gallery' },
                { id: 'rsvps', label: `6. RSVPs & Passes (${rsvps.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCustomizerTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                    activeCustomizerTab === tab.id
                      ? 'bg-[#2C2A29] text-white shadow-xs'
                      : 'text-[#66635F] hover:text-[#1F1E1D] hover:bg-[#EFECE6]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Success toast inside modal */}
            {saveSuccessMessage && (
              <div className="bg-[#EAE5DC] text-[#2C2A29] px-5 py-2 text-xs flex items-center gap-2 font-medium border-b border-[#DCD6CA]">
                <Check size={14} className="text-emerald-700" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {/* Customizer Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: HERO */}
              {activeCustomizerTab === 'hero' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#524F4B] mb-1">Groom Name</label>
                      <input
                        type="text"
                        value={draftConfig.hero.groomName}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            hero: { ...draftConfig.hero, groomName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#524F4B] mb-1">Bride Name</label>
                      <input
                        type="text"
                        value={draftConfig.hero.brideName}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            hero: { ...draftConfig.hero, brideName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Romantic Tagline</label>
                    <textarea
                      rows={2}
                      value={draftConfig.hero.tagline}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          hero: { ...draftConfig.hero, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#524F4B] mb-1">Date Display Text</label>
                      <input
                        type="text"
                        value={draftConfig.hero.dateDisplay}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            hero: { ...draftConfig.hero, dateDisplay: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#524F4B] mb-1">Time Display Text</label>
                      <input
                        type="text"
                        value={draftConfig.hero.timeDisplay}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            hero: { ...draftConfig.hero, timeDisplay: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#524F4B] mb-1">Location Display</label>
                      <input
                        type="text"
                        value={draftConfig.hero.locationDisplay}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            hero: { ...draftConfig.hero, locationDisplay: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#524F4B] mb-1">Countdown ISO Date</label>
                      <input
                        type="date"
                        value={draftConfig.hero.weddingDate}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            hero: { ...draftConfig.hero, weddingDate: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                      />
                    </div>
                  </div>

                  <ImageUploadZone
                    label="Hero Section Background Photo"
                    currentImage={draftConfig.hero.heroImage}
                    onImageUploaded={(url) =>
                      setDraftConfig({
                        ...draftConfig,
                        hero: { ...draftConfig.hero, heroImage: url },
                      })
                    }
                    defaultImage={heroImageDefault}
                    helperText="Upload full-screen background photo (JPG, PNG, WebP)"
                  />
                </div>
              )}

              {/* TAB 2: OUR STORY */}
              {activeCustomizerTab === 'story' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Story Section Title</label>
                    <input
                      type="text"
                      value={draftConfig.story.title}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          story: { ...draftConfig.story, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Story Lead Paragraph</label>
                    <textarea
                      rows={2}
                      value={draftConfig.story.leadText}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          story: { ...draftConfig.story, leadText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Quote Box Text</label>
                    <input
                      type="text"
                      value={draftConfig.story.quote}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          story: { ...draftConfig.story, quote: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                    />
                  </div>

                  <ImageUploadZone
                    label="Our Story Portrait Photo"
                    currentImage={draftConfig.story.storyImage}
                    onImageUploaded={(url) =>
                      setDraftConfig({
                        ...draftConfig,
                        story: { ...draftConfig.story, storyImage: url },
                      })
                    }
                    defaultImage={storyImageDefault}
                    helperText="Upload couple story editorial photo (JPG, PNG, WebP)"
                  />

                  {/* Milestones list */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#524F4B]">Milestones</span>
                      <button
                        onClick={() => {
                          const nextNum = String(draftConfig.story.milestones.length + 1).padStart(2, '0');
                          const newMilestone: Milestone = {
                            id: 'm-' + Date.now(),
                            number: nextNum,
                            label: 'New Milestone',
                            title: 'Season Year',
                            desc: 'Description of milestone',
                          };
                          setDraftConfig({
                            ...draftConfig,
                            story: {
                              ...draftConfig.story,
                              milestones: [...draftConfig.story.milestones, newMilestone],
                            },
                          });
                        }}
                        className="text-xs text-[#2C2A29] font-medium flex items-center gap-1 hover:underline"
                      >
                        <Plus size={12} /> Add Milestone
                      </button>
                    </div>

                    <div className="space-y-3">
                      {draftConfig.story.milestones.map((m, idx) => (
                        <div key={m.id || idx} className="p-3 bg-[#F5F2EB] border border-[#DCD6CA] rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-semibold text-[#8C8275]">#{m.number}</span>
                            <button
                              onClick={() => {
                                const updated = draftConfig.story.milestones.filter((_, i) => i !== idx);
                                setDraftConfig({
                                  ...draftConfig,
                                  story: { ...draftConfig.story, milestones: updated },
                                });
                              }}
                              className="text-red-700 hover:text-red-900"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={m.label}
                              placeholder="Label"
                              onChange={(e) => {
                                const copy = [...draftConfig.story.milestones];
                                copy[idx].label = e.target.value;
                                setDraftConfig({
                                  ...draftConfig,
                                  story: { ...draftConfig.story, milestones: copy },
                                });
                              }}
                              className="px-2 py-1 bg-white border border-[#DCD6CA] rounded text-xs"
                            />
                            <input
                              type="text"
                              value={m.title}
                              placeholder="Title"
                              onChange={(e) => {
                                const copy = [...draftConfig.story.milestones];
                                copy[idx].title = e.target.value;
                                setDraftConfig({
                                  ...draftConfig,
                                  story: { ...draftConfig.story, milestones: copy },
                                });
                              }}
                              className="px-2 py-1 bg-white border border-[#DCD6CA] rounded text-xs"
                            />
                          </div>
                          <input
                            type="text"
                            value={m.desc}
                            placeholder="Description"
                            onChange={(e) => {
                              const copy = [...draftConfig.story.milestones];
                              copy[idx].desc = e.target.value;
                              setDraftConfig({
                                ...draftConfig,
                                story: { ...draftConfig.story, milestones: copy },
                              });
                            }}
                            className="w-full px-2 py-1 bg-white border border-[#DCD6CA] rounded text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ITINERARY */}
              {activeCustomizerTab === 'itinerary' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Itinerary Title</label>
                    <input
                      type="text"
                      value={draftConfig.itinerary.title}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          itinerary: { ...draftConfig.itinerary, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#524F4B]">Timeline Event Cards</span>
                    <button
                      onClick={() => {
                        const newEvent: EventItem = {
                          id: 'e-' + Date.now(),
                          time: '18:00',
                          title: 'New Celebration Event',
                          desc: 'Description of event proceedings.',
                          location: 'Terrace & Lawn',
                          icon: 'Sparkles',
                        };
                        setDraftConfig({
                          ...draftConfig,
                          itinerary: {
                            ...draftConfig.itinerary,
                            events: [...draftConfig.itinerary.events, newEvent],
                          },
                        });
                      }}
                      className="text-xs text-[#2C2A29] font-medium flex items-center gap-1 hover:underline"
                    >
                      <Plus size={12} /> Add Event
                    </button>
                  </div>

                  <div className="space-y-3">
                    {draftConfig.itinerary.events?.map((ev, idx) => (
                      <div key={ev.id || idx} className="p-3 bg-[#F5F2EB] border border-[#DCD6CA] rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={ev.time}
                            placeholder="Time"
                            onChange={(e) => {
                              const copy = [...draftConfig.itinerary.events];
                              copy[idx].time = e.target.value;
                              setDraftConfig({
                                ...draftConfig,
                                itinerary: { ...draftConfig.itinerary, events: copy },
                              });
                            }}
                            className="w-28 px-2 py-1 bg-white border border-[#DCD6CA] rounded text-xs font-medium"
                          />
                          <button
                            onClick={() => {
                              const updated = draftConfig.itinerary.events.filter((_, i) => i !== idx);
                              setDraftConfig({
                                ...draftConfig,
                                itinerary: { ...draftConfig.itinerary, events: updated },
                              });
                            }}
                            className="text-red-700 hover:text-red-900"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={ev.title}
                          placeholder="Event Title"
                          onChange={(e) => {
                            const copy = [...draftConfig.itinerary.events];
                            copy[idx].title = e.target.value;
                            setDraftConfig({
                              ...draftConfig,
                              itinerary: { ...draftConfig.itinerary, events: copy },
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-[#DCD6CA] rounded text-xs font-semibold"
                        />
                        <input
                          type="text"
                          value={ev.location}
                          placeholder="Location"
                          onChange={(e) => {
                            const copy = [...draftConfig.itinerary.events];
                            copy[idx].location = e.target.value;
                            setDraftConfig({
                              ...draftConfig,
                              itinerary: { ...draftConfig.itinerary, events: copy },
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-[#DCD6CA] rounded text-xs"
                        />
                        <textarea
                          rows={2}
                          value={ev.desc}
                          placeholder="Description"
                          onChange={(e) => {
                            const copy = [...draftConfig.itinerary.events];
                            copy[idx].desc = e.target.value;
                            setDraftConfig({
                              ...draftConfig,
                              itinerary: { ...draftConfig.itinerary, events: copy },
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-[#DCD6CA] rounded text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: VENUE & MAP */}
              {activeCustomizerTab === 'venue' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Venue Name</label>
                    <input
                      type="text"
                      value={draftConfig.venue.venueName}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          venue: { ...draftConfig.venue, venueName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Full Address</label>
                    <input
                      type="text"
                      value={draftConfig.venue.address}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          venue: { ...draftConfig.venue, address: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Venue Description</label>
                    <textarea
                      rows={3}
                      value={draftConfig.venue.description}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          venue: { ...draftConfig.venue, description: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524F4B] mb-1">Google Maps Embed URL</label>
                    <input
                      type="text"
                      value={draftConfig.venue.mapEmbedUrl}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          venue: { ...draftConfig.venue, mapEmbedUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F5F2EB] border border-[#DCD6CA] rounded-md text-sm font-mono text-xs"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: GALLERY */}
              {activeCustomizerTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#524F4B]">Gallery Photos</span>
                    <button
                      onClick={() => {
                        const newPhoto: GalleryItem = {
                          id: 'g-' + Date.now(),
                          src: heroImageDefault,
                          category: 'portraits',
                          title: 'New Photo',
                          caption: 'Photo caption description',
                          alt: 'Celebration photo',
                        };
                        setDraftConfig({
                          ...draftConfig,
                          gallery: {
                            ...draftConfig.gallery,
                            items: [...draftConfig.gallery.items, newPhoto],
                          },
                        });
                      }}
                      className="text-xs text-[#2C2A29] font-medium flex items-center gap-1 hover:underline"
                    >
                      <Plus size={12} /> Add Photo
                    </button>
                  </div>

                  <div className="space-y-3">
                    {draftConfig.gallery.items?.map((item, idx) => (
                      <div key={item.id || idx} className="p-3 bg-[#F5F2EB] border border-[#DCD6CA] rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#1F1E1D]">Photo #{idx + 1}</span>
                          <button
                            onClick={() => {
                              const updated = draftConfig.gallery.items.filter((_, i) => i !== idx);
                              setDraftConfig({
                                ...draftConfig,
                                gallery: { ...draftConfig.gallery, items: updated },
                              });
                            }}
                            className="text-red-700 hover:text-red-900"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          placeholder="Photo Title"
                          onChange={(e) => {
                            const copy = [...draftConfig.gallery.items];
                            copy[idx].title = e.target.value;
                            setDraftConfig({
                              ...draftConfig,
                              gallery: { ...draftConfig.gallery, items: copy },
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-[#DCD6CA] rounded text-xs font-medium"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-semibold text-[#706C67] mb-1">Category</label>
                            <select
                              value={item.category}
                              onChange={(e) => {
                                const copy = [...draftConfig.gallery.items];
                                copy[idx].category = e.target.value;
                                setDraftConfig({
                                  ...draftConfig,
                                  gallery: { ...draftConfig.gallery, items: copy },
                                });
                              }}
                              className="w-full px-2 py-1.5 bg-white border border-[#DCD6CA] rounded text-xs"
                            >
                              <option value="portraits">Portraits</option>
                              <option value="moments">Candid Moments</option>
                              <option value="setting">The Setting</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-[#706C67] mb-1">Caption</label>
                            <input
                              type="text"
                              value={item.caption}
                              placeholder="Photo caption..."
                              onChange={(e) => {
                                const copy = [...draftConfig.gallery.items];
                                copy[idx].caption = e.target.value;
                                setDraftConfig({
                                  ...draftConfig,
                                  gallery: { ...draftConfig.gallery, items: copy },
                                });
                              }}
                              className="w-full px-2 py-1.5 bg-white border border-[#DCD6CA] rounded text-xs"
                            />
                          </div>
                        </div>

                        <ImageUploadZone
                          label="Upload / Change Photo"
                          currentImage={item.src}
                          onImageUploaded={(url) => {
                            const copy = [...draftConfig.gallery.items];
                            copy[idx].src = url;
                            setDraftConfig({
                              ...draftConfig,
                              gallery: { ...draftConfig.gallery, items: copy },
                            });
                          }}
                          helperText="Click to select or drop image from computer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: BACKEND RSVPs & QR CHECK-IN MANAGEMENT */}
              {activeCustomizerTab === 'rsvps' && (
                <div className="space-y-4">
                  {/* Stats header */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-[#EFECE6] rounded-lg border border-[#DCD6CA]">
                      <span className="text-xl font-serif font-semibold text-[#1F1E1D]">
                        {rsvpStats.attendingCount}
                      </span>
                      <span className="block text-[10px] uppercase text-[#66635F]">Attending</span>
                    </div>
                    <div className="p-3 bg-[#EFECE6] rounded-lg border border-[#DCD6CA]">
                      <span className="text-xl font-serif font-semibold text-[#1F1E1D]">
                        {rsvpStats.totalGuests}
                      </span>
                      <span className="block text-[10px] uppercase text-[#66635F]">Headcount</span>
                    </div>
                    <div className="p-3 bg-[#EFECE6] rounded-lg border border-[#DCD6CA]">
                      <span className="text-xl font-serif font-semibold text-[#1F1E1D]">
                        {rsvps.filter((r) => r.checkedIn).length}
                      </span>
                      <span className="block text-[10px] uppercase text-emerald-700 font-semibold">
                        Checked In
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#524F4B]">
                      Guest Arrival Roster ({rsvps.length})
                    </span>
                    <a
                      href="/api/rsvps/export"
                      download="wedding-rsvps.csv"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C2A29] bg-[#EFECE6] border border-[#DCD6CA] rounded-md hover:bg-[#E5E0D5]"
                    >
                      <Download size={13} /> Export CSV
                    </a>
                  </div>

                  <div className="space-y-3">
                    {rsvps.length === 0 ? (
                      <p className="text-xs text-[#706C67] text-center py-4">No RSVPs recorded yet.</p>
                    ) : (
                      rsvps.map((r) => (
                        <div
                          key={r.id}
                          className={`p-3.5 bg-white border rounded-lg space-y-2 text-xs transition-colors ${
                            r.checkedIn ? 'border-emerald-300 bg-emerald-50/30' : 'border-[#DCD6CA]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-sm text-[#1F1E1D]">{r.name}</span>
                              <span className="text-[11px] font-mono text-[#8C8275] ml-2">
                                {r.checkInCode || `AS-${r.id.slice(-6)}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {r.attending && (
                                <button
                                  onClick={() => handleToggleCheckIn(r.id, !!r.checkedIn)}
                                  className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                                    r.checkedIn
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-[#EFECE6] text-[#2C2A29] border border-[#DCD6CA] hover:bg-emerald-100'
                                  }`}
                                >
                                  {r.checkedIn ? (
                                    <>
                                      <Check size={12} /> Checked In
                                    </>
                                  ) : (
                                    'Check In'
                                  )}
                                </button>
                              )}
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  r.attending
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-stone-200 text-stone-700'
                                }`}
                              >
                                {r.attending ? `${r.guestCount || 1} Guests` : 'Declined'}
                              </span>
                            </div>
                          </div>
                          <div className="text-[11px] text-[#706C67] flex items-center justify-between">
                            <span>{r.email}</span>
                            {r.checkedInAt && (
                              <span className="text-[10px] text-emerald-700">
                                Arrived {new Date(r.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                          </div>
                          {r.dietary && (
                            <div className="text-[11px] text-[#8C8275]">
                              <strong>Dietary:</strong> {r.dietary}
                            </div>
                          )}
                          {r.message && (
                            <div className="text-xs italic text-[#43403E] bg-[#FAF9F6] p-2 rounded border border-[#E8E4DC]">
                              "{r.message}"
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Customizer Sticky Save Footer */}
            <div className="p-4 border-t border-[#E8E4DC] bg-[#F5F2EB] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#706C67]">
                Saves directly to server storage
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomizerOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#524F4B] hover:text-[#1F1E1D]"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveConfig}
                  disabled={isSavingConfig}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#43403E] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Save size={14} />
                  {isSavingConfig ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
