# Noble Cake - Interaction Patterns Reference

## Visual Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│  MASTHEAD (persistent, z-index: 60)                     │
│  [Logo] [Nav]           [Achievements 🌟 0/5] [Box 🛒]  │
└─────────────────────────────────────────────────────────┘
                                    ▲
                                    │
                        Achievement Toast appears here
                              (z-index: 110)

┌─────────────────────────────────────────────────────────┐
│  COLLECTION SECTION                                      │
│  ┌───────────────────┐  Progress Ring (0/6) ◯          │
│  │ Cake Exploration  │                                   │
│  └───────────────────┘                                   │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Cake 1  │  │  Cake 2  │  │  Cake 3  │              │
│  │   [✓]    │  │          │  │          │ ← View marker │
│  │          │  │          │  │          │              │
│  │[See Inside] ← Reveal button                          │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  CONFIGURATOR SECTION                                    │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Progress: ████████░░░░░░░░░░░ 50%                │ │
│  │  [✓1]  [●2]  [○3]  [○4]                          │ │
│  │  Size  Sponge Centre Coating                       │ │
│  │  "Halfway there!"                                   │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Interaction Flow Diagrams

### 1. Cake Layer Reveal Flow

```
User Action          System Response              Visual Feedback
───────────         ─────────────────            ────────────────
Hover tile     →    Show "See Inside" btn   →    Fade in (0.2s)
                    opacity: 0 → 1                   ↓
Click btn      →    Toggle reveal state     →    Transform tile
                                                 scale(1 → 1.08)
                                                     ↓
                    Animate layers          →    Slide + fade
                                                 stagger 80ms
                                                     ↓
                    Create sparkles         →    8 particles
                                                 rise & fade
                                                     ↓
                    Track achievement       →    Check progress
                                                 localStorage
                                                     ↓
                    Update counter          →    "2/6 revealed"
```

### 2. Hover Pour Effect Flow

```
User Action          System Response              Visual Feedback
───────────         ─────────────────            ────────────────
Hover CTA      →    Check pour state        →    No lag
                    (prevent overlap)                ↓
                    Add .active class       →    Stream animates
                                                 height: 0 → 45%
                                                 duration: 1.8s
                                                     ↓
                    Ripple appears          →    Scale + fade
                    (0.6s delay)                 at bottom
                                                     ↓
                    Increment counter       →    Pour count++
                    Track achievement            Check threshold
                                                     ↓
                    Remove .active          →    Clean up
                    (after 2.3s)                 Set isPouring = false
```

### 3. Achievement Unlock Flow

```
Trigger Event       System Check                 User Notification
──────────         ──────────────               ──────────────────
Action occurs  →   checkAchievements()     →    Evaluate rules
(view/pour/etc)                                      ↓
                   Compare state           →    viewedCakes.size === 6?
                   to thresholds                    ↓
                   Not achieved yet        →    Exit (no notification)
                        OR                          ↓
                   NEW achievement!        →    Add to achievements[]
                                                    ↓
                   Save to localStorage    →    Persist progress
                                                    ↓
                   showAchievementToast()  →    Slide from right
                                                transform: X(100% → 0)
                                                    ↓
                   Auto-dismiss            →    After 4s, slide out
                   (4 seconds)                      ↓
                   Update badge count      →    "1/5" → "2/5"
```

### 4. Configurator Progress Flow

```
Step Completion     Progress Update              Visual Changes
───────────        ─────────────────            ───────────────
Click option   →   Detect aria-pressed     →    Check selection
                   = "true"                         ↓
                   Calculate step          →    completedSteps++
                   (max across clicks)              ↓
                   Update progress bar     →    width: +25%
                                                transition 0.6s
                                                    ↓
                   Update step circles     →    [✓] previous
                                                [●] current (pulse)
                                                [○] remaining
                                                    ↓
                   Update message          →    "Halfway there!"
                                                    ↓
                   If 100% complete        →    Create confetti
                                                20 pieces fall
                                                    ↓
                   Track achievement       →    "Mix Master" unlock
```

## UI Component Specifications

### Achievement Tracker Button
```
┌──────────────────────┐
│  🌟  Achievements    │  ← Badge in header
│      2/5             │
└──────────────────────┘

State: Default
- Border: 1px solid var(--line)
- Color: var(--cream-dim)
- Padding: 9px 15px
- Border-radius: 999px

State: Hover
- Border: var(--matcha)
- Color: var(--matcha)
- Background: var(--ink-raised)
- Icon rotates 12deg, scale(1.1)
```

### Layer Reveal Button
```
┌────────────────────┐
│  ≡  See Inside     │  ← Appears on tile hover
└────────────────────┘

Position: Absolute (bottom: 12px, right: 12px)
Initial: opacity: 0
Hover tile: opacity: 1 (0.2s ease)

Button hover:
- Background: rgba(168,201,59,0.12)
- Border: var(--matcha)
- Transform: translateY(-1px)
```

### Progress Indicator
```
┌────────────────────────────────────────────────┐
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░░  50%  │ ← Bar
│                                                │
│  [✓1]     [●2]     [○3]     [○4]             │ ← Steps
│  Size    Sponge   Centre   Coating            │
│                                                │
│  "Halfway there!"                              │ ← Message
└────────────────────────────────────────────────┘

Step States:
- Completed [✓]: Green bg, checkmark
- Current [●]: Green border, pulse animation
- Pending [○]: Gray border
```

### Achievement Toast
```
┌────────────────────────────────────────┐
│  🎉  ACHIEVEMENT UNLOCKED!            │  ← Slides from right
│      Cake Connoisseur                  │
└────────────────────────────────────────┘

Entry animation: translateX(calc(100% + 20px) → 0)
Duration: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
Display: 4 seconds
Exit animation: translateX(calc(100% + 20px))
```

### Achievement Panel (Modal)
```
┌──────────────────────────────────────────────────┐
│  Your Achievements                          ✕    │
│  ───────────────────────────────────────────     │
│                                                   │
│  ┌─────────────────────────────────────────┐    │
│  │ 👀  First Glance                        │    │ ← Unlocked
│  │     Explored your first cake            │    │
│  └─────────────────────────────────────────┘    │
│                                                   │
│  ┌─────────────────────────────────────────┐    │
│  │ 🔒  Cake Connoisseur                    │    │ ← Locked
│  │     Viewed all 6 signature cakes        │    │
│  └─────────────────────────────────────────┘    │
│                                                   │
└──────────────────────────────────────────────────┘

Background: rgba(6,7,6,0.88) + blur(8px)
Content: max-width 520px, centered
Entry: fade in + translateY(20px → 0)
```

### Exploration Ring
```
    ┌──────────────┐
    │     3/6      │  ← Counter
    │   ◐          │  ← Progress ring (SVG)
    └──────────────┘

SVG circle properties:
- Radius: 20
- Circumference: 125.6
- stroke-dasharray: 125.6
- stroke-dashoffset: 125.6 * (1 - progress)
- Transition: 0.6s ease

Updates on each cake view
```

## Animation Timing Reference

| Element | Property | Duration | Easing | Delay |
|---------|----------|----------|--------|-------|
| Layer reveal | transform | 0.5s | cubic-bezier(0.4,0,0.2,1) | 0 |
| Layer slide | opacity, transform | 0.4s | ease | 80ms/layer |
| Pour stream | height | 1.8s | cubic-bezier(0.4,0,0.2,1) | 0 |
| Pour ripple | scale, opacity | 1.8s | ease-out | 0.6s |
| Progress bar | width | 0.6s | cubic-bezier(0.4,0,0.2,1) | 0 |
| Step pulse | box-shadow | 2s | ease-in-out | infinite |
| Toast in | transform | 0.4s | cubic-bezier(0.4,0,0.2,1) | 0 |
| Toast out | transform | 0.3s | ease | 4s |
| Sparkle | transform, opacity | 0.8s | ease-out | random |
| Confetti | transform, opacity | 1.5s | ease-out | random |
| View marker | scale, opacity | 0.4s | ease | 0 |

## Event Handler Reference

### Core Events

```javascript
// 1. Layer Reveal
tile.querySelector(".layer-reveal-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleLayerReveal(cakeId);
  createSparkles(container);
  GameState.markLayerRevealed(cakeId);
});

// 2. Pour Effect
element.addEventListener("mouseenter", () => {
  if (!isPouring) {
    activatePourAnimation();
    GameState.incrementPour();
  }
});

// 3. Configurator Progress
optionGroup.addEventListener("click", () => {
  setTimeout(() => {
    const selected = optionGroup.querySelector('[aria-pressed="true"]');
    if (selected) updateProgress();
  }, 50);
});

// 4. Achievement Click
achievementBtn.addEventListener("click", () => {
  showAchievementPanel();
});

// 5. View Tracking
IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        GameState.markViewed(cakeId);
      }, 500);
    }
  });
}, { threshold: 0.5 });

// 6. Panel Close
panel.addEventListener("click", (e) => {
  if (e.target === panel) closePanel();
});

// 7. Escape Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOpenPanels();
});
```

## State Management Structure

```javascript
GameState = {
  // Sets (deduplicated)
  viewedCakes: Set<string>,
  layersRevealed: Set<string>,
  
  // Counts
  pouredCount: number,
  configuratorProgress: number (0-100),
  
  // Achievements
  achievements: Array<{
    id: string,
    title: string,
    description: string
  }>,
  
  // Methods
  load(),
  save(),
  markViewed(cakeId),
  markLayerRevealed(cakeId),
  incrementPour(),
  checkAchievements(),
  hasAchievement(id),
  unlockAchievement(achievement)
}
```

## Z-Index Stack

```
Layer                       Z-Index    Purpose
────────────────────────   ─────────  ─────────────────
Achievement Toast          110        Always on top
Achievement Panel          100        Modal overlay
Drawer                     100        Cart drawer
Scrim                      90         Modal background
Masthead                   60         Sticky header
View Marker                3          On tile
Layer Reveal Button        3          On tile
Tile Views Badge           2          On tile
Pour Overlay               1          Button overlay
Base content               0          Default layer
```

## Accessibility Mappings

| Visual Element | Screen Reader | Keyboard |
|----------------|---------------|----------|
| Layer reveal btn | "Toggle cross-section view" | Enter/Space |
| Achievement btn | "View achievements" | Enter/Space |
| Progress steps | "Step 2 of 4: Sponge, current" | Tab |
| Achievement item | "Cake Connoisseur, unlocked" | Focus |
| Panel close | "Close achievements" | Enter/Escape |
| Exploration ring | "3 of 6 cakes explored" | N/A (decorative) |

## Mobile Adaptations

### Touch Interactions
- Tap = Click (1:1 mapping)
- No hover pour on touch devices (disabled via JS)
- Layer reveal button always visible on mobile
- Toast notifications full width minus margins
- Achievement panel scrollable
- Progress bar responsive scale

### Breakpoints
- 900px: Achievement tracker moves to full width
- 640px: Progress steps reduce size
- 580px: Toast spans full width
- 520px: Achievement panel reduces padding
