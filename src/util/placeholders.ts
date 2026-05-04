import type { KernelEnum } from "sharp";
import sharp from "sharp";

/** Create a placeholder for an image to display while loading */
export async function generatePlaceholderUrl(
  image: string,
  kernel?: keyof KernelEnum,
) {
  const image_meta = await sharp(image).metadata();
  const resize_scale =
    image_meta.width >= image_meta.height ? { width: 42 } : { height: 42 };

  const resized_image_buffer = await sharp(image)
    .resize({
      ...resize_scale,
      kernel: kernel || "nearest",
    })
    .toBuffer();

  return `data:image/${image_meta.format};base64,${resized_image_buffer.toString("base64")}`;
}
