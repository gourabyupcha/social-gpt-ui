import { createSignal, createEffect, onCleanup } from 'solid-js';


export const Loader = (props) => {
  const [message, setMessage] = createSignal("Thinking");

  createEffect(() => {
    const status = props.status;

    if (status === "thinking") {
      setMessage("Thinking");
    }

    if (status === "failed") {
      setMessage("Failed");
    }

    if (status === "preparing") {
      setMessage("Preparing");
      const timeout = setTimeout(() => {
        setMessage("Posting");
      }, 2000);
      onCleanup(() => clearTimeout(timeout));
    }

    if (status === "done") {
      setMessage("Finalizing");
    }
  });

  return (
    <div class="flex items-center justify-center ">
      <div class="text-sm font-medium text-gray-400 animate-pulse">
        {message()}
      </div>
    </div>
  );
};

