/**
 * NOBLE CAKE - GAMIFICATION SYSTEM
 * Subtle interactive enhancements that reward exploration
 * without obstructing the core shopping experience.
 */

(function () {
  "use strict";

  // ============================================================
  // STATE MANAGEMENT
  // ============================================================

  var GameState = {
    viewedCakes: new Set(),
    configuratorProgress: 0,
    achievements: [],
    pouredCount: 0,
    layersRevealed: new Set(),

    load: function() {
      var saved = localStorage.getItem("nobleCakeProgress");
      if (saved) {
        var data = JSON.parse(saved);
        this.viewedCakes = new Set(data.viewedCakes || []);
        this.achievements = data.achievements || [];
        this.pouredCount = data.pouredCount || 0;
        this.layersRevealed = new Set(data.layersRevealed || []);
      }
    },

    save: function() {
      localStorage.setItem("nobleCakeProgress", JSON.stringify({
        viewedCakes: Array.from(this.viewedCakes),
        achievements: this.achievements,
        pouredCount: this.pouredCount,
        layersRevealed: Array.from(this.layersRevealed)
      }));
    },

    markViewed: function(cakeId) {
      this.viewedCakes.add(cakeId);
      this.save();
      this.checkAchievements();
    },

    markLayerRevealed: function(cakeId) {
      this.layersRevealed.add(cakeId);
      this.save();
      this.checkAchievements();
    },

    incrementPour: function() {
      this.pouredCount++;
      this.save();
      this.checkAchievements();
    },

    checkAchievements: function() {
      var newAchievements = [];

      // First Glance
      if (this.viewedCakes.size === 1 && !this.hasAchievement("first-glance")) {
        newAchievements.push({
          id: "first-glance",
          title: "First Glance",
          description: "Explored your first cake"
        });
      }

      // Cake Connoisseur
      if (this.viewedCakes.size === 6 && !this.hasAchievement("connoisseur")) {
        newAchievements.push({
          id: "connoisseur",
          title: "Cake Connoisseur",
          description: "Viewed all 6 signature cakes"
        });
      }

      // Layer Master
      if (this.layersRevealed.size === 3 && !this.hasAchievement("layer-master")) {
        newAchievements.push({
          id: "layer-master",
          title: "Layer Master",
          description: "Revealed 3 cake cross-sections"
        });
      }

      // Pour Enthusiast
      if (this.pouredCount >= 5 && !this.hasAchievement("pour-enthusiast")) {
        newAchievements.push({
          id: "pour-enthusiast",
          title: "Pour Enthusiast",
          description: "Triggered the pour effect 5 times"
        });
      }

      // Mix Master (completed configurator)
      if (this.configuratorProgress === 100 && !this.hasAchievement("mix-master")) {
        newAchievements.push({
          id: "mix-master",
          title: "Mix Master",
          description: "Built your own custom cake"
        });
      }

      newAchievements.forEach(function(achievement) {
        this.unlockAchievement(achievement);
      }.bind(this));
    },

    hasAchievement: function(id) {
      return this.achievements.some(function(a) { return a.id === id; });
    },

    unlockAchievement: function(achievement) {
      this.achievements.push(achievement);
      this.save();
      showAchievementToast(achievement);
    }
  };

  // ============================================================
  // 1. INTERACTIVE CAKE LAYER REVEAL
  // ============================================================

  function addLayerRevealSystem(cakeTiles) {
    cakeTiles.forEach(function(tile) {
      var cakeId = tile.dataset.cakeId;
      var shotEl = tile.querySelector(".tile__shot");

      // Add reveal button
      var revealBtn = document.createElement("button");
      revealBtn.className = "layer-reveal-btn";
      revealBtn.innerHTML = '<span class="layer-reveal-icon"></span><span>See Inside</span>';
      revealBtn.setAttribute("aria-label", "Toggle cross-section view");
      shotEl.appendChild(revealBtn);

      var isRevealed = false;

      revealBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        isRevealed = !isRevealed;

        if (isRevealed) {
          shotEl.classList.add("layer-revealed");
          revealBtn.innerHTML = '<span class="layer-reveal-icon"></span><span>Close</span>';
          GameState.markLayerRevealed(cakeId);

          // Add sparkle effect
          createSparkles(shotEl);

          // Animate layers sliding in
          animateLayerReveal(shotEl);
        } else {
          shotEl.classList.remove("layer-revealed");
          revealBtn.innerHTML = '<span class="layer-reveal-icon"></span><span>See Inside</span>';
        }
      });
    });
  }

  function animateLayerReveal(container) {
    var layers = container.querySelectorAll(".pic__layer");
    layers.forEach(function(layer, i) {
      layer.style.animation = "slideInLayer 0.4s ease " + (i * 0.08) + "s both";
    });
  }

  // ============================================================
  // 2. HOVER POUR EFFECT
  // ============================================================

  function addHoverPourEffect(elements) {
    elements.forEach(function(el) {
      var pourOverlay = document.createElement("div");
      pourOverlay.className = "pour-overlay";
      pourOverlay.innerHTML =
        '<div class="mini-stream"></div>' +
        '<div class="mini-ripple"></div>';

      el.style.position = "relative";
      el.appendChild(pourOverlay);

      var isPouring = false;

      el.addEventListener("mouseenter", function() {
        if (!isPouring) {
          isPouring = true;
          pourOverlay.classList.add("active");
          GameState.incrementPour();

          setTimeout(function() {
            pourOverlay.classList.remove("active");
            setTimeout(function() { isPouring = false; }, 500);
          }, 1800);
        }
      });
    });
  }

  // ============================================================
  // 3. CONFIGURATOR PROGRESS INDICATOR
  // ============================================================

  function createProgressIndicator() {
    var progressBar = document.createElement("div");
    progressBar.className = "configurator-progress";
    progressBar.innerHTML =
      '<div class="progress-track">' +
        '<div class="progress-fill" id="progressFill"></div>' +
      '</div>' +
      '<div class="progress-steps">' +
        '<span class="progress-step" data-step="1"><span class="step-number">1</span><span class="step-label">Size</span></span>' +
        '<span class="progress-step" data-step="2"><span class="step-number">2</span><span class="step-label">Sponge</span></span>' +
        '<span class="progress-step" data-step="3"><span class="step-number">3</span><span class="step-label">Centre</span></span>' +
        '<span class="progress-step" data-step="4"><span class="step-number">4</span><span class="step-label">Coating</span></span>' +
      '</div>' +
      '<div class="progress-message" id="progressMessage">Choose your options to build your cake</div>';

    return progressBar;
  }

  function updateConfiguratorProgress(completedSteps) {
    var progress = (completedSteps / 4) * 100;
    GameState.configuratorProgress = progress;
    GameState.save();

    var fillEl = document.getElementById("progressFill");
    if (fillEl) {
      fillEl.style.width = progress + "%";
    }

    // Update step indicators
    document.querySelectorAll(".progress-step").forEach(function(step, i) {
      if (i < completedSteps) {
        step.classList.add("completed");
      }
      if (i === completedSteps) {
        step.classList.add("current");
      } else {
        step.classList.remove("current");
      }
    });

    // Update message
    var messageEl = document.getElementById("progressMessage");
    if (messageEl) {
      var messages = [
        "Choose your options to build your cake",
        "Great start! Keep going...",
        "Halfway there!",
        "Almost done!",
        "Perfect! Your custom cake is ready"
      ];
      messageEl.textContent = messages[completedSteps];

      if (completedSteps === 4) {
        messageEl.classList.add("complete");
        createConfetti(messageEl);
      }
    }
  }

  // ============================================================
  // 4. ACHIEVEMENT BADGE SYSTEM
  // ============================================================

  function createAchievementTracker() {
    var tracker = document.createElement("div");
    tracker.className = "achievement-tracker";
    tracker.innerHTML =
      '<button class="achievement-btn" id="achievementBtn" aria-label="View achievements">' +
        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none">' +
          '<path d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z" fill="currentColor"/>' +
        '</svg>' +
        '<span class="achievement-count" id="achievementCount">0/5</span>' +
      '</button>';

    var btn = tracker.querySelector("#achievementBtn");
    btn.addEventListener("click", function() {
      showAchievementPanel();
    });

    return tracker;
  }

  function showAchievementPanel() {
    var panel = document.createElement("div");
    panel.className = "achievement-panel";
    panel.innerHTML =
      '<div class="achievement-panel-content">' +
        '<div class="achievement-panel-header">' +
          '<h3>Your Achievements</h3>' +
          '<button class="achievement-close" id="achievementClose">×</button>' +
        '</div>' +
        '<div class="achievement-list" id="achievementList"></div>' +
      '</div>';

    document.body.appendChild(panel);

    // Populate achievements
    var listEl = panel.querySelector("#achievementList");
    var allAchievements = [
      { id: "first-glance", title: "First Glance", description: "Explored your first cake", icon: "👀" },
      { id: "connoisseur", title: "Cake Connoisseur", description: "Viewed all 6 signature cakes", icon: "🎂" },
      { id: "layer-master", title: "Layer Master", description: "Revealed 3 cake cross-sections", icon: "🔍" },
      { id: "pour-enthusiast", title: "Pour Enthusiast", description: "Triggered the pour effect 5 times", icon: "🫗" },
      { id: "mix-master", title: "Mix Master", description: "Built your own custom cake", icon: "👨‍🍳" }
    ];

    allAchievements.forEach(function(achievement) {
      var unlocked = GameState.hasAchievement(achievement.id);
      var item = document.createElement("div");
      item.className = "achievement-item" + (unlocked ? " unlocked" : " locked");
      item.innerHTML =
        '<span class="achievement-icon">' + (unlocked ? achievement.icon : "🔒") + '</span>' +
        '<div class="achievement-info">' +
          '<div class="achievement-title">' + achievement.title + '</div>' +
          '<div class="achievement-description">' + achievement.description + '</div>' +
        '</div>';
      listEl.appendChild(item);
    });

    setTimeout(function() { panel.classList.add("visible"); }, 10);

    panel.querySelector("#achievementClose").addEventListener("click", function() {
      panel.classList.remove("visible");
      setTimeout(function() { panel.remove(); }, 300);
    });

    panel.addEventListener("click", function(e) {
      if (e.target === panel) {
        panel.classList.remove("visible");
        setTimeout(function() { panel.remove(); }, 300);
      }
    });
  }

  function showAchievementToast(achievement) {
    var toast = document.createElement("div");
    toast.className = "achievement-toast";
    toast.innerHTML =
      '<div class="achievement-toast-content">' +
        '<div class="achievement-toast-icon">🎉</div>' +
        '<div class="achievement-toast-text">' +
          '<div class="achievement-toast-title">Achievement Unlocked!</div>' +
          '<div class="achievement-toast-name">' + achievement.title + '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(toast);

    setTimeout(function() { toast.classList.add("visible"); }, 10);
    setTimeout(function() {
      toast.classList.remove("visible");
      setTimeout(function() { toast.remove(); }, 300);
    }, 4000);

    updateAchievementCount();
  }

  function updateAchievementCount() {
    var countEl = document.getElementById("achievementCount");
    if (countEl) {
      countEl.textContent = GameState.achievements.length + "/5";
    }
  }

  // ============================================================
  // 5. MICRO-REWARDS & VISUAL FEEDBACK
  // ============================================================

  function createSparkles(container) {
    for (var i = 0; i < 8; i++) {
      var sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = (20 + Math.random() * 60) + "%";
      sparkle.style.top = (20 + Math.random() * 60) + "%";
      sparkle.style.animationDelay = (Math.random() * 0.3) + "s";
      container.appendChild(sparkle);

      setTimeout(function(s) { s.remove(); }, 1000, sparkle);
    }
  }

  function createConfetti(container) {
    var colors = ["#A8C93B", "#EE8BA0", "#F2A93C", "#BCDD52", "#7A5F8E"];

    for (var i = 0; i < 20; i++) {
      var confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = (10 + Math.random() * 80) + "%";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = (Math.random() * 0.5) + "s";
      confetti.style.animationDuration = (1 + Math.random() * 0.5) + "s";
      container.appendChild(confetti);

      setTimeout(function(c) { c.remove(); }, 2000, confetti);
    }
  }

  function addPulseReward(element) {
    element.classList.add("pulse-reward");
    setTimeout(function() {
      element.classList.remove("pulse-reward");
    }, 600);
  }

  // ============================================================
  // 6. EXPLORATION TRACKING
  // ============================================================

  function trackCakeViews(cakeTiles) {
    if (!("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var cakeId = entry.target.dataset.cakeId;
          if (cakeId && !GameState.viewedCakes.has(cakeId)) {
            setTimeout(function() {
              GameState.markViewed(cakeId);
              entry.target.classList.add("viewed");
              addPulseReward(entry.target);
            }, 500);
          }
        }
      });
    }, { threshold: 0.5 });

    cakeTiles.forEach(function(tile) {
      observer.observe(tile);
    });
  }

  function addExplorationIndicator() {
    var indicator = document.createElement("div");
    indicator.className = "exploration-indicator";
    indicator.innerHTML =
      '<div class="exploration-ring">' +
        '<svg width="50" height="50" viewBox="0 0 50 50">' +
          '<circle cx="25" cy="25" r="20" fill="none" stroke="var(--line)" stroke-width="3"/>' +
          '<circle cx="25" cy="25" r="20" fill="none" stroke="var(--matcha)" stroke-width="3" ' +
            'stroke-dasharray="125.6" stroke-dashoffset="125.6" id="explorationProgress" ' +
            'style="transition: stroke-dashoffset 0.6s ease"/>' +
        '</svg>' +
        '<span class="exploration-count" id="explorationCount">0/6</span>' +
      '</div>';

    return indicator;
  }

  function updateExplorationProgress() {
    var progressCircle = document.getElementById("explorationProgress");
    var countEl = document.getElementById("explorationCount");

    if (progressCircle) {
      var progress = GameState.viewedCakes.size / 6;
      var dashOffset = 125.6 * (1 - progress);
      progressCircle.style.strokeDashoffset = dashOffset;
    }

    if (countEl) {
      countEl.textContent = GameState.viewedCakes.size + "/6";
    }
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================

  window.NobleGamification = {
    init: function(options) {
      GameState.load();

      // Add achievement tracker to header
      var masthead = document.querySelector(".masthead__in");
      if (masthead && options.enableAchievements) {
        var tracker = createAchievementTracker();
        masthead.insertBefore(tracker, masthead.querySelector(".basket"));
        updateAchievementCount();
      }

      // Add exploration indicator
      if (options.enableExploration) {
        var collection = document.getElementById("collection");
        if (collection) {
          var indicator = addExplorationIndicator();
          var head = collection.querySelector(".head");
          if (head) {
            head.appendChild(indicator);
            updateExplorationProgress();
          }
        }
      }

      // Initialize cake tiles
      if (options.enableLayerReveal) {
        var cakeTiles = document.querySelectorAll(".tile");
        cakeTiles.forEach(function(tile, i) {
          var cakeId = tile.querySelector("h3") ?
            tile.querySelector("h3").textContent.toLowerCase().replace(/\s+/g, "-") :
            "cake-" + i;
          tile.dataset.cakeId = cakeId;
        });

        addLayerRevealSystem(cakeTiles);
        trackCakeViews(cakeTiles);
      }

      // Initialize hover pour effects
      if (options.enablePourEffect) {
        var pourTargets = document.querySelectorAll(".btn--solid, .feature__frame");
        addHoverPourEffect(pourTargets);
      }

      // Initialize configurator progress
      if (options.enableProgress) {
        var maker = document.getElementById("maker");
        if (maker) {
          var progressBar = createProgressIndicator();
          var head = maker.querySelector(".head");
          if (head) {
            head.appendChild(progressBar);
          }

          // Track configurator changes
          var optGroups = ["optSize", "optSponge", "optCentre", "optCoat"];
          var completed = 0;

          optGroups.forEach(function(groupId, index) {
            var group = document.getElementById(groupId);
            if (group) {
              group.addEventListener("click", function() {
                setTimeout(function() {
                  var pressed = group.querySelector('[aria-pressed="true"]');
                  if (pressed) {
                    completed = Math.max(completed, index + 1);
                    updateConfiguratorProgress(completed);
                  }
                }, 50);
              });
            }
          });
        }
      }
    }
  };

})();
