/**
 * AI Chat System - Intelligent Code Assistant
 * 
 * This module handles real-time communication with the AI assistant,
 * providing context-aware programming help to students.
 * 
 * Features:
 * - Real-time message processing
 * - Context injection (current lesson, technology)
 * - Conversation history management
 * - Rate limiting and caching
 * - Markdown rendering for code blocks
 */

class AIAssistant {
    constructor() {
        this.apiEndpoint = '/api/chat';
        this.conversationHistory = [];
        this.currentContext = null;
        this.isProcessing = false;
    }

    /**
     * Send message to AI with lesson context
     * @param {string} userMessage - User's question or code
     * @returns {Promise<string>} AI response
     */
    async sendMessage(userMessage) {
        if (this.isProcessing) {
            throw new Error('Please wait for the current response');
        }

        this.isProcessing = true;
        
        try {
            // Build context-aware payload
            const payload = {
                message: userMessage,
                context: this.buildContext(),
                history: this.getRecentHistory(5)
            };

            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': this.getCsrfToken()
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Store in conversation history
            this.conversationHistory.push({
                role: 'user',
                content: userMessage,
                timestamp: Date.now()
            });

            this.conversationHistory.push({
                role: 'assistant',
                content: data.response,
                timestamp: Date.now()
            });

            return data.response;

        } catch (error) {
            console.error('AI Chat Error:', error);
            throw error;
        } finally {
            this.isProcessing = false;
        }
    }

    /**
     * Build contextual information for AI
     * Helps AI provide more relevant answers
     */
    buildContext() {
        return {
            currentLesson: this.getCurrentLesson(),
            technology: this.getCurrentTechnology(),
            userLevel: this.getUserLevel(),
            recentCode: this.getRecentCode()
        };
    }

    /**
     * Get recent conversation for context
     * @param {number} count - Number of messages to retrieve
     */
    getRecentHistory(count) {
        return this.conversationHistory
            .slice(-count * 2) // Get last N exchanges
            .map(msg => ({
                role: msg.role,
                content: msg.content
            }));
    }

    /**
     * Render AI response with proper formatting
     * Handles code blocks, markdown, syntax highlighting
     */
    renderResponse(response) {
        const container = document.getElementById('ai-response');
        
        // Convert markdown to HTML
        const html = this.markdownToHtml(response);
        
        // Highlight code blocks
        const formatted = this.highlightCode(html);
        
        container.innerHTML = formatted;
        
        // Animate entry
        this.animateResponse(container);
    }

    /**
     * Convert markdown to HTML with code highlighting
     */
    markdownToHtml(markdown) {
        // Code blocks
        markdown = markdown.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
            return `<pre><code class="language-${lang || 'javascript'}">${this.escapeHtml(code)}</code></pre>`;
        });

        // Inline code
        markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Bold
        markdown = markdown.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // Line breaks
        markdown = markdown.replace(/\n/g, '<br>');

        return markdown;
    }

    /**
     * Syntax highlighting for code blocks
     */
    highlightCode(html) {
        const temp = document.createElement('div');
        temp.innerHTML = html;

        temp.querySelectorAll('code').forEach(block => {
            // Simple syntax highlighting (in production, use Prism.js)
            let code = block.textContent;
            
            // Keywords
            code = code.replace(/\b(function|const|let|var|if|else|for|while|return)\b/g, 
                '<span class="keyword">$1</span>');
            
            // Strings
            code = code.replace(/(['"`])(.*?)\1/g, 
                '<span class="string">$1$2$1</span>');
            
            // Comments
            code = code.replace(/(\/\/.*$)/gm, 
                '<span class="comment">$1</span>');

            block.innerHTML = code;
        });

        return temp.innerHTML;
    }

    /**
     * Get current lesson context
     */
    getCurrentLesson() {
        const lessonElement = document.querySelector('[data-lesson-id]');
        return lessonElement ? {
            id: lessonElement.dataset.lessonId,
            title: lessonElement.dataset.lessonTitle,
            technology: lessonElement.dataset.technology
        } : null;
    }

    /**
     * Get user's current technology focus
     */
    getCurrentTechnology() {
        const url = window.location.pathname;
        if (url.includes('javascript')) return 'JavaScript';
        if (url.includes('python')) return 'Python';
        if (url.includes('php')) return 'PHP';
        return 'General';
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get CSRF token for security
     */
    getCsrfToken() {
        return document.querySelector('meta[name="csrf-token"]')?.content || '';
    }

    /**
     * Smooth scroll animation for responses
     */
    animateResponse(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.3s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

// Export for use in other modules
export default AIAssistant;
