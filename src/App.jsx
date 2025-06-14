import { createSignal, onMount } from 'solid-js'
import ChatInterface from './components/ChatInterface'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [theme, setTheme] = createSignal(
    localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )

  onMount(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
    
    applyTheme(theme())
  })

  const toggleTheme = () => {
    const newTheme = theme() === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header class="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-10 transition-colors duration-200">
        <div class="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
            <span class="text-primary-500">AI</span>Chat
          </h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>
      <main class="pt-16 pb-8 h-screen flex flex-col justify-center items-center">
        <ChatInterface />
      </main>
    </div>
  )
}

export default App