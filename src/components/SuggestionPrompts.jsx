import { createSignal, For } from 'solid-js'

const SuggestionPrompts = ({ onSuggestionClick }) => {
  const [suggestions] = createSignal([
    "Explain quantum computing in simple terms",
    "Write a short story about a robot discovering emotions",
    "What are the best practices for learning a new language?",
    "Give me ideas for a healthy breakfast",
    "How does climate change affect biodiversity?"
  ])
  
  return (
    <div class="py-6 animate-fade-in">
      <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Try asking about:</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <For each={suggestions()}>
          {(suggestion) => (
            <button
              onClick={() => onSuggestionClick(suggestion)}
              class="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              {suggestion}
            </button>
          )}
        </For>
      </div>
    </div>
  )
}

export default SuggestionPrompts