# Healtify - Ayurvedic Dosha Assessment

A comprehensive web application for assessing your Ayurvedic dosha type and receiving personalized recommendations for a balanced lifestyle.

## Features

### Core Assessment
- **Comprehensive Dosha Assessment**: 10 carefully crafted questions to determine your primary dosha type
- **Personalized Results**: Detailed breakdown of Vata, Pitta, and Kapha percentages
- **Customized Recommendations**: 
  - Daily routines tailored to your dosha
  - Diet recommendations for balance
  - Lifestyle tips for harmony
- **Results History**: Track your assessment progress over time

### Follow-ups & Progress Tracking
- **Daily Routine Tracking**: Monitor your adherence to recommended practices
- **Progress Overview**: Visual cards showing assessments taken, routine days, and goals achieved
- **Reminder System**: Set and manage daily reminders for Ayurvedic practices
- **Goal Setting**: Create and track personal wellness goals
- **Progress Analytics**: Track daily activities like meditation, exercise, and diet adherence

### Feedback Collection
- **User Feedback System**: Submit feedback on assessment experience, recommendations, and app features
- **Star Rating System**: Rate your experience with interactive star ratings
- **Feedback History**: View your previous feedback submissions
- **Multiple Feedback Types**: Assessment experience, recommendations, app features, and general feedback

### Admin Panel
- **User Management**: View, edit, and manage user accounts
- **Assessment Analytics**: Track total assessments and user engagement
- **Follow-up Management**: Monitor user progress and follow-up status
- **Feedback Management**: Review and manage user feedback
- **Statistics Dashboard**: Overview of platform usage and user activity

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)
- **Storage**: Local Storage for data persistence

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start using the application

### Usage

#### For Users
1. **Sign Up/Login**: Create an account or login to existing account
2. **Take Assessment**: Answer 10 questions about your physical and mental characteristics
3. **View Results**: Get your dosha breakdown and personalized recommendations
4. **Track Progress**: Use the follow-ups page to track daily routines and goals
5. **Submit Feedback**: Share your experience and suggestions

#### For Administrators
1. **Admin Login**: Use admin credentials (admin@healtify.com / admin123)
2. **User Management**: View and manage user accounts
3. **Analytics**: Monitor platform usage and user engagement
4. **Feedback Review**: Review and manage user feedback

## Dosha Types

### Vata Dosha
- **Elements**: Air + Ether
- **Qualities**: Light, dry, cold, mobile
- **Characteristics**: Creative, quick-thinking, adaptable
- **When Balanced**: Energetic, enthusiastic, imaginative

### Pitta Dosha
- **Elements**: Fire + Water
- **Qualities**: Hot, sharp, light, oily
- **Characteristics**: Intelligent, focused, natural leaders
- **When Balanced**: Confident, courageous, goal-oriented

### Kapha Dosha
- **Elements**: Earth + Water
- **Qualities**: Heavy, slow, cool, oily
- **Characteristics**: Strong, loyal, patient
- **When Balanced**: Loving, compassionate, stable

## File Structure

```
healtify/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Features in Detail

### Assessment System
- Dynamic question navigation with progress tracking
- Real-time dosha score calculation
- Comprehensive result analysis
- Personalized recommendation engine

### Progress Tracking
- Daily activity checkboxes for routine adherence
- Visual progress cards with statistics
- Goal setting and achievement tracking
- Reminder system with due dates

### Admin Dashboard
- User account management with search and filtering
- Assessment analytics and statistics
- Follow-up status monitoring
- Feedback review and management system

### Data Management
- Local storage for user data persistence
- Secure admin authentication
- Data export capabilities
- Backup and restore functionality

## Security Features

- Admin authentication system
- User data isolation
- Secure password handling (demo version)
- Session management
 

## Admin Portal Guide

### 🔐 **Admin Access**

#### **Method 1: Quick Access (For Testing)**
- Click the **"Admin Access"** button on the home page
- This grants immediate admin access for testing purposes

#### **Method 2: Standard Login**
- Navigate to the **Admin** page from the navigation menu
- Login with credentials:
  - **Email**: `admin@healtify.com`
  - **Password**: `admin123`

### 📊 **Admin Dashboard Features**

#### **1. Statistics Overview**
- **Total Users**: Number of registered students
- **Total Assessments**: Completed assessments count
- **Active Follow-ups**: Ongoing student progress tracking
- **Feedback Received**: User feedback submissions

#### **2. Student Management**
- **Complete Student List**: View all registered students
- **Search & Filter**: Find students by name, email, or status
- **Student Actions**: View details, edit, or delete accounts
- **Progress Tracking**: Monitor assessment completion and engagement
- **Data Export**: Download student data as CSV files

#### **3. Student Analytics**
- **Assessment Completion Rate**: Percentage of students who completed assessments
- **Average Progress Score**: Overall student engagement metrics
- **Most Common Dosha**: Popular dosha types among students
- **Active Engagement**: Students active in the last 7 days

#### **4. Follow-up Management**
- **Progress Monitoring**: Track student adherence to recommendations
- **Status Tracking**: Pending, completed, and overdue follow-ups
- **Progress Updates**: Edit and update student progress scores

#### **5. Feedback Management**
- **Feedback Review**: View all student feedback submissions
- **Rating Analysis**: Star ratings and feedback types
- **Content Management**: Review and manage feedback

### 🎯 **Admin Portal Benefits**

#### **For Educational Institutions**
- **Student Progress Tracking**: Monitor how well students follow recommendations
- **Engagement Analysis**: Identify active vs inactive students
- **Assessment Analytics**: Track completion rates and dosha distribution
- **Feedback Management**: Respond to student concerns and suggestions

#### **For Wellness Centers**
- **Client Management**: Maintain comprehensive client databases
- **Progress Monitoring**: Track client adherence to wellness plans
- **Outcome Analysis**: Measure the effectiveness of recommendations
- **Data Export**: Generate reports for stakeholders

#### **For Health Practitioners**
- **Patient Tracking**: Monitor patient progress over time
- **Assessment History**: View complete patient assessment records
- **Engagement Metrics**: Identify patients needing follow-up
- **Feedback Analysis**: Improve service based on patient feedback

### 🚀 **How to Use Admin Portal**

#### **Step 1: Access Admin Panel**
1. Click **"Admin Access"** button on home page (for quick testing)
2. Or navigate to Admin page and login with credentials

#### **Step 2: View Dashboard**
- Review statistics overview
- Check student engagement metrics
- Monitor assessment completion rates

#### **Step 3: Manage Students**
- **View Students**: See complete student list
- **Search**: Find specific students by name or email
- **Filter**: Filter by active/inactive status
- **Actions**: View details, edit, or delete accounts

#### **Step 4: Monitor Progress**
- **Follow-ups**: Track student adherence to recommendations
- **Analytics**: View engagement and completion metrics
- **Reports**: Export data for analysis

#### **Step 5: Review Feedback**
- **Feedback Table**: See all student submissions
- **Filter**: Sort by feedback type or rating
- **Manage**: Review and respond to feedback

### 📈 **Admin Analytics Explained**

#### **Completion Rate**
- Percentage of registered students who completed assessments
- Helps identify engagement levels

#### **Progress Score**
- Calculated based on routine adherence and goal achievement
- Excellent (10+), Good (5-9), Average (2-4), Poor (0-1)

#### **Active Engagement**
- Students active in the last 7 days
- Indicates current platform usage

#### **Dosha Distribution**
- Most common dosha types among students
- Helps understand student demographics

### 🔧 **Data Management**

#### **Export Features**
- **Student Data**: Export complete student information
- **Assessment Results**: Download assessment data
- **Progress Reports**: Export progress tracking data
- **Feedback Data**: Download feedback submissions

#### **Bulk Operations**
- **Select Multiple Students**: Use checkboxes for bulk selection
- **Bulk Delete**: Remove multiple student accounts
- **Bulk Export**: Export selected student data

### 🛡️ **Security Features**

#### **Admin Authentication**
- Secure login system
- Session management
- Access control

#### **Data Protection**
- User data isolation
- Secure password handling
- Privacy protection

### 📱 **Responsive Design**
- Works on desktop, tablet, and mobile devices
- Optimized for all screen sizes
- Touch-friendly interface

