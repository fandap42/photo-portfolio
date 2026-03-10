import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "10px",
          color: "#0d0d14",
          fontFamily: '"PT Serif", Georgia, serif',
          fontSize: 55,
          fontWeight: 700,
          lineHeight: 0.92,
          textShadow: "0.6px 0 0 currentColor, -0.6px 0 0 currentColor",
        }}
      >
        f
      </div>
    ),
    {
      ...size,
    },
  );
}
