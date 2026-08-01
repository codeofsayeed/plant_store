// ---- Date & Time ----
function showDateTime() {
  var el = document.getElementById("current-datetime");
  if (!el) return;
  var now = new Date();
  el.textContent = now.toLocaleString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
showDateTime();
setInterval(showDateTime, 1000);

// ---- Mobile Nav ----
var toggle = document.querySelector(".nav-toggle");
var navLinks = document.querySelector(".nav-links");
if (toggle) {
  toggle.onclick = function () {
    navLinks.classList.toggle("open");
  };
}

// ---- Plant Matchmaker Quiz ----
var currentStep = 0;
var answers = [];

var questions = [
  {
    text: "How much natural light does your space get?",
    options: [
      "🌑 Low Light",
      "🌤️ Medium Light",
      "☀️ Bright Indirect",
      "🌞 Full Sun",
    ],
  },
  {
    text: "What is your plant care style?",
    options: ["😴 Set & Forget", "🙂 Weekly Check-ins", "🌿 Daily TLC"],
  },
  {
    text: "Do you need pet-friendly plants?",
    options: ["🐾 Yes, Pet-Safe", "🌵 No Pets at Home", "🤷 Doesn't Matter"],
  },
];

var plantResults = [
  {
    name: "ZZ Plant",
    emoji: "🪴",
    desc: "Nearly indestructible! Thrives in low light and forgives missed waterings. Perfect for beginners.",
  },
  {
    name: "Golden Pothos",
    emoji: "🍃",
    desc: "A beautiful trailing vine that grows in almost any light. One of the easiest plants to keep alive.",
  },
  {
    name: "Monstera Deliciosa",
    emoji: "🌿",
    desc: "The iconic split-leaf beauty! Loves bright indirect light and grows fast. A real statement plant.",
  },
  {
    name: "Spider Plant",
    emoji: "🕷️",
    desc: "Fun, fast-growing and great for hanging baskets. Nearly unkillable and perfect for beginners.",
  },
  {
    name: "Cactus Collection",
    emoji: "🌵",
    desc: "Sun-loving and drought-tolerant. Perfect for south-facing windows and minimal-effort gardening.",
  },
  {
    name: "Peace Lily",
    emoji: "🌸",
    desc: "Elegant white blooms and air-purifying power. It droops when thirsty so it tells you what it needs!",
  },
];

function buildQuiz() {
  if (!document.getElementById("quiz-steps")) return;
  renderQuizStep();
}

function renderQuizStep() {
  var stepsEl = document.getElementById("quiz-steps");
  var resultEl = document.getElementById("quiz-result");

  if (currentStep >= questions.length) {
    showResult();
    return;
  }

  resultEl.classList.remove("show");
  stepsEl.style.display = "block";

  var q = questions[currentStep];

  var dots = "";
  for (var i = 0; i < questions.length; i++) {
    var cls = i < currentStep ? "done" : i === currentStep ? "active" : "";
    dots += '<div class="progress-dot ' + cls + '"></div>';
  }

  var optHtml = "";
  for (var j = 0; j < q.options.length; j++) {
    var sel = answers[currentStep] === j ? " selected" : "";
    optHtml +=
      '<div class="quiz-option' +
      sel +
      '" onclick="selectAnswer(' +
      j +
      ', this)">' +
      q.options[j] +
      "</div>";
  }

  var backHtml =
    currentStep > 0
      ? '<button class="btn-quiz btn-back" onclick="prevStep()">← Back</button>'
      : "<span></span>";
  var nextLabel =
    currentStep < questions.length - 1 ? "Next →" : "Find My Plant 🌱";

  stepsEl.innerHTML =
    '<div class="quiz-progress">' +
    dots +
    "</div>" +
    '<p style="color:#999;font-size:.84rem;margin-bottom:6px;">Question ' +
    (currentStep + 1) +
    " of " +
    questions.length +
    "</p>" +
    '<h3 style="color:var(--primary);margin-bottom:20px;">' +
    q.text +
    "</h3>" +
    '<div class="quiz-options">' +
    optHtml +
    "</div>" +
    '<div class="quiz-nav">' +
    backHtml +
    '<button class="btn-quiz btn-next" onclick="nextStep()">' +
    nextLabel +
    "</button></div>";
}

function selectAnswer(val, el) {
  answers[currentStep] = val;
  var opts = document.querySelectorAll(".quiz-option");
  for (var i = 0; i < opts.length; i++) opts[i].classList.remove("selected");
  el.classList.add("selected");
}

function nextStep() {
  if (answers[currentStep] === undefined) {
    alert("Please select an option to continue!");
    return;
  }
  currentStep++;
  renderQuizStep();
}

function prevStep() {
  currentStep--;
  renderQuizStep();
}

function showResult() {
  var stepsEl = document.getElementById("quiz-steps");
  var resultEl = document.getElementById("quiz-result");
  stepsEl.style.display = "none";

  var idx = ((answers[0] || 0) + (answers[1] || 0)) % plantResults.length;
  var r = plantResults[idx];

  resultEl.classList.add("show");
  resultEl.innerHTML =
    '<div class="result-card">' +
    '<div class="result-emoji">' +
    r.emoji +
    "</div>" +
    "<h3>Your Perfect Match: " +
    r.name +
    "</h3>" +
    "<p>" +
    r.desc +
    "</p>" +
    '<div style="margin-top:26px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">' +
    '<a href="product.html" class="btn-green">Shop Now →</a>' +
    '<button class="btn-quiz btn-back" onclick="resetQuiz()">Try Again</button>' +
    "</div></div>";
}

function resetQuiz() {
  currentStep = 0;
  answers = [];
  renderQuizStep();
}

// ---- Product Size Buttons ----
function setupSizes() {
  var btns = document.querySelectorAll(".size-btn");
  if (!btns.length) return;

  var prices = {
    Small: "$24.99",
    Medium: "$44.99",
    Large: "$79.99",
    XL: "$119.99",
  };

  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      for (var j = 0; j < btns.length; j++) btns[j].classList.remove("active");
      this.classList.add("active");
      var priceEl = document.getElementById("product-price");
      if (priceEl && prices[this.textContent.trim()]) {
        priceEl.textContent = prices[this.textContent.trim()];
      }
    };
  }
}

// ---- Add to Cart Popup ----
function setupCart() {
  var btn = document.getElementById("add-to-cart");
  var overlay = document.getElementById("cart-overlay");
  var closeBtn = document.getElementById("cart-close");
  if (!btn || !overlay) return;

  btn.onclick = function () {
    overlay.classList.add("show");
  };
  closeBtn.onclick = function () {
    overlay.classList.remove("show");
  };
  overlay.onclick = function (e) {
    if (e.target === overlay) overlay.classList.remove("show");
  };
}

// ---- Contact Form Confirmation Popup ----
function setupContactForm() {
  var form = document.getElementById("contact-form");
  var overlay = document.getElementById("confirm-overlay");
  var closeBtn = document.getElementById("confirm-close");
  if (!form || !overlay) return;

  form.onsubmit = function (e) {
    e.preventDefault();
    overlay.classList.add("show");
  };
  closeBtn.onclick = function () {
    overlay.classList.remove("show");
    form.reset();
  };
  overlay.onclick = function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("show");
      form.reset();
    }
  };
}

// ---- Live Chat Widget ----
var replies = [
  "Great question! 🌿 Monstera plants love bright, indirect light. Avoid direct sun as it scorches the leaves.",
  "Water when the top 2 inches of soil feel dry. Overwatering is the #1 mistake most plant parents make! 💧",
  "Monsteras love 60-80% humidity. Try misting the leaves every couple of days or placing a water tray nearby.",
  "Repot every 1-2 years in spring. Choose a pot about 2 inches larger than the current one. 🪴",
  "Yellow leaves usually mean overwatering. Brown, crispy tips usually mean low humidity or underwatering.",
  "All Blooming Oasis plants come with a 30-day healthy plant guarantee. We are here to help! 🌱",
];
var replyCount = 0;

function setupChat() {
  var sendBtn = document.getElementById("chat-send");
  var inputEl = document.getElementById("chat-input");
  var msgsEl = document.getElementById("chat-msgs");
  if (!sendBtn || !inputEl || !msgsEl) return;

  function sendMessage() {
    var msg = inputEl.value.trim();
    if (!msg) return;

    var userMsg = document.createElement("div");
    userMsg.className = "chat-msg user";
    userMsg.innerHTML =
      '<div class="msg-bbl">' +
      msg.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
      '</div><div class="msg-avt">👤</div>';
    msgsEl.appendChild(userMsg);
    inputEl.value = "";
    msgsEl.scrollTop = msgsEl.scrollHeight;

    setTimeout(function () {
      var botMsg = document.createElement("div");
      botMsg.className = "chat-msg bot";
      botMsg.innerHTML =
        '<div class="msg-avt">🌿</div><div class="msg-bbl">' +
        replies[replyCount % replies.length] +
        "</div>";
      replyCount++;
      msgsEl.appendChild(botMsg);
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }, 700);
  }

  sendBtn.onclick = sendMessage;
  inputEl.onkeypress = function (e) {
    if (e.key === "Enter") sendMessage();
  };
}

// ---- Run everything on page load ----
window.onload = function () {
  buildQuiz();
  setupSizes();
  setupCart();
  setupContactForm();
  setupChat();
};
