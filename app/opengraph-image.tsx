import { ImageResponse } from "next/og";

export const alt = "PostPixel: social media on autopilot for home service pros";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const px = (x: number, y: number) => (
  <div style={{ position: "absolute", left: x * 28, top: y * 28, width: 28, height: 28, background: "#CCFC7D" }} />
);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "white",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 84, height: 84 }}>
          {px(0, 0)}
          {px(2, 0)}
          {px(1, 1)}
          {px(0, 2)}
          {px(2, 2)}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Social media on autopilot for home service pros.
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#CCFC7D", fontWeight: 700 }}>postpixel.ai</div>
        </div>
      </div>
    ),
    size,
  );
}
