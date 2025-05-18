document.addEventListener('DOMContentLoaded', function() {
  // Portfolio filtering functionality
  const filterButtons = document.querySelectorAll('.portfolio-filters button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filter === 'all') {
            item.style.display = 'block';
          } else {
            if (item.classList.contains(filter)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // Project modal functionality
  const projectLinks = document.querySelectorAll('.project-details-link');
  const modal = document.querySelector('.project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalContent = document.querySelector('.modal-content');
  
  if (projectLinks.length > 0 && modal) {
    project