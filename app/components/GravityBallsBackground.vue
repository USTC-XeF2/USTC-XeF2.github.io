<script setup lang="ts">
interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  trail: { x: number; y: number }[];
  stuckTime: number;
  stuckWith: number | null;
}

interface Mouse {
  x: number;
  y: number;
  mass: number;
}

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;

const balls: Ball[] = [];
const mouse: Mouse = { x: 0, y: 0, mass: 1 };
const isTouch = ref(false);
const colorMode = useColorMode();

const BALL_RADIUS = 15;
const BALL_MASS = 1;
const G = 1000000;
const DAMPING = 0.95;
const TRAIL_LENGTH = 100;
const STUCK_THRESHOLD = 1.0;
const SEPARATION_FORCE = 200;
const MAX_SPEED = 300;
const SPEED_DAMPING = 0.95;

function initBalls(width: number, height: number) {
  balls.length = 0;
  for (let i = 0; i < 3; i++) {
    balls.push({
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 100) + 50,
      vx: (Math.random() - 0.5) * 100,
      vy: (Math.random() - 0.5) * 100,
      radius: BALL_RADIUS,
      mass: BALL_MASS,
      trail: [],
      stuckTime: 0,
      stuckWith: null,
    });
  }
}

function calculateGravity(
  obj1: { x: number; y: number; mass: number },
  obj2: { x: number; y: number; mass: number },
) {
  const dx = obj2.x - obj1.x;
  const dy = obj2.y - obj1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1) return { fx: 0, fy: 0 };

  const force = (G * obj1.mass * obj2.mass) / (distance * distance);
  const fx = (force * dx) / distance;
  const fy = (force * dy) / distance;

  return { fx, fy };
}

function resetStuckState(ball: Ball, otherIdx: number) {
  if (ball.stuckWith === otherIdx) {
    ball.stuckWith = null;
    ball.stuckTime = 0;
  }
}

function handleBallCollisions(deltaTime: number) {
  const dt = deltaTime / 1000;

  // 检测多球粘连并强制分离
  const stuckGroups: Set<number>[] = [];
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (ball && ball.stuckWith !== null) {
      let foundGroup = false;
      for (const group of stuckGroups) {
        if (group.has(i) || group.has(ball.stuckWith)) {
          group.add(i);
          group.add(ball.stuckWith);
          foundGroup = true;
          break;
        }
      }
      if (!foundGroup) {
        stuckGroups.push(new Set([i, ball.stuckWith]));
      }
    }
  }

  for (const group of stuckGroups) {
    if (group.size >= 3) {
      const indices = Array.from(group);
      for (const idx of indices) {
        const ball = balls[idx];
        if (!ball) continue;

        const randomAngle = Math.random() * Math.PI * 2;
        ball.vx += Math.cos(randomAngle) * SEPARATION_FORCE;
        ball.vy += Math.sin(randomAngle) * SEPARATION_FORCE;

        ball.stuckTime = 0;
        ball.stuckWith = null;
      }
    }
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const ball1 = balls[i];
      const ball2 = balls[j];

      if (!ball1 || !ball2) continue;

      const dx = ball2.x - ball1.x;
      const dy = ball2.y - ball1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = ball1.radius + ball2.radius;

      if (distance < minDistance + 5) {
        if (distance < minDistance + 2) {
          // 更新粘连状态
          if (ball1.stuckWith === j) {
            ball1.stuckTime += dt;
          } else {
            ball1.stuckWith = j;
            ball1.stuckTime = 0;
          }

          if (ball2.stuckWith === i) {
            ball2.stuckTime += dt;
          } else {
            ball2.stuckWith = i;
            ball2.stuckTime = 0;
          }

          // 粘连超时则强制分离
          if (ball1.stuckTime > STUCK_THRESHOLD) {
            const angle = Math.atan2(dy, dx);
            const perpAngle = angle + Math.PI / 2;

            ball1.vx += Math.cos(perpAngle) * SEPARATION_FORCE;
            ball1.vy += Math.sin(perpAngle) * SEPARATION_FORCE;
            ball2.vx += Math.cos(perpAngle + Math.PI) * SEPARATION_FORCE;
            ball2.vy += Math.sin(perpAngle + Math.PI) * SEPARATION_FORCE;

            ball1.stuckTime = 0;
            ball1.stuckWith = null;
            ball2.stuckTime = 0;
            ball2.stuckWith = null;

            continue;
          }
        } else {
          resetStuckState(ball1, j);
          resetStuckState(ball2, i);
        }

        // 碰撞处理
        if (distance < minDistance) {
          const nx = dx / distance;
          const ny = dy / distance;

          const overlap = minDistance - distance;
          const separationX = (overlap / 2) * nx;
          const separationY = (overlap / 2) * ny;

          ball1.x -= separationX;
          ball1.y -= separationY;
          ball2.x += separationX;
          ball2.y += separationY;

          const dvx = ball2.vx - ball1.vx;
          const dvy = ball2.vy - ball1.vy;
          const dvn = dvx * nx + dvy * ny;

          if (dvn > 0) continue;

          const impulse = (2 * dvn) / (ball1.mass + ball2.mass);

          ball1.vx += impulse * ball2.mass * nx;
          ball1.vy += impulse * ball2.mass * ny;
          ball2.vx -= impulse * ball1.mass * nx;
          ball2.vy -= impulse * ball1.mass * ny;

          ball1.vx *= DAMPING;
          ball1.vy *= DAMPING;
          ball2.vx *= DAMPING;
          ball2.vy *= DAMPING;
        }
      } else {
        resetStuckState(ball1, j);
        resetStuckState(ball2, i);
      }
    }
  }
}

function update(deltaTime: number) {
  if (!canvas.value) return;

  const width = canvas.value.width;
  const height = canvas.value.height;
  const dt = deltaTime / 1000;

  const mouseNearBoundary =
    mouse.x < BALL_RADIUS ||
    mouse.x > width - BALL_RADIUS ||
    mouse.y < BALL_RADIUS ||
    mouse.y > height - BALL_RADIUS;

  balls.forEach((ball, i) => {
    let totalFx = 0;
    let totalFy = 0;

    balls.forEach((otherBall, j) => {
      if (i !== j) {
        const { fx, fy } = calculateGravity(ball, otherBall);
        totalFx += fx;
        totalFy += fy;
      }
    });

    if (!isTouch.value && !mouseNearBoundary) {
      const { fx: mouseFx, fy: mouseFy } = calculateGravity(ball, mouse);
      totalFx += mouseFx;
      totalFy += mouseFy;
    }

    ball.vx += (totalFx / ball.mass) * dt;
    ball.vy += (totalFy / ball.mass) * dt;

    const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
    if (speed > MAX_SPEED) {
      ball.vx *= SPEED_DAMPING;
      ball.vy *= SPEED_DAMPING;
    }

    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    // 边界碰撞
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.vx = Math.abs(ball.vx) * DAMPING;
    } else if (ball.x + ball.radius > width) {
      ball.x = width - ball.radius;
      ball.vx = -Math.abs(ball.vx) * DAMPING;
    }

    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.vy = Math.abs(ball.vy) * DAMPING;
    } else if (ball.y + ball.radius > height) {
      ball.y = height - ball.radius;
      ball.vy = -Math.abs(ball.vy) * DAMPING;
    }

    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > TRAIL_LENGTH) {
      ball.trail.shift();
    }
  });

  handleBallCollisions(deltaTime);
}

function draw() {
  if (!ctx || !canvas.value) return;

  const width = canvas.value.width;
  const height = canvas.value.height;

  ctx.clearRect(0, 0, width, height);

  const isDark = colorMode.value === "dark";
  const trailColor = isDark
    ? "rgba(100, 100, 100, 0.4)"
    : "rgba(200, 200, 200, 0.4)";
  const ballFillColor = isDark ? "#505050" : "#d0d0d0";
  const ballStrokeColor = isDark ? "#707070" : "#a0a0a0";

  // 绘制轨迹
  balls.forEach((ball) => {
    if (ball.trail.length > 1 && ctx) {
      ctx.beginPath();
      const firstPoint = ball.trail[0];
      if (firstPoint) {
        ctx.moveTo(firstPoint.x, firstPoint.y);
      }

      for (let i = 1; i < ball.trail.length; i++) {
        const point = ball.trail[i];
        if (point) {
          ctx.lineTo(point.x, point.y);
        }
      }

      ctx.strokeStyle = trailColor;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  });

  // 绘制小球
  balls.forEach((ball) => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ballFillColor;
    ctx.fill();
    ctx.strokeStyle = ballStrokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

let lastTime = 0;
function animate(currentTime: number) {
  const deltaTime = currentTime - lastTime || 16;
  lastTime = currentTime;

  update(Math.min(deltaTime, 32));
  draw();

  animationId = requestAnimationFrame(animate);
}

function handleResize() {
  if (!canvas.value) return;

  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function handlePointerMove(event: PointerEvent) {
  if (!canvas.value) return;

  isTouch.value = event.pointerType === "touch" || event.pointerType === "pen";

  const rect = canvas.value.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
}

onMounted(() => {
  if (!canvas.value) return;

  ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  handleResize();
  initBalls(canvas.value.width, canvas.value.height);

  window.addEventListener("resize", handleResize);
  window.addEventListener("pointermove", handlePointerMove);

  animationId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("pointermove", handlePointerMove);
});
</script>

<template>
  <canvas
    ref="canvas"
    class="fixed top-0 left-0 w-full h-full -z-1 pointer-events-none"
  ></canvas>
</template>
