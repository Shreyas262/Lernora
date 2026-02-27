export const lessonsData = [
  {
    id: 1,
    title: "Welcome Aboard",
    desc: "Learn the basics and get started on your journey",
    xp: 100,
    progress: 0,
    unlocked: true
  },
  {
    id: 2,
    title: "Foundation Builder",
    desc: "Master the fundamental concepts",
    xp: 200,
    progress: 0,
    unlocked: true
  },
  {
    id: 3,
    title: "Skill Enhancer",
    desc: "Take your knowledge to the next level",
    xp: 300,
    progress: 0,
    unlocked: false
  },
  {
    id: 4,
    title: "Advanced Explorer",
    desc: "Dive into advanced topics and challenges",
    xp: 400,
    progress: 0,
    unlocked: false
  },
  {
    id: 5,
    title: "Master Quest",
    desc: "Prove your mastery with the ultimate challenge",
    xp: 500,
    progress: 0,
    unlocked: false
  }
];

export const defaultUser = {
    name: "Abhinay",
    xp: 0,
    streak: 1,
    missions: 0,
    badges: 0,
    dailyGoal: 0,
    level: 1,
    achievements: [],
    lessons: JSON.parse(JSON.stringify(lessonsData)),
    activity: [],
};