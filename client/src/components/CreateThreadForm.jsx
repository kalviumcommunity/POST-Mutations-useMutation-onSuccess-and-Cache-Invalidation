
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createThread,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
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
      <div>
        <label htmlFor="thread-title">Title</label>
        <input
          id="thread-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter thread title"
          required
        />
      </div>

      <div>
        <label htmlFor="thread-body">Body</label>
        <textarea
          id="thread-body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Write your thread..."
          required
        />
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting..." : "Post thread"}
      </button>

      {mutation.isError && (
        <p role="alert" className="err">
          {mutation.error?.response?.data?.message ||
            mutation.error?.message ||
            "Failed to create thread. Please try again."}
        </p>
      )}
    </form>
  );
}

export default CreateThreadForm;
