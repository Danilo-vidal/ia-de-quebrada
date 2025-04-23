// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    // Create close button for mobile menu
    const closeMenu = document.createElement('div');
    closeMenu.classList.add('close-menu');
    closeMenu.innerHTML = '<i class="fas fa-times"></i>';
    nav.appendChild(closeMenu);
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        nav.classList.add('active');
    });
    
    // Close menu
    closeMenu.addEventListener('click', function() {
        nav.classList.remove('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            alert('Obrigado por se inscrever! Em breve você receberá nossas atualizações no email: ' + email);
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.parentElement.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.parentElement.classList.add('active');
        }
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }
    
    // Comment system functionality (placeholder)
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const commentInput = this.querySelector('textarea[name="comment"]');
            
            if (nameInput && commentInput) {
                const name = nameInput.value;
                const comment = commentInput.value;
                
                if (name && comment) {
                    // Create new comment element
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment');
                    newComment.innerHTML = `
                        <div class="comment-header">
                            <h4>${name}</h4>
                            <span>${new Date().toLocaleDateString()}</span>
                        </div>
                        <div class="comment-body">
                            <p>${comment}</p>
                        </div>
                    `;
                    
                    // Add to comments list
                    const commentsList = document.querySelector('.comments-list');
                    if (commentsList) {
                        commentsList.appendChild(newComment);
                    }
                    
                    // Reset form
                    this.reset();
                    
                    // Show success message
                    alert('Comentário enviado com sucesso!');
                }
            }
        });
    });
    
    // Search functionality (placeholder)
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input[type="search"]');
            if (searchInput) {
                const searchTerm = searchInput.value;
                
                if (searchTerm) {
                    // Redirect to search results page (to be implemented)
                    alert(`Pesquisando por: ${searchTerm}`);
                    // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
});
