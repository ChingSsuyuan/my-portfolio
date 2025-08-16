
        function isInIframe() {
            return window.parent && window.parent !== window;
        }

        function initializeNavigation() {
            const navButtons = document.querySelectorAll('.nav-button');
            navButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    
                    if (isInIframe()) {
                        // 在iframe中，发送消息给父窗口
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
                        // 直接访问时的跳转
                        window.location.href = href;
                    }
                });
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            initializeNavigation();
            
            const images = document.querySelectorAll('.image-container img');
            images.forEach(img => {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
            });
        });
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const container = document.querySelector('.container::before');
            if (container) {
                container.style.transform = `translateY(${rate}px)`;
            }
        });
