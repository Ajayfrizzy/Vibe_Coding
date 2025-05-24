import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const Messages: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Mock data for conversations
  const conversations = [
    {
      id: '1',
      name: 'John Smith',
      avatar: null,
      lastMessage: `I'm interested in your corn harvest.`,
      time: '2 min ago',
      unread: 2,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      lastMessage: 'When will the wheat be ready?',
      time: '1 hour ago',
      unread: 0,
    },
    {
      id: '3',
      name: 'Mike Wilson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      lastMessage: "Price looks good, let's discuss delivery.",
      time: 'Yesterday',
      unread: 1,
    },
  ];

  // Mock messages for the selected conversation
  const messages = [
    {
      id: 1,
      senderId: '1',
      content: "Hi, I saw your listing for corn. What's the current price?",
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      senderId: user?.id,
      content: 'Hello! The price is $225 per ton. How much are you looking to buy?',
      timestamp: '10:32 AM',
    },
    {
      id: 3,
      senderId: '1',
      content: "I'm interested in purchasing 50 tons. Is that available?",
      timestamp: '10:35 AM',
    },
    {
      id: 4,
      senderId: user?.id,
      content: 'Yes, that quantity is available. When would you need delivery?',
      timestamp: '10:36 AM',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-73px)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === conversation.id ? 'bg-primary-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                      {conversation.avatar ? (
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium text-primary-700">
                          {conversation.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.name}
                      </p>
                      <p className="text-xs text-gray-500">{conversation.time}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-500 text-white text-xs">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-lg font-medium text-primary-700">
                    {conversations.find(c => c.id === selectedChat)?.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {conversations.find(c => c.id === selectedChat)?.name}
                  </h2>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      msg.senderId === user?.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === user?.id ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!message.trim()}
                  leftIcon={<Send size={16} />}
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;