import React, { useState } from 'react';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful AI assistant for kids. Explain things simply.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });
    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || 'Sorry, I could not answer that.';
    setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <div style={{ minHeight: 200, background: '#f8fafd', borderRadius: 12, padding: 16, marginBottom: 16 }}>
        {messages.filter(m => m.role !== 'system').map((msg, idx) => (
          <div key={idx} style={{ margin: '8px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <b>{msg.role === 'user' ? 'You' : 'AI'}:</b> {msg.content}
          </div>
        ))}
        {loading && <div>AI is thinking...</div>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
          placeholder="Ask me anything!"
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
      </div>
    </div>
  );
};

export default ChatAssistant; 