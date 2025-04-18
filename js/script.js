function downloadCV() {
  // يمكنك إضافة منطق تحميل الملف هنا
  const link = document.createElement("a");
  link.href = "pdf/MohamadAlhussainCV.pdf"; // استبدل برابط الملف
  link.download = "Mohamad-Alhussain-CV.pdf";
  link.click();
}
// التحديثات الرئيسية هنا 🔽
let currentSlide = 0;
const container = document.getElementById("container");
const totalSlides = 4; // 4 أقسام
let isScrolling = false;
let isMobile = window.innerWidth <= 1024;

// دالة التمرير عبر الأزرار
function scrollToSection(sectionId) {
  const sections = ["home", "about", "projects", "contact"];
  const newSlide = sections.indexOf(sectionId);
  if (newSlide !== -1 && newSlide !== currentSlide) {
    currentSlide = newSlide;
    updateLayout();
  }
}

// تحديث الواجهة
function updateLayout() {
  isMobile = window.innerWidth <= 1024;
  if (isMobile) {
    container.style.width = "100vw";
    container.style.height = "400vh"; // 4 أقسام
    container.style.transform = `translateY(-${currentSlide * 100}vh)`;
  } else {
    container.style.width = "400vw"; // 4 أقسام
    container.style.height = "100vh";
    container.style.transform = `translateX(-${currentSlide * 100}vw)`;
  }
}

// التمرير بالماوس/الأزرار
function changeSlide(direction) {
  if (isScrolling) return;
  isScrolling = true;

  let newSlide = currentSlide;
  if (isMobile) {
    if (direction === "down" && currentSlide < totalSlides - 1) newSlide++;
    if (direction === "up" && currentSlide > 0) newSlide--;
  } else {
    if (direction === "right" && currentSlide < totalSlides - 1) newSlide++;
    if (direction === "left" && currentSlide > 0) newSlide--;
  }

  if (newSlide !== currentSlide) {
    currentSlide = newSlide;
    updateLayout();
  }

  setTimeout(() => {
    isScrolling = false;
  }, 700);
}

// Event Listeners
window.addEventListener(
  "wheel",
  (event) => {
    if (event.deltaY > 0) changeSlide(isMobile ? "down" : "right");
    if (event.deltaY < 0) changeSlide(isMobile ? "up" : "left");
    event.preventDefault();
  },
  { passive: false }
);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowDown")
    changeSlide(isMobile ? "down" : "right");
  if (event.key === "ArrowLeft" || event.key === "ArrowUp")
    changeSlide(isMobile ? "up" : "left");
});

window.addEventListener("resize", updateLayout);
updateLayout();
