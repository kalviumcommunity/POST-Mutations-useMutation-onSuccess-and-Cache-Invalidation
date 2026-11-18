// Already wired for you. You do NOT need to edit this.
// getThreads reads the list; createThread performs the POST — use it as your mutationFn.
import apiClient from "./apiClient";

export async function getThreads() {
  const response = await apiClient.get("/api/threads");
  return response.data;
}

export async function createThread(newThread) {
  // const newThread = { title, body }
  // newThread = { title, body }
  const response = await apiClient.post("/api/threads", newThread);
  return response.data;
}
