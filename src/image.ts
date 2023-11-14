import path from "path";
import fs from "fs";

export function makeImage(children: { type: string; props: any }[]) {
  return {
    type: "div",
    props: {
      style: {
        background: "linear-gradient(135deg, #f5d0fe 0%, #fefafe 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children,
    },
  };
}

export function logoForImage() {
  return {
    type: "img",
    props: {
      src: "https://violinfingerpatterns.com/favicon.svg",
      width: 288,
      height: 288,
    },
  };
}

export function mainImageTitle(text: string) {
  return {
    type: "div",
    props: {
      style: {
        fontSize: 80,
        display: "flex",
        color: "#1f2937",
        paddingTop: 32,
      },
      children: [text],
    },
  };
}

export function imageSiteUrl(paddingTop: number) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#c026d3",
        fontSize: 32,
        paddingTop,
        marginBottom: -48,
      },
      children: ["violinfingerpatterns.com"],
    },
  };
}

export function imageFont(): {
  name: string;
  data: Buffer;
  style: "normal" | "italic";
} {
  const fontData = fs.readFileSync(
    path.resolve("./public/fonts/LibreBaskerville-Bold.ttf"),
  );
  return {
    name: "Libre Baskerville",
    data: fontData,
    style: "normal",
  };
}

export function imageSubtitle(text: string) {
  return {
    type: "div",
    props: {
      style: {
        fontSize: 48,
        display: "flex",
        color: "#6b7280",
        paddingTop: 16,
      },
      children: [text],
    },
  };
}
