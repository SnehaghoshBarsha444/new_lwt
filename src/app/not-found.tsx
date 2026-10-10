"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { LWTLogo } from "@/components/branding/LWTLogo";

/* ==========================================================================
   GAME ENGINE TYPES & CONFIGURATIONS
   ========================================================================== */

type DifficultyLevel = "easy" | "medium" | "hard" | "expert";

interface DifficultyConfig {
  name: string;
  badge: string;
  baseBallSpeed: number;
  paddleWidth: number;
  initialLives: number;
  scoreMultiplier: number;
  hasSafetyWall: boolean;
  rows: number;
  description: string;
}

const DIFFICULTIES: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    name: "Casual",
    badge: "Relaxed Mode",
    baseBallSpeed: 320,
    paddleWidth: 120,
    initialLives: 5,
    scoreMultiplier: 1.0,
    hasSafetyWall: true,
    rows: 4,
    description: "Wide paddle, safety floor barrier, slower ball speed, and 5 lives.",
  },
  medium: {
    name: "Arcade",
    badge: "Standard Classic",
    baseBallSpeed: 420,
    paddleWidth: 96,
    initialLives: 3,
    scoreMultiplier: 1.5,
    hasSafetyWall: false,
    rows: 5,
    description: "Balanced speed, 2-hit armored bricks, explosive TNT blocks, and 3 lives.",
  },
  hard: {
    name: "Turbo",
    badge: "High Velocity",
    baseBallSpeed: 520,
    paddleWidth: 78,
    initialLives: 2,
    scoreMultiplier: 2.2,
    hasSafetyWall: false,
    rows: 6,
    description: "Fast ball velocity, 3-hit shielded bricks, and high-frequency rebounds.",
  },
  expert: {
    name: "Insane",
    badge: "1-Life Challenge",
    baseBallSpeed: 620,
    paddleWidth: 64,
    initialLives: 1,
    scoreMultiplier: 3.5,
    hasSafetyWall: false,
    rows: 7,
    description: "Supercharged speed with only 1 life! For master-level reflexes only.",
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  alpha: number;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  speed: number;
  isFireball: boolean;
}

interface Brick {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  hp: number;
  maxHp: number;
  color: string;
  type: "normal" | "armored" | "tnt" | "mystery";
  points: number;
}

interface LaserBullet {
  x: number;
  y: number;
  vy: number;
}

interface PowerUpItem {
  id: number;
  type: "multiball" | "laser" | "wide" | "fireball" | "shield" | "heart";
  x: number;
  y: number;
  vy: number;
  radius: number;
  color: string;
  label: string;
}

/* ==========================================================================
   MINI-GAME COMPONENT (FULLSCREEN MODAL CAPABLE)
   ========================================================================== */

function QuantumBreakerGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("medium");
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "gameover" | "victory">("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(1);
  const [laserActive, setLaserActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const engineRef = useRef({
    paddleX: 400,
    targetX: 400,
    paddleY: 600,
    paddleWidth: 96,
    paddleHeight: 14,
    keys: { left: false, right: false, fire: false },
    balls: [] as Ball[],
    bricks: [] as Brick[],
    powerups: [] as PowerUpItem[],
    lasers: [] as LaserBullet[],
    particles: [] as Particle[],
    texts: [] as FloatingText[],
    wideTimer: 0,
    laserTimer: 0,
    fireballTimer: 0,
    safetyWall: false,
    scoreCount: 0,
    livesCount: 3,
    comboCount: 1,
    lastLaserFire: 0,
    canvasW: 800,
    canvasH: 600,
    animId: 0,
    nextId: 1,
  });

  // Sound Synthesizer via Web Audio API
  const playSfx = useCallback((type: "bounce" | "brick" | "powerup" | "laser" | "tnt" | "lost" | "win") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "bounce") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "brick") {
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
        const pitch = scale[Math.min(engineRef.current.comboCount - 1, scale.length - 1)];
        osc.type = "triangle";
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "powerup") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(360, now);
        osc.frequency.linearRampToValueAtTime(720, now + 0.1);
        osc.frequency.linearRampToValueAtTime(1080, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "laser") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "tnt") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "lost") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "win") {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.setValueAtTime(freq, now + idx * 0.12);
          g.gain.setValueAtTime(0.15, now + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
          o.start(now + idx * 0.12);
          o.stop(now + idx * 0.12 + 0.35);
        });
      }
    } catch {
      /* Audio blocked */
    }
  }, [soundEnabled]);

  // Load Highscore
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lwt_breaker_highscore");
      if (stored) setHighScore(parseInt(stored, 10));
    } catch {
      /* ignore */
    }
  }, []);

  const spawnParticles = (x: number, y: number, color: string, count = 14) => {
    const engine = engineRef.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.2;
      engine.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 3 + 1.5,
        alpha: 1,
        decay: Math.random() * 0.8 + 0.8,
      });
    }
  };

  const addFloatText = (text: string, x: number, y: number, color: string) => {
    const engine = engineRef.current;
    engine.texts.push({
      id: engine.nextId++,
      text,
      x,
      y,
      color,
      alpha: 1,
    });
  };

  // Generate Bricks Grid
  const generateBricks = (diff: DifficultyLevel) => {
    const engine = engineRef.current;
    const config = DIFFICULTIES[diff];
    const cols = 9;
    const padding = 10;
    const brickH = 22;
    const topMargin = 50;
    const sideMargin = Math.max(30, (engine.canvasW - (cols * 80 + (cols - 1) * padding)) / 2);
    const brickW = (engine.canvasW - sideMargin * 2 - (cols - 1) * padding) / cols;

    const bricks: Brick[] = [];
    const colorPalette = ["#153EC1", "#2ED2EF", "#7B3ED6", "#8E7CF6", "#CBB4FF"];

    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = sideMargin + c * (brickW + padding);
        const y = topMargin + r * (brickH + padding);
        const rand = Math.random();

        let type: "normal" | "armored" | "tnt" | "mystery" = "normal";
        let hp = 1;
        let points = 50;
        let color = colorPalette[r % colorPalette.length];

        if (rand < 0.1) {
          type = "tnt";
          color = "#EF4444";
          points = 120;
        } else if (rand < 0.22) {
          type = "mystery";
          color = "#2ED2EF";
          points = 80;
        } else if (r === 0 && (diff === "hard" || diff === "expert")) {
          type = "armored";
          hp = 3;
          color = "#7B3ED6";
          points = 150;
        } else if (r <= 1 && diff !== "easy") {
          type = "armored";
          hp = 2;
          color = "#153EC1";
          points = 100;
        }

        bricks.push({
          id: engine.nextId++,
          x,
          y,
          w: brickW,
          h: brickH,
          hp,
          maxHp: hp,
          color,
          type,
          points,
        });
      }
    }
    return bricks;
  };

  // Start / Reset Game
  const startGame = useCallback((selectedDiff = difficulty) => {
    const config = DIFFICULTIES[selectedDiff];
    const engine = engineRef.current;

    engine.paddleX = engine.canvasW / 2;
    engine.targetX = engine.canvasW / 2;
    engine.paddleWidth = config.paddleWidth;
    engine.safetyWall = config.hasSafetyWall;
    engine.wideTimer = 0;
    engine.laserTimer = 0;
    engine.fireballTimer = 0;
    engine.scoreCount = 0;
    engine.livesCount = config.initialLives;
    engine.comboCount = 1;
    engine.particles = [];
    engine.texts = [];
    engine.powerups = [];
    engine.lasers = [];

    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
    engine.balls = [
      {
        x: engine.paddleX,
        y: engine.paddleY - 16,
        vx: Math.cos(angle) * config.baseBallSpeed,
        vy: Math.sin(angle) * config.baseBallSpeed,
        radius: 7,
        speed: config.baseBallSpeed,
        isFireball: false,
      },
    ];

    engine.bricks = generateBricks(selectedDiff);

    setScore(0);
    setLives(config.initialLives);
    setCombo(1);
    setLaserActive(false);
    setGameState("playing");
  }, [difficulty]);

  // Keyboard Navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const engine = engineRef.current;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        engine.keys.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        engine.keys.right = true;
      }
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        engine.keys.fire = true;
      }
      if (e.key === "p" || e.key === "P") {
        if (gameState === "playing") setGameState("paused");
        else if (gameState === "paused") setGameState("playing");
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const engine = engineRef.current;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        engine.keys.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        engine.keys.right = false;
      }
      if (e.key === " " || e.key === "ArrowUp") {
        engine.keys.fire = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [gameState, onClose]);

  // Mouse & Touch Pointer Follow
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== "playing") return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    engineRef.current.targetX = Math.max(
      engineRef.current.paddleWidth / 2,
      Math.min(engineRef.current.canvasW - engineRef.current.paddleWidth / 2, mouseX)
    );
  };

  const handleCanvasClick = () => {
    const engine = engineRef.current;
    if (gameState === "playing" && engine.laserTimer > 0) {
      engine.keys.fire = true;
    }
  };

  // Main 60FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.08);
      lastTime = time;

      const engine = engineRef.current;
      const config = DIFFICULTIES[difficulty];

      if (gameState === "playing") {
        const moveSpeed = 540;
        if (engine.keys.left) {
          engine.targetX = Math.max(engine.paddleWidth / 2, engine.targetX - moveSpeed * dt);
        }
        if (engine.keys.right) {
          engine.targetX = Math.min(engine.canvasW - engine.paddleWidth / 2, engine.targetX + moveSpeed * dt);
        }
        engine.paddleX += (engine.targetX - engine.paddleX) * 0.35;

        if (engine.wideTimer > 0) {
          engine.wideTimer -= dt;
          if (engine.wideTimer <= 0) {
            engine.paddleWidth = config.paddleWidth;
          }
        }
        if (engine.laserTimer > 0) {
          engine.laserTimer -= dt;
          if (engine.laserTimer <= 0) {
            setLaserActive(false);
          }
        }
        if (engine.fireballTimer > 0) {
          engine.fireballTimer -= dt;
          if (engine.fireballTimer <= 0) {
            engine.balls.forEach((b) => (b.isFireball = false));
          }
        }

        // Fire Lasers
        if (engine.laserTimer > 0 && engine.keys.fire && time - engine.lastLaserFire > 160) {
          engine.lastLaserFire = time;
          engine.lasers.push({ x: engine.paddleX - engine.paddleWidth / 3, y: engine.paddleY - 8, vy: -640 });
          engine.lasers.push({ x: engine.paddleX + engine.paddleWidth / 3, y: engine.paddleY - 8, vy: -640 });
          playSfx("laser");
        }

        // Update Lasers
        for (let i = engine.lasers.length - 1; i >= 0; i--) {
          const lz = engine.lasers[i];
          lz.y += lz.vy * dt;
          if (lz.y < -10) {
            engine.lasers.splice(i, 1);
            continue;
          }

          for (let bIdx = engine.bricks.length - 1; bIdx >= 0; bIdx--) {
            const br = engine.bricks[bIdx];
            if (lz.x >= br.x && lz.x <= br.x + br.w && lz.y >= br.y && lz.y <= br.y + br.h) {
              engine.lasers.splice(i, 1);
              br.hp -= 1;
              playSfx("brick");
              spawnParticles(lz.x, lz.y, br.color, 8);

              if (br.hp <= 0) {
                destroyBrick(bIdx);
              }
              break;
            }
          }
        }

        function destroyBrick(index: number) {
          const br = engine.bricks[index];
          if (!br) return;
          spawnParticles(br.x + br.w / 2, br.y + br.h / 2, br.color, 16);
          engine.bricks.splice(index, 1);

          const earned = Math.round(br.points * config.scoreMultiplier * engine.comboCount);
          engine.scoreCount += earned;
          setScore(engine.scoreCount);
          addFloatText(`+${earned}`, br.x + br.w / 2, br.y, br.color);

          const dropChance = br.type === "mystery" ? 0.95 : 0.2;
          if (Math.random() < dropChance) {
            const pTypes: ("multiball" | "laser" | "wide" | "fireball" | "shield" | "heart")[] = [
              "multiball", "laser", "wide", "fireball", "shield", "heart"
            ];
            const pType = pTypes[Math.floor(Math.random() * pTypes.length)];
            let pColor = "#2ED2EF";
            let pLabel = "MULTI-BALL";

            if (pType === "laser") { pColor = "#EF4444"; pLabel = "LASERS"; }
            else if (pType === "wide") { pColor = "#8E7CF6"; pLabel = "WIDE PADDLE"; }
            else if (pType === "fireball") { pColor = "#F59E0B"; pLabel = "FIREBALL"; }
            else if (pType === "shield") { pColor = "#153EC1"; pLabel = "SAFETY FLOOR"; }
            else if (pType === "heart") { pColor = "#10B981"; pLabel = "+1 HEART"; }

            engine.powerups.push({
              id: engine.nextId++,
              type: pType,
              x: br.x + br.w / 2,
              y: br.y + br.h / 2,
              vy: 120,
              radius: 12,
              color: pColor,
              label: pLabel,
            });
          }

          if (br.type === "tnt") {
            playSfx("tnt");
            const radius = 72;
            for (let k = engine.bricks.length - 1; k >= 0; k--) {
              const adj = engine.bricks[k];
              const dist = Math.hypot(adj.x + adj.w / 2 - (br.x + br.w / 2), adj.y + adj.h / 2 - (br.y + br.h / 2));
              if (dist <= radius) {
                adj.hp -= 2;
                if (adj.hp <= 0) {
                  destroyBrick(k);
                }
              }
            }
          }

          if (engine.bricks.length === 0) {
            playSfx("win");
            setGameState("victory");
            if (engine.scoreCount > highScore) {
              setHighScore(engine.scoreCount);
              try { localStorage.setItem("lwt_breaker_highscore", engine.scoreCount.toString()); } catch {}
            }
          }
        }

        // Balls Physics
        for (let i = engine.balls.length - 1; i >= 0; i--) {
          const ball = engine.balls[i];
          ball.x += ball.vx * dt;
          ball.y += ball.vy * dt;

          if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx = Math.abs(ball.vx);
            playSfx("bounce");
          } else if (ball.x + ball.radius > engine.canvasW) {
            ball.x = engine.canvasW - ball.radius;
            ball.vx = -Math.abs(ball.vx);
            playSfx("bounce");
          }

          if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy = Math.abs(ball.vy);
            playSfx("bounce");
          }

          if (engine.safetyWall && ball.y + ball.radius >= engine.canvasH - 8) {
            ball.y = engine.canvasH - 8 - ball.radius;
            ball.vy = -Math.abs(ball.vy);
            playSfx("bounce");
            spawnParticles(ball.x, engine.canvasH - 6, "#2ED2EF", 10);
            addFloatText("SAFETY WALL BOUNCE!", ball.x, engine.canvasH - 30, "#2ED2EF");
          }

          // Paddle Collision
          const pLeft = engine.paddleX - engine.paddleWidth / 2;
          const pRight = engine.paddleX + engine.paddleWidth / 2;
          const pTop = engine.paddleY - engine.paddleHeight / 2;
          const pBottom = engine.paddleY + engine.paddleHeight / 2;

          if (
            ball.x + ball.radius >= pLeft &&
            ball.x - ball.radius <= pRight &&
            ball.y + ball.radius >= pTop &&
            ball.y - ball.radius <= pBottom &&
            ball.vy > 0
          ) {
            playSfx("bounce");
            engine.comboCount = 1;
            setCombo(1);

            const hitOffset = (ball.x - engine.paddleX) / (engine.paddleWidth / 2);
            const clamped = Math.max(-0.9, Math.min(0.9, hitOffset));
            const angle = clamped * (Math.PI / 3);

            ball.vx = ball.speed * Math.sin(angle);
            ball.vy = -ball.speed * Math.cos(angle);
            ball.y = pTop - ball.radius - 1;

            spawnParticles(ball.x, pTop, "#2ED2EF", 10);
          }

          // Brick Collisions
          for (let bIdx = engine.bricks.length - 1; bIdx >= 0; bIdx--) {
            const br = engine.bricks[bIdx];
            const nearX = Math.max(br.x, Math.min(ball.x, br.x + br.w));
            const nearY = Math.max(br.y, Math.min(ball.y, br.y + br.h));
            const dx = ball.x - nearX;
            const dy = ball.y - nearY;

            if (dx * dx + dy * dy < ball.radius * ball.radius) {
              playSfx("brick");
              engine.comboCount = Math.min(engine.comboCount + 1, 8);
              setCombo(engine.comboCount);

              if (!ball.isFireball) {
                const prevX = ball.x - ball.vx * dt;
                const prevY = ball.y - ball.vy * dt;

                if (prevX < br.x || prevX > br.x + br.w) {
                  ball.vx = -ball.vx;
                } else {
                  ball.vy = -ball.vy;
                }
              }

              br.hp -= 1;
              spawnParticles(nearX, nearY, br.color, 8);

              if (br.hp <= 0) {
                destroyBrick(bIdx);
              }
              break;
            }
          }

          if (ball.y - ball.radius > engine.canvasH + 20) {
            engine.balls.splice(i, 1);

            if (engine.balls.length === 0) {
              playSfx("lost");
              engine.livesCount -= 1;
              setLives(engine.livesCount);
              engine.comboCount = 1;
              setCombo(1);

              if (engine.livesCount <= 0) {
                setGameState("gameover");
                if (engine.scoreCount > highScore) {
                  setHighScore(engine.scoreCount);
                  try { localStorage.setItem("lwt_breaker_highscore", engine.scoreCount.toString()); } catch {}
                }
              } else {
                const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.4;
                engine.balls = [
                  {
                    x: engine.paddleX,
                    y: engine.paddleY - 16,
                    vx: Math.cos(angle) * config.baseBallSpeed,
                    vy: Math.sin(angle) * config.baseBallSpeed,
                    radius: 7,
                    speed: config.baseBallSpeed,
                    isFireball: false,
                  },
                ];
              }
            }
          }
        }

        // Power-ups
        for (let i = engine.powerups.length - 1; i >= 0; i--) {
          const p = engine.powerups[i];
          p.y += p.vy * dt;

          const pLeft = engine.paddleX - engine.paddleWidth / 2;
          const pRight = engine.paddleX + engine.paddleWidth / 2;
          const pTop = engine.paddleY - engine.paddleHeight / 2;
          const pBottom = engine.paddleY + engine.paddleHeight / 2;

          if (p.x >= pLeft && p.x <= pRight && p.y + p.radius >= pTop && p.y - p.radius <= pBottom) {
            engine.powerups.splice(i, 1);
            playSfx("powerup");
            spawnParticles(p.x, p.y, p.color, 16);
            addFloatText(p.label, p.x, p.y - 14, p.color);

            if (p.type === "multiball") {
              if (engine.balls.length > 0) {
                const b0 = engine.balls[0];
                engine.balls.push({
                  x: b0.x,
                  y: b0.y,
                  vx: -b0.vx || -220,
                  vy: b0.vy,
                  radius: 7,
                  speed: b0.speed,
                  isFireball: b0.isFireball,
                });
                engine.balls.push({
                  x: b0.x,
                  y: b0.y,
                  vx: b0.vx * 0.5 || 160,
                  vy: -Math.abs(b0.vy),
                  radius: 7,
                  speed: b0.speed,
                  isFireball: b0.isFireball,
                });
              }
            } else if (p.type === "laser") {
              engine.laserTimer = 12;
              setLaserActive(true);
            } else if (p.type === "wide") {
              engine.wideTimer = 14;
              engine.paddleWidth = config.paddleWidth * 1.45;
            } else if (p.type === "fireball") {
              engine.fireballTimer = 10;
              engine.balls.forEach((b) => (b.isFireball = true));
            } else if (p.type === "shield") {
              engine.safetyWall = true;
            } else if (p.type === "heart") {
              engine.livesCount = Math.min(engine.livesCount + 1, 5);
              setLives(engine.livesCount);
            }
          } else if (p.y > engine.canvasH + 25) {
            engine.powerups.splice(i, 1);
          }
        }

        // Particles
        for (let i = engine.particles.length - 1; i >= 0; i--) {
          const pt = engine.particles[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.alpha -= dt * pt.decay;
          if (pt.alpha <= 0) engine.particles.splice(i, 1);
        }

        // Texts
        for (let i = engine.texts.length - 1; i >= 0; i--) {
          const txt = engine.texts[i];
          txt.y -= 32 * dt;
          txt.alpha -= 0.85 * dt;
          if (txt.alpha <= 0) engine.texts.splice(i, 1);
        }
      }

      // RENDER CANVAS
      ctx.clearRect(0, 0, engine.canvasW, engine.canvasH);

      // Dark Sci-Fi Background
      ctx.fillStyle = "#020817";
      ctx.fillRect(0, 0, engine.canvasW, engine.canvasH);

      // Cyber Grid
      ctx.strokeStyle = "rgba(46, 210, 239, 0.04)";
      ctx.lineWidth = 1;
      const gSize = 36;
      for (let x = 0; x < engine.canvasW; x += gSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, engine.canvasH);
        ctx.stroke();
      }
      for (let y = 0; y < engine.canvasH; y += gSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(engine.canvasW, y);
        ctx.stroke();
      }

      // Safety Wall
      if (engine.safetyWall) {
        ctx.save();
        ctx.strokeStyle = "#2ED2EF";
        ctx.lineWidth = 4;
        ctx.shadowColor = "#2ED2EF";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(0, engine.canvasH - 6);
        ctx.lineTo(engine.canvasW, engine.canvasH - 6);
        ctx.stroke();
        ctx.restore();
      }

      // Bricks
      for (const br of engine.bricks) {
        ctx.save();
        ctx.shadowColor = br.color;
        ctx.shadowBlur = br.type === "tnt" ? 14 : 8;
        ctx.fillStyle = br.color;
        ctx.beginPath();
        ctx.roundRect(br.x, br.y, br.w, br.h, 5);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();

        if (br.type === "tnt") {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("TNT", br.x + br.w / 2, br.y + br.h / 2);
        } else if (br.type === "mystery") {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 10px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("?", br.x + br.w / 2, br.y + br.h / 2);
        }
        ctx.restore();
      }

      // Power-up Drops
      for (const p of engine.powerups) {
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.type === "heart" ? "♥" : "★", p.x, p.y);

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = p.color;
        ctx.fillText(p.label, p.x, p.y + p.radius + 11);
        ctx.restore();
      }

      // Lasers
      for (const lz of engine.lasers) {
        ctx.save();
        ctx.shadowColor = "#EF4444";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(lz.x, lz.y);
        ctx.lineTo(lz.x, lz.y - 14);
        ctx.stroke();
        ctx.restore();
      }

      // Particles
      for (const pt of engine.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Paddle
      const pLeft = engine.paddleX - engine.paddleWidth / 2;
      const pTop = engine.paddleY - engine.paddleHeight / 2;
      ctx.save();
      ctx.shadowColor = engine.laserTimer > 0 ? "#EF4444" : "#2ED2EF";
      ctx.shadowBlur = 18;
      ctx.fillStyle = engine.laserTimer > 0 ? "#EF4444" : "#153EC1";
      ctx.beginPath();
      ctx.roundRect(pLeft, pTop, engine.paddleWidth, engine.paddleHeight, 7);
      ctx.fill();

      if (engine.laserTimer > 0) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(pLeft + 4, pTop - 6, 5, 7);
        ctx.fillRect(pLeft + engine.paddleWidth - 9, pTop - 6, 5, 7);
      }

      ctx.strokeStyle = "#2ED2EF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pLeft + 6, pTop + 2);
      ctx.lineTo(pLeft + engine.paddleWidth - 6, pTop + 2);
      ctx.stroke();
      ctx.restore();

      // Balls
      for (const ball of engine.balls) {
        ctx.save();
        ctx.shadowColor = ball.isFireball ? "#F59E0B" : "#2ED2EF";
        ctx.shadowBlur = 16;
        ctx.fillStyle = ball.isFireball ? "#F59E0B" : "#FFFFFF";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        if (ball.isFireball) {
          ctx.strokeStyle = "#EF4444";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius + 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Texts
      for (const txt of engine.texts) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, txt.alpha);
        ctx.fillStyle = txt.color;
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.fillText(txt.text, txt.x, txt.y);
        ctx.restore();
      }

      engine.animId = requestAnimationFrame(loop);
    };

    engineRef.current.animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(engineRef.current.animId);
  }, [gameState, difficulty, playSfx, highScore]);

  // Fullscreen Canvas Sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      const parentW = canvas.parentElement?.clientWidth || 800;
      const parentH = canvas.parentElement?.clientHeight || 600;
      const targetW = Math.min(parentW, 1000);
      const targetH = Math.min(parentH, 650);

      canvas.width = targetW;
      canvas.height = targetH;
      engineRef.current.canvasW = targetW;
      engineRef.current.canvasH = targetH;
      engineRef.current.paddleY = targetH - 36;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const config = DIFFICULTIES[difficulty];

  return (
    <div className="fixed inset-0 z-50 bg-[#020817] flex flex-col justify-between text-white select-none animate-in fade-in duration-200">
      {/* Fullscreen Header Bar */}
      <div className="px-4 sm:px-8 py-3 bg-[#061426] border-b border-[rgba(139,154,175,0.2)] flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Terminal Tag */}
        <div className="flex items-center gap-3">
          <LWTLogo />
          <span className="hidden sm:inline font-mono text-[11px] text-[#8B9AAF] pl-3 border-l border-white/10">
            QUANTUM_BREAKER // FULLSCREEN_ARCADE
          </span>
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(Object.keys(DIFFICULTIES) as DifficultyLevel[]).map((level) => {
            const isSelected = difficulty === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => {
                  setDifficulty(level);
                  if (gameState === "playing" || gameState === "paused") {
                    startGame(level);
                  }
                }}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-[#153EC1] text-white shadow-xs border border-[#2ED2EF]/60"
                    : "text-[#8B9AAF] hover:text-white bg-[#020817] border border-white/5"
                }`}
              >
                {DIFFICULTIES[level].name}
              </button>
            );
          })}
        </div>

        {/* Exit & Controls */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            className="text-[#2ED2EF] hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <span>📖 GUIDE</span>
          </button>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-[#00D9D9] hover:text-white transition-colors cursor-pointer"
          >
            {soundEnabled ? "🔊 ON" : "🔇 MUTED"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>✕ EXIT TO 404</span>
          </button>
        </div>
      </div>

      {/* Live HUD Banner */}
      <div className="px-4 sm:px-8 py-2 bg-[#01040A] border-b border-[#0878FF]/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[#8B9AAF] text-[10px] block">TOTAL SCORE:</span>
            <span className="text-white font-bold text-base text-[#00D9D9]">{score} PTS</span>
          </div>
          <div>
            <span className="text-[#8B9AAF] text-[10px] block">BEST RECORD:</span>
            <span className="text-[#CBB4FF] font-bold text-sm">{highScore} PTS</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {combo > 1 && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#153EC1]/30 border border-[#2ED2EF] text-[#2ED2EF] text-[11px] font-bold animate-pulse">
              COMBO x{combo}!
            </span>
          )}
          {laserActive && (
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/30 border border-red-400 text-red-300 text-[10px] font-bold animate-pulse">
              LASERS READY (SPACE / TAP)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[#8B9AAF] text-[10px] mr-1">LIVES:</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < lives ? "text-red-500" : "text-white/20"}`}>
              ♥
            </span>
          ))}
        </div>
      </div>

      {/* Primary Fullscreen Canvas Viewport */}
      <div className="relative flex-1 w-full flex items-center justify-center bg-[#01040A] overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onClick={handleCanvasClick}
          className="w-full h-full block cursor-crosshair touch-none"
        />

        {/* START MENU OVERLAY */}
        {gameState === "menu" && (
          <div className="absolute inset-0 bg-[#020817]/88 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#2ED2EF] uppercase bg-[#153EC1]/30 px-3 py-1 rounded-full border border-[#2ED2EF]/40 mb-3">
              {config.badge}
            </span>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Quantum Brick Buster
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#D9E2EC] max-w-md leading-relaxed font-normal">
              Slide your mouse or finger across the screen to steer the paddle. Smash all neon blocks to claim victory!
            </p>

            <div className="my-5 p-3.5 rounded-xl bg-[#061426] border border-[#0878FF]/30 text-left text-xs font-mono text-[#8B9AAF] max-w-sm w-full space-y-1">
              <div className="flex justify-between text-white">
                <span>Selected Mode:</span>
                <span className="text-[#2ED2EF] font-bold">{config.name}</span>
              </div>
              <p className="text-[11px] text-[#CBB4FF] pt-1 border-t border-white/10">
                {config.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => startGame()}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#153EC1] to-[#287BEB] text-white font-bold text-xs shadow-lg shadow-[#153EC1]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Launch Ball &rarr;
              </button>
              <button
                type="button"
                onClick={() => setShowGuide(true)}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                How to Play
              </button>
            </div>
          </div>
        )}

        {/* PAUSE OVERLAY */}
        {gameState === "paused" && (
          <div className="absolute inset-0 bg-[#020817]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <h3 className="text-3xl font-extrabold text-white font-mono">GAME PAUSED</h3>
            <p className="mt-2 text-xs text-[#8B9AAF]">Press P or click below to resume</p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGameState("playing")}
                className="px-6 py-2.5 rounded-full bg-[#153EC1] text-white font-bold text-xs hover:bg-[#287BEB] transition-colors cursor-pointer"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={() => startGame()}
                className="px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-colors cursor-pointer"
              >
                Restart Level
              </button>
            </div>
          </div>
        )}

        {/* GAME OVER OVERLAY */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-[#020817]/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-in fade-in">
            <span className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center text-xl font-bold mb-2">
              ✕
            </span>
            <h3 className="text-3xl font-extrabold text-white">Game Over</h3>
            <p className="mt-2 text-xs text-[#8B9AAF] max-w-sm">
              All balls fell! Use the paddle edges to steer the ball into steep angles.
            </p>

            <div className="my-4 p-3 rounded-xl bg-[#061426] border border-red-500/30 font-mono text-xs text-white max-w-xs w-full flex justify-between items-center">
              <span>Final Score:</span>
              <span className="text-[#00D9D9] font-bold text-base">{score} PTS</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => startGame()}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Exit to 404
              </button>
            </div>
          </div>
        )}

        {/* VICTORY OVERLAY */}
        {gameState === "victory" && (
          <div className="absolute inset-0 bg-[#020817]/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-in fade-in">
            <span className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xl font-bold mb-2">
              ★
            </span>
            <h3 className="text-3xl font-extrabold text-white">All Bricks Smashed!</h3>
            <p className="mt-2 text-xs text-[#D9E2EC] max-w-sm">
              Flawless precision! You cleared every single quantum block on this board.
            </p>

            <div className="my-4 p-3.5 rounded-xl bg-[#061426] border border-[#00D9D9]/40 font-mono text-xs text-white max-w-sm w-full space-y-1">
              <div className="flex justify-between">
                <span>Final Score:</span>
                <span className="text-[#00D9D9] font-bold text-base">{score} PTS</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => startGame()}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#153EC1] to-[#287BEB] text-white font-bold text-xs hover:scale-105 transition-all cursor-pointer"
              >
                Play Again &rarr;
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white text-[#0A0F2B] font-bold text-xs hover:bg-[#F5F7FE] transition-colors cursor-pointer"
              >
                Exit to 404
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar on Mobile */}
      <div className="p-3 bg-[#061426] border-t border-[rgba(139,154,175,0.2)] flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onTouchStart={(e) => { e.preventDefault(); engineRef.current.keys.left = true; }}
            onTouchEnd={(e) => { e.preventDefault(); engineRef.current.keys.left = false; }}
            className="w-14 h-11 rounded-xl bg-[#020817] border border-[#0878FF]/40 text-white font-bold text-lg active:bg-[#0878FF]"
          >
            ◀
          </button>
          <button
            type="button"
            onTouchStart={(e) => { e.preventDefault(); engineRef.current.keys.right = true; }}
            onTouchEnd={(e) => { e.preventDefault(); engineRef.current.keys.right = false; }}
            className="w-14 h-11 rounded-xl bg-[#020817] border border-[#0878FF]/40 text-white font-bold text-lg active:bg-[#0878FF]"
          >
            ▶
          </button>
        </div>

        {laserActive ? (
          <button
            type="button"
            onTouchStart={(e) => { e.preventDefault(); engineRef.current.keys.fire = true; }}
            onTouchEnd={(e) => { e.preventDefault(); engineRef.current.keys.fire = false; }}
            className="px-5 h-11 rounded-xl bg-red-600 text-white font-bold text-xs tracking-wider active:scale-95 transition-transform animate-pulse"
          >
            ⚡ FIRE LASERS
          </button>
        ) : (
          <span className="text-[10px] font-mono text-[#8B9AAF]">Slide finger anywhere to steer</span>
        )}
      </div>

      {/* HOW TO PLAY MODAL */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-[#020817]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#061426] border border-[#0878FF]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(139,154,175,0.2)]">
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🎮</span> How to Play
              </h4>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-5 space-y-4 text-xs text-[#D9E2EC] leading-relaxed">
              <div>
                <span className="font-mono text-[#00D9D9] font-bold block mb-1">1. CONTROLS</span>
                <p>
                  • <strong>Mouse / Touch:</strong> Simply slide your mouse or drag your finger anywhere. The paddle glides with zero delay.<br />
                  • <strong>Keyboard:</strong> Use <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">Left / Right</code> or <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">A / D</code>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#020817] border border-[#2ED2EF]/30">
                <span className="font-mono text-[#2ED2EF] font-bold block mb-1">💡 PRO STEERING TRICK</span>
                <p>
                  Hitting the ball with the <strong>edges of your paddle</strong> launches it at steep angles to slip behind bricks. Hitting the <strong>center</strong> bounces it straight up!
                </p>
              </div>

              <div>
                <span className="font-mono text-[#00D9D9] font-bold block mb-2">2. POWER-UP DROPS</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2.5 rounded-lg bg-[#020817] border border-[#2ED2EF]/30 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2ED2EF] flex items-center justify-center text-[10px] text-[#020817] font-bold">★</span>
                    <span>MULTI-BALL: Spawns 3 balls</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#020817] border border-red-500/40 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white font-bold">★</span>
                    <span>LASERS: Blasts bricks</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#020817] border border-amber-500/40 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold">★</span>
                    <span>FIREBALL: Smashes through</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#020817] border border-[#8E7CF6]/40 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#8E7CF6] flex items-center justify-center text-[10px] text-white font-bold">★</span>
                    <span>WIDE: Extends paddle width</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#020817] border border-[#153EC1]/40 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#153EC1] flex items-center justify-center text-[10px] text-white font-bold">★</span>
                    <span>SHIELD: Safety floor</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#020817] border border-emerald-500/40 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">♥</span>
                    <span>HEART: +1 Extra Life</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#153EC1] to-[#287BEB] text-white font-bold text-xs hover:scale-[1.01] transition-transform cursor-pointer"
            >
              Ready to Play! &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   MINIMAL CUSTOM 404 PAGE
   ========================================================================== */

export default function NotFoundPage() {
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  return (
    <div className="min-h-screen bg-ambient-clean flex flex-col justify-between select-none">
      {/* Minimal Header */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between z-10">
        <LWTLogo />
        <Link
          href="/"
          className="text-xs font-semibold text-[#535D80] hover:text-[#153EC1] transition-colors py-2 px-3 rounded-full hover:bg-white/60"
        >
          &larr; Back to Platform
        </Link>
      </header>

      {/* Main Minimal 404 Hero */}
      <main className="max-w-2xl mx-auto w-full px-4 text-center my-auto py-12">
        {/* Subtle Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBB4FF]/60 text-[11px] font-mono font-bold text-[#7B3ED6] mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>HTTP 404 // NOT FOUND</span>
        </div>

        {/* Large Clean 404 Headline */}
        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter uppercase leading-none text-[#0A0F2B]">
          4<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#153EC1] via-[#2ED2EF] to-[#7B3ED6]">0</span>4
        </h1>

        {/* Refined Minimal Copy */}
        <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[#0A0F2B] mt-4">
          This page does not exist.
        </h2>

        <p className="text-xs sm:text-sm text-[#535D80] mt-2 max-w-md mx-auto leading-relaxed">
          The link you followed is broken or has been moved. Return home or play a quick game of Quantum Breaker while you're here.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0A0F2B] hover:bg-[#153EC1] text-white font-bold text-xs transition-all shadow-sm"
          >
            &larr; Back to Home
          </Link>

          <button
            type="button"
            onClick={() => setIsPlayingGame(true)}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-[#0A0F2B] hover:border-[#153EC1] border border-[#CBB4FF] font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-[#F5F7FE]"
          >
            <span>🎮 Launch Mini-Game (Fullscreen)</span>
          </button>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full text-center py-6 text-xs text-[#535D80]/70 font-mono">
        &copy; 2026 LWT &middot; <span className="text-[#153EC1]">LAKSHYNiTi ECOSYSTEM</span>
      </footer>

      {/* FULLSCREEN GAME MODAL */}
      {isPlayingGame && (
        <QuantumBreakerGame onClose={() => setIsPlayingGame(false)} />
      )}
    </div>
  );
}