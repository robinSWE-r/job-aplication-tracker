1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll
getElementById selects a single element by ID, getElementsByClassName selects all elements with a class, querySelector selects the first element matching a CSS selector, and querySelectorAll selects all matches.

2. How to create and insert a new element into the DOM
Use document.createElement() to create, set its content/attributes, and insert it with appendChild() or insertBefore().

3. What is Event Bubbling? How it works
An event triggered on a child element automatically propagates upwards to its parent elements unless stopped.

4. What is Event Delegation? Why it’s useful
Instead of adding listeners to many children, attach one listener on a parent and handle events via event.target; useful for dynamic elements and better performance.

5. Difference between preventDefault() and stopPropagation()
preventDefault() cancels the browser’s default behavior for an element, while stopPropagation() prevents the event from moving up to parent elements.