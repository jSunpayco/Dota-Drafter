const React = require('react')
const { StrictMode } = require('react')
const App = require('./App.tsx')
const { createRoot } = require('react-dom/client')

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<StrictMode>
  <App />
</StrictMode>);