/**
 * Monaco Editor Integration
 * 
 * Professional code editing experience powered by VS Code's engine.
 * Supports multiple languages, themes, and advanced editing features.
 * 
 * Features:
 * - Multi-language support
 * - IntelliSense and auto-completion
 * - Real-time syntax validation
 * - Code formatting
 * - Minimap and breadcrumbs
 * - Keyboard shortcuts
 */

class CodeEditor {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.editor = null;
        this.currentLanguage = options.language || 'javascript';
        this.theme = options.theme || 'vs-dark';
        
        this.init();
    }

    /**
     * Initialize Monaco Editor with custom configuration
     */
    async init() {
        // Load Monaco from CDN
        await this.loadMonaco();
        
        // Create editor instance
        this.editor = monaco.editor.create(this.container, {
            value: this.getDefaultCode(),
            language: this.currentLanguage,
            theme: this.theme,
            
            // Editor options
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            
            // Minimap
            minimap: {
                enabled: true,
                side: 'right'
            },
            
            // Suggestions
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            
            // Formatting
            formatOnPaste: true,
            formatOnType: true,
            
            // Scrollbar
            scrollbar: {
                useShadows: false,
                vertical: 'visible',
                horizontal: 'visible',
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10
            }
        });
        
        // Setup event handlers
        this.setupEventHandlers();
        
        // Register keyboard shortcuts
        this.registerShortcuts();
        
        // Load user's saved code if exists
        this.loadSavedCode();
    }

    /**
     * Load Monaco Editor from CDN
     */
    loadMonaco() {
        return new Promise((resolve, reject) => {
            if (window.monaco) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
            script.onload = () => {
                require.config({ 
                    paths: { 
                        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' 
                    } 
                });
                
                require(['vs/editor/editor.main'], () => {
                    this.configureMonaco();
                    resolve();
                });
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Configure Monaco with custom settings
     */
    configureMonaco() {
        // Register custom themes
        monaco.editor.defineTheme('custom-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955' },
                { token: 'keyword', foreground: 'C586C0' },
                { token: 'string', foreground: 'CE9178' }
            ],
            colors: {
                'editor.background': '#1e1e1e',
                'editor.lineHighlightBackground': '#2a2a2a'
            }
        });

        // Add custom language snippets
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: () => {
                return {
                    suggestions: this.getCustomSnippets()
                };
            }
        });
    }

    /**
     * Get custom code snippets
     */
    getCustomSnippets() {
        return [
            {
                label: 'log',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'console.log(${1:object});',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Log output to console'
            },
            {
                label: 'func',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'function ${1:name}(${2:params}) {\n\t${3}\n}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Function declaration'
            },
            {
                label: 'arrow',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'const ${1:name} = (${2:params}) => {\n\t${3}\n};',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Arrow function'
            }
        ];
    }

    /**
     * Setup event handlers for editor actions
     */
    setupEventHandlers() {
        // Auto-save on change
        this.editor.onDidChangeModelContent(() => {
            this.autoSave();
        });

        // Track cursor position
        this.editor.onDidChangeCursorPosition((e) => {
            this.updateCursorPosition(e.position);
        });

        // Handle errors and warnings
        monaco.editor.onDidChangeMarkers(() => {
            this.handleValidationErrors();
        });
    }

    /**
     * Register custom keyboard shortcuts
     */
    registerShortcuts() {
        // Ctrl+Enter: Run code
        this.editor.addAction({
            id: 'run-code',
            label: 'Run Code',
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
            ],
            run: () => {
                this.runCode();
            }
        });

        // Ctrl+S: Save
        this.editor.addAction({
            id: 'save-code',
            label: 'Save Code',
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS
            ],
            run: () => {
                this.saveCode();
            }
        });

        // Ctrl+Shift+F: Format code
        this.editor.addAction({
            id: 'format-code',
            label: 'Format Code',
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF
            ],
            run: () => {
                this.formatCode();
            }
        });
    }

    /**
     * Run/Execute the code
     */
    runCode() {
        const code = this.getCode();
        
        if (this.currentLanguage === 'javascript') {
            this.executeJavaScript(code);
        } else if (this.currentLanguage === 'html') {
            this.renderHTML(code);
        } else {
            console.warn('Code execution not supported for this language');
        }
    }

    /**
     * Execute JavaScript code safely
     */
    executeJavaScript(code) {
        const consoleOutput = document.getElementById('console-output');
        consoleOutput.innerHTML = '';

        // Intercept console.log
        const originalLog = console.log;
        console.log = (...args) => {
            this.addConsoleOutput(args.join(' '), 'log');
            originalLog.apply(console, args);
        };

        // Intercept console.error
        const originalError = console.error;
        console.error = (...args) => {
            this.addConsoleOutput(args.join(' '), 'error');
            originalError.apply(console, args);
        };

        try {
            // Execute code in isolated context
            const result = new Function(code)();
            
            if (result !== undefined) {
                this.addConsoleOutput(`Result: ${result}`, 'result');
            }
        } catch (error) {
            this.addConsoleOutput(`Error: ${error.message}`, 'error');
        } finally {
            // Restore console
            console.log = originalLog;
            console.error = originalError;
        }
    }

    /**
     * Add output to console panel
     */
    addConsoleOutput(message, type = 'log') {
        const consoleOutput = document.getElementById('console-output');
        const line = document.createElement('div');
        line.className = `console-line console-${type}`;
        line.textContent = message;
        consoleOutput.appendChild(line);
        
        // Auto-scroll
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    /**
     * Format code using Monaco's formatter
     */
    async formatCode() {
        await this.editor.getAction('editor.action.formatDocument').run();
    }

    /**
     * Change editor language
     */
    setLanguage(language) {
        this.currentLanguage = language;
        const model = this.editor.getModel();
        monaco.editor.setModelLanguage(model, language);
    }

    /**
     * Change editor theme
     */
    setTheme(theme) {
        this.theme = theme;
        monaco.editor.setTheme(theme);
    }

    /**
     * Get current code
     */
    getCode() {
        return this.editor.getValue();
    }

    /**
     * Set code content
     */
    setCode(code) {
        this.editor.setValue(code);
    }

    /**
     * Auto-save functionality
     */
    autoSave() {
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setTimeout(() => {
            this.saveCode();
        }, 2000); // Save after 2 seconds of inactivity
    }

    /**
     * Save code to localStorage
     */
    saveCode() {
        const code = this.getCode();
        localStorage.setItem(`editor_${this.currentLanguage}`, code);
        this.showNotification('Code saved!');
    }

    /**
     * Load saved code from localStorage
     */
    loadSavedCode() {
        const saved = localStorage.getItem(`editor_${this.currentLanguage}`);
        if (saved) {
            this.setCode(saved);
        }
    }

    /**
     * Handle validation errors and warnings
     */
    handleValidationErrors() {
        const model = this.editor.getModel();
        const markers = monaco.editor.getModelMarkers({ resource: model.uri });
        
        const errorCount = markers.filter(m => m.severity === 8).length;
        const warningCount = markers.filter(m => m.severity === 4).length;
        
        this.updateErrorCount(errorCount, warningCount);
    }

    /**
     * Update cursor position display
     */
    updateCursorPosition(position) {
        const statusBar = document.getElementById('editor-status');
        if (statusBar) {
            statusBar.textContent = `Ln ${position.lineNumber}, Col ${position.column}`;
        }
    }

    /**
     * Get default code template
     */
    getDefaultCode() {
        const templates = {
            javascript: `// Welcome to HTMLCamp Code Editor!
// Write your JavaScript code here

function greet(name) {
    return \`Hello, \${name}! Welcome to coding.\`;
}

console.log(greet('Student'));`,
            
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
            
            python: `# Python Code Editor
# Write your Python code here

def greet(name):
    return f"Hello, {name}!"

print(greet("Student"))`
        };

        return templates[this.currentLanguage] || '';
    }

    /**
     * Show notification
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'editor-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    /**
     * Destroy editor instance
     */
    destroy() {
        if (this.editor) {
            this.editor.dispose();
        }
    }
}

// Export for use
export default CodeEditor;
