import React from "react";
import { SCORE_OUT_OF } from "@/components/cookie/cookie";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function SkillRadar({ data, height = 280, animate = false }) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          />
          <PolarRadiusAxis domain={[0, SCORE_OUT_OF]} tick={false} axisLine={false} />
          <Radar
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.32}
            strokeWidth={2}
            isAnimationActive={animate}
            animationDuration={animate ? 1000 : 0}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}