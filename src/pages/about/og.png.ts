import { ImageResponse } from "@vercel/og";
import {
  imageFont,
  imageSiteUrl,
  imageSubtitle,
  logoForImage,
  mainImageTitle,
  makeImage,
} from "~/image";

export const config = {
  runtime: "edge",
};

export async function GET() {
  try {
    return new ImageResponse(
      makeImage([
        logoForImage(),
        mainImageTitle("About Me"),
        imageSubtitle("Violin Finger Patterns"),
        imageSiteUrl(16),
      ]),
      {
        width: 1200,
        height: 630,
        fonts: [imageFont()],
      },
    );
  } catch (e: any) {
    if ("message" in e) {
      console.log(`${e.message}`);
    } else {
      console.log(e);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
