document.addEventListener('DOMContentLoaded', () => {

    // ========== PREMIUM LOADER ==========
    const premiumLoader = document.getElementById('premium-loader');
    const progressFill = document.querySelector('.progress-fill');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                premiumLoader.style.opacity = '0';
                setTimeout(() => {
                    premiumLoader.style.display = 'none';
                }, 500);
            }, 400);
        }
        progressFill.style.width = progress + '%';
    }, 120);

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

    // ========== LIGHT BULB ELEMENTS ==========
    const lightBulbContainer = document.getElementById('light-bulb-container');
    const bulbBody = document.querySelector('.bulb-body');
    const bulbCord = document.querySelector('.bulb-cord');
    const bulbFlash = document.querySelector('.bulb-flash');
    let isLightOn = false;
    let inactivityTimer;

    // ========== LIGHT BULB FUNCTIONS ==========
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
        inactivityTimer = setTimeout(hideLightBulb, 1000);
    }

    // ========== EVENT LISTENERS FOR USER ACTIVITY ==========
    window.addEventListener('scroll', resetInactivityTimer);
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('touchstart', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);

    // ========== ROUTINE DATA STRUCTURE ==========
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

    // ========== CORE FUNCTIONS ==========
    function handleSemesterClick(e) {
        const semesterItem = e.target.closest('li');
        if (!semesterItem) return;

        const allSemesterItems = semesterList.querySelectorAll('li');
        allSemesterItems.forEach(item => item.classList.remove('active'));
        semesterItem.classList.add('active');

        const semesterId = semesterItem.dataset.semester;
        const semesterData = routines[semesterId];

        if (semesterData.branches) {
            branchNav.classList.remove('hidden');
            routineDisplay.innerHTML = <div class="initial-message">শাখা নির্বাচন করুন</div>;
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
            title = ${routines[semesterId].name} - ${branchData.name};

            if (branchData.routine) {
                routineHTML = createRoutineTable(title, branchData.routine);
                sidebar.classList.add('sidebar-hidden');
                content.classList.add('content-full');
            } else {
                routineHTML = createMessage(রুটিন আপডেটের কাজ চলছে। শীঘ্রই জানানো হবে।);