import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createThread,

    onSuccess: () => {
      // Refresh the threads list
      queryClient.invalidateQueries({
        queryKey: ["threads"],
      });

      // Reset the form
      setTitle("");
      setBody("");
    },

    onError: (error) => {
      console.error(error.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    mutation.mutate({
      title,
      body,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />

      <button
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Posting..." : "Post thread"}
      </button>

      {mutation.isError && (
        <p className="err">
          {mutation.error.message}
        </p>
      )}
    </form>
  );
}

export default CreateThreadForm;
