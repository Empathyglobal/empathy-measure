import React, { useEffect, useState } from "react";

export default function CountUp({ value, duration = 1000 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const target = Number(value) || 0;
    let raf;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{n}</>;
}