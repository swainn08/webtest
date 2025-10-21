// Scroll progress bar
window.addEventListener("scroll", () => {
  const progress = document.getElementById("progress-bar");
  const total = document.body.scrollHeight - window.innerHeight;
  const progressHeight = (window.scrollY / total) * 100;
  progress.style.width = progressHeight + "%";
});

// Theme toggle
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.classList.toggle("ri-sun-line");
  toggle.classList.toggle("ri-moon-line");
});

// Typing effect
const typingText = ["Frontend Developer", "UI/UX Designer", "Creative Thinker"];
let index = 0, charIndex = 0;
const typingElement = document.getElementById("typing");
function typeEffect() {
  if (charIndex < typingText[index].length) {
    typingElement.textContent += typingText[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}
function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = typingText[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    index = (index + 1) % typingText.length;
    setTimeout(typeEffect, 300);
  }
}
typeEffect();

// Modal open/close
function openProject(id) {
  document.getElementById(id).style.display = "flex";
}
function closeProject(id) {
  document.getElementById(id).style.display = "none";
}
window.onclick = function(e) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (e.target == modal) modal.style.display = "none";
  });
};

// Stats counter
const counters = [
  { id: "projects", end: 30 },
  { id: "clients", end: 12 },
  { id: "experience", end: 4 },
];
const runCounter = (el, end) => {
  let count = 0;
  const update = () => {
    if (count < end) {
      count++;
      el.textContent = count;
      requestAnimationFrame(update);
    }
  };
  update();
};
window.addEventListener("scroll", () => {
  const stats = document.querySelector(".stats");
  const rect = stats.getBoundingClientRect().top;
  if (rect < window.innerHeight - 100 && !stats.classList.contains("done")) {
    stats.classList.add("done");
    counters.forEach(c => runCounter(document.getElementById(c.id), c.end));
  }
});

// Cursor glow
const cursor = document.createElement("div");
cursor.id = "cursor-glow";
document.body.appendChild(cursor);
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Scroll to Top
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) scrollTopBtn.style.display = "block";
  else scrollTopBtn.style.display = "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// Duplicate images for smooth seamless scroll
const wrapper = document.getElementById('scroll-wrapper');
if (wrapper) {
  const clone = wrapper.innerHTML;
  wrapper.innerHTML += clone; // bikin dua track biar looping mulus
}


// ===== Smooth Auto Scroll Project =====
const scrollWrapper = document.getElementById("scroll-wrapper");
if (scrollWrapper) {
  // Gandakan isi supaya looping terus
  scrollWrapper.innerHTML += scrollWrapper.innerHTML;

  let position = 0;
  const speed = 3; // ubah kecepatan di sini (0.5 = smooth, 1 = cepat)

  function smoothScroll() {
    position -= speed;
    if (Math.abs(position) >= scrollWrapper.scrollWidth / 2) {
      position = 0; // reset posisi tanpa patah
    }
    scrollWrapper.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(smoothScroll);
  }

  smoothScroll();
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuToggle.classList.toggle('active');

  // ubah icon ☰ <-> ✕
  if (menuToggle.classList.contains('active')) {
    menuToggle.classList.replace('ri-menu-line', 'ri-close-line');
  } else {
    menuToggle.classList.replace('ri-close-line', 'ri-menu-line');
  }
});


// FORM KONTAK - TAMPILKAN PESAN "TERKIRIM"
const form = document.getElementById("contact-form");
const alertBox = document.getElementById("form-alert");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alertBox.textContent = "✅ Pesan berhasil terkirim!";
        alertBox.classList.remove("hidden");
        alertBox.classList.add("show");
        form.reset();

        setTimeout(() => {
          alertBox.classList.remove("show");
          alertBox.classList.add("hidden");
        }, 3000);
      } else {
        alertBox.textContent = "❌ Gagal mengirim pesan. Coba lagi.";
        alertBox.classList.remove("hidden");
        alertBox.classList.add("show");
      }
    } catch (error) {
      alertBox.textContent = "⚠️ Terjadi kesalahan jaringan.";
      alertBox.classList.remove("hidden");
      alertBox.classList.add("show");
    }
  });
}

