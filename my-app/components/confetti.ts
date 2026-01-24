export type ConfettiOptions = { count?: number };

export function triggerConfetti(opts?: ConfettiOptions) {
  if (typeof document === "undefined") return;
  const count = opts?.count ?? 40;
  const colors = ["#FF4D4F", "#FF7A45", "#FFD666", "#73D13D", "#36CFC9", "#40A9FF", "#9254DE"];

  const pieces: Array<{
    el: HTMLDivElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    vrot: number;
  }> = [];

  const centerX = window.innerWidth / 2;
  const startY = Math.max(24, window.innerHeight * 0.12);
  const gravity = 0.35;
  const lifespan = 3000; // ms
  const endTime = Date.now() + lifespan;

  for (let i = 0; i < count; i++) {
    const w = 6 + Math.round(Math.random() * 8);
    const h = 10 + Math.round(Math.random() * 10);
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.left = `${centerX}px`;
    el.style.top = `${startY}px`;
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    el.style.borderRadius = "2px";
    el.style.opacity = "1";
    el.style.transform = `translate(-50%, 0) rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(el);

    const speed = 6 + Math.random() * 10;
    const angle = (Math.PI / 2) * (0.5 + Math.random());
    const vx = (Math.random() - 0.5) * speed * 2;
    const vy = -Math.random() * (6 + Math.random() * 6);
    const rot = Math.random() * 360;
    const vrot = (Math.random() - 0.5) * 20;

    pieces.push({ el, x: 0, y: 0, vx, vy, rot, vrot });
  }

  function update() {
    const now = Date.now();
    const t = endTime - now;

    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      p.vy += gravity * (Math.random() * 0.9 + 0.6);
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;

      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;

      // fade out near the end
      if (t < 600) {
        const o = Math.max(0, t / 600);
        p.el.style.opacity = String(o);
      }

      // remove when below viewport or after time
      if (p.y > window.innerHeight + 200 || now > endTime) {
        document.body.removeChild(p.el);
        pieces.splice(i, 1);
      }
    }

    if (pieces.length > 0) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
