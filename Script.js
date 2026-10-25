(function () {
  var EMAIL = "Joshuabordaje6@gmail.com";
  var root = document.documentElement;

  /* Theme toggle (remembers choice when storage is available) */
  var themeBtn = document.getElementById("themeBtn");
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    themeBtn.textContent = t === "dark" ? "Light mode" : "Dark mode";
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  setTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  themeBtn.addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* Mobile menu */
  var menuBtn = document.getElementById("menuBtn");
  var sidebar = document.getElementById("sidebar");
  function closeMenu() {
    sidebar.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "Menu";
  }
  menuBtn.addEventListener("click", function () {
    var open = sidebar.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "Close" : "Menu";
  });
  sidebar.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* Highlight the current section in the nav */
  var links = Array.prototype.slice.call(document.querySelectorAll(".route a"));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function spy() {
    var y = window.scrollY + window.innerHeight * 0.35;
    var current = 0;
    sections.forEach(function (s, i) { if (s.offsetTop <= y) current = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === current); });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  /* Typing line */
  var phrases = ["building Techpath", "learning web development", "practicing responsive design"];
  var typed = document.getElementById("typed");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    typed.textContent = phrases[0];
  } else {
    var p = 0, c = 0, deleting = false;
    (function tick() {
      var word = phrases[p];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      var delay = deleting ? 40 : 80;
      if (!deleting && c === word.length) { deleting = true; delay = 1600; }
      else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 400; }
      setTimeout(tick, delay);
    })();
  }

  /* Copy email */
  var status = document.getElementById("copyStatus");
  document.getElementById("copyBtn").addEventListener("click", function () {
    function done(ok) { status.textContent = ok ? "Email address copied." : "Copy failed. Please copy it manually: " + EMAIL; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(function () { done(true); }, function () { done(false); });
    } else { done(false); }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
