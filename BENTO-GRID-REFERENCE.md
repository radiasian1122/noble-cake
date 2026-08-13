# Bento Grid Quick Reference

## Grid Containers

| Class | Description | Desktop | Tablet | Mobile |
|-------|-------------|---------|--------|--------|
| `.bento-grid` | Base grid | 4 cols | 2 cols | 1 col |
| `.bento-grid--featured-left` | Featured top-left | 4 cols with named areas | 2 cols simplified | 1 col stack |
| `.bento-grid--featured-right` | Featured top-right | 4 cols with named areas | 2 cols simplified | 1 col stack |
| `.bento-grid--collection` | Multiple featured | 6 cols with areas | 2 cols simplified | 1 col stack |
| `.bento-grid--asymmetric` | Mixed sizes | 5 cols with areas | 2 cols simplified | 1 col stack |
| `.bento-grid--studio` | Video thumbnails | 4 cols, 320px rows | 2 cols, 280px rows | 1 col stack |
| `.bento-grid--cakes` | Auto-first featured | 3 cols | 2 cols | 1 col |
| `.bento-grid--films` | Films layout | 4 cols, 320px rows | 2 cols | 1 col |
| `.bento-grid--animate` | Stagger animation | Add to any grid | Add to any grid | Add to any grid |

## Grid Items

| Class | Desktop Span | Tablet Span | Mobile Span | Min Height |
|-------|--------------|-------------|-------------|------------|
| `.bento-item` | 1x1 | 1x1 | 1x1 | 280px |
| `.bento-item--featured` | 2x2 | 2x2 | 1x1 | 580px / 480px / 420px |
| `.bento-item--wide` | 2x1 | 2x1 | 1x1 | 280px |
| `.bento-item--tall` | 1x2 | 1x2 | 1x1 | 580px / 480px / 340px |

## Named Grid Areas

Use with `data-area` attribute on `.bento-item`:

```html
<div class="bento-item" data-area="hero">Featured content</div>
```

| Area Name | Usage |
|-----------|-------|
| `hero` | Primary featured item |
| `hero1` | First featured (collection grid) |
| `hero2` | Second featured (collection grid) |
| `tall` | Tall item in asymmetric grid |
| `wide` | Wide item in asymmetric grid |

## Position Utilities

| Class | Effect |
|-------|--------|
| `.bento-item--col-start-1` | Start at column 1 |
| `.bento-item--col-start-2` | Start at column 2 |
| `.bento-item--col-start-3` | Start at column 3 |
| `.bento-item--col-start-4` | Start at column 4 |
| `.bento-item--row-start-1` | Start at row 1 |
| `.bento-item--row-start-2` | Start at row 2 |
| `.bento-item--row-start-3` | Start at row 3 |

## Responsive Visibility

| Class | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `.bento-item--hide-mobile` | Hidden | Visible | Visible |
| `.bento-item--hide-tablet` | Visible | Hidden | Visible |
| `.bento-item--hide-desktop` | Visible | Visible | Hidden |
| `.bento-item--show-mobile` | Visible | Hidden | Hidden |
| `.bento-item--show-tablet` | Hidden | Visible | Hidden |
| `.bento-item--show-desktop` | Hidden | Hidden | Visible |

## Content Wrappers

| Class | Purpose | Aspect Ratios |
|-------|---------|---------------|
| `.bento-item__content` | Main content wrapper | Full height flex container |
| `.bento-item__media` | Image/video container | 4/5 (standard), 16/9 (featured/wide), 9/16 (tall) |
| `.bento-item__body` | Text content area | Flexible, fills remaining space |

## Item States

```html
<!-- Loading state -->
<div class="bento-item" data-loading="true">...</div>

<!-- Empty placeholder -->
<div class="bento-item bento-item--empty">Empty slot</div>
```

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 579px) { ... }

/* Tablet */
@media (min-width: 580px) and (max-width: 939px) { ... }

/* Desktop */
@media (min-width: 940px) { ... }
```

## Gap Values

| Breakpoint | Row Gap | Column Gap |
|------------|---------|------------|
| Desktop (940px+) | `clamp(20px, 2.6vw, 34px)` | `clamp(18px, 2.2vw, 30px)` |
| Tablet (580-939px) | `clamp(18px, 3vw, 28px)` | `clamp(16px, 2.5vw, 24px)` |
| Mobile (< 580px) | `clamp(16px, 4vw, 24px)` | Same |

## Animation Delays

Stagger delays (80ms increment per item, up to 10 items):

| Item Position | Delay |
|---------------|-------|
| 1st | 0ms |
| 2nd | 80ms |
| 3rd | 160ms |
| 4th | 240ms |
| 5th | 320ms |
| 6th | 400ms |
| 7th | 480ms |
| 8th | 560ms |
| 9th | 640ms |
| 10th | 720ms |

## Transition Properties

```css
/* Grid container */
transition:
  grid-template-columns 0.4s cubic-bezier(0.4, 0, 0.2, 1),
  grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1),
  gap 0.4s cubic-bezier(0.4, 0, 0.2, 1);

/* Grid items */
transition:
  transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
  opacity 0.3s ease;
```

## Common Patterns

### Pattern 1: Collection with Auto-Featured First

```html
<div class="bento-grid bento-grid--cakes bento-grid--animate">
  <div class="bento-item"><!-- Auto 2x2 --></div>
  <div class="bento-item"><!-- 1x1 --></div>
  <div class="bento-item"><!-- 1x1 --></div>
</div>
```

### Pattern 2: Explicit Featured Item

```html
<div class="bento-grid bento-grid--featured-left">
  <div class="bento-item bento-item--featured" data-area="hero">
    <!-- 2x2 featured -->
  </div>
  <div class="bento-item"><!-- 1x1 --></div>
</div>
```

### Pattern 3: Mixed Sizes

```html
<div class="bento-grid bento-grid--asymmetric">
  <div class="bento-item bento-item--featured" data-area="hero">2x2</div>
  <div class="bento-item bento-item--tall" data-area="tall">1x2</div>
  <div class="bento-item bento-item--wide" data-area="wide">2x1</div>
  <div class="bento-item">1x1</div>
</div>
```

### Pattern 4: With Content Structure

```html
<div class="bento-grid bento-grid--cakes">
  <div class="bento-item">
    <div class="bento-item__content">
      <div class="bento-item__media">
        <img src="cake.jpg" alt="...">
      </div>
      <div class="bento-item__body">
        <h3>Title</h3>
        <p>Description</p>
      </div>
    </div>
  </div>
</div>
```

## Grid Template Areas

### Featured Left (Desktop)

```css
grid-template-areas:
  "hero hero card1 card2"
  "hero hero card3 card4"
  "card5 card6 card7 card8";
```

### Featured Right (Desktop)

```css
grid-template-areas:
  "card1 card2 hero hero"
  "card3 card4 hero hero"
  "card5 card6 card7 card8";
```

### Collection (Desktop)

```css
grid-template-areas:
  "hero1 hero1 card1 card2 hero2 hero2"
  "hero1 hero1 card3 card4 hero2 hero2"
  "card5 card6 card7 card8 card9 card10";
```

### Asymmetric (Desktop)

```css
grid-template-areas:
  "hero hero card1 card2 card3"
  "hero hero card4 tall tall"
  "card5 card6 card7 tall tall"
  "wide wide wide card8 card9";
```

### Tablet (All Variants)

```css
grid-template-areas:
  "hero hero"
  "hero hero"
  "card1 card2"
  "card3 card4";
```

## JavaScript Hooks

```javascript
// Select grid
const grid = document.querySelector('.bento-grid');

// Select all items
const items = document.querySelectorAll('.bento-item');

// Add item dynamically
const newItem = document.createElement('div');
newItem.className = 'bento-item';
grid.appendChild(newItem);

// Toggle featured
item.classList.toggle('bento-item--featured');

// Set grid variant
grid.className = 'bento-grid bento-grid--collection';

// Enable animation
grid.classList.add('bento-grid--animate');

// Set loading state
item.dataset.loading = 'true';

// Set grid area
item.dataset.area = 'hero';
```

## Accessibility Notes

- DOM order preserved for screen readers
- Focus management through CSS transforms (no JS needed)
- Keyboard navigation follows visual layout via `grid-auto-flow: dense`
- Reduced motion support: `@media (prefers-reduced-motion: reduce)`
- ARIA attributes should be added to interactive items

## Performance Tips

1. Use `will-change` sparingly (not included by default)
2. Limit simultaneous transitions to 10-12 items
3. Use `content-visibility: auto` for large grids
4. Consider intersection observer for lazy loading images
5. Test on 60Hz and 120Hz displays

## Browser Compatibility

- Chrome/Edge 114+
- Firefox 115+
- Safari 16.5+
- Fallback: Single column stack in older browsers

## Migration Checklist

- [ ] Include `bento-grid-system.css` in project
- [ ] Replace `.grid` with `.bento-grid` + variant
- [ ] Replace `.tile` with `.bento-item`
- [ ] Add `.bento-item--featured` to hero items
- [ ] Wrap content with `.bento-item__content`
- [ ] Test at 375px, 768px, and 1440px viewports
- [ ] Verify animations work (add `.bento-grid--animate`)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Check reduced motion preference

## Common Issues

### Issue: Items not filling grid properly
**Solution**: Check `grid-auto-flow: dense` is applied and items don't have conflicting position rules.

### Issue: Featured item not spanning 2x2
**Solution**: Ensure both `.bento-item--featured` class and correct `data-area` attribute are present.

### Issue: Gaps too large/small
**Solution**: Override gap with custom clamp values or CSS custom properties.

### Issue: Animations not firing
**Solution**: Add `.bento-grid--animate` to container, check `prefers-reduced-motion` setting.

### Issue: Layout breaking on tablet
**Solution**: Test at exact 580px and 939px breakpoints, may need to adjust media queries.

## Files

- `bento-grid-system.css` - Core system styles
- `BENTO-GRID-GUIDE.md` - Full documentation
- `BENTO-GRID-REFERENCE.md` - This quick reference
- `bento-grid-example.html` - Live examples

---

**Version**: 1.0.0  
**Last Updated**: 2026-08-13  
**License**: Use freely within Noble Cake project
