// ─────────────────────────────────────────────────────────────
// TODO: Wire this form to a mutation.
//
// Right now handleSubmit only logs to the console — the thread is never posted,
// and the list never updates.
//
// Requirements (the auto-grader checks these):
//   • import { useMutation, useQueryClient } from "@tanstack/react-query"
//   • const queryClient = useQueryClient();
//   • const mutation = useMutation({
//       mutationFn: createThread,            // pass the reference, not
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["threads"] });  // refetch the list
//         setTitle(""); setBody("");                                 // reset the form
//       },
//     });
//   • In handleSubmit, call: mutation.mutate({ title, body })
//   • Disable the submit button while mutation.isPending is true (label it "Posting…").
//   • Render an inline error message when mutation.isError is true
//       (try submitting with an empty title — the server returns 400).
//
// Verify in DevTools → Network: a POST /api/threads (201) is followed immediately
// by a GET /api/threads refetch, and the new thread appears at the top with no reload.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // TODO: Get the query client to manage cached queries.
  const queryClient = useQueryClient();

  // TODO: Create a mutation to post a new thread.
  const mutation = useMutation({
    mutationFn: createThread,

    // TODO: Refresh the threads list and reset the form after success.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      setTitle("");
      setBody("");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: Submit the form data using the mutation.
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

      {/* TODO: Disable the button while the mutation is pending. */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting…" : "Post thread"}
      </button>

      {/* TODO: Display an error message if posting fails. */}
      {mutation.isError && (
        <p className="err">
          {mutation.error?.message || "Failed to post thread. Please try again."}
        </p>
      )}
    </form>
  );
}