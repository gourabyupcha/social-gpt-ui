import { createEffect, createSignal } from 'solid-js'

const ChatMessage = ({ message }) => {
  const [animate, setAnimate] = createSignal(false)

  createEffect(() => {
    // Add a small delay to trigger animation after component is rendered
    setTimeout(() => setAnimate(true), 50)
  })

  return (
    <div 
      class={`flex ${animate() ? 'animate-slide-up' : 'opacity-0'} transition-opacity duration-300`}
    >
      {message.role === 'user' ? (
        <>
          <div class="flex-none w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg\" class="h-5 w-5 text-gray-600 dark:text-gray-300\" fill="none\" viewBox="0 0 24 24\" stroke="currentColor">
              <path stroke-linecap="round\" stroke-linejoin="round\" stroke-width="2\" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-grow bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4 shadow-sm">
            <p class="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </>
      ) : (
        <>
          <div class="flex-none w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.25m0 0v.428l-4.5 1.96m0 0a31.36 31.36 0 01-2.25.544m0 0V5.104m0 0c.251.023.501.05.75.082"></path>
            </svg>
          </div>
          <div class="flex-grow bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p class="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatMessage