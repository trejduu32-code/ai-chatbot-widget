# AI Chatbot Widget

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

A powerful, customizable, and easy-to-integrate AI chatbot widget for your web applications. Leverage cutting-edge AI technology to provide intelligent conversational experiences to your users.

---

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Usage Examples](#usage-examples)
- [Styling & Customization](#styling--customization)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## ✨ Features

### Core Features
- **🤖 AI-Powered Conversations**: Integrated with advanced language models for intelligent responses
- **💬 Real-Time Messaging**: Instant message delivery with WebSocket support
- **🎨 Fully Customizable**: Extensive styling and configuration options
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🔒 Security**: Built-in encryption and secure API communication
- **⚡ Lightweight**: Minimal bundle size (~50KB gzipped)
- **🌍 Multi-Language Support**: Support for 20+ languages
- **📊 Analytics Integration**: Track user interactions and conversation metrics
- **🔧 Developer Friendly**: Simple API with comprehensive documentation
- **♿ Accessibility**: WCAG 2.1 AA compliant

### Advanced Features
- **🧠 Memory Management**: Contextual conversation history
- **🎯 Intent Recognition**: Intelligent user intent detection
- **🔄 Conversation Threading**: Organized multi-topic conversations
- **📝 Markdown Support**: Rich text formatting in responses
- **🎤 Voice Input/Output**: Speech recognition and synthesis (optional)
- **👥 Multi-Agent Support**: Multiple bot personalities
- **⏱️ Typing Indicators**: Real-time typing feedback
- **📎 File Attachment**: Document and image sharing
- **🌐 Cross-Origin Support**: CORS-enabled for easy integration
- **📦 Multiple Export Formats**: Download conversations as JSON, PDF, or CSV

---

## 🎯 Demo

Check out the live demo at: [https://ai-chatbot-widget-demo.example.com](https://ai-chatbot-widget-demo.example.com)

Or see examples in the `/examples` directory.

---

## 📦 Installation

### Via npm

```bash
npm install ai-chatbot-widget
```

### Via yarn

```bash
yarn add ai-chatbot-widget
```

### Via CDN

```html
<script src="https://cdn.example.com/ai-chatbot-widget@1.0.0/dist/index.js"></script>
<link rel="stylesheet" href="https://cdn.example.com/ai-chatbot-widget@1.0.0/dist/styles.css">
```

### Clone from Repository

```bash
git clone https://github.com/trejduu32-code/ai-chatbot-widget.git
cd ai-chatbot-widget
npm install
npm run build
```

---

## 🚀 Quick Start

### Basic Implementation

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Chatbot Widget Demo</title>
    <link rel="stylesheet" href="https://cdn.example.com/ai-chatbot-widget@1.0.0/dist/styles.css">
</head>
<body>
    <!-- Your website content here -->
    
    <!-- Initialize chatbot widget -->
    <script src="https://cdn.example.com/ai-chatbot-widget@1.0.0/dist/index.js"></script>
    <script>
        AIChat.init({
            apiKey: 'your-api-key-here',
            botName: 'Assistant',
            position: 'bottom-right'
        });
    </script>
</body>
</html>
```

#### JavaScript (npm)

```javascript
import AIChat from 'ai-chatbot-widget';
import 'ai-chatbot-widget/dist/styles.css';

AIChat.init({
    apiKey: 'your-api-key-here',
    botName: 'My Chatbot',
    theme: 'light'
});
```

#### React

```javascript
import { AIChatbot } from 'ai-chatbot-widget/react';

function App() {
    return (
        <AIChatbot
            apiKey="your-api-key-here"
            botName="Assistant"
            theme="dark"
            onReady={() => console.log('Chatbot ready!')}
        />
    );
}

export default App;
```

---

## ⚙️ Configuration

### Configuration Options

```javascript
const config = {
    // Required
    apiKey: 'your-api-key',
    
    // Appearance
    botName: 'Assistant',
    botAvatar: 'https://example.com/bot-avatar.png',
    theme: 'light', // 'light', 'dark', or custom object
    position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    width: 380,
    height: 600,
    
    // Behavior
    autoOpen: false,
    openDelay: 0, // milliseconds
    welcomeMessage: 'Hello! How can I help you?',
    placeholder: 'Type your message...',
    language: 'en', // ISO 639-1 code
    
    // Features
    enableTypingIndicator: true,
    enableSoundNotifications: true,
    enableVoiceInput: false,
    enableFileUpload: true,
    maxFileSize: 10, // MB
    
    // Behavior
    messageTimeout: 0, // 0 = no timeout
    retryAttempts: 3,
    retryDelay: 1000, // milliseconds
    
    // Storage
    enableLocalStorage: true,
    persistConversation: true,
    
    // Callbacks
    onReady: () => {},
    onMessage: (message) => {},
    onError: (error) => {},
    onClose: () => {},
    onOpen: () => {},
    
    // Advanced
    apiEndpoint: 'https://api.example.com/v1',
    timeout: 30000, // milliseconds
    headers: {
        'Custom-Header': 'value'
    }
};

AIChat.init(config);
```

### Detailed Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | **required** | Your API key for authentication |
| `botName` | string | 'Assistant' | Display name of the chatbot |
| `botAvatar` | string | default | URL to bot avatar image |
| `theme` | string\|object | 'light' | Theme preset or custom theme object |
| `position` | string | 'bottom-right' | Widget position on screen |
| `width` | number | 380 | Widget width in pixels |
| `height` | number | 600 | Widget height in pixels |
| `autoOpen` | boolean | false | Auto-open widget on page load |
| `openDelay` | number | 0 | Delay before auto-opening (ms) |
| `welcomeMessage` | string | greeting | Initial greeting message |
| `placeholder` | string | 'Type message...' | Input field placeholder text |
| `language` | string | 'en' | Language code for UI text |
| `enableTypingIndicator` | boolean | true | Show typing indicator |
| `enableSoundNotifications` | boolean | true | Play notification sounds |
| `enableVoiceInput` | boolean | false | Enable voice input feature |
| `enableFileUpload` | boolean | true | Allow file uploads |
| `maxFileSize` | number | 10 | Max file size in MB |

---

## 📚 API Reference

### Methods

#### `AIChat.init(config)`
Initialize the chatbot widget with configuration.

```javascript
AIChat.init({
    apiKey: 'your-key',
    botName: 'Bot'
});
```

#### `AIChat.open()`
Open the chatbot widget.

```javascript
AIChat.open();
```

#### `AIChat.close()`
Close the chatbot widget.

```javascript
AIChat.close();
```

#### `AIChat.toggle()`
Toggle the widget open/closed state.

```javascript
AIChat.toggle();
```

#### `AIChat.sendMessage(message)`
Send a message programmatically.

```javascript
AIChat.sendMessage('Hello, how are you?');
```

#### `AIChat.setConfig(config)`
Update configuration at runtime.

```javascript
AIChat.setConfig({
    theme: 'dark',
    botName: 'New Bot Name'
});
```

#### `AIChat.clearHistory()`
Clear conversation history.

```javascript
AIChat.clearHistory();
```

#### `AIChat.exportConversation(format)`
Export conversation in specified format.

```javascript
// Returns Promise<string>
AIChat.exportConversation('json').then(data => {
    console.log(data);
});
```

#### `AIChat.destroy()`
Completely remove the widget.

```javascript
AIChat.destroy();
```

#### `AIChat.on(event, callback)`
Listen to widget events.

```javascript
AIChat.on('message', (message) => {
    console.log('New message:', message);
});
```

#### `AIChat.off(event, callback)`
Unsubscribe from events.

```javascript
AIChat.off('message', messageHandler);
```

### Events

| Event | Data | Description |
|-------|------|-------------|
| `ready` | - | Widget initialized and ready |
| `message` | `{text, sender, timestamp}` | New message received |
| `messageError` | `{error, messageId}` | Error sending/receiving message |
| `open` | - | Widget opened |
| `close` | - | Widget closed |
| `error` | `{error, code}` | General error occurred |
| `typingStart` | - | Bot started typing |
| `typingEnd` | - | Bot finished typing |
| `fileUpload` | `{file, progress}` | File upload event |
| `conversationStarted` | - | New conversation started |
| `conversationEnded` | - | Conversation ended |

---

## 💡 Usage Examples

### Example 1: Basic Chat with Custom Colors

```javascript
AIChat.init({
    apiKey: 'sk_live_abc123',
    botName: 'Customer Support',
    position: 'bottom-right',
    theme: {
        primaryColor: '#FF6B6B',
        secondaryColor: '#4ECDC4',
        textColor: '#333333',
        backgroundColor: '#FFFFFF'
    }
});
```

### Example 2: E-Commerce Integration

```javascript
AIChat.init({
    apiKey: 'your-api-key',
    botName: 'Shop Assistant',
    welcomeMessage: 'Welcome! I can help you find products.',
    onMessage: (message) => {
        // Track user interactions
        analytics.track('chatbot_message', {
            text: message.text,
            timestamp: new Date()
        });
    },
    onReady: () => {
        // Send user context
        AIChat.sendMessage('Show me product recommendations');
    }
});
```

### Example 3: Customer Support Bot

```javascript
AIChat.init({
    apiKey: 'your-api-key',
    botName: 'Support Team',
    theme: 'dark',
    enableVoiceInput: true,
    enableFileUpload: true,
    welcomeMessage: 'Welcome to Support. Please describe your issue.',
    onMessage: (message) => {
        if (message.sender === 'user') {
            // Route to appropriate support team
            routing.queue({
                userId: getCurrentUserId(),
                issue: message.text
            });
        }
    }
});
```

### Example 4: Lead Generation

```javascript
const aiChat = AIChat.init({
    apiKey: 'your-api-key',
    botName: 'Sales Assistant',
    autoOpen: true,
    openDelay: 5000,
    welcomeMessage: 'Interested in our product? Let\'s chat!',
    onReady: () => {
        // Send promotional message
        AIChat.sendMessage('I can help you get started today!');
    }
});

AIChat.on('message', (msg) => {
    if (msg.sender === 'user') {
        // Capture lead information
        leads.capture({
            message: msg.text,
            timestamp: msg.timestamp
        });
    }
});
```

### Example 5: React Integration

```javascript
import React, { useState } from 'react';
import { AIChatbot } from 'ai-chatbot-widget/react';

function ChatbotPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close' : 'Open'} Chat
            </button>
            
            <AIChatbot
                apiKey="your-api-key"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                theme={{
                    primaryColor: '#007AFF',
                    accentColor: '#FF9500'
                }}
                onMessage={(message) => {
                    console.log('User said:', message.text);
                }}
            />
        </div>
    );
}

export default ChatbotPage;
```

### Example 6: Multiple Bots

```javascript
// Sales Bot
AIChat.init({
    apiKey: 'sk_sales_key',
    botName: 'Sales',
    id: 'sales-bot'
});

// Support Bot
AIChat.init({
    apiKey: 'sk_support_key',
    botName: 'Support',
    id: 'support-bot'
});

// Switch between bots
AIChat.setActiveBot('sales-bot');
AIChat.setActiveBot('support-bot');
```

---

## 🎨 Styling & Customization

### Theme Objects

#### Light Theme (Default)
```javascript
AIChat.init({
    theme: 'light' // or 'default'
});
```

#### Dark Theme
```javascript
AIChat.init({
    theme: 'dark'
});
```

#### Custom Theme
```javascript
AIChat.init({
    theme: {
        primaryColor: '#2563EB',
        secondaryColor: '#1E40AF',
        accentColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        borderColor: '#E5E7EB',
        botMessageBg: '#E5E7EB',
        userMessageBg: '#2563EB',
        botMessageText: '#1F2937',
        userMessageText: '#FFFFFF',
        headerBg: '#2563EB',
        headerText: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputText: '#1F2937',
        inputBorder: '#D1D5DB',
        hoverColor: '#F3F4F6',
        borderRadius: '12px',
        fontFamily: 'Segoe UI, Roboto, sans-serif',
        fontSize: '14px'
    }
});
```

### CSS Variables

```css
:root {
    --ai-chat-primary-color: #2563EB;
    --ai-chat-secondary-color: #1E40AF;
    --ai-chat-accent-color: #3B82F6;
    --ai-chat-background-color: #FFFFFF;
    --ai-chat-text-color: #1F2937;
    --ai-chat-border-color: #E5E7EB;
    --ai-chat-border-radius: 12px;
    --ai-chat-font-family: 'Segoe UI', Roboto, sans-serif;
    --ai-chat-font-size: 14px;
    --ai-chat-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    --ai-chat-transition: all 0.3s ease;
}
```

### Custom CSS

```html
<style>
    .ai-chatbot-container {
        /* Your custom styles */
    }
    
    .ai-message {
        /* Bot message styling */
    }
    
    .user-message {
        /* User message styling */
    }
    
    .ai-input-area {
        /* Input area styling */
    }
</style>
```

---

## 🔧 Advanced Features

### Conversation Management

#### Enable Persistent Storage
```javascript
AIChat.init({
    enableLocalStorage: true,
    persistConversation: true
});
```

#### Clear Conversation
```javascript
AIChat.clearHistory();
```

#### Export Conversations
```javascript
// Export as JSON
AIChat.exportConversation('json').then(data => {
    console.log('JSON:', data);
});

// Export as CSV
AIChat.exportConversation('csv').then(data => {
    console.log('CSV:', data);
});

// Export as PDF
AIChat.exportConversation('pdf').then(data => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = 'conversation.pdf';
    link.click();
});
```

### Voice Features

#### Enable Voice Input/Output
```javascript
AIChat.init({
    enableVoiceInput: true,
    voiceLanguage: 'en-US',
    enableVoiceOutput: true
});
```

#### Programmatic Voice Control
```javascript
AIChat.speak('Hello, how can I help?');

AIChat.on('voiceInput', (text) => {
    console.log('User said:', text);
});
```

### File Handling

#### Configure File Upload
```javascript
AIChat.init({
    enableFileUpload: true,
    maxFileSize: 25, // MB
    allowedFileTypes: ['image/*', 'application/pdf', '.doc', '.docx']
});

AIChat.on('fileUpload', (file) => {
    console.log('File uploaded:', file.name, file.size);
});
```

### Custom Actions

#### Register Custom Intents
```javascript
AIChat.registerIntent('schedule_demo', {
    trigger: /schedule.*demo/i,
    response: 'I can help you schedule a demo. What day works best?',
    action: (message) => {
        // Custom handler
        bookingSystem.initiate(message.userId);
    }
});
```

#### Custom Commands
```javascript
AIChat.registerCommand('help', {
    description: 'Show available commands',
    execute: () => {
        const commands = AIChat.getCommands();
        AIChat.sendMessage('Available commands: ' + commands.join(', '));
    }
});
```

### Analytics Integration

#### Track Events
```javascript
AIChat.init({
    onMessage: (message) => {
        // Send to analytics
        gtag('event', 'chatbot_message', {
            message_text: message.text,
            sender: message.sender,
            timestamp: message.timestamp
        });
    }
});

AIChat.on('conversationStarted', () => {
    gtag('event', 'chatbot_conversation_started');
});

AIChat.on('conversationEnded', () => {
    gtag('event', 'chatbot_conversation_ended');
});
```

---

## 🐛 Troubleshooting

### Common Issues

#### Widget Not Appearing
**Problem**: Chatbot widget not showing on page.

**Solutions**:
1. Verify API key is correct
2. Check console for errors: `console.log(AIChat.getStatus())`
3. Ensure CSS is loaded: Check for `ai-chatbot-widget` styles in browser DevTools
4. Clear browser cache and reload

```javascript
// Debug info
console.log(AIChat.getStatus());
// Output: { initialized: true, open: false, connected: true }
```

#### Messages Not Sending
**Problem**: User messages aren't being sent to the bot.

**Solutions**:
1. Check network connectivity
2. Verify API endpoint is accessible
3. Check API key permissions
4. Review CORS settings

```javascript
// Enable debug mode
AIChat.init({
    debug: true,
    onError: (error) => {
        console.error('Chatbot error:', error);
    }
});
```

#### Performance Issues
**Problem**: Widget is slow or laggy.

**Solutions**:
1. Reduce conversation history: `AIChat.clearHistory()`
2. Disable unnecessary features:
   ```javascript
   AIChat.init({
       enableSoundNotifications: false,
       enableTypingIndicator: false
   });
   ```
3. Check browser console for memory leaks
4. Update to latest version: `npm update ai-chatbot-widget`

#### Styling Issues
**Problem**: Custom CSS not applying.

**Solutions**:
1. Use CSS specificity properly
2. Check for conflicting styles
3. Use `!important` if necessary (sparingly)
4. Verify CSS is loaded after widget CSS

```css
/* Make sure this is loaded after widget CSS */
.ai-chatbot-container {
    background-color: #f0f0f0 !important;
}
```

### Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| `AUTH_001` | Invalid API key | Check API key in config |
| `CONN_001` | Connection failed | Check network and API endpoint |
| `MSG_001` | Message send failed | Check message format and size |
| `FILE_001` | File upload failed | Check file size and type |
| `VOICE_001` | Voice feature unavailable | Check browser compatibility |

### Getting Help

1. **Check Documentation**: Review relevant sections above
2. **Enable Debug Mode**: `AIChat.init({debug: true})`
3. **Check Console**: Look for error messages in browser console
4. **Community Issues**: Visit GitHub issues page
5. **Support Email**: support@example.com

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Setup

```bash
git clone https://github.com/trejduu32-code/ai-chatbot-widget.git
cd ai-chatbot-widget
npm install
npm run dev
```

### Project Structure

```
ai-chatbot-widget/
├── src/
│   ├── components/       # React components
│   ├── core/            # Core widget logic
│   ├── api/             # API communication
│   ├── styles/          # CSS files
│   ├── types/           # TypeScript definitions
│   └── index.js         # Main entry point
├── examples/            # Usage examples
├── tests/               # Test files
├── dist/                # Built files
├── docs/                # Documentation
└── package.json
```

### Running Tests

```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Building

```bash
npm run build           # Build production
npm run build:dev       # Build development
npm run lint            # Run linter
npm run format          # Format code
```

### Submitting Changes

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit pull request with clear description

### Code Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Write unit tests for new features
- Update documentation
- Maintain backward compatibility

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

You are free to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute the code
- ✅ Use privately

Under the condition that:
- ⚠️ License and copyright notice must be included

---

## 💬 Support

### Getting Help

- **Documentation**: [Full Docs](https://docs.example.com)
- **API Reference**: [API Docs](https://api-docs.example.com)
- **Examples**: [Code Examples](./examples)
- **Issues**: [GitHub Issues](https://github.com/trejduu32-code/ai-chatbot-widget/issues)
- **Discussions**: [GitHub Discussions](https://github.com/trejduu32-code/ai-chatbot-widget/discussions)

### Contact

- **Email**: support@example.com
- **Twitter**: [@aichatbot](https://twitter.com/aichatbot)
- **Discord**: [Join Server](https://discord.gg/aichatbot)
- **Website**: [https://example.com](https://example.com)

### Social

- ⭐ Star us on [GitHub](https://github.com/trejduu32-code/ai-chatbot-widget)
- 📢 Follow us on [Twitter](https://twitter.com/aichatbot)
- 💼 Connect on [LinkedIn](https://linkedin.com/company/aichatbot)

---

## 📊 Stats

- ![Downloads](https://img.shields.io/npm/dm/ai-chatbot-widget)
- ![Size](https://img.shields.io/bundlephobia/minzip/ai-chatbot-widget)
- ![Test Coverage](https://img.shields.io/codecov/c/github/trejduu32-code/ai-chatbot-widget)

---

## 🎉 Acknowledgments

Thanks to all our contributors and supporters! Special thanks to:
- The open-source community
- Early adopters and beta testers
- Contributors and maintainers

---

## 📝 Changelog

### Version 1.0.0 (2025-12-10)
- Initial release
- Core chatbot functionality
- Multi-theme support
- Voice input/output
- File upload support
- React integration
- Analytics integration

For detailed changelog, see [CHANGELOG.md](CHANGELOG.md)

---

**Last Updated**: 2025-12-10 | **Version**: 1.0.0

For the latest updates, visit: [https://github.com/trejduu32-code/ai-chatbot-widget](https://github.com/trejduu32-code/ai-chatbot-widget)