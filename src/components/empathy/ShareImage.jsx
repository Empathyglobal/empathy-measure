import React from "react";
import {
  APP_NAME,
  clampScore,
  radarData,
} from "@/components/cookie/cookie";

function token(name) {
  if (typeof window === "undefined") return "hsl(0 0% 0%)";
  const v = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (v) return `hsl(${v})`;
  const fg = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--foreground")
    .trim();
  return fg ? `hsl(${fg})` : "hsl(0 0% 0%)";
}

export default function ShareImage({ report, contextLine, shareLabel }) {
  function download() {
    const size = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const bg = token("--background");
    const fg = token("--foreground");
    const primary = token("--primary");
    const muted = token("--muted-foreground");
    const border = token("--border");

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // App name at top
    ctx.fillStyle = fg;
    ctx.font = "600 44px Manrope, sans-serif";
    ctx.fillText(APP_NAME, size / 2, 110);

    const data = radarData(report);
    const cx = size / 2;
    const cy = size / 2 + 40;
    const R = 290;
    const n = data.length || 7;

    const points = data.map((d, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const r = R * (clampScore(d.score) / 99);
      return {
        x: cx + r * Math.cos(ang),
        y: cy + r * Math.sin(ang),
        label: d.skill,
        ang,
      };
    });

    // Concentric rings
    ctx.strokeStyle = border;
    ctx.lineWidth = 2;
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const ang = -Math.PI / 2 + ((i % n) * 2 * Math.PI) / n;
        const x = cx + ((R * ring) / 4) * Math.cos(ang);
        const y = cy + ((R * ring) / 4) * Math.sin(ang);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // Axes
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(ang), cy + R * Math.sin(ang));
      ctx.stroke();
    }

    // Radar polygon
    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = primary;
    ctx.globalAlpha = 0.18;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = primary;
    ctx.lineWidth = 5;
    ctx.stroke();

    // Vertex dots
    ctx.fillStyle = primary;
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Skill labels
    ctx.fillStyle = muted;
    ctx.font = "500 26px Manrope, sans-serif";
    points.forEach((p) => {
      const lx = cx + (R + 54) * Math.cos(p.ang);
      const ly = cy + (R + 54) * Math.sin(p.ang);
      ctx.fillText(p.label, lx, ly);
    });

    // Composite, large, in the middle
    ctx.fillStyle = fg;
    ctx.font = "700 150px Manrope, sans-serif";
    ctx.fillText(String(clampScore(report.composite)), cx, cy);

    // Context line under the composite
    if (contextLine) {
      ctx.fillStyle = muted;
      ctx.font = "400 30px Manrope, sans-serif";
      ctx.fillText(contextLine, size / 2, cy + 120);
    }

    // Tagline at the bottom
    ctx.fillStyle = muted;
    ctx.font = "400 34px Manrope, sans-serif";
    ctx.fillText("Ten questions that get harder as you get better.", size / 2, size - 90);

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "empathy-measure.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="btn-lift rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition hover:bg-secondary"
    >
      {shareLabel || "Download a share image"}
    </button>
  );
}