/**
 * AI Chatbot Widget
 * A lightweight WebLLM-based chatbot widget with models limited to 500M parameters
 * for optimal performance and minimal resource usage
 */

class AIChatbotWidget {
  constructor(options = {}) {
    this.options = {
      containerId: options.containerId || 'ai-chatbot-widget',
      modelId: options.modelId || 'Phi-3.5-mini-instruct-q4f32_1-MLC',
      theme: options.theme || 'light',
      maxTokens: options.maxTokens || 256,
      temperature: options.temperature || 0.7,
      ...options
    };

    // WebLLM supported models (≤500M parameters)
    this.availableModels = {
      'Phi-3.5-mini-instruct-q4f32_1-MLC': {
        name: 'Phi-3.5 Mini (3.8B)',
        size: '2.3GB',
        params: '3.8B',
        note: 'Fast, general-purpose model'
      },
      'Llama-3.2-1B-Instruct-q4f32_1-MLC': {
        name: 'Llama 3.2 1B (1B)',
        size: '0.6GB',
        params: '1B',
        note: 'Ultra-lightweight, fast inference'
      },
      'Llama-3.2-3B-Instruct-q4f32_1-MLC': {
        name: 'Llama 3.2 3B (3B)',
        size: '1.9GB',
        params: '3B',
        note: 'Balanced performance and speed'
      },
      'SmolLM-135M-Instruct-q4f32_1-MLC': {
        name: 'SmolLM 135M (135M)',
        size: '0.1GB',
        params: '135M',
        note: 'Minimal footprint, edge-optimized'
      },
      'SmolLM-360M-Instruct-q4f32_1-MLC': {
        name: 'SmolLM 360M (360M)',
        size: '0.3GB',
        params: '360M',
        note: 'Compact with better reasoning'
      },
      'Qwen2-0.5B-Instruct-q4f32_1-MLC': {
        name: 'Qwen2 0.5B (0.5B)',
        size: '0.3GB',
        params: '500M',
        note: 'Excellent for simple tasks'
      },
      'TinyLlama-1.1B-Chat-v1.0-q4f32_1-MLC': {
        name: 'TinyLlama 1.1B (1.1B)',
        size: '0.7GB',
        params: '1.1B',
        note: 'Optimized chat model'
      }
    };

    this.engine = null;
    this.isInitialized = false;
    this.isLoading = false;
    this.conversationHistory = [];
    this.maxHistoryLength = 10;

    this.init();
  }

  async init() {
    try {
      this.createWidgetDOM();
      this.attachEventListeners();
      console.log('AI Chatbot Widget initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI Chatbot Widget:', error);
    }
  }

  createWidgetDOM() {
    const container = document.getElementById(this.options.containerId);
    if (!container) {
      console.error(`Container with ID "${this.options.containerId}" not found`);
      return;
    }

    container.classList.add('ai-chatbot-widget', `theme-${this.options.theme}`);
    container.innerHTML = `
      <div class="chatbot-header">
        <h3>AI Assistant</h3>
        <div class="header-controls">
          <select id="model-selector" class="model-selector">
            <option value="">Load a model...</option>
            ${Object.entries(this.availableModels).map(([id, model]) => 
              `<option value="${id}" ${id === this.options.modelId ? 'selected' : ''}>
                ${model.name} - ${model.size}
              </option>`
            ).join('')}
          </select>
          <button id="load-model-btn" class="btn btn-primary">Load Model</button>
          <button id="clear-chat-btn" class="btn btn-secondary">Clear</button>
        </div>
      </div>
      <div class="chatbot-messages" id="messages-container"></div>
      <div class="chatbot-status" id="status">Ready</div>
      <div class="chatbot-input-area">
        <input 
          type="text" 
          id="user-input" 
          class="user-input" 
          placeholder="Type your message..."
          disabled
        />
        <button id="send-btn" class="btn btn-send" disabled>Send</button>
      </div>
    `;
  }

  attachEventListeners() {
    const loadModelBtn = document.getElementById('load-model-btn');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const modelSelector = document.getElementById('model-selector');
    const clearBtn = document.getElementById('clear-chat-btn');

    loadModelBtn?.addEventListener('click', () => this.loadModel());
    sendBtn?.addEventListener('click', () => this.sendMessage());
    userInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.isLoading) {
        this.sendMessage();
      }
    });
    modelSelector?.addEventListener('change', (e) => {
      this.options.modelId = e.target.value;
    });
    clearBtn?.addEventListener('click', () => this.clearChat());
  }

  async loadModel() {
    if (!this.options.modelId) {
      this.updateStatus('Please select a model first');
      return;
    }

    this.isLoading = true;
    this.updateStatus('Loading model...');
    this.disableInput(true);

    try {
      const { MLCEngine } = await import('@mlc-ai/webllm');
      
      const engineConfig = {
        initProgressCallback: (progress) => {
          console.log(`Model loading: ${(progress.progress * 100).toFixed(1)}%`);
          this.updateStatus(`Loading: ${(progress.progress * 100).toFixed(1)}%`);
        }
      };

      this.engine = new MLCEngine(this.options.modelId, engineConfig);
      await this.engine.generate(
        'Hello',
        (message) => { /* Warm-up */ },
        { max_tokens: 1 }
      );

      this.isInitialized = true;
      this.isLoading = false;
      this.disableInput(false);
      
      const modelInfo = this.availableModels[this.options.modelId];
      this.updateStatus(`Ready - ${modelInfo.name} loaded`);
      this.addSystemMessage(`${modelInfo.name} loaded successfully. ${modelInfo.note}`);
      
    } catch (error) {
      this.isLoading = false;
      this.disableInput(false);
      this.updateStatus(`Error loading model: ${error.message}`);
      console.error('Model loading error:', error);
    }
  }

  async sendMessage() {
    if (!this.isInitialized || this.isLoading) return;

    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (!message) return;

    this.addMessage('user', message);
    userInput.value = '';
    this.isLoading = true;
    this.disableInput(true);
    this.updateStatus('Thinking...');

    try {
      // Build conversation context
      const conversationContext = this.buildContext();
      
      let assistantResponse = '';
      await this.engine.generate(
        conversationContext + message,
        (chunk) => {
          assistantResponse += chunk;
          this.updateLastMessage('assistant', assistantResponse);
        },
        {
          max_tokens: this.options.maxTokens,
          temperature: this.options.temperature
        }
      );

      this.conversationHistory.push({ role: 'user', content: message });
      this.conversationHistory.push({ role: 'assistant', content: assistantResponse });

      // Keep history manageable
      if (this.conversationHistory.length > this.maxHistoryLength) {
        this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
      }

    } catch (error) {
      this.addMessage('error', `Error: ${error.message}`);
      console.error('Generation error:', error);
    } finally {
      this.isLoading = false;
      this.disableInput(false);
      this.updateStatus('Ready');
    }
  }

  buildContext() {
    // Simple context building from recent history
    return this.conversationHistory
      .slice(-4) // Last 4 messages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n') + '\nAssistant: ';
  }

  addMessage(role, content) {
    const messagesContainer = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${role}`;
    messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;
    
    if (role === 'assistant') {
      messageDiv.id = `msg-${Date.now()}`;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  updateLastMessage(role, content) {
    const lastMessage = document.querySelector('.message-assistant:last-of-type .message-content');
    if (lastMessage) {
      lastMessage.innerHTML = this.escapeHtml(content);
    } else {
      this.addMessage(role, content);
    }
  }

  addSystemMessage(content) {
    const messagesContainer = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message-system';
    messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  updateStatus(text) {
    const status = document.getElementById('status');
    if (status) status.textContent = text;
  }

  disableInput(disabled) {
    document.getElementById('user-input').disabled = disabled;
    document.getElementById('send-btn').disabled = disabled;
  }

  clearChat() {
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = '';
    this.conversationHistory = [];
    this.updateStatus('Chat cleared');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getModelInfo(modelId) {
    return this.availableModels[modelId] || null;
  }

  getAvailableModels() {
    return this.availableModels;
  }

  setTemperature(temperature) {
    this.options.temperature = Math.max(0, Math.min(2, temperature));
  }

  setMaxTokens(maxTokens) {
    this.options.maxTokens = Math.max(1, Math.min(1024, maxTokens));
  }
}

// CSS Styles (include in your stylesheet or dynamically)
const styles = `
  .ai-chatbot-widget {
    display: flex;
    flex-direction: column;
    height: 600px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .chatbot-header {
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    background: #f5f5f5;
    border-radius: 8px 8px 0 0;
  }

  .chatbot-header h3 {
    margin: 0 0 12px 0;
    font-size: 18px;
  }

  .header-controls {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .model-selector {
    flex: 1;
    min-width: 200px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }

  .btn-primary {
    background: #007bff;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #0056b3;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #5a6268;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .message {
    display: flex;
    margin-bottom: 8px;
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .message-user {
    justify-content: flex-end;
  }

  .message-user .message-content {
    background: #007bff;
    color: white;
  }

  .message-assistant .message-content {
    background: #e9ecef;
    color: #333;
  }

  .message-system .message-content {
    background: #fff3cd;
    color: #856404;
    border-left: 3px solid #ffc107;
  }

  .message-error .message-content {
    background: #f8d7da;
    color: #721c24;
    border-left: 3px solid #dc3545;
  }

  .message-content {
    padding: 10px 14px;
    border-radius: 6px;
    max-width: 70%;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .chatbot-status {
    padding: 8px 16px;
    font-size: 12px;
    color: #666;
    border-bottom: 1px solid #e0e0e0;
    background: #fafafa;
  }

  .chatbot-input-area {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid #e0e0e0;
  }

  .user-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
  }

  .user-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  .user-input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  .btn-send {
    background: #28a745;
    color: white;
    padding: 10px 20px;
  }

  .btn-send:hover:not(:disabled) {
    background: #218838;
  }

  .theme-dark {
    background: #2d2d2d;
    color: #e0e0e0;
    border-color: #444;
  }

  .theme-dark .chatbot-header {
    background: #1e1e1e;
    border-bottom-color: #444;
  }

  .theme-dark .chatbot-messages {
    background: #2d2d2d;
  }

  .theme-dark .message-assistant .message-content {
    background: #404040;
    color: #e0e0e0;
  }

  .theme-dark .user-input {
    background: #404040;
    color: #e0e0e0;
    border-color: #555;
  }
`;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIChatbotWidget;
}
