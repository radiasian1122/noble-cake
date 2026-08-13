# Noble Cake Bento Grid System

A modular CSS Grid layout system designed for the Noble Cake collection and studio films sections.
Features asymmetric layouts, responsive breakpoints, and smooth transitions between viewport sizes.

## Overview

The bento grid system provides:
- **Varying cell sizes**: Featured items (2x2), standard items (1x1), wide items (2x1), tall items (1x2)
- **Asymmetric layouts**: Pre-designed patterns for visual interest
- **Responsive breakpoints**: Mobile (< 580px), Tablet (580-939px), Desktop (940px+)
- **Smooth transitions**: Animated layout changes between breakpoints
- **Grid auto-flow**: Intelligent item placement with `dense` packing

## Quick Start

### Basic Implementation

```html
<div class="bento-grid">
  <div class="bento-item bento-item--featured">Featured cake</div>
  <div class="bento-item">Standard cake 1</div>
  <div class="bento-item">Standard cake 2</div>
  <div class="bento-item">Standard cake 3</div>
  <div class="bento-item">Standard cake 4</div>
</div>
```

### With Variant Pattern

```html
<div class="bento-grid bento-grid--featured-left">
  <div class="bento-item bento-item--featured" data-area="hero">Hero cake</div>
  <div class="bento-item">Cake 1</div>
  <div class="bento-item">Cake 2</div>
  <div class="bento-item">Cake 3</div>
</div>
```

## Grid Variants

### 1. Standard Grid (Default)

4-column grid on desktop with automatic item placement.

```html
<div class="bento-grid">
  <!-- Items auto-flow with dense packing -->
</div>
```

**Desktop**: 4 columns | **Tablet**: 2 columns | **Mobile**: 1 column

### 2. Featured Left (`bento-grid--featured-left`)

Featured item in top-left corner, spanning 2x2.

```html
<div class="bento-grid bento-grid--featured-left">
  <div class="bento-item bento-item--featured" data-area="hero">Featured</div>
  <div class="bento-item">Item 1</div>
  <div class="bento-item">Item 2</div>
  <!-- ... -->
</div>
```

**Layout (Desktop)**:
```
[Featured][Featured][  Item 1  ][  Item 2  ]
[Featured][Featured][  Item 3  ][  Item 4  ]
[ Item 5 ][ Item 6 ][  Item 7  ][  Item 8  ]
```

### 3. Featured Right (`bento-grid--featured-right`)

Featured item in top-right corner, spanning 2x2.

```html
<div class="bento-grid bento-grid--featured-right">
  <div class="bento-item">Item 1</div>
  <div class="bento-item">Item 2</div>
  <div class="bento-item bento-item--featured" data-area="hero">Featured</div>
  <!-- ... -->
</div>
```

**Layout (Desktop)**:
```
[  Item 1  ][  Item 2  ][Featured][Featured]
[  Item 3  ][  Item 4  ][Featured][Featured]
[  Item 5  ][  Item 6  ][  Item 7 ][  Item 8 ]
```

### 4. Collection (`bento-grid--collection`)

6-column grid with multiple featured items for large collections.

```html
<div class="bento-grid bento-grid--collection">
  <div class="bento-item bento-item--featured" data-area="hero1">Featured 1</div>
  <div class="bento-item bento-item--featured" data-area="hero2">Featured 2</div>
  <div class="bento-item">Item 1</div>
  <!-- ... -->
</div>
```

**Layout (Desktop)**:
```
[Featured 1][Featured 1][Item 1][Item 2][Featured 2][Featured 2]
[Featured 1][Featured 1][Item 3][Item 4][Featured 2][Featured 2]
[  Item 5  ][  Item 6  ][Item 7][Item 8][  Item 9  ][ Item 10  ]
```

### 5. Asymmetric (`bento-grid--asymmetric`)

Complex 5-column layout with mixed item sizes.

```html
<div class="bento-grid bento-grid--asymmetric">
  <div class="bento-item bento-item--featured" data-area="hero">Featured</div>
  <div class="bento-item bento-item--tall" data-area="tall">Tall Item</div>
  <div class="bento-item bento-item--wide" data-area="wide">Wide Item</div>
  <!-- ... -->
</div>
```

**Layout (Desktop)**:
```
[Featured][Featured][Item 1][Item 2][Item 3]
[Featured][Featured][Item 4][  Tall  ][  Tall  ]
[ Item 5 ][ Item 6 ][Item 7][  Tall  ][  Tall  ]
[   Wide   ][   Wide   ][   Wide   ][Item 8][Item 9]
```

### 6. Studio Films (`bento-grid--studio`)

Optimized for video thumbnails with taller aspect ratios.

```html
<div class="bento-grid bento-grid--studio">
  <div class="bento-item">Film 1</div>
  <div class="bento-item">Film 2</div>
  <div class="bento-item">Film 3</div>
  <div class="bento-item">Film 4</div>
</div>
```

**Desktop**: 4 columns, 320px min-height | **Tablet**: 2 columns | **Mobile**: 1 column

## Item Types

### Featured Item (2x2)

Spans 2 columns and 2 rows on desktop.

```html
<div class="bento-item bento-item--featured">
  <div class="bento-item__content">
    <div class="bento-item__media">
      <!-- Image/video here -->
    </div>
    <div class="bento-item__body">
      <!-- Content here -->
    </div>
  </div>
</div>
```

### Wide Item (2x1)

Spans 2 columns, 1 row.

```html
<div class="bento-item bento-item--wide">
  <!-- Content -->
</div>
```

### Tall Item (1x2)

Spans 1 column, 2 rows.

```html
<div class="bento-item bento-item--tall">
  <!-- Content -->
</div>
```

### Standard Item (1x1)

Default single-cell item.

```html
<div class="bento-item">
  <!-- Content -->
</div>
```

## Responsive Behavior

### Desktop (940px+)

- Full grid variants available
- Featured items span 2x2 (580px min-height)
- Wide items span 2x1
- Tall items span 1x2
- 4-6 columns depending on variant

### Tablet (580px - 939px)

- Simplified 2-column grid
- Featured items span 2x2 (480px min-height)
- Wide items span 2x1
- Tall items span 1x2
- Named grid areas collapse to simpler pattern

### Mobile (< 580px)

- Single column stack
- All items become 1x1
- Featured items get extra height (420px)
- Standard items: 340px min-height
- Grid areas disabled

## Content Wrappers

Structure your bento items with semantic wrappers:

```html
<div class="bento-item bento-item--featured">
  <div class="bento-item__content">
    <div class="bento-item__media">
      <img src="cake.jpg" alt="Matcha Lava Cake">
    </div>
    <div class="bento-item__body">
      <h3>Matcha Lava Cake</h3>
      <p>White chocolate mousse with matcha lava center.</p>
      <button>Order Now</button>
    </div>
  </div>
</div>
```

### Media Container

Handles aspect ratios automatically:
- Featured items: `16 / 9`
- Wide items: `16 / 9`
- Tall items: `9 / 16`
- Standard items: `4 / 5`

## Utility Classes

### Grid Position

```html
<div class="bento-item bento-item--col-start-1">Starts at column 1</div>
<div class="bento-item bento-item--row-start-2">Starts at row 2</div>
```

### Responsive Visibility

```html
<!-- Hide on mobile -->
<div class="bento-item bento-item--hide-mobile">Desktop/Tablet only</div>

<!-- Show only on mobile -->
<div class="bento-item bento-item--show-mobile">Mobile only</div>

<!-- Hide on tablet -->
<div class="bento-item bento-item--hide-tablet">Mobile/Desktop only</div>
```

## Animations

### Staggered Entry Animation

```html
<div class="bento-grid bento-grid--animate">
  <div class="bento-item">Fades in first</div>
  <div class="bento-item">Fades in second (80ms delay)</div>
  <div class="bento-item">Fades in third (160ms delay)</div>
  <!-- Auto-incrementing 80ms delays up to 10 items -->
</div>
```

### Item States

```html
<!-- Loading state -->
<div class="bento-item" data-loading="true">Loading...</div>

<!-- Empty placeholder -->
<div class="bento-item bento-item--empty">Empty slot</div>
```

## Integration with Noble Cake

### Cake Collection

Replace the existing `.grid` with `.bento-grid--cakes`:

```html
<section class="band" id="collection">
  <div class="shell">
    <div class="head rise">
      <!-- Existing header -->
    </div>
    <div class="bento-grid bento-grid--cakes bento-grid--animate" id="grid">
      <!-- Cake tiles -->
    </div>
  </div>
</section>
```

### Studio Films

Replace `.films` with `.bento-grid--films`:

```html
<section class="band band--deep" id="studio">
  <div class="shell">
    <div class="head rise">
      <!-- Existing header -->
    </div>
    <div class="bento-grid bento-grid--films bento-grid--animate" id="films">
      <!-- Film tiles -->
    </div>
  </div>
</section>
```

### Featured Film Block

Convert to bento grid for asymmetric layout:

```html
<section class="band" id="featured">
  <div class="shell">
    <div class="bento-grid bento-grid--featured-left">
      <div class="bento-item bento-item--featured" data-area="hero">
        <a class="feature__frame" href="#">
          <!-- Existing featured film markup -->
        </a>
      </div>
      <div class="bento-item">
        <div class="feature__meta">
          <!-- Existing metadata -->
        </div>
      </div>
    </div>
  </div>
</section>
```

## JavaScript Integration

### Dynamic Item Addition

```javascript
// Add item to grid
const grid = document.querySelector('.bento-grid');
const newItem = document.createElement('div');
newItem.className = 'bento-item';
newItem.innerHTML = '...';
grid.appendChild(newItem);
```

### Toggle Featured State

```javascript
const item = document.querySelector('.bento-item');
item.classList.toggle('bento-item--featured');
```

### Observe Grid Changes

```javascript
const observer = new ResizeObserver(entries => {
  entries.forEach(entry => {
    // Grid resized
    console.log('Grid size:', entry.contentRect);
  });
});

observer.observe(document.querySelector('.bento-grid'));
```

## Accessibility

- Maintains logical DOM order for screen readers
- Keyboard navigation follows visual layout via `grid-auto-flow: dense`
- Focus management preserved through transforms
- Reduced motion support via `prefers-reduced-motion`

## Performance

- Uses CSS Grid native browser optimization
- Hardware-accelerated transforms for hover states
- `will-change` avoided to prevent layer explosion
- Transition durations optimized for 60fps

## Browser Support

- Chrome/Edge 114+
- Firefox 115+
- Safari 16.5+
- Falls back gracefully to flexbox in older browsers

## Customization

Override CSS custom properties to match your design:

```css
.bento-grid {
  --bento-gap-x: 30px;
  --bento-gap-y: 30px;
  --bento-item-min-height: 300px;
  --bento-transition-duration: 0.4s;
}
```

## Examples

See `/examples/bento-grid-demos.html` for live demonstrations of all variants.

## Migration from Existing Grid

```diff
- <div class="grid" id="grid"></div>
+ <div class="bento-grid bento-grid--cakes bento-grid--animate" id="grid"></div>

- <div class="films" id="films"></div>
+ <div class="bento-grid bento-grid--films bento-grid--animate" id="films"></div>

- <div class="tile"></div>
+ <div class="bento-item"></div>
```

## Changelog

### v1.0.0 (2026-08-13)
- Initial release
- 6 grid variants
- 4 item types
- Full responsive support
- Animation system
- Utility classes
