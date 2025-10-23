export function deadlineHasPassed(deadline) {
  return new Date(deadline).setHours(23, 59, 59) < new Date().getTime();
}
