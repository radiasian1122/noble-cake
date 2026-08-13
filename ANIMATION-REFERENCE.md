# Animation System - Quick Reference

## CSS Classes (Auto-Applied)

| Class | Behavior | Duration | Easing |
|-------|----------|----------|--------|
| `.btn` | Hover lift, press squash | 180ms | ease-out |
| `.btn--loading` | Spinning loader, disable click | - | linear |
| `.btn--success` | Elastic bounce | 600ms | elastic |
| `.tile` | Hover lift with shadow | 280ms | ease-out |
| `.chip` | Hover lift, select bounce | 180ms | ease-out / elastic |
| `.drawer` | Slide in from right | 600ms | spring-soft |
| `.row` | Staggered entrance (60ms apart) | 280ms | ease-out |
| `.toast` | Slide down from top | 600ms | spring-soft |
| `.film` | Hover lift and scale | 280ms | ease-out |
| `.feature__frame` | Hover lift, play button scale | 280ms | ease-out |

## JavaScript API

### Button States
```javascript
AnimationTriggers.setButtonLoading(button, true/false)
AnimationTriggers.setButtonSuccess(button)
```

### Cart Interactions
```javascript
AnimationTriggers.pulseBasketCount()
AnimationTriggers.bumpQuantity(qtyElement)
AnimationTriggers.animateTileAdd(button)
```

### Configurator
```javascript
AnimationTriggers.animateTicketUpdate()
AnimationTriggers.animateTotalChange()
```

### Notifications
```javascript
AnimationTriggers.toast.success(message, duration?)
AnimationTriggers.toast.error(message, duration?)
AnimationTriggers.showCheckmark(containerElement)
```

### Lists
```javascript
AnimationTriggers.staggerElements(container, selector, delay)
AnimationTriggers.animateDrawerRows()
```

### Scroll
```javascript
AnimationTriggers.initScrollHeader()
```

### Utility
```javascript
AnimationTriggers.playAnimation(element, className, duration)
```

## CSS Tokens

### Timing
```css
--motion-instant: 100ms
--motion-fast: 180ms
--motion-base: 280ms
--motion-slow: 420ms
--motion-slower: 600ms
--motion-slowest: 850ms
```

### Easing
```css
--ease-out: cubic-bezier(0.2, 0.7, 0.3, 1)
--ease-in: cubic-bezier(0.7, 0, 0.9, 0.4)
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1)
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55)
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-snap: cubic-bezier(0.4, 0, 0.2, 1)
--spring-soft: cubic-bezier(0.5, 1.25, 0.75, 1)
--spring-hard: cubic-bezier(0.68, -0.6, 0.32, 1.6)
```

### Shadows
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.12)
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.18)
--shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.24)
--shadow-xl: 0 24px 72px rgba(0, 0, 0, 0.32)
```

### Lifts
```css
--lift-sm: -2px
--lift-md: -4px
--lift-lg: -8px
```

## Common Patterns

### Add to Cart
```javascript
function addItem(item) {
  cart.push(item);
  AnimationTriggers.animateTileAdd(button);
  AnimationTriggers.pulseBasketCount();
  AnimationTriggers.toast.success('Added to your box!');
}
```

### Update Configuration
```javascript
function updateConfig() {
  AnimationTriggers.animateTicketUpdate();
  // Update your preview
  AnimationTriggers.animateTotalChange();
}
```

### Async Operation
```javascript
async function submit() {
  AnimationTriggers.setButtonLoading(btn, true);
  try {
    await api.call();
    AnimationTriggers.setButtonLoading(btn, false);
    AnimationTriggers.setButtonSuccess(btn);
  } catch (e) {
    AnimationTriggers.setButtonLoading(btn, false);
    AnimationTriggers.toast.error('Failed');
  }
}
```

### Quantity Change
```javascript
function changeQty(delta) {
  qty += delta;
  AnimationTriggers.bumpQuantity(qtyElement);
  AnimationTriggers.pulseBasketCount();
}
```

## Keyframes Reference

| Animation | Use Case | Duration |
|-----------|----------|----------|
| `btn-success` | Button success feedback | 600ms |
| `btn-spin` | Loading spinner | 650ms (infinite) |
| `tile-reveal` | Grid item entrance | 850ms |
| `drawer-enter` | Drawer slide in | 600ms |
| `row-enter` | Cart row entrance | 280ms |
| `qty-bump` | Number scale | 300ms |
| `basket-pulse` | Badge notification | 300ms |
| `chip-select` | Option selection | 300ms |
| `ticket-flash` | Preview update | 300ms |
| `total-bump` | Price change | 300ms |
| `checkmark-pop` | Checkmark scale in | 300ms |
| `checkmark-circle` | Circle draw | 600ms |
| `checkmark-check` | Check draw | 400ms |
| `empty-float` | Empty state float | 3s (infinite) |
| `skeleton-shimmer` | Loading skeleton | 1.5s (infinite) |

## Stagger Delays

### Grid Tiles (3 columns)
- Column 1: 0ms
- Column 2: 100ms
- Column 3: 200ms

### Drawer Rows
- Row 1-5: 60ms increments
- Row 6+: 300ms

## Browser Shortcuts

### Test Reduced Motion
Chrome DevTools > Rendering > Emulate CSS media feature `prefers-reduced-motion`

### Force Animations to Slow Motion
Chrome DevTools > Console:
```javascript
document.documentElement.style.setProperty('--motion-base', '2000ms');
```

### Inspect Active Animations
Chrome DevTools > Elements > Animations panel (Ctrl+Shift+P > "animations")
