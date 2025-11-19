/**
 * Converts image data to grayscale
 */
export function toGrayscale(imageData: ImageData): ImageData {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  return imageData;
}

/**
 * Applies Floyd-Steinberg dithering to image data
 */
export function floydSteinbergDither(imageData: ImageData): ImageData {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const oldPixel = data[i]; // Assuming grayscale
      const newPixel = oldPixel < 128 ? 0 : 255;
      const quantError = oldPixel - newPixel;

      data[i] = newPixel;
      data[i + 1] = newPixel;
      data[i + 2] = newPixel;

      if (x + 1 < width) {
        data[i + 4] += (quantError * 7) / 16;
      }
      if (x - 1 >= 0 && y + 1 < height) {
        data[i + width * 4 - 4] += (quantError * 3) / 16;
      }
      if (y + 1 < height) {
        data[i + width * 4] += (quantError * 5) / 16;
      }
      if (x + 1 < width && y + 1 < height) {
        data[i + width * 4 + 4] += (quantError * 1) / 16;
      }
    }
  }
  return imageData;
}



/**
 * Process an image source to return a dithered data URL
 */
export async function processImage(
  src: string,
  width: number,
  height: number
): Promise<string> {
  try {
    const response = await fetch(src, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`Failed to load image: ${response.status} ${response.statusText}`);
    }
    const blob = await response.blob();
    const imgBitmap = await createImageBitmap(blob);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    // Draw image
    ctx.drawImage(imgBitmap, 0, 0, width, height);

    // Get image data
    let imageData = ctx.getImageData(0, 0, width, height);

    // Process
    imageData = toGrayscale(imageData);
    imageData = floydSteinbergDither(imageData);

    // Put back
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
