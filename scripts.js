/* ═══════════════════════════════════════════
   ExZistence Club — scripts.js
   JSON-driven links + Theme toggle
═══════════════════════════════════════════

   HOW TO UPDATE LINKS:
   ─────────────────────
   Just edit the SOCIAL_LINKS array below.
   Each object takes:
     • name     — display label (short)
     • platform — used for CSS glow targeting (lowercase, no spaces)
     • href     — full URL
     • img      — path to icon in images/ folder
     • cta      — small action text on the card (optional, default "Follow")

   To ADD a platform: add a new object to the array.
   To REMOVE one:     delete its object.
   To REORDER:        drag objects up/down in the array.
   No HTML editing needed.
═══════════════════════════════════════════ */

const SOCIAL_LINKS = [
  {
    name:     "WhatsApp",
    platform: "whatsapp",
    href:     "https://chat.whatsapp.com/LIIJ2dMLc539KQdyZ7MvH6",
    img:      "images/whatsapp.png",
    cta:      "Join Group"
  },
  {
    name:     "Telegram",
    platform: "telegram",
    href:     "https://t.me/+bGf9AhCHkpo5ZDlk",
    img:      "images/telegram.png",
    cta:      "Join Channel"
  },
  {
    name:     "Instagram",
    platform: "instagram",
    href:     "https://www.instagram.com/exzistence_ee/",
    img:      "images/instagram.png",
    cta:      "Follow"
  },
  {
    name:     "TikTok",
    platform: "tiktok",
    href:     "https://www.tiktok.com/@exzistence_ee",
    img:      "images/tik-tok.png",
    cta:      "Follow"
  },
  {
    name:     "X / Twitter",
    platform: "twitter",
    href:     "https://x.com/exzistence_ee",
    img:      "images/twitter.png",
    cta:      "Follow"
  },
  {
    name:     "Discord",
    platform: "discord",
    href:     "https://discord.gg/NVsnyu2usP",
    img:      "images/discord.png",
    cta:      "Join"
  },
  {
    name:     "LinkedIn",
    platform: "linkedin",
    href:     "https://www.linkedin.com/company/exzistence-club-upm",
    img:      "images/linkedin.png",
    cta:      "Connect"
  },
  {
    name:     "MS Teams",
    platform: "teams",
    href:     "https://teams.microsoft.com/l/channel/19%3A59626f6df0fa40d9a3a4d63369c4c3ba%40thread.skype/General?groupId=ba55339b-2f24-4d0e-9769-9fbc33cc7268&tenantId=1d44fb2b-bc2f-4259-a377-e8df8cace13b",
    img:      "images/business.png",
    cta:      "Join"
  }
];

/* ─── Membership link ───────────────────────────
   Update href here to point to the current form.
──────────────────────────────────────────────── */
const MEMBERSHIP_HREF = "https://forms.office.com/pages/responsepage.aspx?id=K_tEHS-8WUKjd-jfjKzhO6RPAP8btE9FnekRyIr_wVhUMkhVUjQzTFFYSFBKV0s4WkJJVTNOTEhCNC4u&route=shorturl";


/* ═══════════════════
   RENDER SOCIAL CARDS
═══════════════════ */
function renderLinks() {
  const grid = document.getElementById("linksGrid");
  if (!grid) return;

  grid.innerHTML = "";

  SOCIAL_LINKS.forEach((link, i) => {
    const a = document.createElement("a");
    a.href            = link.href;
    a.target          = "_blank";
    a.rel             = "noopener noreferrer";
    a.className       = "social-card";
    a.dataset.platform = link.platform;
    a.style.animationDelay = `${i * 0.07}s`;

    a.innerHTML = `
      <div class="card-img-wrap">
        <img src="${link.img}" alt="${link.name} icon" loading="lazy" />
      </div>
      <span class="card-name">${link.name}</span>
      <span class="card-cta">${link.cta || "Visit"}</span>
    `;

    grid.appendChild(a);
  });
}


/* ═══════════════════
   THEME TOGGLE
═══════════════════ */
const html        = document.documentElement;
const themeBtn    = document.getElementById("themeToggle");
const STORAGE_KEY = "exzistence-theme";

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  themeBtn.querySelector(".toggle-icon").textContent = theme === "dark" ? "☀" : "🌙";
  localStorage.setItem(STORAGE_KEY, theme);
}

function toggleTheme() {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

// Restore saved preference
// The initial load logic was moved to index.html to prevent flashing.
// We just need to sync the button icon on load:
const currentTheme = html.getAttribute("data-theme") || "dark";
themeBtn.querySelector(".toggle-icon").textContent = currentTheme === "dark" ? "☀" : "🌙";

themeBtn.addEventListener("click", toggleTheme);


/* ═══════════════════
   MEMBERSHIP LINK
═══════════════════ */
const joinBtn = document.getElementById("joinBtn");
if (joinBtn) joinBtn.href = MEMBERSHIP_HREF;

/* ═══════════════════════════════
   SCROLL FADE-IN
   Watches elements and reveals them as they scroll into view.
   Runs after renderLinks() so dynamically-injected cards are included.
═══════════════════════════════ */
function initScrollFade() {
  const targets = document.querySelectorAll(
    ".section-title, .section-sub, .join-card, .social-card, " +
    ".about-text, .about-photos, .photo-card, .site-footer"
  );

  targets.forEach(el => el.classList.add("fade-in"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate once, then stop watching
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
  });

  targets.forEach(el => observer.observe(el));
}
/* ═══════════════════════════════
   EXPIRING COMPETITION BANNER
═══════════════════════════════ */
function initBanner() {
  const banner = document.getElementById("competition-banner");
  if (!banner) return;

  // Set your expiration date here: Year, Month (0-11), Day
  // Note: January is 0, February is 1, March is 2, April is 3
  const expiryDate = new Date(2026, 4, 15); 
  const currentDate = new Date();

  if (currentDate > expiryDate) {
    // If the date has passed, remove the element from the DOM entirely
    banner.remove();
  } else {
    // If it is still active, slide it up after a brief delay
    setTimeout(() => {
      banner.classList.add("show-banner");
    }, 1000);
  }
}

/* ═══════════════════════════════
   EXPIRING DISCORD BADGE
═══════════════════════════════ */
function initDiscordBadge() {
  const expiryDate = new Date(2026, 4, 15); 
  const currentDate = new Date();

  // If we have not passed the deadline, add the is-new class
  if (currentDate < expiryDate) {
    const discordCard = document.querySelector('.social-card[data-platform="discord"]');
    if (discordCard) {
      discordCard.classList.add("is-new");
    }
  }
}

// Call these expiring function inside your existing DOMContentLoaded block

/* ═══════════════════
   INIT
═══════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  renderLinks(); 
  initDiscordBadge();
  initBanner();
  
  // Wait for the browser's next render cycle instead of an arbitrary 50ms
  requestAnimationFrame(() => {
    initScrollFade();
  });
});

