import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../lib/i18n';
import { AIAssistant, knowledgeBase } from '../../lib/knowledge-base';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { MessageCircle, X, Send, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: Array<{ text: string; path?: string }>;
  actions?: Array<{ label: string; action: string }>;
}

export default function AIAssistantWidget() {
  const { locale, t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const assistantRef = useRef(new AIAssistant(locale));

  // تحديث لغة المساعد عند تغيير اللغة
  useEffect(() => {
    assistantRef.current = new AIAssistant(locale);
  }, [locale]);

  // التمرير التلقائي للأسفل
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // رسالة الترحيب الأولية
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessages = knowledgeBase.greetings.welcome[locale];
      const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      
      setTimeout(() => {
        addAssistantMessage(randomWelcome, [
          { 
            text: locale === 'ar' ? 'كيف أضيف قيد محاسبي؟' : 'How to add journal entry?',
            path: '/accounting/journal-entries'
          },
          { 
            text: locale === 'ar' ? 'كيف أحسب مكافأة نهاية الخدمة؟' : 'How to calculate end of service?',
            path: '/hr/end-of-service'
          },
          { 
            text: locale === 'ar' ? 'ما هي أنواع الشركات في العراق؟' : 'What are company types in Iraq?'
          }
        ]);
      }, 500);
    }
  }, [isOpen, locale]);

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addAssistantMessage = (
    content: string, 
    suggestions?: Array<{ text: string; path?: string }>,
    actions?: Array<{ label: string; action: string }>
  ) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content,
      timestamp: new Date(),
      suggestions,
      actions
    };
    setMessages(prev => [...prev, message]);
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userQuery = inputValue.trim();
    setInputValue('');
    addUserMessage(userQuery);
    setIsTyping(true);

    // محاكاة وقت التفكير
    setTimeout(() => {
      const response = assistantRef.current.respond(userQuery);
      addAssistantMessage(response.response, response.suggestions, response.actions);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: { text: string; path?: string }) => {
    if (suggestion.path) {
      navigate(suggestion.path);
      setIsOpen(false);
    } else {
      setInputValue(suggestion.text);
    }
  };

  const handleActionClick = (action: string) => {
    navigate(action);
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* زر فتح المساعد */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-4 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group"
          aria-label={locale === 'ar' ? 'فتح المساعد الذكي' : 'Open AI Assistant'}
        >
          <div className="relative">
            <Sparkles className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {locale === 'ar' ? '💬 المساعد الذكي' : '💬 AI Assistant'}
          </div>
        </button>
      )}

      {/* نافذة المحادثة */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* الترويسة */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-purple-600" />
              </div>
              <div>
                <div className="font-bold text-lg">
                  {locale === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
                </div>
                <div className="text-xs text-white/80">
                  {locale === 'ar' ? '🟢 متصل - جاهز للمساعدة' : '🟢 Online - Ready to help'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/knowledge-base')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title={locale === 'ar' ? 'مكتبة المعرفة' : 'Knowledge Base'}
              >
                <BookOpen className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* منطقة الرسائل */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                  
                  {/* الاقتراحات */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-2 text-sm bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-lg transition-colors border border-purple-200 dark:border-purple-800 group"
                        >
                          <span className="flex items-center justify-between">
                            <span>{suggestion.text}</span>
                            {suggestion.path && (
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* الإجراءات */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(action.action)}
                          className="block w-full text-center px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all font-medium"
                        >
                          {action.label} →
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* مؤشر الكتابة */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* منطقة الإدخال */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={locale === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question...'}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
              {locale === 'ar' 
                ? 'يدعم اللغة العربية الفصحى والعامية 🇮🇶' 
                : 'Supports both formal and colloquial Arabic 🇮🇶'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
