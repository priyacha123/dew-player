export function convertSRTtoVTT(srtContent: string): string {
  // Add WebVTT header
  let vttContent = "WEBVTT\n\n";

  // Split into lines and remove empty ones
  const lines = srtContent.split("\n").filter((line) => line.trim() !== "");

  let i = 0;
  while (i < lines.length) {
    // Skip subtitle number
    if (!isNaN(Number(lines[i]))) {
      i++;
      continue;
    }

    // Process timestamp line
    const timestampLine = lines[i];
    if (timestampLine.includes("-->")) {
      // Convert timestamps from SRT to VTT format (replace ',' with '.')
      const vttTimestamp = timestampLine.replace(/,/g, ".");
      vttContent += vttTimestamp + "\n";
      i++;

      // Process subtitle text
      let subtitleText = "";
      while (i < lines.length && !isNaN(Number(lines[i])) && lines[i].trim() !== "") {
        subtitleText += lines[i] + "\n";
        i++;
      }
      vttContent += subtitleText + "\n";
    } else {
      i++;
    }
  }

  return vttContent;
}
