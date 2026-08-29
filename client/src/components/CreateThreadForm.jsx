import { useState } from "react";
import { createThread } from "../services/threads.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createThread,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      setTitle("");
      setBody("");
    },

    onError: (error) => {
      console.error(error);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

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
        <p className="err">{mutation.error.message}</p>
      )}
    </form>
  );
}