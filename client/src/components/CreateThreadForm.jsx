
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Access the React Query cache
  const queryClient = useQueryClient();

  // Create mutation
  const mutation = useMutation({
    mutationFn: createThread,

    onSuccess: () => {
      // Refresh the threads list
      queryClient.invalidateQueries({ queryKey: ["threads"] });

      // Reset form fields
      setTitle("");
      setBody("");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    // Submit the thread
    mutation.mutate({ title, body });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind?"
      />

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting…" : "Post thread"}
      </button>

      {mutation.isError && (
        <p className="err">
          {mutation.error?.message || "Failed to create thread"}
        </p>
      )}
    </form>
  );
}
