const deadlineHasPassed = (deadline) =>
  new Date(deadline).setHours(23, 59, 59) < new Date().getTime();

module.exports = {
  deadlineHasPassed
}
