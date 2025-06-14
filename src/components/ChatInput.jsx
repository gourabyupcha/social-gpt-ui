import { createSignal } from 'solid-js'
import { Loader } from './Loaders'

const ChatInput = (props) => {

  const [loading, setLoading] = createSignal(false)
  const [prompt, setPrompt] = createSignal('')
  const [loaderStatus, setLoaderStatus] = createSignal('thinking')


  const handleSubmit = async (e) => {
    if (prompt() === '') {
      return
    }

    setLoading(true)
    props.setResponse(null)
    setLoaderStatus('thinking')
    try {
      const res = await fetch("https://twitterclone-server-2xz2.onrender.com/process-prompt", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(
          {
            prompt: prompt()
          }
        )
      })
      const data = await res.json()
      let response = {}
      if (res.status === 200) {
        await new Promise((res) => setTimeout(res, 2000)); // Thinking...
        setLoaderStatus("preparing");
        await new Promise((res) => setTimeout(res, 1500)); // Preparing...
        setLoaderStatus("done");
        response = {
          status: true,
          prompt: prompt(),
          data: data
        }
        setPrompt('')
        props.setResponse(response)
      } else {
        response = {
          status: false,
        }
        setLoaderStatus("failed");
        props.setResponse(response)
      }
    } catch (er) {
      console.log(er)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} class="relative">
      <Show when={!loading()}>
        <div class="relative rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
          <textarea
            value={prompt()}
            onInput={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
            class="w-full resize-none rounded-xl border-0 bg-transparent py-3 pr-12 pl-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0 focus-visible:outline-none transition-colors duration-200"
            rows={1}
            style={{
              "min-height": "56px",
              "max-height": "200px",
              "height": "auto"
            }}
          />
          <button
            type="submit"
            class="absolute right-2 bottom-2.5 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors duration-200"
            disabled={!prompt().trim()}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-primary-600">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </Show>
      <Show when={loading()}>
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 p-4 flex gap-2 items-center">
          <Loader status={loaderStatus()} />
        </div>
      </Show>
      <p class="mt-2 text-xs text-center text-gray-400 dark:text-gray-500">
        AI responses are simulated for demonstration purposes
      </p>
    </form>
  )
}

export default ChatInput