// routine-script.js

document.addEventListener('DOMContentLoaded', () => {

    // ========== PREMIUM LOADER (আগের মতো) ==========
    const premiumLoader = document.getElementById('premium-loader');
    const progressFill = document.querySelector('.progress-fill');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 8;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                premiumLoader.style.opacity = '0';
                setTimeout(() => {
                    premiumLoader.style.display = 'none';
                }, 500);
            }, 200);
        }
        progressFill.style.width = progress + '%';
    }, 20);

    // ========== DOM ELEMENTS ==========
    const welcomePopup = document.getElementById('welcome-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const mainContainer = document.querySelector('.main-container');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const semesterList = document.getElementById('semester-list');
    const branchNav = document.getElementById('branch-nav-1');
    const routineDisplay = document.getElementById('routine-display');
    const initialMessage = document.querySelector('.initial-message');
    const creatorText = document.getElementById('creator-text');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');

    // ========== LIGHT BULB ELEMENTS (আগের মতো) ==========
    const lightBulbContainer = document.getElementById('light-bulb-container');
    const bulbBody = document.querySelector('.bulb-body');
    const bulbCord = document.querySelector('.bulb-cord');
    const bulbFlash = document.querySelector('.bulb-flash');
    let isLightOn = false;
    let inactivityTimer;
    let menuHideTimer; // মেনু বাটন হাইড করার জন্য নতুন টাইমার

    // ========== LIGHT BULB FUNCTIONS (আগের মতো) ==========
    function hideLightBulb() {
        if (lightBulbContainer) {
            lightBulbContainer.style.opacity = '0';
            lightBulbContainer.style.pointerEvents = 'none';
        }
    }

    function showLightBulb() {
        if (lightBulbContainer) {
            lightBulbContainer.style.opacity = '1';
            lightBulbContainer.style.pointerEvents = 'auto';
        }
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        showLightBulb();
        inactivityTimer = setTimeout(hideLightBulb, 5000);
    }
    
    // ========== NEW FUNCTION: মেনু বাটন লুকিয়ে দেওয়া ==========
    function hideMenuButton() {
        if (menuToggleBtn) {
            menuToggleBtn.style.opacity = '0';
            setTimeout(() => {
                 menuToggleBtn.style.display = 'none';
            }, 300); // CSS transition time
        }
    }

    // ========== NEW FUNCTION: মেনু বাটন দেখিয়ে আবার লুকিয়ে দেওয়া ==========
    function showAndHideMenuButton() {
        clearTimeout(menuHideTimer);
        if (menuToggleBtn && window.innerWidth <= 768) {
             menuToggleBtn.style.display = 'block';
             menuToggleBtn.style.opacity = '1';
             menuHideTimer = setTimeout(hideMenuButton, 2000); // ২ সেকেন্ড পর হাইড হবে
        }
    }

    // ========== EVENT LISTENERS FOR USER ACTIVITY (রিসেট টাইমার এবং মেনু হাইড/শো) ==========
    window.addEventListener('scroll', () => { resetInactivityTimer(); showAndHideMenuButton(); });
    window.addEventListener('mousemove', () => { resetInactivityTimer(); showAndHideMenuButton(); });
    window.addEventListener('touchstart', () => { resetInactivityTimer(); showAndHideMenuButton(); });
    window.addEventListener('keydown', () => { resetInactivityTimer(); showAndHideMenuButton(); });
    window.addEventListener('resize', () => { 
        if (window.innerWidth > 768) {
            if (menuToggleBtn) {
                menuToggleBtn.style.display = 'none';
            }
        }
    });

    // ========== ROUTINE DATA STRUCTURE (আগের মতো) ==========
    const routines = {
        '1': {
            name: '১ম সেমিস্টার',
            branches: {
                'k': {
                    name: 'ক শাখা',
                    routine: {
                        'রবিবার': [
                            { time: '09:30 – 10:15', subject: 'রসায়ন-১' },
                            { time: '10:20 – 11:05', subject: 'পদার্থ-১' },
                            { time: '11:10 – 11:55', subject: 'গণিত-১' },
                            { time: '12:00 – 12:45', subject: 'কৃষি' } 
                        ],
                        'সোমবার': [
                            { time: '09:30 – 10:15', subject: 'ব্যব : রসায়ন-১' },
                            { time: '10:20 – 11:05', subject: 'জীববিজ্ঞান-১' },
                            { time: '11:10 – 11:55', subject: 'ব্যব : পদার্থ-১' },
                            { time: '12:50 – 01:35', subject: 'কৃষি' } 
                        ],
                        'মঙ্গলবার': [
                            { time: '09:30 – 10:15', subject: 'ইংরেজি-১' },
                            { time: '10:20 – 11:05', subject: 'ব্যব: জীববিজ্ঞান-১' },
                            { time: '11:10 – 11:55', subject: 'গণিত -১' },
                            { time: '12:50 – 01:35', subject: 'বাংলা-১' }
                        ],
                        'বুধবার': [
                            { time: '12:00 – 12:45', subject: 'ইংরেজি-১' },
                            { time: '12:50 – 01:35', subject: 'রসায়ন -১' }
                        ],
                        'বৃহস্পতিবার': [
                            { time: '11:10 – 11:55', subject: 'বাংলা-১' }, 
                            { time: '12:00 – 12:45', subject: 'ব্যব: গণিত-১' },
                            { time: '12:50 – 01:35', subject: 'পদার্থ-১' }
                        ]
                    }
                },
                'kh': {
                    name: 'খ শাখা',
                    routine: null
                },
                'g': {
                    name: 'গ শাখা',
                    routine: null
                }
            }
        },
        '2': {
            name: '২য় সেমিস্টার',
            branches: null
        },
        '4': {
            name: '৪র্থ সেমিস্টার',
            branches: null
        },
        '6': {
            name: '৬ষ্ঠ সেমিস্টার',
            branches: null
        }
    };

    // ========== EVENT LISTENERS ==========
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            welcomePopup.style.opacity = '0';
            welcomePopup.style.transform = 'scale(0.9)';
            setTimeout(() => {
                welcomePopup.style.display = 'none';
                mainContainer.classList.remove('hidden');
                showAndHideMenuButton(); // মেনু বাটন দেখানো
            }, 300);
        });
    }

    if (semesterList) {
        semesterList.addEventListener('click', handleSemesterClick);
    }

    if (branchNav) {
        branchNav.addEventListener('click', handleBranchClick);
    }

    if (creatorText) {
        creatorText.addEventListener('click', () => {
            creatorText.classList.add('annoy');
            setTimeout(() => {
                creatorText.classList.remove('annoy');
            }, 3000);
        });
    }

    if (lightBulbContainer) {
        lightBulbContainer.addEventListener('click', toggleLight);
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleSidebar);
    }

    // ========== CORE FUNCTIONS ==========

    function toggleSidebar() {
        sidebar.classList.toggle('mobile-hidden');
        showAndHideMenuButton(); // সাইডবার টগল করার পর আবার মেনু বাটন দেখিয়ে হাইড করা
    }

    function handleSemesterClick(e) {
        const semesterItem = e.target.closest('li');
        if (!semesterItem) return;

        // মোবাইল ডিভাইসে সাইডবার হাইড করা
        if (window.innerWidth <= 768) {
             sidebar.classList.add('mobile-hidden');
             showAndHideMenuButton();
        }

        const allSemesterItems = semesterList.querySelectorAll('li');
        allSemesterItems.forEach(item => item.classList.remove('active'));
        semesterItem.classList.add('active');

        const semesterId = semesterItem.dataset.semester;
        const semesterData = routines[semesterId];

        if (semesterData.branches) {
            branchNav.classList.remove('hidden');
            routineDisplay.innerHTML = `<div class="initial-message">শাখা নির্বাচন করুন</div>`;
            sidebar.classList.remove('sidebar-hidden');
            content.classList.remove('content-full');
        } else {
            branchNav.classList.add('hidden');
            showRoutine(semesterId);
        }
    }

    function handleBranchClick(e) {
        const branchItem = e.target.closest('.branch-item');
        if (!branchItem) return;

        // মোবাইল ডিভাইসে সাইডবার হাইড করা
        if (window.innerWidth <= 768) {
            sidebar.classList.add('mobile-hidden');
            showAndHideMenuButton();
        }

        const allBranchItems = branchNav.querySelectorAll('.branch-item');
        allBranchItems.forEach(item => item.classList.remove('active'));
        branchItem.classList.add('active');

        const branchId = branchItem.dataset.branch;
        showRoutine('1', branchId);
    }

    function showRoutine(semesterId, branchId = null) {
        let routineHTML = '';
        let title = '';

        if (initialMessage) {
            initialMessage.classList.add('hidden');
        }

        if (branchId) {
            const branchData = routines[semesterId].branches[branchId];
            title = `${routines[semesterId].name} - ${branchData.name}`;

            if (branchData.routine) {
                routineHTML = createRoutineTable(title, branchData.routine);
                content.classList.add('content-full');
            } else {
                routineHTML = createMessage(`রুটিন আপডেটের কাজ চলছে। শীঘ্রই জানানো হবে।`);
                content.classList.add('content-full');
            }
        } else {
            title = routines[semesterId].name;
            routineHTML = createMessage(`রুটিন আপডেটের কাজ চলছে। শীঘ্রই জানানো হবে।`);
            sidebar.classList.remove('sidebar-hidden');
            content.classList.remove('content-full');
        }

        routineDisplay.innerHTML = routineHTML;
    }

    // ========== HELPER FUNCTIONS (আগের মতো) ==========
    function createRoutineTable(title, routineData) {
        let dailyRoutineHTML = '';
        for (const day in routineData) {
            let subjectsHTML = '';
            routineData[day].forEach(period => {
                subjectsHTML += `<div class="time-and-subject"><strong>(${period.time})</strong> ${period.subject}</div>`;
            });
            dailyRoutineHTML += 
                `<tr>
                    <td>${day}</td>
                    <td>${subjectsHTML}</td>
                </tr>`
            ;
        }
        return `
            <h2>${title}</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>দিন</th>
                            <th>বিষয়</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dailyRoutineHTML}
                    </tbody>
                </table>
            </div>
        `;
    }

    function createMessage(message) {
        return `<div class="message-box">${message}</div>`;
    }

    function toggleLight() {
        isLightOn = !isLightOn;

        if (isLightOn) {
            bulbBody.classList.add('on');
            bulbFlash.classList.add('on');
            document.body.classList.remove('light-off');
            document.body.classList.add('light-on');
        } else {
            bulbBody.classList.remove('on');
            bulbFlash.classList.remove('on');
            document.body.classList.remove('light-on');
            document.body.classList.add('light-off');
        }

        bulbCord.classList.add('pulled');
        setTimeout(() => {
            bulbCord.classList.remove('pulled');
        }, 200);
    }

    // ========== INITIAL STATE ==========
    document.body.classList.add('light-off');
    if (mainContainer) {
        mainContainer.classList.add('hidden');
    }
    if (welcomePopup) {
        welcomePopup.classList.remove('hidden');
    }
    resetInactivityTimer();
});
                                                  
