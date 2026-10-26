function timeToStringParts(milliseconds) {
  let totalSeconds = Math.ceil(milliseconds / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
return {
    minutes: String(minutes),
    seconds: String(seconds).padStart(2, "0")
  };
}
