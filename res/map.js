        let currentCard = null;
        let tourCompleted = true; // Auto-complete tour since we removed the arrow
        let permanentCards = new Set();

        function toggleCard(location) {
            const card = document.getElementById('card-' + location);
            
            if (!card) {
                console.warn(`Card not found: card-${location}`);
                return;
            }

            // If clicking the same card, toggle it off
            if (currentCard === location) {
                card.classList.remove('show');
                currentCard = null;
                return;
            }

            // Hide all other non-permanent cards
            const allCards = document.querySelectorAll('.experience-card');
            allCards.forEach(c => {
                if (!c.classList.contains('permanent') && c !== card) {
                    c.classList.remove('show');
                }
            });

            // Show the clicked card
            card.classList.add('show');
            currentCard = location;
        }

        // Add pin hover effects
        function initializePinHoverEffects() {
            document.querySelectorAll('.location-pin').forEach(pin => {
                pin.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.2) rotate(5deg)';
                    this.style.boxShadow = '0 0 25px rgba(0, 255, 157, 0.6)';
                });
                
                pin.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = '0 0 20px rgba(0, 255, 157, 0.3)';
                });
            });
        }

        // Initialize navigation functionality
        function initializeNavigation() {
            const navButtons = document.querySelectorAll('.nav-button');
            navButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    if (window.parent && window.parent !== window) {
                        if (href.includes('#profile')) {
                            window.parent.postMessage({
                                type: 'navigate',
                                target: 'profile'
                            }, '*');
                        } else if (href.includes('#projects')) {
                            window.parent.postMessage({
                                type: 'navigate', 
                                target: 'projects'
                            }, '*');
                        }
                    } else {
                        // 不在iframe中，直接跳转
                        if (href.includes('../index.html')) {
                            window.location.href = href;
                        }
                    }
                });
            });
        }

        // Close cards when clicking outside
        function initializeOutsideClickHandler() {
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.location-pin') && !e.target.closest('.experience-card')) {
                    const allCards = document.querySelectorAll('.experience-card');
                    allCards.forEach(c => {
                        c.classList.remove('show');
                    });
                    currentCard = null;
                }
            });
        }

        // Show loading animation and then display all cards
        function initializeDisplay() {
            // Add a brief loading animation
            setTimeout(() => {
                // Show all cards automatically after loading
                const tourSequence = [
                    { card: 'china-1' },
                    { card: 'china-2' },
                    { card: 'usa-1' },
                    { card: 'usa-2' }
                ];

                tourSequence.forEach((step, index) => {
                    setTimeout(() => {
                        const card = document.getElementById('card-' + step.card);
                        if (card) {
                            card.classList.add('show', 'permanent');
                            permanentCards.add(step.card);
                        }
                    }, index * 1500); 
                });
            }, 1500);
        }

        // Main initialization function
        function initializeMap() {
            initializePinHoverEffects();
            initializeNavigation();
            initializeOutsideClickHandler();
            initializeDisplay();
            
            console.log('Experience map initialized successfully');
        }

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            initializeMap();
        });

        // Fallback initialization
        window.addEventListener('load', function() {
            if (permanentCards.size === 0) {
                console.log('Map loading via window.onload fallback');
                initializeMap();
            }
        });