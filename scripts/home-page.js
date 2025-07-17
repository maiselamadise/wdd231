document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".course-filter");
    const courses = document.querySelectorAll(".course-item");
    const creditCountEl = document.getElementById("credit-count");
    const completedCountEl = document.getElementById("completed-credit-count");
    const completedClassesEl = document.getElementById("completed-classes-count");
    const completedCheckboxes = document.querySelectorAll(".course-completed");
  
    function updateCourses(filter) {
      let totalCredits = 0;
      courses.forEach(course => {
        if (filter === "All" || course.dataset.category === filter) {
          course.style.display = "";
          totalCredits += Number(course.dataset.credits);
        } else {
          course.style.display = "none";
        }
      });
      creditCountEl.textContent = totalCredits;
      updateCompletedCredits();
    }
  
    function updateCompletedCredits() {
      let completedCredits = 0;
      let completedClasses = 0;
  
      completedCheckboxes.forEach((checkbox, index) => {
        const course = checkbox.closest(".course-item");
        if (checkbox.checked && course.style.display !== "none") {
          completedCredits += Number(course.dataset.credits);
          completedClasses += 1;
        }
      });
  
      completedCountEl.textContent = completedCredits;
      completedClassesEl.textContent = completedClasses;
    }
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
          btn.classList.remove("active");
          btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
        updateCourses(button.dataset.filter);
      });
    });
  
    completedCheckboxes.forEach((checkbox, index) => {
      // Restore saved state
      const saved = localStorage.getItem(`course-${index}`);
      if (saved === "true") checkbox.checked = true;
  
      checkbox.addEventListener("change", () => {
        localStorage.setItem(`course-${index}`, checkbox.checked);
        updateCompletedCredits();
      });
    });
  
    document.getElementById("current-year").textContent = new Date().getFullYear();
  
    const lastModified = new Date(document.lastModified);
    document.getElementById("last-modified").textContent =
      lastModified.toLocaleDateString() + " " + lastModified.toLocaleTimeString();
  
    updateCourses("All");
  });
  