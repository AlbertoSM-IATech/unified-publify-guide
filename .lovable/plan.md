

## Fix: Blog post grid cards not appearing

**Problem**: The 3 non-featured blog posts are rendered in the DOM but stay invisible. The Framer Motion `whileInView` animation on the grid container (`initial="hidden"`) sets all card children to `opacity: 0, y: 24`, but the `whileInView="visible"` intersection trigger fails to fire consistently, leaving cards permanently hidden.

**Solution**: Replace `whileInView` with `animate` on the grid container so cards animate in immediately when data is available, without depending on viewport intersection.

### Changes

**`src/pages/Blog/Blog.tsx`** (lines ~131-136):
- Change `whileInView="visible"` to `animate="visible"` on the `motion.div` grid container
- Remove the `viewport` prop since it's no longer needed

```text
Before:
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}

After:
  animate="visible"
```

This is a one-line fix that ensures the cards always animate in when the data loads, regardless of scroll position or viewport intersection timing.

