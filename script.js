// ============================================================
// PORTFOLIO WEBSITE - MAIN SCRIPT (script.js)
// Shob JS ekhane ekta file e. Notun kisu add korte hole
// niche just notun function likhe felo, arekta script file
// lagbe na. Prottek part er upore comment deya ase.
// ============================================================

// ---------- AOS (Animate On Scroll) library on kora ----------
// FIX: age AOS.init() direct call hoto - CDN (unpkg.com) theke library
// load hote deri hole ba fail korle "AOS" undefined thake, r AOS.init()
// error throw kore diye PURA script.js thamia dito. Fole preloader
// kokhono hide hoto na, "HEY!" message o kokhono show hoto na - karon
// nicher shob code (window "load" listener soho) run e ashto na.
// Ekhon typeof check kore nei, AOS na thakleo baki shob feature thik
// moto cholbe.
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: false,
  });
}

// ---------- Preloader (page load hole loading screen hide hobe) ----------
// FIX: age #preloader div ta HTML e chilo na bole loading screen
// kokhono dekha jaito na. Ekhon window "load" event (shob image/font
// load hoye jaoar por fire hoy) e body te "preloader-hidden" class
// add kora hoy, jar fole CSS e fade-out hoye preloader ta lukiye jay.
window.addEventListener("load", function () {
  document.body.classList.add("preloader-hidden");
  showHeyMessage();
});

// ---------- Navbar avatar "HEY!" message ----------
const heyMessageEl = document.querySelector(".hey");

// page load hoile ekbar automatic "HEY!" popup dekhabe (3s por nijei
// fade out hoye jabe, CSS er "pop-up-hey" keyframe onujayi)
function showHeyMessage() {
  if (!heyMessageEl) return;
  heyMessageEl.classList.remove("popup");
  // reflow force kora hoy jate animation restart kora jay
  void heyMessageEl.offsetWidth;
  heyMessageEl.classList.add("popup");
}

// animation shesh hoye gele "popup" class remove kore dei - na hole
// animation-fill-mode:forwards er karone opacity:0 e "lock" hoye
// thakto, r tarpor hover korle ar "HEY!" dekha jaito na.
if (heyMessageEl) {
  heyMessageEl.addEventListener("animationend", function () {
    heyMessageEl.classList.remove("popup");
  });
}

// FIX: HTML e ".hey" ".logo" er ANDORE nai, SIBLING (age e ase) -
// tai CSS er ".logo:hover .hey" kokhonoi match korto na, avatar e
// hover korle kisu hoto na. Ekhon JS diye ".logo" er mouseenter e
// ".hey-hover-active" class add kora hoy (CSS e ei class thakle
// "pop-up-hey" animation infinite loop e cholte thake, protita 3s
// por por abar "HEY!" dekhabe) r mouseleave e shathe shathe class
// remove kore dei, tokhon transition diye fade-out hoye jay.
const navAvatarLogoEl = document.querySelector(".logo");
if (navAvatarLogoEl && heyMessageEl) {
  navAvatarLogoEl.addEventListener("mouseenter", function () {
    heyMessageEl.classList.remove("popup"); // load-time popup thakle shorai dei
    heyMessageEl.classList.add("hey-hover-active");
  });
  navAvatarLogoEl.addEventListener("mouseleave", function () {
    heyMessageEl.classList.remove("hey-hover-active");
  });
}

// ---------- Custom Cursor (mouse er sathe cursor move kora) ----------
const cursorInner = document.getElementById("cursor-inner");
const cursorOuter = document.getElementById("cursor-outer");

if (cursorInner && cursorOuter) {
  document.addEventListener("mousemove", function (e) {
    // FIX: clientX/clientY use kora hoise, pageX/pageY na.
    // Karon cursor CSS te "position: fixed" - eta viewport er
    // shathe move kore, page scroll er shathe na. Age pageX/pageY
    // use hoto bole scroll korle cursor upore/top-left e stuck
    // hoye jaito. clientX/clientY dile eta thik thake.
    cursorInner.style.left = e.clientX + "px";
    cursorInner.style.top = e.clientY + "px";
    cursorOuter.style.left = e.clientX + "px";
    cursorOuter.style.top = e.clientY + "px";
  });

  // Link/button/box e mouse hover korle cursor ta bou hobe
  const hoverElements = document.querySelectorAll(
    "a, button, .tech-stack-box, .project-box",
  );
  hoverElements.forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      cursorInner.classList.add("hover");
      cursorOuter.classList.add("hover");
    });
    el.addEventListener("mouseleave", function () {
      cursorInner.classList.remove("hover");
      cursorOuter.classList.remove("hover");
    });
  });
}

// ---------- Hamburger Menu (mobile menu open/close) ----------
// FIX: CSS te menu open/close er class hocche "show-toggle-menu" ar
// burger bar 3 ta te "hamburger-animation1/2/3" - "active" class na
// (age main.js e "active" likha silo but CSS te oi class e kono
// style e chilo na, tai hamburger click korle kisu hoto na).
function hamburgerMenu() {
  document.body.classList.toggle("stopscrolling");
  document
    .getElementById("mobiletogglemenu")
    .classList.toggle("show-toggle-menu");
  document
    .getElementById("burger-bar1")
    .classList.toggle("hamburger-animation1");
  document
    .getElementById("burger-bar2")
    .classList.toggle("hamburger-animation2");
  document
    .getElementById("burger-bar3")
    .classList.toggle("hamburger-animation3");
}

// mobile menu er kono link e click korle menu ta bondho hoye jabe
function hidemenubyli() {
  document.body.classList.remove("stopscrolling");
  document
    .getElementById("mobiletogglemenu")
    .classList.remove("show-toggle-menu");
  document
    .getElementById("burger-bar1")
    .classList.remove("hamburger-animation1");
  document
    .getElementById("burger-bar2")
    .classList.remove("hamburger-animation2");
  document
    .getElementById("burger-bar3")
    .classList.remove("hamburger-animation3");
}

// ---------- Scroll to top button ----------
function scrolltoTopfunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ---------- Navbar: active tab update + auto hide/show on scroll ----------
const navbarEl = document.getElementById("navbar");
const navbarLinks = document.querySelectorAll(".navbar-tabs-ul li");
const mobileNavbarLinks = document.querySelectorAll(
  ".mobile-navbar-tabs-ul li",
);

// last scroll position track korar jonno, upore/niche bujhte
let lastScrollY = window.scrollY;

window.addEventListener("scroll", function () {
  updateActiveTab();
  handleNavbarVisibility();
  handleBackToTopButton();
});

// scroll onujayi kon section e asi seita onujayi navbar tab active kora
function updateActiveTab() {
  const sections = [
    { id: "home", navClass: "home" },
    { id: "about", navClass: "about" },
    { id: "skills", navClass: "skills" },
    { id: "projects", navClass: "projects" },
  ];

  sections.forEach(function (section) {
    const element = document.getElementById(section.id);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    if (rect.top <= 200 && rect.bottom > 200) {
      // desktop navbar update
      navbarLinks.forEach(function (link) {
        link.classList.remove("activeThistab");
      });
      const activeDesktop = document.querySelector(
        ".navbar-tabs-ul li." + section.navClass,
      );
      if (activeDesktop) activeDesktop.classList.add("activeThistab");

      // mobile navbar update
      mobileNavbarLinks.forEach(function (link) {
        link.classList.remove("activeThismobiletab");
      });
      const activeMobile = document.querySelector(
        ".mobile-navbar-tabs-ul li." + section.navClass,
      );
      if (activeMobile) activeMobile.classList.add("activeThismobiletab");
    }
  });
}

// NEW: niche scroll korle navbar hide hobe, upore scroll korle abar show hobe
function handleNavbarVisibility() {
  if (!navbarEl) return;

  const currentScrollY = window.scrollY;

  // 150px er kom scroll thakle navbar shobshomoy dekhabe (top e thakle hide na hok)
  if (currentScrollY > lastScrollY && currentScrollY > 150) {
    // niche jacche -> hide
    navbarEl.classList.add("navbar-hidden");
  } else {
    // upore jacche -> show
    navbarEl.classList.remove("navbar-hidden");
  }

  lastScrollY = currentScrollY;
}

// ---------- Back to top button (400px scroll er por dekha jabe) ----------
// FIX: CSS te ei button default e "display:none", but eta show
// korar kono JS chilo na main.js e - tai button ta kokhono dekha
// jaito na. Ekhon 400px scroll korle button show hobe.
const backToTopBtn = document.getElementById("backtotopbutton");

function handleBackToTopButton() {
  if (!backToTopBtn) return;

  if (window.scrollY > 400) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// ============================================================
// GitHub Contribution Graph - scroll e dhukle fade+scale reveal
// ------------------------------------------------------------
// Kaj: user scroll kore ei section e ashle graph container ta
// fade+scale kore reveal hoy (CSS er ".line-drawing" class, dekho
// style.css). Age ekhane canvas diye purple->blue line-draw animation
// o hoto graph er upor diye - user chaisilo bole shetuku remove kora
// hoise, ekhon shudhu simple fade+scale reveal thakbe.
// Upore scroll kore beriye giye abar niche ashle same animation
// abar replay hobe - IntersectionObserver diye enter/exit dhora hoy.
// ============================================================
(function githubContributionReveal() {
  const graphContainer = document.querySelector(".github-graph-container");
  if (!graphContainer) return; // element na thakle kisu korar nai

  const graphObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          graphContainer.classList.add("line-drawing");
        } else {
          graphContainer.classList.remove("line-drawing");
        }
      });
    },
    {
      threshold: 0.25, // 25% section dekha gele reveal start hobe
    },
  );

  graphObserver.observe(graphContainer);
})();

// ============================================================
// Footer Avatar - eyes follow mouse cursor
// ------------------------------------------------------------
// Kaj: footer er memoji avatar er dui ta chokh (.footer-pupil) mouse
// jei dik e thake shei dik e ghure takay - jekhane e mouse thakuk na
// kno (shudhu footer section e na, puro page e), pupil ta center
// theke mouse er dik e ekta choto offset e move kore, real chokh
// naray emon feel dey.
// ============================================================
(function footerAvatarEyeTracking() {
  const faceEl = document.querySelector(".footer-avatar-face");
  const leftPupil = document.querySelector(".footer-left-eye .footer-pupil");
  const rightPupil = document.querySelector(".footer-right-eye .footer-pupil");

  if (!faceEl || !leftPupil || !rightPupil) return;

  const maxOffset = 8; // pupil koto dur porjonto shorte parbe (px)

  // FIX: age prottek chokh (left/right) NIJER center theke mouse er
  // angle alada kore hisheb korto - fole cursor kache thakle dui
  // chokh dui rokom (alada) direction e takato, cross-eyed/unnatural
  // dekhaito. Ekhon shudhu EKBAR - puro face (dui chokher moddhe)
  // center theke mouse er angle ber kora hoy, r shei EKI offset
  // duita pupil e apply kora hoy - fole dui chokh always same
  // direction e, ek shathe, human-er moto natural vabe ghore.
  document.addEventListener("mousemove", function (e) {
    const rect = faceEl.getBoundingClientRect();
    const faceCenterX = rect.left + rect.width / 2;
    const faceCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - faceCenterY, e.clientX - faceCenterX);
    const offsetX = Math.cos(angle) * maxOffset;
    const offsetY = Math.sin(angle) * maxOffset;
    const transform = "translate(" + offsetX + "px, " + offsetY + "px)";

    leftPupil.style.transform = transform;
    rightPupil.style.transform = transform;
  });
})();
