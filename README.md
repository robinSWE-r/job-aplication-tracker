JavaScript DOM & Events Quick Notes

1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll
getElementById → single element by ID, getElementsByClassName → multiple elements by class, querySelector → first match by CSS selector, querySelectorAll → all matches by CSS selector.

2. How to create and insert a new element into the DOM
Use document.createElement() to make it, set content/attributes, then insert with appendChild or insertBefore.

3. What is Event Bubbling? How it works
Event starts at the target element and bubbles up through its parent elements.

4. What is Event Delegation? Why it’s useful
Attach one listener to a parent to handle events on its children; saves memory and works for dynamic elements.

5. Difference between preventDefault() and stopPropagation()
preventDefault() stops the browser’s default action, stopPropagation() stops the event from bubbling to parent elements.