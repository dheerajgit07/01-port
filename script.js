/* ==========================================================================
 * PROJECT: ELITE GAMING PORTFOLIO - HIGH PERFORMANCE JS CORE
 * ENGINE: GSAP 3D INTERACTIVE & RUNTIME HOOKS
 * ==========================================================================
 */

// Registering core GSAP plugin infrastructure
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    initSightLockCursor();
    initWordGlitchEngine();
    initSkillTelemetryCircles();
    initMixItUpPortfolio();
    initStickyHeaderAndActiveMenu();
    initMobileNavSystem();
    initGSAPScrollAnimations();
    initWhatsAppContact();
});

/* --- 1. GSAP PRO SIGHT-LOCK CURSOR ENGINE --- */
function initSightLockCursor() {
    const cursorOuter = document.querySelector(".cursor-outer");
    const cursorInner = document.querySelector(".cursor-inner");

    if (cursorOuter && cursorInner) {
        window.addEventListener("mousemove", (e) => {
            // Smooth lagging physics for outer laser ring
            gsap.to(cursorOuter, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
            // Immediate tracking for core weapon sight point
            gsap.to(cursorInner, { x: e.clientX, y: e.clientY, duration: 0.1 });
        });

        // Hover reactive mechanics over interactive components
        document.querySelectorAll("a, .btn, .service-box, .port-box, .filter-buttons .buttons").forEach(element => {
            element.addEventListener("mouseenter", () => {
                gsap.to(cursorOuter, { scale: 1.5, borderColor: "#12f7ff", backgroundColor: "rgba(18, 247, 255, 0.1)", duration: 0.3 });
                gsap.to(cursorInner, { scale: 0.5, backgroundColor: "#fff", duration: 0.3 });
            });
            element.addEventListener("mouseleave", () => {
                gsap.to(cursorOuter, { scale: 1, borderColor: "rgba(18, 247, 255, 0.4)", backgroundColor: "transparent", duration: 0.3 });
                gsap.to(cursorInner, { scale: 1, backgroundColor: "#12f7ff", duration: 0.3 });
            });
        });
    }
}

/* --- 2. TEXT SPLITTING & GLITCH/CHANGE ENGINE (UPGRADED TO GSAP) --- */
function initWordGlitchEngine() {
    let words = document.querySelectorAll(".word");
    if (!words.length) return;

    // Splitting text safely into span letters
    words.forEach((word) => {
        let letters = word.textContent.split("");
        word.textContent = "";
        letters.forEach((letter) => {
            let span = document.createElement("span");
            span.textContent = letter === " " ? "\u00A0" : letter; // Non-breaking space handling
            span.className = "letter";
            word.append(span);
        });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    let changeText = () => {
        let currentWord = words[currentWordIndex];
        let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        // Animate Current Word Out using GSAP
        gsap.to(currentWord.querySelectorAll(".letter"), {
            rotationX: 90,
            opacity: 0,
            stagger: 0.05,
            duration: 0.35,
            ease: "power1.in",
            onComplete: () => {
                currentWord.style.opacity = "0";
            }
        });

        // Prepare and Animate Next Word In using GSAP
        nextWord.style.opacity = "1";
        gsap.fromTo(nextWord.querySelectorAll(".letter"), 
            { rotationX: -90, opacity: 0 },
            { rotationX: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "back.out(1.2)", delay: 0.2 }
        );

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    // Hero core animation timeline loops
    setInterval(changeText, 3500);

    // Subtle floating breath loop for Hero section asset image
    gsap.to(".ball", {
        y: "-=15px",
        rotation: 360,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
}

/* --- 3. TELEMETRY SKILL CIRCLES INTEGRATION (PERFORMANCE DRIVEN) --- */
function initSkillTelemetryCircles() {
    const circles = document.querySelectorAll('.circle');

    circles.forEach(elem => {
        let dots = parseInt(elem.getAttribute("data-dots")) || 80;
        let marked = parseInt(elem.getAttribute("data-percent")) || 0;   
        let percent = Math.floor(dots * marked / 100);
        let points = "";
        let rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }
        elem.innerHTML = points;

        const pointsElements = elem.querySelectorAll('.points');
        
        // Triggering matrix points array sequentially using high-performance GSAP engine
        gsap.to(pointsElements, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            backgroundColor: "#12f7ff",
            boxShadow: "0 0 12px #12f7ff",
            stagger: {
                amount: 1.2,
                from: "start"
            },
            onStart: () => {
                // Instantly filter baseline transparency boundary limits
                for (let i = percent; i < dots; i++) {
                    if (pointsElements[i]) pointsElements[i].style.opacity = "0.15";
                }
            }
        });
    });
}

/* --- 4. MIXITUP SHOWCASE INTEGRATION --- */
function initMixItUpPortfolio() {
    if (document.querySelector('.portfolio-gallery')) {
        try {
            mixitup('.portfolio-gallery', {
                selectors: { target: '.port-box' },
                animation: { duration: 400, effects: 'fade scale(0.85)' }
            });
        } catch (e) {
            console.log("MixItUp initialized gracefully.");
        }
    }
}

/* --- 5. DETECT SCROLL: NAV BAR STICKY & ACTIVE MANAGEMENT --- */
function initStickyHeaderAndActiveMenu() {
    const header = document.querySelector("header");
    let menuLi = document.querySelectorAll('header ul li a');
    let sections = document.querySelectorAll('section');

    function handleScrollEngines() {
        // Sticky configuration
        if (header) {
            header.classList.toggle("sticky", window.scrollY >= 50);
        }

        // Active section indicator calculations
        let len = sections.length;
        while (--len && window.scrollY + 120 < sections[len].offsetTop) {}
        menuLi.forEach(src => src.classList.remove("active"));
        if (menuLi[len]) menuLi[len].classList.add("active");
    }

    window.addEventListener("scroll", handleScrollEngines);
    handleScrollEngines(); // Initial execution context trace
}

/* --- 6. MOBILE SMART COMMAND UI NAV SYSTEM --- */
function initMobileNavSystem() {
    let menuIcon = document.querySelector("#menu-icon");
    let navlist = document.querySelector(".navlist");

    if (menuIcon && navlist) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle("bx-x");
            navlist.classList.toggle("open");
        };

        window.addEventListener("scroll", () => {
            menuIcon.classList.remove("bx-x");
            navlist.classList.remove("open");
        });
    }
}

/* --- 7. HARDWARE GYROSCOPE 3D HOVER EFFECT & SCROLL ENGINE --- */
function initGSAPScrollAnimations() {
    // 1. Applying dynamic 3D Perspective Tilt on Technical Boxes
    document.querySelectorAll(".service-box, .port-box, .gaming-form, .box").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const offsetX = (x / rect.width - 0.5) * 20; // 20deg max horizontal pitch
            const offsetY = (y / rect.height - 0.5) * -20; // 20deg max vertical roll

            gsap.to(card, {
                rotationY: offsetX,
                rotationX: offsetY,
                transformPerspective: 1000,
                z: 10,
                boxShadow: "0 20px 40px rgba(18, 247, 255, 0.2), 0 0 25px rgba(18, 247, 255, 0.1)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                z: 0,
                boxShadow: "0 10px 30px rgba(18, 247, 255, 0.15)",
                duration: 0.5,
                ease: "power3.out"
            });
        });
    });

    // 2. Upgrading Vanilla IntersectionObserver into Advanced GSAP ScrollTriggers
    document.querySelectorAll(".scroll-scale").forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            scale: 0.85, opacity: 0, duration: 0.8, ease: "back.out(1.5)"
        });
    });

    document.querySelectorAll(".scroll-bottom").forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
        });
    });

    document.querySelectorAll(".scroll-top").forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            y: -50, opacity: 0, duration: 0.8, ease: "power2.out"
        });
    });

    // 3. Technical Progression Level Filler Control Loop
    document.querySelectorAll(".skill-bar").forEach((bar) => {
        const fillTarget = bar.querySelector(".bar span");
        if(fillTarget){
            // Temporarily capture custom CSS target size metrics safely
            let finalWidth = fillTarget.style.width || "100%";
            // Extract and clean tracking property variables
            if(fillTarget.className) {
                const specClass = fillTarget.className.split(' ')[0];
                if(specClass === "html") finalWidth = "85%";
                if(specClass === "figma") finalWidth = "75%";
                if(specClass === "css") finalWidth = "80%";
                if(specClass === "JavaScript") finalWidth = "70%";
                if(specClass === "Lan") finalWidth = "60%";
            }
            
            gsap.fromTo(fillTarget, 
                { width: "0%" },
                {
                    scrollTrigger: { trigger: bar, start: "top 90%" },
                    width: finalWidth, duration: 1.5, ease: "power3.out"
                }
            );
        }
    });
}

/* --- 8. WHATSAPP PROTOCOL SECURE TRANSMISSION ENGINE --- */
function initWhatsAppContact() {
    const contactForm = document.querySelector('.gaming-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value.trim();
        const phone = contactForm.querySelector('input[placeholder="Phone Number"]').value.trim();
        const address = contactForm.querySelector('input[placeholder="Your Address"]').value.trim();
        const message = contactForm.querySelector('#msg').value.trim();

        const myNumber = "919813455636"; 

        if(!name || !email) {
            alert("🔒 Access Denied: Mandatory identity credentials missing.");
            return;
        }

        const fullMessage = encodeURIComponent(
            `*🚀 NEW PORTFOLIO INQUIRY*\n\n` +
            `*👤 Name:* ${name}\n` +
            `*📧 Email:* ${email}\n` +
            `*📱 Phone:* ${phone}\n` +
            `*📍 Location:* ${address}\n\n` +
            `*💬 Message:* ${message}`
        );

        const whatsappURL = `https://wa.me/${myNumber}?text=${fullMessage}`;
        window.open(whatsappURL, '_blank');
        contactForm.reset();
    });
}