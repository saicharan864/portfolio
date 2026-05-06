const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf-8');
const script = fs.readFileSync('script.js', 'utf-8');

const dom = new JSDOM(html, { runScripts: "dangerously" });

// Override console to catch errors
const errors = [];
dom.window.console.error = (...args) => errors.push(args);
dom.window.onerror = (message, source, lineno, colno, error) => {
    errors.push({ message, source, lineno, colno, error });
};

try {
    const el = dom.window.document.createElement('script');
    el.textContent = script;
    dom.window.document.body.appendChild(el);
    setTimeout(() => {
        console.log("Errors caught:", errors);
        process.exit(0);
    }, 2000);
} catch (e) {
    console.log("Caught:", e);
}
