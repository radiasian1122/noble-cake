# Noble Cake - Micro-Animation System

Comprehensive animation library for tactile interactions across the storefront.

## Quick Start

### 1. Include the files

Add these lines to your HTML `<head>`, right after the main styles:

```html
<link rel="stylesheet" href="animations.css">
```

Add this line before the closing `</body>` tag, after your main script:

```html
<script src="animations.js"></script>
```

### 2. The system auto-initializes

The animation system automatically enhances existing interactions on page load.
No additional setup required for standard behaviors.

## Animation Library

### Button Physics (Squash & Stretch)

**Automatic:** All `.btn` elements get tactile press feedback.

**Manual triggers:**

```javascript
// Show loading spinner
AnimationTriggers.setButtonLoading(button, true);

// Hide loading spinner
AnimationTriggers.setButtonLoading(button, false);

// Success bounce
AnimationTriggers.setButtonSuccess(button);
```

**Example integration:**

```javascript
orderButton.addEventListener('click', async function() {
  AnimationTriggers.setButtonLoading(this, true);

  try {
    await submitOrder();
    AnimationTriggers.setButtonLoading(this, false);
    AnimationTriggers.setButtonSuccess(this);
  } catch (error) {
    AnimationTriggers.setButtonLoading(this, false);
  }
});
```

### Card Lift on Hover

**Automatic:** All `.tile` elements lift on hover with shadow depth.

**Custom lift amounts:**

```css
/* Default: --lift-md (-4px) */
.tile:hover {
  transform: translateY(var(--lift-sm)); /* -2px */
  transform: translateY(var(--lift-lg)); /* -8px */
}
```

### Drawer Slide (Basket Panel)

**Automatic:** The drawer slides in with elastic easing when `data-open="true"` is set.

**Row stagger is automatic** when drawer opens.

**Manual trigger:**

```javascript
// Force re-animate rows after dynamic content update
AnimationTriggers.animateDrawerRows();
```

### Basket Count Pulse

**Automatic:** Pulses when "Add to box" is clicked.

**Manual trigger:**

```javascript
// Pulse the basket badge
AnimationTriggers.pulseBasketCount();
```

**Example:**

```javascript
function addToCart(item) {
  cart.push(item);
  updateBasketCount();
  AnimationTriggers.pulseBasketCount();
}
```

### Quantity Bump

**Automatic:** Number scales when +/- buttons are pressed.

**Manual trigger:**

```javascript
// Animate a quantity change
const qtyElement = button.closest('.qty');
AnimationTriggers.bumpQuantity(qtyElement);
```

### Chip Toggle (Option Selection)

**Automatic:** Chips bounce when selected (aria-pressed="true").

**Manual trigger:**

```javascript
// Trigger when chip state changes
chip.setAttribute('aria-pressed', 'true');
// Animation plays automatically via CSS
```

### Ticket Preview Updates

**Automatic:** The configurator preview flashes when options change.

**Manual triggers:**

```javascript
// Flash the cake preview
AnimationTriggers.animateTicketUpdate();

// Bump the total price
AnimationTriggers.animateTotalChange();
```

**Example integration:**

```javascript
function updateConfiguration(option, value) {
  // Update your data
  config[option] = value;

  // Trigger animations
  AnimationTriggers.animateTicketUpdate();
  AnimationTriggers.animateTotalChange();

  // Redraw preview
  paintTicket();
}
```

### Toast Notifications

**Usage:**

```javascript
// Success message
AnimationTriggers.toast.success('Added to your box!');

// Error message
AnimationTriggers.toast.error('Something went wrong');

// Custom duration (default: 3000ms)
AnimationTriggers.toast.success('Item added!', 2000);
```

**Example:**

```javascript
try {
  await placeOrder();
  AnimationTriggers.toast.success('Order placed successfully!');
} catch (error) {
  AnimationTriggers.toast.error('Failed to place order');
}
```

### Success Checkmark

**Usage:**

```javascript
// Show animated checkmark in a container
AnimationTriggers.showCheckmark(containerElement);
```

**Example:**

```javascript
submitButton.addEventListener('click', async function() {
  const result = document.createElement('div');
  result.style.textAlign = 'center';
  result.style.padding = '20px';

  AnimationTriggers.setButtonLoading(this, true);

  try {
    await processPayment();
    AnimationTriggers.setButtonLoading(this, false);
    AnimationTriggers.showCheckmark(result);
    document.body.appendChild(result);
  } catch (error) {
    AnimationTriggers.setButtonLoading(this, false);
  }
});
```

### Scroll Header Behavior

**Automatic:** Header hides on scroll down, shows on scroll up (after 100px threshold).

**Disable:**

```javascript
// Remove the auto-init by commenting out in animations.js:
// scrollHeader.init();
```

**Customize threshold:**

```javascript
// In animations.js, change:
threshold: 200, // Hide header after 200px scroll
```

### Staggered Grid Reveals

**Automatic:** Collection tiles reveal progressively (already in main CSS as `.rise`).

**Manual stagger for dynamic content:**

```javascript
// Stagger any list of elements
const container = document.getElementById('grid');
AnimationTriggers.staggerElements(container, '.tile', 60);
// 60ms delay between each item
```

## Animation Tokens

All timing and easing values are in CSS custom properties for easy customization.

### Timing Scales

```css
--motion-instant: 100ms;
--motion-fast: 180ms;
--motion-base: 280ms;
--motion-slow: 420ms;
--motion-slower: 600ms;
--motion-slowest: 850ms;
```

### Easing Curves

```css
--ease-out: cubic-bezier(0.2, 0.7, 0.3, 1);
--ease-in: cubic-bezier(0.7, 0, 0.9, 0.4);
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-snap: cubic-bezier(0.4, 0, 0.2, 1);
--spring-soft: cubic-bezier(0.5, 1.25, 0.75, 1);
--spring-hard: cubic-bezier(0.68, -0.6, 0.32, 1.6);
```

### Shadow Depths

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.12);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.18);
--shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.24);
--shadow-xl: 0 24px 72px rgba(0, 0, 0, 0.32);
```

### Lift Distances

```css
--lift-sm: -2px;
--lift-md: -4px;
--lift-lg: -8px;
```

## Customization

### Adjust timing globally

```css
:root {
  --motion-base: 200ms; /* Faster default transitions */
  --motion-slow: 350ms; /* Faster slow animations */
}
```

### Change button physics

```css
.btn:hover {
  transform: translateY(-2px) scale(1.02); /* More lift, more scale */
}

.btn:active {
  transform: scale(0.95); /* Deeper press */
}
```

### Modify card lift

```css
.tile:hover {
  transform: translateY(-8px); /* Higher lift */
  box-shadow: var(--shadow-lg); /* Deeper shadow */
}
```

### Customize drawer animation

```css
.drawer {
  transition: transform 500ms var(--spring-hard); /* Bouncier entrance */
}
```

### Adjust stagger timing

```css
/* In animations.css, find: */
.row:nth-child(1) { animation-delay: 0ms; }
.row:nth-child(2) { animation-delay: 80ms; } /* Change 60ms to 80ms */
.row:nth-child(3) { animation-delay: 160ms; }
```

## Integration Examples

### Complete "Add to Cart" Flow

```javascript
// In your existing add() function
function add(item) {
  var found = null;
  for (var i = 0; i < box.length; i++) {
    if (box[i].key === item.key) {
      found = box[i];
      break;
    }
  }

  if (found) {
    found.qty += 1;
  } else {
    item.qty = 1;
    box.push(item);
  }

  paintBox();
  openBox();

  // ADD THESE LINES:
  AnimationTriggers.pulseBasketCount();
  AnimationTriggers.toast.success('Added to your box!', 2000);
}
```

### Enhanced Tile Add Button

```javascript
tile.querySelector('.tile__add').addEventListener('click', function() {
  var btn = this;

  // Original behavior
  add({
    key: cake.id,
    name: cake.name,
    meta: cake.spec,
    price: cake.price,
    art: chip(cake.tone || cake)
  });

  // ADD THESE LINES:
  AnimationTriggers.animateTileAdd(btn);

  btn.textContent = 'In your box';
  btn.dataset.state = 'added';

  window.setTimeout(function() {
    btn.textContent = 'Add to box';
    delete btn.dataset.state;
  }, 1600);
});
```

### Configurator with Animations

```javascript
function paintTicket() {
  // Trigger preview update animation BEFORE redrawing
  AnimationTriggers.animateTicketUpdate();

  var list = el('ticketList');
  list.innerHTML = '';

  // ... your existing code to populate the ticket ...

  el('ticketTotal').textContent = money(makerTotal());
  el('ticketServes').textContent = 'Serves ' + chosen('size').serves;
  el('ticketPic').innerHTML = draw(makerTone(), 5);

  // Trigger total bump animation AFTER updating
  AnimationTriggers.animateTotalChange();
}
```

### Quantity Controls with Feedback

```javascript
function bump(key, delta) {
  for (var i = 0; i < box.length; i++) {
    if (box[i].key === key) {
      // ADD THIS LINE to get the element before changing qty:
      var qtyEl = document.querySelector('.row[data-key="' + key + '"] .qty');

      box[i].qty += delta;
      if (box[i].qty <= 0) {
        box.splice(i, 1);
      }

      // ADD THESE LINES:
      if (qtyEl && box[i]) {
        AnimationTriggers.bumpQuantity(qtyEl);
      }
      AnimationTriggers.pulseBasketCount();

      break;
    }
  }

  paintBox();
}
```

### Checkout with Loading State

```javascript
el('checkout').addEventListener('click', function() {
  var btn = this;

  // Show loading state
  AnimationTriggers.setButtonLoading(btn, true);
  btn.textContent = 'Processing...';

  // Simulate async operation
  setTimeout(function() {
    // Hide loading state
    AnimationTriggers.setButtonLoading(btn, false);

    // Show success
    AnimationTriggers.setButtonSuccess(btn);
    btn.textContent = 'Order placed!';

    // Show success toast
    AnimationTriggers.toast.success('Redirecting to checkout...', 3000);

    // Redirect after delay
    setTimeout(function() {
      // window.location.href = '/checkout';
    }, 1500);
  }, 2000);
});
```

## Accessibility

### Reduced Motion

The system respects `prefers-reduced-motion` by:
- Setting all animation durations to 10ms
- Disabling transform-based animations
- Removing looping animations

Users who prefer reduced motion still get visual feedback, just instantaneous.

### ARIA Attributes

Loading buttons automatically get `aria-busy="true"` and `disabled` attributes.

Toast notifications use `role="status"` and `aria-live="polite"`.

### Focus Management

Animations don't interfere with focus states. The system preserves the existing `:focus-visible` styles.

## Performance

### Hardware Acceleration

All animations use GPU-accelerated properties:
- `transform` (not `top`/`left`)
- `opacity` (not `visibility`)
- `will-change` hints on interactive elements

### Debouncing

Scroll listeners are debounced to prevent performance issues.

### Animation Budget

Each animation is under 850ms to maintain snappy feel.
Most interactions complete in 180-420ms.

## Browser Support

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Gracefully degrades in older browsers (animations simply don't play).

## Troubleshooting

### Animations not playing

1. Check that CSS and JS files are loaded:
   ```javascript
   console.log(window.AnimationTriggers); // Should be defined
   ```

2. Check for CSS conflicts:
   ```css
   /* Make sure nothing overrides transition */
   .btn {
     transition: none !important; /* ← Remove this */
   }
   ```

3. Check reduced motion preference:
   ```javascript
   const prefersReducedMotion = window.matchMedia(
     '(prefers-reduced-motion: reduce)'
   ).matches;
   console.log(prefersReducedMotion); // Should be false
   ```

### Stagger not working

Ensure elements have the correct data attribute:
```html
<!-- Should have data-seen="true" -->
<div class="tile" data-seen="true">...</div>
```

The IntersectionObserver in main code should set this.

### Toast not appearing

Check z-index stacking:
```css
.toast {
  z-index: 100; /* Higher than other elements */
}
```

Make sure no fixed elements obscure it.

## Future Enhancements

Consider adding:

1. **Parallax scroll effects** for hero section
2. **Magnetic cursor** for large buttons
3. **Particle effects** when adding to cart
4. **Haptic feedback** (vibration on mobile)
5. **Sound effects** (optional, with mute toggle)
6. **Dark mode transitions** (smooth theme switch)
7. **Page transitions** (for multi-page navigation)
8. **Skeleton loaders** for image lazy-loading
9. **Confetti** on successful checkout
10. **Ripple effect** on button press

## Credits

Animation system designed for Noble Cake storefront.
Principles based on Material Design motion guidelines and Apple HIG.

## License

Use freely within the Noble Cake project.
