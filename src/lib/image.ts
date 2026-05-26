/**
 * Compress and crop an image to a standard square avatar size (256x256 px) in the browser
 * using HTML5 Canvas. This outputs a lightweight JPEG Blob (typically 15-40KB) that retains
 * excellent visual quality while remaining well under limits.
 */
export async function compressAvatar(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file.'));
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Clean up memory URL
      URL.revokeObjectURL(img.src);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not create canvas context.'));
      }

      // 256x256 is the perfect sweet spot for avatars (crisp but small)
      const targetSize = 256;
      canvas.width = targetSize;
      canvas.height = targetSize;

      // Crop a centered square from the original image (handles landscape/portrait aspect ratios)
      const minDimension = Math.min(img.width, img.height);
      const sx = (img.width - minDimension) / 2;
      const sy = (img.height - minDimension) / 2;

      // Draw the cropped center square onto the 256x256 canvas
      ctx.drawImage(
        img,
        sx,
        sy,
        minDimension,
        minDimension, // Source square
        0,
        0,
        targetSize,
        targetSize   // Target square
      );

      // Export as JPEG with 0.85 quality (great balance of quality and size, ~20KB-30KB)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate image blob.'));
          }
        },
        'image/jpeg',
        0.85
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image file.'));
    };
  });
}
