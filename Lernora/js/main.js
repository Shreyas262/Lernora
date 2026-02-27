import { defaultUser } from "./data.js";
import { loadUser, saveUser } from "./storage.js";
import {
  updateName,
  updateXP,
  updateStreak,
  updateMissions,
  updateBadges,
  updateProgress,
  updateLevel,
  renderAchievements,
  renderLessons,
  renderActivity
} from "./ui.js";

// load saved or default
let user = loadUser() || JSON.parse(JSON.stringify(defaultUser));

// Ensure new properties exist for old saved users
if (!user.activity) user.activity = [];
if (!user.lessons) user.lessons = structuredClone(defaultUser.lessons);
if (!user.achievements) user.achievements = [];


// render UI everywhere
updateName(user.name);
updateXP(user.xp);
updateStreak(user.streak);
updateMissions(user.missions);
user.badges = user.achievements.length;
updateBadges(user.badges);
updateProgress(user.dailyGoal);
updateLevel(user.level);
renderAchievements(user.achievements);
renderLessons(user.lessons, handleLessonClick);
renderActivity(user.activity);


function checkAchievements() {
  if (user.xp >= 500 && !user.achievements.includes("rookie")) {
    user.achievements.push("rookie");
    alert("🏆 Achievement unlocked: Rookie!");
  }

  if (user.xp >= 2000 && !user.achievements.includes("xp-hunter")) {
    user.achievements.push("xp-hunter");
    alert("🏆 Achievement unlocked: XP Hunter!");
  }

  if (user.streak >= 7 && !user.achievements.includes("streak")) {
    user.achievements.push("streak");
    alert("🔥 Achievement unlocked: Week Warrior!");
  }

  if (user.missions >= 30 && !user.achievements.includes("dedicated")) {
    user.achievements.push("dedicated");
    alert("📚 Achievement unlocked: Dedicated Learner!");
  }

  if (user.streak >= 5 && !user.achievements.includes("dedicated5")) {
    user.achievements.push("dedicated5");
    alert("🏆 Achievement unlocked: Dedicated!");
  }

  const hour = new Date().getHours();
  if (hour >= 0 && hour <= 4 && !user.achievements.includes("nightowl")) {
    user.achievements.push("nightowl");
    alert("🌙 Achievement unlocked: Night Owl!");
  }

}


// simple level calculation: every 500 XP = 1 level

function calculateLevel(xp) {
  return Math.floor(xp / 500) + 1;
}


function handleLessonClick(index) {
  const lesson = user.lessons[index];

  if (!lesson.unlocked) return;

  lesson.progress += 25;
  if (lesson.progress > 100) lesson.progress = 100;

  if (lesson.progress === 100) {
    user.xp += lesson.xp;
    user.missions += 1;

    user.dailyGoal += 10;
    if (user.dailyGoal > 100) user.dailyGoal = 100;
    updateProgress(user.dailyGoal);

    user.level = calculateLevel(user.xp);
    updateLevel(user.level);

    //recent activity log
    user.activity.push({
      title: `Completed "${lesson.title}"`,
      meta: `+${lesson.xp} XP`,
      icon: "assets/icons/tick.png",
      color: "green"
    });

    // unlock next lesson
    if (user.lessons[index + 1]) {
      user.lessons[index + 1].unlocked = true;
    }

    checkAchievements();
    renderAchievements(user.achievements);
  }

  updateXP(user.xp);
  updateMissions(user.missions);
  renderLessons(user.lessons, handleLessonClick);
  renderActivity(user.activity);
  saveUser(user);
}


function resetProgress() {
  if (!confirm("Reset all progress?")) return;

  localStorage.removeItem("lernora-user");

  // reload clean
  window.location.reload();
}
const resetBtn = document.getElementById("reset-progress-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", resetProgress);
}
