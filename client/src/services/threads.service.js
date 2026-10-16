
import apiClient from "./apiClient";

export function getThreads() {
  return apiClient
    .get("/api/threads")
    .then((response) => response.data);
}

export function createThread(newThread) {
  return apiClient
    .post("/api/threads", newThread)
    .then((response) => response.data);
}
