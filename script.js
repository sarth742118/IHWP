// Global variables
let currentUser = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let assessmentResults = null;
let isAdmin = false;
let adminUser = null;

// Admin credentials (in a real app, this would be stored securely)
const ADMIN_CREDENTIALS = {
    email: 'admin@healtify.com',
    password: 'admin123'
};

// Quick admin access function
function quickAdminAccess() {
    isAdmin = true;
    adminUser = { email: 'admin@healtify.com', name: 'Administrator' };
    updateNavigation();
    showPage('admin');
    loadAdminDashboard();
    showMessage('Admin access granted!', 'success');
}

// Initialize data structures if they don't exist
if (!localStorage.getItem('followups')) {
    localStorage.setItem('followups', JSON.stringify([]));
}
if (!localStorage.getItem('feedback')) {
    localStorage.setItem('feedback', JSON.stringify([]));
}
if (!localStorage.getItem('userProgress')) {
    localStorage.setItem('userProgress', JSON.stringify({}));
}
if (!localStorage.getItem('userGoals')) {
    localStorage.setItem('userGoals', JSON.stringify({}));
}
// Removed reminders storage initialization

// Assessment questions with dosha weights
const questions = [
    {
        question: "How would you describe your body frame?",
        options: [
            { text: "Thin, lean, and find it difficult to gain weight", vata: 3, pitta: 1, kapha: 0 },
            { text: "Medium build, well-proportioned", vata: 1, pitta: 3, kapha: 1 },
            { text: "Large, heavy, and gain weight easily", vata: 0, pitta: 1, kapha: 3 }
        ]
    },
    {
        question: "How is your skin typically?",
        options: [
            { text: "Dry, rough, and tends to crack", vata: 3, pitta: 0, kapha: 0 },
            { text: "Warm, reddish, and prone to irritation", vata: 0, pitta: 3, kapha: 0 },
            { text: "Thick, oily, and smooth", vata: 0, pitta: 0, kapha: 3 }
        ]
    },
    {
        question: "How do you typically sleep?",
        options: [
            { text: "Light sleeper, easily disturbed, irregular sleep patterns", vata: 3, pitta: 1, kapha: 0 },
            { text: "Moderate sleep, wake up refreshed, sometimes hot", vata: 1, pitta: 3, kapha: 0 },
            { text: "Deep sleeper, difficult to wake up, sleep long hours", vata: 0, pitta: 0, kapha: 3 }
        ]
    },
    {
        question: "How do you handle stress?",
        options: [
            { text: "Anxious, worried, and overthink situations", vata: 3, pitta: 1, kapha: 0 },
            { text: "Intense, competitive, and get angry easily", vata: 1, pitta: 3, kapha: 0 },
            { text: "Calm, patient, and take time to process", vata: 0, pitta: 0, kapha: 3 }
        ]
    },
    {
        question: "How is your Diet?",
        options: [
            { text: " Warm food , Dry food", vata: 3, pitta: 0, kapha: 0 },
            { text: "Cold food , spicy food", vata: 0, pitta: 3, kapha: 0 },
            { text: "Light food , sweet food", vata: 0, pitta: 0, kapha: 3 }
        ]
    },
    {
        question: "How is your Energy Level?",
        options: [
            { text: "Low energy level", vata: 3, pitta: 1, kapha: 0 },
            { text: "High energy level", vata: 1, pitta: 3, kapha: 0 },
            { text: "Steady energy level", vata: 0, pitta: 0, kapha: 3 }
        ]
    },
    {
        question: "What is your Weather Preference?",
        options: [
            { text: "Prefer warmth", vata: 3, pitta: 0, kapha: 0 },
            { text: "Prefer cool", vata: 0, pitta: 3, kapha: 0 },
            { text: "Prefer Warm and Dry", vata: 0, pitta: 0, kapha: 3 }
        ]
    },
    {
        question: "How is your Mindset?",
        options: [
            { text: "Restless", vata: 3, pitta: 1, kapha: 0 },
            { text: "Intense", vata: 1, pitta: 3, kapha: 0 },
            { text: "Calm", vata: 0, pitta: 0, kapha: 3 }
        ]
    },
    {
        question: "How is your memory?",
        options: [
            { text: "Very Forgetful", vata: 3, pitta: 1, kapha: 0 },
            { text: " Sharp ", vata: 1, pitta: 3, kapha: 0 },
            { text: "Calm", vata: 0, pitta: 0, kapha: 3 }
        ]
    },
    {
        question: "How do you response to your emotions?",
        options: [
            { text: "Anxious", vata: 3, pitta: 1, kapha: 0 },
            { text: "Angry", vata: 1, pitta: 3, kapha: 0 },
            { text: "Content", vata: 0, pitta: 0, kapha: 3 }
        ]
    }
];

// Dosha recommendations
const doshaRecommendations = {
    vata: {
        dailyRoutine: [
            "Wake up early (6-7 AM) and maintain a regular schedule",
            "Start your day with warm oil massage (abhyanga) using sesame oil",
            "Practice gentle yoga and meditation for 20-30 minutes",
            "Eat warm, cooked meals at regular times",
            "Take short walks in nature",
            "Go to bed early (10 PM) and maintain consistent sleep schedule",
            "Avoid cold, dry, and windy environments",
            "Practice deep breathing exercises throughout the day"
        ],
        diet: [
            "Favor warm, cooked, and moist foods",
            "Include sweet, sour, and salty tastes",
            "Eat plenty of cooked vegetables, especially root vegetables",
            "Include healthy fats like ghee, sesame oil, and nuts",
            "Drink warm herbal teas (ginger, cinnamon, cardamom)",
            "Avoid cold, raw foods and carbonated drinks",
            "Eat at regular times and in a calm environment",
            "Include dairy products, especially warm milk with spices"
        ],
        lifestyle: [
            "Maintain regular daily routines",
            "Practice grounding activities like gardening or pottery",
            "Avoid excessive travel and irregular schedules",
            "Surround yourself with warm colors and soft textures",
            "Practice self-massage with warm oil regularly",
            "Engage in creative activities to channel energy",
            "Avoid overexertion and excessive exercise",
            "Practice mindfulness and stress-reduction techniques"
        ]
    },
    pitta: {
        dailyRoutine: [
            "Wake up early (6 AM) and avoid sleeping in",
            "Start your day with cooling practices like moon salutations",
            "Practice moderate exercise, avoiding excessive heat",
            "Take cool showers and avoid hot baths",
            "Eat meals at regular times, avoiding spicy foods",
            "Take breaks during work to avoid overheating",
            "Practice cooling meditation and breathing exercises",
            "Go to bed by 10 PM and avoid late-night activities"
        ],
        diet: [
            "Favor cool, sweet, bitter, and astringent tastes",
            "Eat plenty of fresh vegetables and fruits",
            "Include cooling herbs like mint, coriander, and fennel",
            "Avoid spicy, hot, and fermented foods",
            "Drink plenty of cool water and coconut water",
            "Include dairy products, especially milk and ghee",
            "Avoid excessive salt, alcohol, and caffeine",
            "Eat in a calm, cool environment"
        ],
        lifestyle: [
            "Avoid excessive heat and direct sunlight",
            "Practice cooling activities like swimming or moon gazing",
            "Maintain a balanced work schedule with regular breaks",
            "Surround yourself with cool colors (blue, green, white)",
            "Practice patience and avoid competitive situations",
            "Engage in creative and artistic activities",
            "Avoid excessive exercise during hot weather",
            "Practice forgiveness and letting go of anger"
        ]
    },
    kapha: {
        dailyRoutine: [
            "Wake up early (5-6 AM) to avoid lethargy",
            "Start your day with vigorous exercise or brisk walking",
            "Practice stimulating yoga and breathing exercises",
            "Take warm showers with stimulating essential oils",
            "Eat light, warm meals and avoid heavy foods",
            "Stay active throughout the day",
            "Practice energizing meditation techniques",
            "Go to bed early but avoid oversleeping"
        ],
        diet: [
            "Favor light, dry, warm, and spicy foods",
            "Include pungent, bitter, and astringent tastes",
            "Eat plenty of vegetables, especially leafy greens",
            "Include warming spices like ginger, black pepper, and turmeric",
            "Avoid heavy, oily, and sweet foods",
            "Drink warm water with lemon and honey",
            "Eat smaller, more frequent meals",
            "Avoid dairy products and cold foods"
        ],
        lifestyle: [
            "Engage in regular, vigorous exercise",
            "Stay active and avoid sedentary activities",
            "Practice stimulating activities and new challenges",
            "Surround yourself with bright, warm colors",
            "Maintain a stimulating environment",
            "Practice energizing breathing exercises",
            "Avoid excessive sleep and daytime napping",
            "Engage in competitive sports and activities"
        ]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Check if user is logged in
    checkAuthStatus();
    
    // Initialize assessment
    initializeAssessment();
}

function setupEventListeners() {
    // Sign up form
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Admin login form
    document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
    
    // Feedback form
    document.getElementById('feedback-form').addEventListener('submit', handleFeedbackSubmit);
    
    // Rating stars
    setupRatingStars();
    
    // Mobile menu toggle
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateNavigation();
        showPage('home');
    }
}

function updateNavigation() {
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const adminLink = document.getElementById('admin-link');
    
    if (currentUser || isAdmin) {
        profileLink.style.display = 'block';
        logoutLink.style.display = 'block';
    } else {
        profileLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
    
    if (isAdmin) {
        adminLink.style.display = 'block';
    } else {
        adminLink.style.display = 'none';
    }
}

// Page navigation
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Load page-specific content
        if (pageName === 'profile' && currentUser) {
            loadProfileData();
        } else if (pageName === 'followups' && currentUser) {
            loadFollowupsData();
        } else if (pageName === 'feedback' && currentUser) {
            loadFeedbackData();
        } else if (pageName === 'admin') {
            if (isAdmin) {
                loadAdminDashboard();
            }
        }
    }
}

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Authentication functions
function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Simple validation
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create user object
    const user = {
        name: name,
        email: email,
        password: password, // In a real app, this would be hashed
        joinDate: new Date().toISOString(),
        assessments: []
    };
    
    // Save user (in a real app, this would go to a database)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        alert('User already exists with this email');
        return;
    }
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log in the user
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    updateNavigation();
    showPage('home');
    
    alert('Account created successfully!');
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateNavigation();
        showPage('home');
    } else {
        alert('Invalid email or password');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateNavigation();
    showPage('signup');
}

// Assessment functions
function initializeAssessment() {
    currentQuestionIndex = 0;
    userAnswers = [];
    updateQuestion();
    updateProgress();
}

function updateQuestion() {
    if (currentQuestionIndex >= questions.length) {
        calculateResults();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    updateQuestionCounter();
    updateNavigationButtons();
}

function selectOption(optionIndex) {
    // Remove previous selection
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    // Select new option
    buttons[optionIndex].classList.add('selected');
    
    // Store answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert('Please select an option before proceeding');
        return;
    }
    
    currentQuestionIndex++;
    updateQuestion();
    updateProgress();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestion();
        updateProgress();
        
        // Restore previous selection
        const buttons = document.querySelectorAll('.option-btn');
        if (userAnswers[currentQuestionIndex] !== undefined) {
            buttons[userAnswers[currentQuestionIndex]].classList.add('selected');
        }
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

function updateQuestionCounter() {
    document.getElementById('question-counter').textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined;
}

function calculateResults() {
    let vataScore = 0;
    let pittaScore = 0;
    let kaphaScore = 0;
    
    userAnswers.forEach((answer, index) => {
        const option = questions[index].options[answer];
        vataScore += option.vata;
        pittaScore += option.pitta;
        kaphaScore += option.kapha;
    });
    
    // Determine primary dosha
    let primaryDosha = 'vata';
    if (pittaScore > vataScore && pittaScore > kaphaScore) {
        primaryDosha = 'pitta';
    } else if (kaphaScore > vataScore && kaphaScore > pittaScore) {
        primaryDosha = 'kapha';
    }
    
    assessmentResults = {
        vata: vataScore,
        pitta: pittaScore,
        kapha: kaphaScore,
        primaryDosha: primaryDosha
    };
    
    // Save results to user profile
    if (currentUser) {
        if (!currentUser.assessments) {
            currentUser.assessments = [];
        }
        currentUser.assessments.push({
            date: new Date().toISOString(),
            results: assessmentResults
        });
        
        // Update localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }
    
    displayResults();
}

function displayResults() {
    showPage('results');
    
    const doshaResult = document.getElementById('dosha-result');
    const doshaBreakdown = document.getElementById('dosha-breakdown');
    const routineContent = document.getElementById('routine-content');
    const dietContent = document.getElementById('diet-content');
    const lifestyleContent = document.getElementById('lifestyle-content');
    
    // Set primary dosha result
    doshaResult.className = `dosha-result ${assessmentResults.primaryDosha}`;
    doshaResult.innerHTML = `
        <h3>Your Primary Dosha: ${assessmentResults.primaryDosha.toUpperCase()}</h3>
        <p>Based on your responses, you have a ${assessmentResults.primaryDosha} constitution.</p>
    `;
    
    // Create dosha breakdown
    const total = assessmentResults.vata + assessmentResults.pitta + assessmentResults.kapha;
    const vataPercent = Math.round((assessmentResults.vata / total) * 100);
    const pittaPercent = Math.round((assessmentResults.pitta / total) * 100);
    const kaphaPercent = Math.round((assessmentResults.kapha / total) * 100);
    
    doshaBreakdown.innerHTML = `
        <div class="dosha-bar vata">
            <h4>Vata: ${vataPercent}%</h4>
            <div class="bar-container">
                <div class="bar-fill vata" style="width: ${vataPercent}%"></div>
            </div>
        </div>
        <div class="dosha-bar pitta">
            <h4>Pitta: ${pittaPercent}%</h4>
            <div class="bar-container">
                <div class="bar-fill pitta" style="width: ${pittaPercent}%"></div>
            </div>
        </div>
        <div class="dosha-bar kapha">
            <h4>Kapha: ${kaphaPercent}%</h4>
            <div class="bar-container">
                <div class="bar-fill kapha" style="width: ${kaphaPercent}%"></div>
            </div>
        </div>
    `;
    
    // Load recommendations
    const recommendations = doshaRecommendations[assessmentResults.primaryDosha];
    
    routineContent.innerHTML = `
        <ul>
            ${recommendations.dailyRoutine.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    dietContent.innerHTML = `
        <ul>
            ${recommendations.diet.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    lifestyleContent.innerHTML = `
        <ul>
            ${recommendations.lifestyle.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
}

function retakeAssessment() {
    initializeAssessment();
    showPage('assessment');
}

function saveResults() {
    if (!assessmentResults) {
        alert('No results to save');
        return;
    }
    
    const resultsText = `
Ayurvedic Dosha Assessment Results

Primary Dosha: ${assessmentResults.primaryDosha.toUpperCase()}

Dosha Breakdown:
- Vata: ${Math.round((assessmentResults.vata / (assessmentResults.vata + assessmentResults.pitta + assessmentResults.kapha)) * 100)}%
- Pitta: ${Math.round((assessmentResults.pitta / (assessmentResults.vata + assessmentResults.pitta + assessmentResults.kapha)) * 100)}%
- Kapha: ${Math.round((assessmentResults.kapha / (assessmentResults.vata + assessmentResults.pitta + assessmentResults.kapha)) * 100)}%

Assessment Date: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dosha-assessment-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Results saved successfully!');
}

// Profile functions
function loadProfileData() {
    if (!currentUser) return;
    
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-date').textContent = new Date(currentUser.joinDate).toLocaleDateString();
}

function viewHistory() {
    if (!currentUser || !currentUser.assessments || currentUser.assessments.length === 0) {
        alert('No assessment history found');
        return;
    }
    
    let historyText = 'Assessment History:\n\n';
    currentUser.assessments.forEach((assessment, index) => {
        const date = new Date(assessment.date).toLocaleDateString();
        const results = assessment.results;
        const total = results.vata + results.pitta + results.kapha;
        
        historyText += `Assessment ${index + 1} - ${date}\n`;
        historyText += `Primary Dosha: ${results.primaryDosha.toUpperCase()}\n`;
        historyText += `Vata: ${Math.round((results.vata / total) * 100)}%\n`;
        historyText += `Pitta: ${Math.round((results.pitta / total) * 100)}%\n`;
        historyText += `Kapha: ${Math.round((results.kapha / total) * 100)}%\n\n`;
    });
    
    alert(historyText);
}

// Follow-ups Functions
function loadFollowupsData() {
    if (!currentUser) return;
    
    // Load progress data
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const progress = userProgress[currentUser.email] || {
        assessments: 0,
        routineDays: 0,
        goalsAchieved: 0,
        dailyProgress: {}
    };
    
    // Update progress cards
    document.getElementById('assessments-count').textContent = currentUser.assessments ? currentUser.assessments.length : 0;
    document.getElementById('routine-days').textContent = progress.routineDays || 0;
    document.getElementById('goals-achieved').textContent = progress.goalsAchieved || 0;
    
    // Load goals
    loadGoals();
    
    // Load today's progress
    loadTodayProgress();
}

// Removed reminder-related functions and references

function loadGoals() {
    const userGoals = JSON.parse(localStorage.getItem('userGoals') || '{}');
    const goals = userGoals[currentUser.email] || [];
    
    const goalsList = document.getElementById('goals-list');
    goalsList.innerHTML = '';
    
    goals.forEach((goal, index) => {
        const goalItem = document.createElement('div');
        goalItem.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        
        goalItem.innerHTML = `
            <div>
                <strong>${goal.title}</strong>
                <p>${goal.description}</p>
                <small>Target: ${new Date(goal.targetDate).toLocaleDateString()}</small>
            </div>
            <div class="action-buttons">
                <button class="btn-small btn-complete" onclick="completeGoal(${index})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-small btn-delete" onclick="deleteGoal(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        goalsList.appendChild(goalItem);
    });
}

function addGoal() {
    const title = prompt('Goal title:');
    if (!title) return;
    
    const description = prompt('Goal description:');
    if (!description) return;
    
    const targetDate = prompt('Target date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    if (!targetDate) return;
    
    const userGoals = JSON.parse(localStorage.getItem('userGoals') || '{}');
    if (!userGoals[currentUser.email]) {
        userGoals[currentUser.email] = [];
    }
    
    userGoals[currentUser.email].push({
        title,
        description,
        targetDate,
        completed: false,
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('userGoals', JSON.stringify(userGoals));
    loadGoals();
}

function completeGoal(index) {
    const userGoals = JSON.parse(localStorage.getItem('userGoals') || '{}');
    userGoals[currentUser.email][index].completed = true;
    localStorage.setItem('userGoals', JSON.stringify(userGoals));
    
    // Update progress
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    if (!userProgress[currentUser.email]) {
        userProgress[currentUser.email] = { goalsAchieved: 0 };
    }
    userProgress[currentUser.email].goalsAchieved = (userProgress[currentUser.email].goalsAchieved || 0) + 1;
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    
    loadGoals();
    loadFollowupsData();
}

function deleteGoal(index) {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    
    const userGoals = JSON.parse(localStorage.getItem('userGoals') || '{}');
    userGoals[currentUser.email].splice(index, 1);
    localStorage.setItem('userGoals', JSON.stringify(userGoals));
    loadGoals();
}

function loadTodayProgress() {
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const today = new Date().toDateString();
    const todayProgress = userProgress[currentUser.email]?.dailyProgress?.[today] || {};
    
    document.getElementById('track-routine').checked = todayProgress.routine || false;
    document.getElementById('track-diet').checked = todayProgress.diet || false;
    document.getElementById('track-exercise').checked = todayProgress.exercise || false;
    document.getElementById('track-meditation').checked = todayProgress.meditation || false;
}

function updateProgress(type) {
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    if (!userProgress[currentUser.email]) {
        userProgress[currentUser.email] = { dailyProgress: {} };
    }
    if (!userProgress[currentUser.email].dailyProgress) {
        userProgress[currentUser.email].dailyProgress = {};
    }
    
    const today = new Date().toDateString();
    if (!userProgress[currentUser.email].dailyProgress[today]) {
        userProgress[currentUser.email].dailyProgress[today] = {};
    }
    
    userProgress[currentUser.email].dailyProgress[today][type] = document.getElementById(`track-${type}`).checked;
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function saveDailyProgress() {
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    if (!userProgress[currentUser.email]) {
        userProgress[currentUser.email] = { routineDays: 0 };
    }
    
    const today = new Date().toDateString();
    const todayProgress = userProgress[currentUser.email].dailyProgress?.[today] || {};
    
    // Check if routine was followed today
    if (todayProgress.routine && !userProgress[currentUser.email].lastRoutineDate) {
        userProgress[currentUser.email].routineDays = (userProgress[currentUser.email].routineDays || 0) + 1;
        userProgress[currentUser.email].lastRoutineDate = today;
    } else if (todayProgress.routine && userProgress[currentUser.email].lastRoutineDate !== today) {
        userProgress[currentUser.email].routineDays = (userProgress[currentUser.email].routineDays || 0) + 1;
        userProgress[currentUser.email].lastRoutineDate = today;
    }
    
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    loadFollowupsData();
    showMessage('Progress saved successfully!', 'success');
}

// Feedback Functions
function loadFeedbackData() {
    if (!currentUser) return;
    
    // Load previous feedback
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    const userFeedback = allFeedback.filter(f => f.userEmail === currentUser.email);
    
    const feedbackHistory = document.getElementById('feedback-history');
    feedbackHistory.innerHTML = '';
    
    userFeedback.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        
        const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
        
        feedbackItem.innerHTML = `
            <h4>${feedback.title}</h4>
            <div class="feedback-meta">
                <span class="feedback-rating">${stars}</span>
                <span>${new Date(feedback.date).toLocaleDateString()}</span>
            </div>
            <p>${feedback.message}</p>
        `;
        
        feedbackHistory.appendChild(feedbackItem);
    });
}

function setupRatingStars() {
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingInput = document.getElementById('feedback-rating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
}

function handleFeedbackSubmit(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showMessage('Please login to submit feedback', 'error');
        return;
    }
    
    const type = document.getElementById('feedback-type').value;
    const rating = parseInt(document.getElementById('feedback-rating').value);
    const title = document.getElementById('feedback-title').value;
    const message = document.getElementById('feedback-message').value;
    
    if (!type || !rating || !title || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    const feedback = {
        userEmail: currentUser.email,
        userName: currentUser.name,
        type,
        rating,
        title,
        message,
        date: new Date().toISOString()
    };
    
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    allFeedback.push(feedback);
    localStorage.setItem('feedback', JSON.stringify(allFeedback));
    
    // Reset form
    document.getElementById('feedback-form').reset();
    document.getElementById('feedback-rating').value = '0';
    document.querySelectorAll('.rating-stars i').forEach(star => star.classList.remove('active'));
    
    showMessage('Feedback submitted successfully!', 'success');
    loadFeedbackData();
}

// Admin Functions
function handleAdminLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        isAdmin = true;
        adminUser = { email, name: 'Administrator' };
        document.getElementById('admin-login-section').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        updateNavigation();
        loadAdminDashboard();
        showMessage('Admin login successful!', 'success');
    } else {
        showMessage('Invalid admin credentials', 'error');
    }
}

function loadAdminDashboard() {
    if (!isAdmin) return;
    
    // Load statistics
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    
    let totalAssessments = 0;
    users.forEach(user => {
        if (user.assessments) {
            totalAssessments += user.assessments.length;
        }
    });
    
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('total-assessments').textContent = totalAssessments;
    document.getElementById('total-feedback').textContent = allFeedback.length;
    
    // Load analytics
    loadStudentAnalytics();
    
    // Load user table
    loadUsersTable();
    
    // Load feedback table
    loadFeedbackTable();
}

function loadStudentAnalytics() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    
    // Calculate completion rate
    const usersWithAssessments = users.filter(user => user.assessments && user.assessments.length > 0);
    const completionRate = users.length > 0 ? Math.round((usersWithAssessments.length / users.length) * 100) : 0;
    document.getElementById('completion-rate').textContent = completionRate + '%';
    
    // Calculate average progress score
    let totalProgress = 0;
    let progressCount = 0;
    users.forEach(user => {
        const progress = userProgress[user.email];
        if (progress && progress.routineDays) {
            totalProgress += progress.routineDays;
            progressCount++;
        }
    });
    const avgProgress = progressCount > 0 ? Math.round(totalProgress / progressCount) : 0;
    document.getElementById('avg-progress').textContent = avgProgress;
    
    // Calculate most common dosha
    const doshaCounts = { vata: 0, pitta: 0, kapha: 0 };
    users.forEach(user => {
        if (user.assessments && user.assessments.length > 0) {
            const lastAssessment = user.assessments[user.assessments.length - 1];
            doshaCounts[lastAssessment.results.primaryDosha]++;
        }
    });
    const commonDosha = Object.keys(doshaCounts).reduce((a, b) => doshaCounts[a] > doshaCounts[b] ? a : b);
    document.getElementById('common-dosha').textContent = commonDosha.toUpperCase();
    
    // Calculate active engagement
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeUsers = users.filter(user => {
        const lastActive = new Date(user.lastActive || user.joinDate);
        return lastActive > sevenDaysAgo;
    });
    const engagementRate = users.length > 0 ? Math.round((activeUsers.length / users.length) * 100) : 0;
    document.getElementById('active-engagement').textContent = engagementRate + '%';
}

function loadUsersTable() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        const lastActive = user.lastActive || user.joinDate;
        const assessmentCount = user.assessments ? user.assessments.length : 0;
        
        // Calculate progress score
        const progress = userProgress[user.email];
        let progressScore = 0;
        let progressClass = 'progress-poor';
        
        if (progress) {
            progressScore = (progress.routineDays || 0) + (progress.goalsAchieved || 0) * 2;
            if (progressScore >= 10) progressClass = 'progress-excellent';
            else if (progressScore >= 5) progressClass = 'progress-good';
            else if (progressScore >= 2) progressClass = 'progress-average';
        }
        
        row.innerHTML = `
            <td><input type="checkbox" class="user-checkbox" value="${index}" onchange="updateBulkActions()"></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${new Date(user.joinDate).toLocaleDateString()}</td>
            <td>${assessmentCount}</td>
            <td>${new Date(lastActive).toLocaleDateString()}</td>
            <td><span class="progress-score ${progressClass}">${progressScore}</span></td>
            <td class="action-buttons">
                <button class="btn-small btn-view" onclick="viewUserDetails('${user.email}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-small btn-edit" onclick="editUser('${user.email}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-delete" onclick="deleteUser('${user.email}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function toggleAllUsers() {
    const selectAll = document.getElementById('select-all-users');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateBulkActions();
}

function updateBulkActions() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');
    const bulkActions = document.getElementById('bulk-actions');
    
    if (checkboxes.length > 0) {
        bulkActions.style.display = 'flex';
    } else {
        bulkActions.style.display = 'none';
    }
}

function bulkDeleteUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');
    if (checkboxes.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${checkboxes.length} selected students?`)) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.value)).sort((a, b) => b - a);
    
    selectedIndices.forEach(index => {
        users.splice(index, 1);
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    loadUsersTable();
    loadAdminDashboard();
    showMessage(`${checkboxes.length} students deleted successfully!`, 'success');
}

function bulkExportUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');
    if (checkboxes.length === 0) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    let csvContent = 'Name,Email,Join Date,Assessments,Last Active,Progress Score\n';
    
    selectedIndices.forEach(index => {
        const user = users[index];
        const progress = userProgress[user.email];
        const progressScore = progress ? (progress.routineDays || 0) + (progress.goalsAchieved || 0) * 2 : 0;
        const assessmentCount = user.assessments ? user.assessments.length : 0;
        const lastActive = user.lastActive || user.joinDate;
        
        csvContent += `"${user.name}","${user.email}","${new Date(user.joinDate).toLocaleDateString()}","${assessmentCount}","${new Date(lastActive).toLocaleDateString()}","${progressScore}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage(`${checkboxes.length} students exported successfully!`, 'success');
}

function exportStudentData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    
    let csvContent = 'Name,Email,Join Date,Assessments,Last Active,Progress Score,Routine Days,Goals Achieved\n';
    
    users.forEach(user => {
        const progress = userProgress[user.email];
        const progressScore = progress ? (progress.routineDays || 0) + (progress.goalsAchieved || 0) * 2 : 0;
        const assessmentCount = user.assessments ? user.assessments.length : 0;
        const lastActive = user.lastActive || user.joinDate;
        const routineDays = progress ? progress.routineDays || 0 : 0;
        const goalsAchieved = progress ? progress.goalsAchieved || 0 : 0;
        
        csvContent += `"${user.name}","${user.email}","${new Date(user.joinDate).toLocaleDateString()}","${assessmentCount}","${new Date(lastActive).toLocaleDateString()}","${progressScore}","${routineDays}","${goalsAchieved}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_students_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('All student data exported successfully!', 'success');
}

function viewUserDetails(email) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const userGoals = JSON.parse(localStorage.getItem('userGoals') || '{}');
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    
    const user = users.find(u => u.email === email);
    if (!user) return;
    
    const progress = userProgress[email] || {};
    const goals = userGoals[email] || [];
    const userFeedback = allFeedback.filter(f => f.userEmail === email);
    
    let details = `STUDENT DETAILS\n\n`;
    details += `Name: ${user.name}\n`;
    details += `Email: ${user.email}\n`;
    details += `Join Date: ${new Date(user.joinDate).toLocaleDateString()}\n`;
    details += `Assessments Taken: ${user.assessments ? user.assessments.length : 0}\n`;
    details += `Last Active: ${new Date(user.lastActive || user.joinDate).toLocaleDateString()}\n\n`;
    
    details += `PROGRESS SUMMARY\n`;
    details += `Routine Days: ${progress.routineDays || 0}\n`;
    details += `Goals Achieved: ${progress.goalsAchieved || 0}\n`;
    details += `Active Goals: ${goals.filter(g => !g.completed).length}\n`;
    details += `Feedback Submitted: ${userFeedback.length}\n\n`;
    
    if (user.assessments && user.assessments.length > 0) {
        details += `ASSESSMENT HISTORY\n`;
        user.assessments.forEach((assessment, index) => {
            const results = assessment.results;
            const total = results.vata + results.pitta + results.kapha;
            details += `${index + 1}. ${new Date(assessment.date).toLocaleDateString()}\n`;
            details += `   Primary Dosha: ${results.primaryDosha.toUpperCase()}\n`;
            details += `   Vata: ${Math.round((results.vata / total) * 100)}%\n`;
            details += `   Pitta: ${Math.round((results.pitta / total) * 100)}%\n`;
            details += `   Kapha: ${Math.round((results.kapha / total) * 100)}%\n\n`;
        });
    }
    
    alert(details);
}

// Removed admin follow-ups table rendering

function loadFeedbackTable() {
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    const tbody = document.getElementById('feedback-table-body');
    tbody.innerHTML = '';
    
    allFeedback.forEach((feedback, index) => {
        const row = document.createElement('tr');
        const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
        
        row.innerHTML = `
            <td>${feedback.userName}</td>
            <td>${feedback.type}</td>
            <td class="feedback-rating">${stars}</td>
            <td>${feedback.title}</td>
            <td>${new Date(feedback.date).toLocaleDateString()}</td>
            <td class="action-buttons">
                <button class="btn-small btn-view" onclick="viewFeedback(${index})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-small btn-delete" onclick="deleteFeedback(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Removed admin follow-up status helper

// Filter functions
function filterUsers() {
    const searchTerm = document.getElementById('user-search').value.toLowerCase();
    const filterType = document.getElementById('user-filter').value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                            user.email.toLowerCase().includes(searchTerm);
        
        if (filterType === 'active') {
            const lastActive = new Date(user.lastActive || user.joinDate);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return matchesSearch && lastActive > thirtyDaysAgo;
        } else if (filterType === 'inactive') {
            const lastActive = new Date(user.lastActive || user.joinDate);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return matchesSearch && lastActive <= thirtyDaysAgo;
        }
        
        return matchesSearch;
    });
    
    // Update table with filtered results
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        const lastActive = user.lastActive || user.joinDate;
        const assessmentCount = user.assessments ? user.assessments.length : 0;
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${new Date(user.joinDate).toLocaleDateString()}</td>
            <td>${assessmentCount}</td>
            <td>${new Date(lastActive).toLocaleDateString()}</td>
            <td class="action-buttons">
                <button class="btn-small btn-view" onclick="viewUser('${user.email}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-small btn-edit" onclick="editUser('${user.email}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-delete" onclick="deleteUser('${user.email}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Removed admin follow-ups filtering

function filterFeedback() {
    const filterType = document.getElementById('feedback-type-filter').value;
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    
    const filteredFeedback = allFeedback.filter(feedback => {
        if (filterType) return feedback.type === filterType;
        return true;
    });
    
    // Update table with filtered results
    const tbody = document.getElementById('feedback-table-body');
    tbody.innerHTML = '';
    
    filteredFeedback.forEach((feedback, index) => {
        const row = document.createElement('tr');
        const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
        
        row.innerHTML = `
            <td>${feedback.userName}</td>
            <td>${feedback.type}</td>
            <td class="feedback-rating">${stars}</td>
            <td>${feedback.title}</td>
            <td>${new Date(feedback.date).toLocaleDateString()}</td>
            <td class="action-buttons">
                <button class="btn-small btn-view" onclick="viewFeedback(${index})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-small btn-delete" onclick="deleteFeedback(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Admin action functions
function viewUser(email) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    if (user) {
        alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nJoin Date: ${new Date(user.joinDate).toLocaleDateString()}\nAssessments: ${user.assessments ? user.assessments.length : 0}`);
    }
}

function editUser(email) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
        const newName = prompt('Enter new name:', users[userIndex].name);
        if (newName) {
            users[userIndex].name = newName;
            localStorage.setItem('users', JSON.stringify(users));
            loadUsersTable();
            showMessage('User updated successfully!', 'success');
        }
    }
}

function deleteUser(email) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter(u => u.email !== email);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    loadUsersTable();
    showMessage('User deleted successfully!', 'success');
}

// Removed admin follow-up view/edit/delete actions

function viewFeedback(index) {
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    const feedback = allFeedback[index];
    if (feedback) {
        const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
        alert(`Feedback Details:\nUser: ${feedback.userName}\nType: ${feedback.type}\nRating: ${stars}\nTitle: ${feedback.title}\nMessage: ${feedback.message}\nDate: ${new Date(feedback.date).toLocaleDateString()}`);
    }
}

function deleteFeedback(index) {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    
    const allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    allFeedback.splice(index, 1);
    localStorage.setItem('feedback', JSON.stringify(allFeedback));
    loadFeedbackTable();
    showMessage('Feedback deleted successfully!', 'success');
}

// Utility functions
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Add to page
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        activePage.insertBefore(messageDiv, activePage.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

function showAdminLogin() {
    showPage('admin');
    setTimeout(function() {
        const adminLoginSection = document.getElementById('admin-login-section');
        if (adminLoginSection) {
            adminLoginSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Update logout function to handle admin logout
function logout() {
    currentUser = null;
    isAdmin = false;
    adminUser = null;
    localStorage.removeItem('currentUser');
    updateNavigation();
    showPage('signup');
} 