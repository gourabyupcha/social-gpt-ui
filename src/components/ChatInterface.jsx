import { createSignal, createEffect, For, onMount } from 'solid-js'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import SuggestionPrompts from './SuggestionPrompts'
import { generateAIResponse } from '../utils/aiUtils'


const data = {
  status: true,
  data: {
    "sql_query": "(SELECT text FROM tweets WHERE text LIKE '%Fifa%' ORDER BY timestamp DESC LIMIT 5);",
    "data": [],
    "generated_post": "\"Who's ready for a FIFA tournament? Let's set up a league and show off our skills! Who's in? #FIFA #Gaming #TournamentTime\"",
    "post_result": {
      "status": "success",
      "data": {
        "message": "Tweet posted",
        "tweet_id": 3233852014
      }
    }
  }
}

const ChatInterface = () => {
  const [messages, setMessages] = createSignal([])
  const [isTyping, setIsTyping] = createSignal(false)
  const [showSuggestions, setShowSuggestions] = createSignal(true)
  const [response, setResponse] = createSignal(null)
  const messagesEndRef = { current: null }

  // Scroll to bottom when messages change
  createEffect(() => {
    if (messages().length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  })

  onMount(() => {
    // Set a reference to the messages end div for scrolling
    messagesEndRef.current = document.getElementById('messages-end')
  })

  const handleSendMessage = async (prompt) => {
    if (!prompt.trim()) return

    // Add user message
    setMessages([...messages(), { id: Date.now(), role: 'user', content: prompt }])

    // Hide suggestions when user sends a message
    setShowSuggestions(false)

    // Simulate AI typing
    setIsTyping(true)

    // Simulate API call delay
    setTimeout(async () => {
      const response = await generateAIResponse(prompt)
      setIsTyping(false)

      // Add AI response
      setMessages([...messages(), { id: Date.now(), role: 'assistant', content: response }])
    }, 1500)
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion)
  }

  return (
    <div class="max-w-4xl w-full px-4 flex flex-col">
      <div class="flex-grow overflow-y-auto py-4 space-y-6">
        {messages().length === 0 && !isTyping() ? (
          <div class="flex flex-col items-center justify-center h-[60vh] text-center">
            <div class="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg\" class="h-8 w-8 text-primary-500\" fill="none\" viewBox="0 0 24 24\" stroke="currentColor">
                <path stroke-linecap="round\" stroke-linejoin="round\" stroke-width="2\" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-2">How can I help you today?</h2>
            <p class="text-gray-500 dark:text-gray-400 max-w-md">
              Ask me anything or try one of the suggestions below to get started.
            </p>
          </div>
        ) : (
          <>
            <For each={messages()}>
              {(message) => <ChatMessage message={message} />}
            </For>
            {isTyping() && (
              <div class="flex animate-fade-in">
                <div class="flex-none w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.25m0 0v.428l-4.5 1.96m0 0a31.36 31.36 0 01-2.25.544m0 0V5.104m0 0c.251.023.501.05.75.082"></path>
                  </svg>
                </div>
                <div class="flex-grow bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div class="flex space-x-2">
                    <div class="typing-dot w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                    <div class="typing-dot w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                    <div class="typing-dot w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                  </div>
                </div>
              </div>
            )}
            <div id="messages-end" />
          </>
        )}
      </div>

      {/* {showSuggestions() && messages().length === 0 && (
        <SuggestionPrompts onSuggestionClick={handleSuggestionClick} />
      )} */}

      <Show when={response() && response()?.status}>
        <div class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4 border border-gray-200 dark:border-gray-700">
          <div class="flex justify-between">
            <div class="text-green-600 dark:text-green-400 font-semibold text-sm">
              ✅{response()?.data.post_result.data.message}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              🆔 <span class="font-medium">Tweet ID:</span> {response()?.data.post_result.data.tweet_id}
            </div>
          </div>

          <div class="text-gray-900 dark:text-white text-base whitespace-pre-line flex gap-2">
            <p class='text-lg'>Prompt:</p>{response()?.prompt}
          </div>

          <div class="text-gray-900 dark:text-white text-base whitespace-pre-line flex gap-2">
            Post: {response()?.data.generated_post}
          </div>
        </div>
      </Show>

      <Show when={response() && !response()?.status}>
        <div class="max-w-xl mx-auto bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-200 dark:border-red-700 rounded-xl shadow-sm p-4 flex items-start space-x-3">
          <svg class="w-5 h-5 mt-0.5 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-1.414 1.414M5.636 18.364l1.414-1.414M6.343 6.343l1.414 1.414M17.657 17.657l-1.414-1.414M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-sm font-medium">
            <strong>Error:</strong> Something went wrong. Please try again.
          </div>
        </div>
      </Show>

      <div class="sticky bottom-0 bg-gray-50 dark:bg-gray-900 pt-2 pb-4 transition-colors duration-200">
        <ChatInput onSendMessage={handleSendMessage} setResponse={setResponse} />
      </div>
    </div>
  )
}

export default ChatInterface