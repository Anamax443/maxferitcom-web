(function() {
    'use strict';

    // =============================================
    // 1. HAMBURGER MENU
    // =============================================
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var mobileMenu = document.getElementById('mobileMenu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        var mobileLinks = mobileMenu.querySelectorAll('a');
        for (var i = 0; i < mobileLinks.length; i++) {
            mobileLinks[i].addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        }

        document.addEventListener('click', function(e) {
            if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // =============================================
    // 2. KONTAKTY - obfuskace emailu a telefonu
    // =============================================
    try {
        var u = 'milan.trnka';
        var d = 'maxferit';
        var t = 'cz';
        var emailLink = document.getElementById('email-link');
        var emailText = document.getElementById('email-text');
        if (emailLink && emailText) {
            var fullEmail = u + '@' + d + '.' + t;
            emailLink.href = 'mai' + 'lto:' + fullEmail;
            emailText.textContent = fullEmail;
        }
    } catch(e) {
        console.error('Email init error:', e);
    }

    try {
        var p1 = '+420';
        var p2 = '608';
        var p3 = '765';
        var p4 = '412';
        var phoneLink = document.getElementById('phone-link');
        var phoneText = document.getElementById('phone-text');
        if (phoneLink && phoneText) {
            var fullPhone = p1 + ' ' + p2 + ' ' + p3 + ' ' + p4;
            phoneLink.href = 'te' + 'l:' + p1 + p2 + p3 + p4;
            phoneText.textContent = fullPhone;
        }
    } catch(e) {
        console.error('Phone init error:', e);
    }

    // =============================================
    // 3. POCITADLA
    // =============================================
    try {
        var counters = document.querySelectorAll('.stat-number');
        var currentYear = new Date().getFullYear();

        function animateCounter(el, target, suffix) {
            var duration = 2000;
            var steps = 60;
            var stepTime = duration / steps;
            var current = 0;

            function easeOut(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            var timer = setInterval(function() {
                current++;
                var progress = easeOut(current / steps);
                var value = Math.round(progress * target);
                el.textContent = value + (suffix || '');

                if (current >= steps) {
                    clearInterval(timer);
                    el.textContent = target + (suffix || '');
                }
            }, stepTime);
        }

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        var target;
                        var suffix = el.getAttribute('data-suffix') || '';

                        if (el.getAttribute('data-start-year')) {
                            target = currentYear - parseInt(el.getAttribute('data-start-year'), 10);
                        } else if (el.getAttribute('data-target')) {
                            target = parseInt(el.getAttribute('data-target'), 10);
                        }

                        if (target && !isNaN(target)) {
                            setTimeout(function() {
                                animateCounter(el, target, suffix);
                            }, 200);
                        }
                        observer.unobserve(el);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px 0px 0px'
            });

            for (var j = 0; j < counters.length; j++) {
                observer.observe(counters[j]);
            }
        } else {
            for (var k = 0; k < counters.length; k++) {
                var el = counters[k];
                var target;
                var suffix = el.getAttribute('data-suffix') || '';

                if (el.getAttribute('data-start-year')) {
                    target = currentYear - parseInt(el.getAttribute('data-start-year'), 10);
                } else if (el.getAttribute('data-target')) {
                    target = parseInt(el.getAttribute('data-target'), 10);
                }

                if (target && !isNaN(target)) {
                    animateCounter(el, target, suffix);
                }
            }
        }
    } catch(e) {
        console.error('Counter init error:', e);
    }

})();
