import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./css/rootmain.css";
import "./css/header.css";
import "./css/accordion.css";
import "./css/alerts.css";
import "./css/background.css";
import "./css/badge.css";
import "./css/breadcrumbs.css";
import "./css/button.css";
import "./css/card.css";
import "./css/checkbox.css";
import "./css/dropdown.css"
import "./css/navbar.css";
import "./css/navtab.css";
import "./css/pages.css";
import "./css/sidebar.css";
import "./css/sbcardgroup.css";
import "./css/sbcarousel.css";
import "./css/sbform.css";
import "./css/sbgrid.css";
import "./css/sbmodal.css";
import "./css/toast.css";
import "./css/bsgrid.css";
import "./css/proficiencyarrow.css";

// the ReactDOM.createRoot method is used to create a root for
// the application, and the render method is called to render
// the App component inside it.

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // StrictMode is a tool use to highlight potential problems during development
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Design Patterns used in this app

// Component Modularity:
// Each functionality is encapsulated within its own component.
// This follows the principle of modularity, making it easier to
// manage, test, and reuse components.

// Props and Composition:
// Components are designed to accept props to customize their
// behavior and content. This promotes component composition and reusability.

// State Management:
// State is managed using React's useState hook. This keeps track of
// dynamic data within the component and triggers re-renders when state changes.

// Side Effects and Lifecycles:
// Side effects, such as fetching data from APIs, are managed using
// the useEffect hook. This hook ensures that side effects are performed after rendering.

// Conditional Rendering:
// Components conditionally render UI elements based on data and state.
// This is seen in the conditional rendering of error toasts, indicators, carousel items, etc.

// Callbacks and Event Handling:
// Event handling is done through callback functions passed as props.
// This follows the pattern of passing functions down the component tree to handle user interactions.

// Mapping and Iteration:
// Components use the map function to iterate through arrays of data and
// render dynamic lists of items, such as filters and carousel items.

// CSS and Styling:
// CSS classes and styles are applied to create visually appealing components.
// The use of Bootstrap classes follows a standard design approach.

// Immutable Data Flow:
// The components seem to follow an immutable data flow pattern, where data
// is passed down from parent to child components, and changes to data are managed via state updates.

// Conditional Styling:
// CSS classes are conditionally applied to elements using ternary operators and logical checks.
// This helps create dynamic styles based on conditions.

// Use of Utility Libraries:
// The code uses utility libraries such as react-toastify and Bootstrap
// to enhance functionality and styling.

// Memoization:
// The useMemo hook is used to memoize data and avoid unnecessary recalculations, improving performance.
