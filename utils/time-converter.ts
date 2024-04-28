export function getTimeLeft(endsAt: string): string {
  const now = new Date().getTime();
  const end = new Date(endsAt).getTime();
  const timeLeft = end - now;

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} left`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} left`;
  } else if (minutes > 0) {
    if (minutes <= 60 && hours === 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} left`;
    }
  } else {
    if (seconds > 0) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} left`;
    }
  }
  return "Auction ended";
}
