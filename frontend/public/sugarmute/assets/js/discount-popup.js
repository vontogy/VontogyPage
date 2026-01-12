(function() {
    // Constants
    const TIMER_STORAGE_KEY = 'sugarmute_discount_timer';
    const TIMER_TIMESTAMP_KEY = 'sugarmute_discount_timer_timestamp';
    const POPUP_SHOWN_KEY = 'sugarmute_popup_shown';
    const INITIAL_TIME = 580; // 9 minutes and 40 seconds
    const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours
    
    let timeLeft = INITIAL_TIME;
    let timerInterval;
    let popupShown = false;
    
    function loadTimerFromCache() {
        try {
            const savedTime = localStorage.getItem(TIMER_STORAGE_KEY);
            const savedTimestamp = localStorage.getItem(TIMER_TIMESTAMP_KEY);
            
            if (savedTime && savedTimestamp) {
                const now = Date.now();
                const timestamp = parseInt(savedTimestamp, 10);
                const timeDiff = now - timestamp;
                
                if (timeDiff < CACHE_DURATION) {
                    const saved = parseInt(savedTime, 10);
                    const elapsedSeconds = Math.floor(timeDiff / 1000);
                    const newTimeLeft = saved - elapsedSeconds;
                    
                    if (newTimeLeft > 0) {
                        timeLeft = newTimeLeft;
                        return true;
                    } else {
                        timeLeft = 0;
                        clearTimerCache();
                        return true;
                    }
                } else {
                    clearTimerCache();
                }
            }
        } catch (error) {
            console.error('Error loading timer from cache:', error);
        }
        return false;
    }
    
    function saveTimerToCache() {
        try {
            localStorage.setItem(TIMER_STORAGE_KEY, timeLeft.toString());
            localStorage.setItem(TIMER_TIMESTAMP_KEY, Date.now().toString());
        } catch (error) {
            console.error('Error saving timer to cache:', error);
        }
    }
    
    function clearTimerCache() {
        try {
            localStorage.removeItem(TIMER_STORAGE_KEY);
            localStorage.removeItem(TIMER_TIMESTAMP_KEY);
        } catch (error) {
            console.error('Error clearing timer cache:', error);
        }
    }
    
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    }
    
    function updateTimer() {
        const timerElement = document.getElementById('discount-timer');
        if (timerElement) {
            timerElement.textContent = formatTime(timeLeft);
            
            if (timeLeft > 0) {
                timeLeft--;
                saveTimerToCache();
            } else {
                clearInterval(timerInterval);
                clearTimerCache();
            }
        }
    }
    
    function showDiscountPopup() {
        if (popupShown) return;
        popupShown = true;
        
        loadTimerFromCache();
        
        const overlay = document.getElementById('discount-popup-overlay');
        if (overlay) {
            overlay.classList.add('show');
            
            const scrollY = window.scrollY || window.pageYOffset;
            document.body.style.position = 'fixed';
            document.body.style.top = '-' + scrollY + 'px';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            timerInterval = setInterval(updateTimer, 1000);
            updateTimer();
            
            setupButtonHandlers();
        }
    }
    
    function setupButtonHandlers() {
        const getDiscountBtn = document.querySelector('.discount-popup-button');
        const closeBtn = document.querySelector('.discount-popup-close-btn');
        const closeXBtn = document.getElementById('discount-popup-close-x');
        
        function disableAllButtons() {
            if (getDiscountBtn) {
                getDiscountBtn.style.pointerEvents = 'none';
                getDiscountBtn.style.opacity = '0.5';
            }
            if (closeBtn) {
                closeBtn.style.pointerEvents = 'none';
                closeBtn.style.opacity = '0.5';
            }
            if (closeXBtn) {
                closeXBtn.style.pointerEvents = 'none';
                closeXBtn.style.opacity = '0.5';
            }
        }
        
        function handleClick(e, btn) {
            e.preventDefault();
            disableAllButtons();
            if (btn) {
                btn.style.opacity = '0.9';
                btn.innerHTML = '<div class="spinner"></div>';
            }
            window.location.href = 'https://40760h3kuaowdy9ky1ik1tz6d2.hop.clickbank.net';
        }
        
        if (getDiscountBtn) {
            getDiscountBtn.addEventListener('click', function(e) { handleClick(e, getDiscountBtn); });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) { handleClick(e, closeBtn); });
        }
        if (closeXBtn) {
            closeXBtn.addEventListener('click', function(e) { handleClick(e, closeXBtn); });
        }
    }
    
    // Exit Intent Detection
    function initExitIntent() {
        let lastY = 0;
        
        document.addEventListener('mousemove', function(e) {
            if (e.clientY < 50 && e.clientY < lastY && !popupShown) {
                showDiscountPopup();
            }
            lastY = e.clientY;
        });
        
        // Mobile: show on scroll up attempt at top
        let touchStartY = 0;
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', function(e) {
            const touchY = e.touches[0].clientY;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop <= 0 && touchY > touchStartY + 100 && !popupShown) {
                showDiscountPopup();
            }
        });
    }
    
    // Save timer before page unload
    window.addEventListener('beforeunload', function() {
        if (timerInterval) {
            saveTimerToCache();
        }
    });
    
    // Initialize exit intent on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExitIntent);
    } else {
        initExitIntent();
    }
    
    // Expose function globally for testing
    window.showDiscountPopup = showDiscountPopup;
    
    // Show popup automatically after page loads (same timing as prodentim)
    function autoShowPopup() {
        setTimeout(function() {
            if (!popupShown && typeof window.showDiscountPopup === 'function') {
                window.showDiscountPopup();
            }
        }, 200);
    }
    
    // Wait for page to be ready, then load popup after 1.2 seconds
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(autoShowPopup, 1200);
        });
    } else {
        setTimeout(autoShowPopup, 1200);
    }
})();
