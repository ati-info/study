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