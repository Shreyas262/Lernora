export function updateName(name) {
  const el = document.querySelector(".user-name");
  if (el) el.textContent = name;
}

export function updateXP(xp) {
  document.querySelectorAll(".total-xp").forEach(el=>{
    el.textContent = xp;
  });

  document.querySelectorAll(".profile-xp").forEach(el=>{
    el.textContent = "+" + xp + " XP";
  });
}


export function updateStreak(streak) {
  document.querySelectorAll(".day-streak").forEach(el=>{
    el.textContent = streak.toString().padStart(2,"0");
  });

  document.querySelectorAll(".profile-streak").forEach(el=>{
    el.textContent = streak + " Day Streak";
  });
}


export function updateMissions(missions) {
  const el = document.querySelector(".missions-done");
  if (el) el.textContent = missions;
}

export function updateBadges(badges) {
  const el = document.querySelector(".badges-earned");
  if (el) el.textContent = badges;
}

export function updateProgress(percent) {
  const bar = document.querySelector(".progress-bar__fill");
  const text = document.querySelector(".progress-percent");

  if (bar) bar.style.width = percent + "%";
  if (text) text.textContent = percent + "%";
}

export function updateLevel(level) {
  const el = document.querySelector(".level-text");
  if (el) el.textContent = "Level " + level;
}

export function renderAchievements(achievements) {

  const achievementData = {
    rookie: {
      title: "Rookie",
      desc: "Earn 500 XP",
      icon: "assets/icons/star.png"
    },
    "xp-hunter": {
      title: "XP Hunter",
      desc: "Earn 2000 XP",
      icon: "assets/icons/big_trophy.png"
    },
    streak: {
      title: "Week Warrior",
      desc: "7 day streak",
      icon: "assets/icons/big_trophy.png"
    },
    dedicated: {
      title: "Dedicated Learner",
      desc: "30 missions",
      icon: "assets/icons/badge.png"
    },
    dedicated5: {
      title: "Dedicated",
      desc: "5-day streak",
      icon: "assets/icons/5day_trophy.png"
    },
    nightowl: {
      title: "Night Owl",
      desc: "Study after midnight",
      icon: "assets/icons/night_owl_medal.png"
    }
  };

  const containerIds = ["achievements-list", "dashboard-achievements"];

  containerIds.forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;

    container.innerHTML = "";

    Object.keys(achievementData).forEach(key => {
      const data = achievementData[key];
      const unlocked = achievements.includes(key);

      const div = document.createElement("div");
      div.className = "achievements-item";
      if (!unlocked) div.classList.add("locked");

      div.innerHTML = `
        <img src="${data.icon}" class="achievements-icon"/>
        <p>${data.title}</p>
        <p>${data.desc}</p>
        ${!unlocked ? "<span class='locked-text'>Locked 🔒</span>" : ""}
      `;

      container.appendChild(div);
    });
  });
}

export function renderLessons(lessons, onClick) {
  const container = document.querySelector(".learning-items");
  if (!container) return;

  container.innerHTML = "";

  lessons.forEach((lesson, index) => {
    const div = document.createElement("div");
    div.className = "learning-card";

    if (!lesson.unlocked) div.classList.add("locked");

    if (lesson.progress >= 100) {
      div.classList.add("completed");
    }

    div.innerHTML = `
      <div class="learning-card-text">
        <p>${lesson.title}</p>
        <p>${lesson.desc}</p>
      </div>

      <div class="learning-card-progress">
        <div class="learning-progress-bar">
          <div class="learning-progress-fill" 
               style="width:${lesson.progress}%"></div>
        </div>

        <div class="progress-info">
          <p class="completed-text">
            ${lesson.progress >= 100 ? "Completed!" : lesson.progress + "% Complete"}
          </p>
          <p class="xp">+${lesson.xp} XP</p>
        </div>
      </div>
    `;

    if (lesson.unlocked) {
      div.addEventListener("click", () => onClick(index));
    }

    container.appendChild(div);
  });
}


export function renderActivity(activityList) {
  const container = document.querySelector(".activity-container");
  if (!container) return;

  container.innerHTML = `
    <h2>Recent Activity</h2>
    <div class="activity-scroll"></div>
    `;

  (activityList || []).slice().reverse().forEach(item => {
    const div = document.createElement("div");
    div.className = `activity-card ${item.color}`;

    div.innerHTML = `
      <div class="icon">
        <img src="${item.icon}" />
      </div>
      <div class="text">
        <p class="title">${item.title}</p>
        <p class="meta">${item.meta}</p>
      </div>
    `;

    const scroll = container.querySelector(".activity-scroll") || container;
    scroll.appendChild(div);
  });
}