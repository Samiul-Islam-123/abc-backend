// DummyData.js

// Course in Progress
const courseInProgress = {
    courseTitle: "Bitcoin Cryptocurrency and Technologies",
    progressPercentage: 75
  };
  
  // Course Completed
  const courseCompleted = {
    courseTitle: "Introduction to Machine Learning",
    completionDate: "2024-08-01",
    certificateUrl: "https://example.com/certificates/12345"
  };
  
  // Certification/Streak
  const certificationStreak = {
    learningStreak: 15,
    redeemableRewards: 2
  };
  
  // Daily Learning Time Statistics
  const dailyLearningTime = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    data: [2.5, 3, 2, 2.5, 3.5, 4, 1.5]  // Time in hours
  };
  
  // Course Scores Statistics
  const courseScores = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    userScores: [7, 8, 9, 7.5, 8.5],
    avgScores: [6.5, 7, 7.5, 7, 7.8]
  };
  
  module.exports = {
    courseInProgress,
    courseCompleted,
    certificationStreak,
    dailyLearningTime,
    courseScores
  };
  