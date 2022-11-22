const React = require('react')
const App = require('./App.tsx')
const { createRoot } = require('react-dom/client')

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);