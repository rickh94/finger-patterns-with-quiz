import { ImageResponse } from "@vercel/og";
import {
  imageFont,
  imageSiteUrl,
  imageSubtitle,
  logoForImage,
  mainImageTitle,
  makeImage,
} from "~/image";

import scales from "~/scales";

export function getStaticPaths() {
  return scales.map((scale) => ({
    params: { key: scale.key, mode: scale.mode },
  }));
}

export const config = {
  runtime: "edge",
};

export async function GET({
  params,
}: {
  params: { key: string; mode: string };
}) {
  try {
    const { mode, key } = params;
    const thisScale = scales.find(
      (scale) => scale.key === key && scale.mode === mode,
    );
    if (!thisScale || !thisScale.notes || !thisScale.key) {
      return new Response("Could not find this scale", {
        status: 404,
      });
    }
    return new ImageResponse(
      makeImage([
        logoForImage(),
        mainImageTitle(`${thisScale.name} Scale`),
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
