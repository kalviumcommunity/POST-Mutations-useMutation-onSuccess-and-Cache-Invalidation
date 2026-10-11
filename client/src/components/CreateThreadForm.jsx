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
      queryClient.invalidateQueries({
        queryKey: ["threads"],
      });

      setTitle("");
      setBody("");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    mutation.mutate({ title, body });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Thread</h2>

      <input
        type="text"
        placeholder="Thread title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder="Thread body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting…" : "Post Thread"}
      </button>

      {mutation.isError && (
        <p role="alert">
          Failed to create thread: {mutation.error.message}
        </p>
      )}
    </form>
  );
}

export default CreateThreadForm;
