document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const heartBtn = document.getElementById('heartBtn');
    const confettiBtn = document.getElementById('confettiBtn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicText = document.getElementById('musicText');
    const heartCount = document.getElementById('heartCount');
    const heartsContainer = document.getElementById('heartsContainer');
    const confettiContainer = document.getElementById('confettiContainer');
    
    // State
    let heartCounter = 0;
    let isMusicPlaying = false;
    
    // Initialize message animation
    initMessageAnimation();
    
    // Heart button click
    heartBtn.addEventListener('click', function() {
        heartCounter++;
        heartCount.textContent = heartCounter;
        
        // Button animation
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Create floating hearts
        createFloatingHearts(3);
        
        // Show notification
        showNotification('❤ Pelukan hangat untukmu! ❤');
    });
    
    // Confetti button click
    confettiBtn.addEventListener('click', function() {
        // Button animation
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Create confetti
        createConfetti(50);
        
        // Show notification
        showNotification('🎉 Selamat ulang tahun! 🎂');
    });
    
    // Music button click
    musicBtn.addEventListener('click', function() {
        if (!isMusicPlaying) {
            // Try to play music
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicText.textContent = 'Jeda Musik';
                this.innerHTML = '<i class="fas fa-pause"></i> Jeda Musik';
                showNotification('🎵 Musik menyala');
            }).catch(error => {
                // If autoplay blocked
                console.log('Autoplay blocked:', error);
                showNotification('Klik sekali lagi untuk putar musik');
            });
        } else {
            // Pause music
            bgMusic.pause();
            isMusicPlaying = false;
            musicText.textContent = 'Putar Musik';
            this.innerHTML = '<i class="fas fa-music"></i> Putar Musik';
        }
    });
    
    // Create floating hearts
    function createFloatingHearts(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '❤';
                heart.style.left = Math.random() * 80 + 10 + '%';
                heart.style.top = '80%';
                heart.style.opacity = '1';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                
                heartsContainer.appendChild(heart);
                
                // Random color
                const colors = ['#e74c3c', '#ff6b8b', '#ff4757', '#ff3838'];
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                // Animation
                const duration = Math.random() * 2000 + 1500;
                const endX = Math.random() * 100 - 50;
                
                const keyframes = [
                    {
                        transform: 'translateY(0) translateX(0) rotate(0deg)',
                        opacity: 1
                    },
                    {
                        transform: `translateY(-200px) translateX(${endX}px) rotate(360deg)`,
                        opacity: 0
                    }
                ];
                
                const animation = heart.animate(keyframes, {
                    duration: duration,
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                });
                
                animation.onfinish = () => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                };
            }, i * 200);
        }
    }
    
    // Create confetti
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random position
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                
                // Random color
                const colors = ['#3498db', '#2980b9', '#1a5276', '#e74c3c', '#9b59b6', '#2ecc71'];
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Random size
                const size = Math.random() * 10 + 5;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                
                confettiContainer.appendChild(confetti);
                
                // Random animation
                const duration = Math.random() * 3000 + 2000;
                const endX = Math.random() * 200 - 100;
                const endY = Math.random() * 100 + 100;
                
                const keyframes = [
                    {
                        transform: 'translateY(0) translateX(0) rotate(0deg)',
                        opacity: 1
                    },
                    {
                        transform: `translateY(${endY}vh) translateX(${endX}px) rotate(720deg)`,
                        opacity: 0
                    }
                ];
                
                const animation = confetti.animate(keyframes, {
                    duration: duration,
                    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                });
                
                animation.onfinish = () => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                };
            }, i * 30);
        }
    }
    
    // Show notification
    function showNotification(text) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = text;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        notification.style.backgroundColor = 'rgba(52, 152, 219, 0.95)';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '50px';
        notification.style.zIndex = '10000';
        notification.style.fontWeight = '500';
        notification.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        notification.style.backdropFilter = 'blur(10px)';
        notification.style.whiteSpace = 'nowrap';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 3000);
    }
    
    // Initialize message animation
    function initMessageAnimation() {
        const messageLines = document.querySelectorAll('.message-line');
        
        // Add CSS for notification
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                font-family: 'Poppins', sans-serif;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto start music on interaction
    document.body.addEventListener('click', function initMusic() {
        if (!isMusicPlaying) {
            // Try to play music quietly
            bgMusic.volume = 0.3;
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicText.textContent = 'Jeda Musik';
                musicBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda Musik';
            }).catch(() => {
                // Music will play on button click
            });
        }
        
        // Remove event listener after first interaction
        document.body.removeEventListener('click', initMusic);
    }, { once: true });
    
    // Add some initial hearts
    setTimeout(() => {
        createFloatingHearts(2);
    }, 1000);
});