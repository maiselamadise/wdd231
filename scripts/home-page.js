document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".course-filter");
    const courses = document.querySelectorAll(".course-item");
    const creditCountEl = document.getElementById("credit-count");
    const completedCountEl = document.getElementById("completed-credit-count");
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
      completedCheckboxes.forEach(checkbox => {
        const course = checkbox.closest(".course-item");
        if (checkbox.checked && course.style.display !== "none") {
          completedCredits += Number(course.dataset.credits);
        }
      });
      completedCountEl.textContent = completedCredits;
    }
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        updateCourses(button.dataset.filter);
      });
    });
  
    completedCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", updateCompletedCredits);
    });
  
    document.getElementById("current-year").textContent = new Date().getFullYear();
  
    const lastModified = new Date(document.lastModified);
    document.getElementById("last-modified").textContent =
      lastModified.toLocaleDateString() + " " +
      lastModified.toLocaleTimeString();
  
    updateCourses("All");
  });