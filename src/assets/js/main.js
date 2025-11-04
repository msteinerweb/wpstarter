// Import styles
import '../scss/style.scss';

console.log('🚀 WPStarter Dev Server Running!');

// Simple HMR demo
const app = document.getElementById('app');
if (app) {
    app.innerHTML = `
        <div class="alert alert-success mt-3">
            <h4>✅ JavaScript is Loading!</h4>
            <p>The Vite dev server is compiling your JavaScript and SCSS.</p>
            <p><strong>Current time:</strong> ${new Date().toLocaleTimeString()}</p>
        </div>
    `;
}

// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        console.log('🔥 HMR Update received!');
        location.reload();
    });
}
