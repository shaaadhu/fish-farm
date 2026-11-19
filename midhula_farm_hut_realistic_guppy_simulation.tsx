import React, { useState, useEffect, useRef } from 'react';
import {
  Fish,
  Droplets,
  Sparkles,
  ArrowUpRight,
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  Navigation,
  ChevronLeft,
  ChevronRight,
  Phone,
  Waves,
  CheckCircle2,
  TreePine,
  Compass,
  Eye,
  Menu,
  X,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Feather,
  Sun,
  Moon
} from 'lucide-react';

// --- SOCIAL CHANNEL CONFIGURATION ---
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/midhula_farm_hut/',
  youtube: 'https://www.youtube.com/@Midhula_Farm_Hut',
  facebook: 'https://www.facebook.com/people/Midhula-Farm-Hut'
};

const MAPS_LINK = "https://www.google.com/maps/place/Midhula+Farm+Hut/@10.3974253,76.3461262,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba7f91940835a23:0x2cdafc117da5a927!8m2!3d10.3974253!4d76.3461262!16s%2Fg%2F11jdh34gzb?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D";
const FARM_ADDRESS = "Midhula Farm Hut, Nooluvally, Mupliyam - Chembuchira Rd, Keralam 680312";

// --- NATURAL SHORT-TAIL & WILD ENDLER GUPPY PALETTES ---
const WILD_GUPPY_PALETTES = [
  {
    name: 'Wild Stream Endler',
    bodyPrimary: '#93a392',
    bodySecondary: '#e0dfd5',
    accentColor: '#e76f51', // Bright orange flank stripe
    emeraldFlank: '#2a9d8f', // Metallic iridescent green patch
    blackSpots: true,
    tailPrimary: 'rgba(231, 111, 81, 0.75)',
    tailBorder: '#264653',
    glow: '#86efac'
  },
  {
    name: 'Wild River Silver-Blue',
    bodyPrimary: '#a8dadc',
    bodySecondary: '#f1faee',
    accentColor: '#457b9d',
    emeraldFlank: '#2ec4b6',
    blackSpots: true,
    tailPrimary: 'rgba(69, 123, 157, 0.75)',
    tailBorder: '#1d3557',
    glow: '#67e8f9'
  },
  {
    name: 'Tiger Spade Wild Type',
    bodyPrimary: '#b08968',
    bodySecondary: '#ede0d4',
    accentColor: '#e09f3e',
    emeraldFlank: '#588157',
    blackSpots: true,
    tailPrimary: 'rgba(224, 159, 62, 0.8)',
    tailBorder: '#3d2614',
    glow: '#fef08a'
  },
  {
    name: 'Emerald Top-Sword Wild',
    bodyPrimary: '#606c38',
    bodySecondary: '#fefae0',
    accentColor: '#d4a373',
    emeraldFlank: '#38b000',
    blackSpots: false,
    tailPrimary: 'rgba(56, 176, 0, 0.7)',
    tailBorder: '#283618',
    glow: '#a7f3d0'
  },
  {
    name: 'Opal Stream Female (Natural Translucent)',
    bodyPrimary: '#bfc0c0',
    bodySecondary: '#ffffff',
    accentColor: '#f4a261',
    emeraldFlank: '#84a59d',
    blackSpots: false,
    tailPrimary: 'rgba(216, 226, 220, 0.65)',
    tailBorder: '#6c757d',
    glow: '#e2e8f0'
  },
  {
    name: 'Scarlet Crimson Wild Endler (Red)',
    bodyPrimary: '#881337', // Deep crimson ruby body
    bodySecondary: '#fecdd3', // Soft rose iridescent shimmer
    accentColor: '#ef4444', // Radiant scarlet flame flank streak
    emeraldFlank: '#b91c1c', // Metallic ruby-red iridescent patch
    blackSpots: true,
    tailPrimary: 'rgba(239, 68, 68, 0.85)', // Vivid fiery red short tail
    tailBorder: '#4c0519', // Deep maroon border
    glow: '#f87171'
  },
  {
    name: 'Midnight Obsidian Wild Type (Black)',
    bodyPrimary: '#18181b', // Velvet charcoal black body
    bodySecondary: '#3f3f46', // Metallic smoke-graphite sheen
    accentColor: '#52525b', // Smoked silver-slate flank streak
    emeraldFlank: '#09090b', // Glossy obsidian jet sheen
    blackSpots: true,
    tailPrimary: 'rgba(24, 24, 27, 0.85)', // Translucent smoke-black short tail
    tailBorder: '#000000', // Jet black border
    glow: '#71717a'
  }
];

// --- REALISTIC SHORT-TAIL GUPPY WITH NATURAL ANATOMY & AGILE FLICK HYDRODYNAMICS ---
class ShortTailGuppy {
    [key: string]: any;
    constructor(w: number, h: number, index: number) {
      this.x = (w * 0.2) + Math.random() * (w * 0.6);
      this.y = (h * 0.2) + Math.random() * (h * 0.6);
      this.palette = WILD_GUPPY_PALETTES[index % WILD_GUPPY_PALETTES.length];

      // Slender, natural body proportions (8 articulated vertebrae)
      this.numJoints = 8;
      this.jointDist = 3.6 + Math.random() * 0.8; // Compact spine
      this.joints = [];
      for (let i = 0; i < this.numJoints; i++) {
        this.joints.push({ x: this.x - i * this.jointDist, y: this.y });
      }

      this.angle = Math.random() * Math.PI * 2;
      // Wild guppies are nimble with rapid burst flicks
      this.baseSpeed = 1.3 + Math.random() * 0.8;
      this.speed = this.baseSpeed;
      this.burstTimer = Math.random() * 80;
      this.tailWave = Math.random() * 100;
      this.tailWaveSpeed = 0.22 + Math.random() * 0.1;

      // Small, realistic tail size (compact round/spade fan, only 10-14px)
      this.tailLength = 11 + Math.random() * 3.5;
      this.tailSpread = 7 + Math.random() * 2.5;

      this.depth = 0.4 + Math.random() * 0.6; // depth layer
    }

    update(width, height, mouse, sectionTheme) {
      // Burst and glide locomotion typical of small Poecilia
      this.burstTimer--;
      if (this.burstTimer <= 0) {
        this.burstTimer = 60 + Math.random() * 120;
        this.speed = this.baseSpeed * (1.8 + Math.random() * 1.2); // Quick dart kick
      } else {
        // Natural water friction drag
        this.speed += (this.baseSpeed - this.speed) * 0.04;
      }

      this.tailWave += this.tailWaveSpeed * (this.speed / this.baseSpeed);

      // Pointer flee reaction (quick evasive dart)
      let isFleeing = false;
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const fleeRadius = 140;

        if (dist < fleeRadius && dist > 1) {
          isFleeing = true;
          const fleeAngle = Math.atan2(dy, dx);
          const diff = fleeAngle - this.angle;
          this.angle += Math.sin(diff) * 0.28;
          this.speed = this.baseSpeed * 3.2; // Quick scatter dart
        }
      }

      // Gentle wandering & current alignment
      if (!isFleeing) {
        const currentAngle = sectionTheme === 'harvest' ? Math.PI * 0.2 : Math.sin(this.tailWave * 0.1) * 0.5;
        this.angle += (Math.random() - 0.5) * 0.12 + (currentAngle - this.angle) * 0.015;
      }

      // Velocity integration
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Boundary steering
      const pad = 60;
      if (this.x < pad) this.angle += 0.09;
      if (this.x > width - pad) this.angle -= 0.09;
      if (this.y < pad) this.angle += 0.09;
      if (this.y > height - pad) this.angle -= 0.09;

      // Seamless wrap
      if (this.x < -80) this.x = width + 40;
      if (this.x > width + 80) this.x = -40;
      if (this.y < -80) this.y = height + 40;
      if (this.y > height + 80) this.y = -40;

      // Spine Inverse Kinematics propagation with rapid small tail oscillation
      this.joints[0].x = this.x;
      this.joints[0].y = this.y;

      for (let i = 1; i < this.numJoints; i++) {
        const prev = this.joints[i - 1];
        const cur = this.joints[i];
        const angle = Math.atan2(cur.y - prev.y, cur.x - prev.x);

        // Fine sinusoidal wiggle focused on the rear 3 vertebrae
        const wiggleAmp = i > 4 ? (i - 4) * 0.55 : 0.15;
        const undulation = Math.sin(this.tailWave - i * 0.65) * wiggleAmp;

        cur.x = prev.x + Math.cos(angle) * this.jointDist + Math.cos(angle + Math.PI / 2) * (undulation * 0.25);
        cur.y = prev.y + Math.sin(angle) * this.jointDist + Math.sin(angle + Math.PI / 2) * (undulation * 0.25);
      }
    }

    draw(ctx, sectionTheme) {
      ctx.save();

      // Section Visibility & Atmospheric Blending
      let opacity = 0.75 + this.depth * 0.25;
      if (sectionTheme === 'story') {
        opacity *= 0.25; // Subtle under text cards
      } else if (sectionTheme === 'harvest') {
        opacity *= 0.9;
      } else if (sectionTheme === 'twilight') {
        opacity = 0.95; // Night water bioluminescence
      }

      ctx.globalAlpha = Math.min(Math.max(opacity, 0.18), 1.0);

      if (sectionTheme === 'twilight') {
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.palette.glow;
      }

      const head = this.joints[0];
      const tailJoint = this.joints[this.numJoints - 1];
      const prevTail = this.joints[this.numJoints - 2];
      const tailAngle = Math.atan2(tailJoint.y - prevTail.y, tailJoint.x - prevTail.x);

      // 1. COMPACT NATURAL SHORT TAIL (ROUND / SPADE WILD FIN)
      ctx.save();
      ctx.translate(tailJoint.x, tailJoint.y);
      ctx.rotate(tailAngle);

      const flick = Math.sin(this.tailWave * 1.5) * 2.2;
      const tl = this.tailLength;
      const ts = this.tailSpread;

      // Small translucent fan gradient
      const tailGrad = ctx.createRadialGradient(0, 0, 2, tl, 0, tl * 1.2);
      tailGrad.addColorStop(0, this.palette.bodyPrimary);
      tailGrad.addColorStop(0.5, this.palette.tailPrimary);
      tailGrad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');

      ctx.fillStyle = tailGrad;
      ctx.strokeStyle = this.palette.tailBorder;
      ctx.lineWidth = 0.6;

      // Natural round/spade-tail shape (not elongated)
      ctx.beginPath();
      ctx.moveTo(0, -1.8);
      // Upper contour
      ctx.bezierCurveTo(tl * 0.4, -ts * 0.9, tl * 0.8, -ts + flick, tl, -ts * 0.4 + flick);
      // Rounded paddle back edge
      ctx.quadraticCurveTo(tl * 1.15, flick, tl, ts * 0.4 + flick);
      // Lower contour
      ctx.bezierCurveTo(tl * 0.8, ts + flick, tl * 0.4, ts * 0.9, 0, 1.8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Natural fine fin rays (5 delicate striations)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 0.5;
      for (let r = -2; r <= 2; r++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(tl * 0.95, (r * (ts * 0.35)) + flick);
        ctx.stroke();
      }
      ctx.restore();

      // 2. SLENDER NATURAL GUPPY BODY CONTOUR
      const leftPoints = [];
      const rightPoints = [];

      // Realistic thickness taper: slender wild profile
      for (let i = 0; i < this.numJoints; i++) {
        const j = this.joints[i];
        const next = this.joints[Math.min(i + 1, this.numJoints - 1)];
        const segmentAngle = Math.atan2(next.y - j.y, next.x - j.x);
        const normal = segmentAngle + Math.PI / 2;

        // Realistic wild thickness: deepest at chest (index 1-2), slender peduncle at rear
        let thickness;
        if (i === 0) thickness = 2.4;
        else if (i === 1) thickness = 4.2; // Chest
        else if (i === 2) thickness = 4.0; // Belly
        else if (i === 3) thickness = 3.4;
        else if (i === 4) thickness = 2.8;
        else if (i === 5) thickness = 2.2;
        else thickness = 1.4; // Slender tail base

        leftPoints.push({
          x: j.x + Math.cos(normal) * thickness,
          y: j.y + Math.sin(normal) * thickness
        });
        rightPoints.push({
          x: j.x - Math.cos(normal) * thickness,
          y: j.y - Math.sin(normal) * thickness
        });
      }

      ctx.beginPath();
      ctx.moveTo(head.x, head.y);
      for (const pt of leftPoints) ctx.lineTo(pt.x, pt.y);
      ctx.lineTo(tailJoint.x, tailJoint.y);
      for (let i = rightPoints.length - 1; i >= 0; i--) ctx.lineTo(rightPoints[i].x, rightPoints[i].y);
      ctx.closePath();

      const bodyGrad = ctx.createLinearGradient(head.x, head.y, tailJoint.x, tailJoint.y);
      bodyGrad.addColorStop(0, '#f8fafc');
      bodyGrad.addColorStop(0.3, this.palette.bodyPrimary);
      bodyGrad.addColorStop(0.7, this.palette.bodySecondary);
      bodyGrad.addColorStop(1, this.palette.bodyPrimary);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // 3. WILD ENDLER MARKINGS: Iridescent Metallic Green Flank & Vivid Orange Spot
      const flankJoint = this.joints[2];
      const midJoint = this.joints[3];
      const bodyAngle = Math.atan2(midJoint.y - flankJoint.y, midJoint.x - flankJoint.x);

      ctx.save();
      ctx.translate(flankJoint.x, flankJoint.y);
      ctx.rotate(bodyAngle);

      // Metallic emerald shine spot (classic wild guppy feature)
      ctx.fillStyle = this.palette.emeraldFlank;
      ctx.beginPath();
      ctx.ellipse(1, 0, 4, 1.8, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Vivid Endler orange stripe
      ctx.fillStyle = this.palette.accentColor;
      ctx.beginPath();
      ctx.ellipse(-2, -0.6, 2.8, 1.2, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Wild camo black spot
      if (this.palette.blackSpots) {
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(3.5, 0.5, 1.1, 0, Math.PI * 2);
        ctx.arc(-4, 0.2, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Small dorsal fin (compact round fan on back)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.strokeStyle = this.palette.tailBorder;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-1, -2.5);
      ctx.quadraticCurveTo(-3, -7.5 + Math.sin(this.tailWave) * 1.2, -7, -3.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // 4. PECTORAL FINS & EYES AT HEAD
      const gillJoint = this.joints[1];
      const headAngle = Math.atan2(head.y - gillJoint.y, head.x - gillJoint.x);

      ctx.save();
      ctx.translate(gillJoint.x, gillJoint.y);
      ctx.rotate(headAngle);

      // Rapid fluttering pectoral fins
      const finFlutter = Math.sin(this.tailWave * 2.2) * 0.45;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.ellipse(0.5, -4.5, 3.8, 1.6, -Math.PI / 4 + finFlutter, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0.5, 4.5, 3.8, 1.6, Math.PI / 4 - finFlutter, 0, Math.PI * 2);
      ctx.fill();

      // Realistic natural eye with golden iris & dark pupil
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(4, -1.8, 1.5, 0, Math.PI * 2);
      ctx.arc(4, 1.8, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(4.3, -1.8, 0.9, 0, Math.PI * 2);
      ctx.arc(4.3, 1.8, 0.9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();
    }
  }

// --- 3 TO 5 SUBTLE GUPPY RIVERBED STONES (PRESERVES FOREGROUND CONTRAST) ---
class GuppyStone {
  constructor(x, y, rx, ry, rotation) {
    [key: string]: any;
    constructor(x: number, y: number, rx: number, ry: number, rotation: number) {
      this.x = x;
      this.y = y;
      this.rx = rx;
      this.ry = ry;
      this.rotation = rotation;
    }

    draw(ctx, isDark) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // 1. Soft ambient underwater shadow (diffused, low opacity so text remains readable)
      ctx.save();
      ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(100, 116, 139, 0.15)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.rx, this.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(15, 20, 28, 0.5)' : 'rgba(203, 213, 225, 0.5)';
      ctx.fill();
      ctx.restore();

      // 2. Smooth 3D radial gradient (harmonizes with background theme)
      const grad = ctx.createRadialGradient(
        -this.rx * 0.3, -this.ry * 0.3, this.rx * 0.1,
        0, 0, Math.max(this.rx, this.ry)
      );

      if (isDark) {
        grad.addColorStop(0, '#384434'); // Highlight from underwater sanctuary lamp
        grad.addColorStop(0.65, '#222B20'); // Natural nocturnal stone tone
        grad.addColorStop(1, '#111710'); // Dark riverbed edge
      } else {
        grad.addColorStop(0, '#FFFDF7'); // Sunlit pebble sheen
        grad.addColorStop(0.65, '#EFE8D6'); // Smooth daytime river stone
        grad.addColorStop(1, '#D8D2C0'); // Soft shadowed rim
      }

      ctx.beginPath();
      ctx.ellipse(0, 0, this.rx, this.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // 3. Delicate mineral rim sheen
      ctx.strokeStyle = isDark ? 'rgba(169, 185, 159, 0.28)' : 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = isDark ? 1.0 : 0.8;
      ctx.stroke();

      ctx.restore();
    }
  }

// --- CORNER HANGING PLANTS & OVERHANGING RIVER CANOPY VINES ---
class CornerHangingPlants {
  constructor(corner, width, height) {
    [key: string]: any;
    constructor(corner: string, width: number, height: number) {
      this.corner = corner; // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
      this.vines = [];
      const count = 4 + Math.floor(Math.random() * 3); // 4-6 trailing fronds

      for (let i = 0; i < count; i++) {
        let originX, originY, baseAngle;
        if (corner === 'top-left') {
          originX = Math.random() * 90;
          originY = Math.random() * 50;
          baseAngle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35; // Hanging down-right
        } else if (corner === 'top-right') {
          originX = width - Math.random() * 90;
          originY = Math.random() * 50;
          baseAngle = (Math.PI * 3 / 4) + (Math.random() - 0.5) * 0.35; // Hanging down-left
        } else if (corner === 'bottom-left') {
          originX = Math.random() * 80;
          originY = height - Math.random() * 40;
          baseAngle = (-Math.PI / 4) + (Math.random() - 0.5) * 0.35; // Floating up-right
        } else {
          originX = width - Math.random() * 80;
          originY = height - Math.random() * 40;
          baseAngle = (-Math.PI * 3 / 4) + (Math.random() - 0.5) * 0.35; // Floating up-left
        }

        this.vines.push({
          originX,
          originY,
          baseAngle,
          length: 120 + Math.random() * 110,
          leafCount: 7 + Math.floor(Math.random() * 4),
          waveSpeed: 0.012 + Math.random() * 0.01,
          waveOffset: Math.random() * Math.PI * 2,
          amplitude: 10 + Math.random() * 12
        });
      }
    }

    draw(ctx, time, isDark) {
      ctx.save();

      this.vines.forEach((v) => {
        ctx.save();
        ctx.translate(v.originX, v.originY);
        ctx.rotate(v.baseAngle);

        const segments = 5;
        const segLen = v.length / segments;
        const pts = [{ x: 0, y: 0 }];

        for (let s = 1; s <= segments; s++) {
          const sway = Math.sin(time * v.waveSpeed + v.waveOffset + s * 0.5) * (v.amplitude * (s / segments));
          pts.push({ x: sway, y: s * segLen });
        }

        // 1. Slender trailing vine stem
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let s = 1; s <= segments; s++) {
          ctx.lineTo(pts[s].x, pts[s].y);
        }
        ctx.strokeStyle = isDark ? 'rgba(34, 197, 94, 0.4)' : 'rgba(21, 128, 61, 0.5)';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // 2. Cascading translucent leaves along the vine
        for (let l = 1; l < v.leafCount; l++) {
          const t = l / v.leafCount;
          const segIdx = Math.min(Math.floor(t * segments), segments - 1);
          const nextIdx = segIdx + 1;
          const localT = (t * segments) - segIdx;
          const lx = pts[segIdx].x + (pts[nextIdx].x - pts[segIdx].x) * localT;
          const ly = pts[segIdx].y + (pts[nextIdx].y - pts[segIdx].y) * localT;

          const leafSize = (1 - t * 0.35) * (11 + (l % 2) * 4);
          const side = l % 2 === 0 ? 1 : -1;
          const leafAngle = (side * Math.PI / 3) + Math.sin(time * v.waveSpeed + l) * 0.2;

          ctx.save();
          ctx.translate(lx, ly);
          ctx.rotate(leafAngle);

          // Soft botanical gradient with high transparency so foreground text contrast stays clean
          const leafGrad = ctx.createRadialGradient(0, 0, 1, 0, leafSize * 0.6, leafSize);
          if (isDark) {
            leafGrad.addColorStop(0, 'rgba(169, 185, 159, 0.55)');   // Luminous soft sage highlight from pool lamp
            leafGrad.addColorStop(0.7, 'rgba(44, 74, 54, 0.35)');  // Deep forest green body
            leafGrad.addColorStop(1, 'rgba(15, 20, 16, 0.2)');     // Nocturnal rim
          } else {
            leafGrad.addColorStop(0, 'rgba(215, 230, 195, 0.70)');  // Sun-drenched fresh leaf
            leafGrad.addColorStop(0.7, 'rgba(44, 74, 54, 0.45)');   // Clear stream forest green
            leafGrad.addColorStop(1, 'rgba(31, 51, 38, 0.25)');    // Natural leaf edge
          }

          ctx.beginPath();
          ctx.ellipse(0, leafSize * 0.5, leafSize * 0.32, leafSize * 0.65, 0, 0, Math.PI * 2);
          ctx.fillStyle = leafGrad;
          ctx.fill();

          ctx.strokeStyle = isDark ? 'rgba(169, 185, 159, 0.25)' : 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          ctx.restore();
        }

        ctx.restore();
      });

      ctx.restore();
    }
  }

// Generate exactly 3-5 smooth resting stones and corner hanging plants
function generateBackgroundElements(width, height) {
  // Exactly 4 smooth guppy resting stones placed at non-intrusive coordinates
  const stones = [
    new GuppyStone(width * 0.16, height * 0.30, 48, 32, 0.4),
    new GuppyStone(width * 0.84, height * 0.26, 52, 36, -0.45),
    new GuppyStone(width * 0.22, height * 0.82, 44, 28, 0.75),
    new GuppyStone(width * 0.78, height * 0.76, 56, 38, -0.3)
  ];

  // Hanging corner plants framing the edges
  const cornerPlants = [
    new CornerHangingPlants('top-left', width, height),
    new CornerHangingPlants('top-right', width, height),
    new CornerHangingPlants('bottom-left', width, height),
    new CornerHangingPlants('bottom-right', width, height)
  ];

  return { stones, cornerPlants };
}

// --- FLUID CAUSTIC LIGHT RIPPLE PARTICLES (MURK EFFECT) ---
class FluidRipple {
  constructor(x, y, speedMult = 1) {
    [key: string]: any;
    constructor(x: number, y: number, speedMult = 1) {
      this.x = x;
      this.y = y;
      this.radius = 2;
      this.maxRadius = 110 * speedMult;
      this.opacity = 0.55;
      this.expandSpeed = 2.4 * speedMult;
    }
    update() {
      this.radius += this.expandSpeed;
      this.opacity -= 0.012;
    }
    draw(ctx, isDark) {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = isDark
        ? `rgba(169, 185, 159, ${this.opacity * 0.75})`
        : `rgba(44, 74, 54, ${this.opacity * 0.65})`;
      ctx.lineWidth = 1.6;
      if (isDark) {
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(169, 185, 159, 0.5)';
      }
      ctx.stroke();
      ctx.restore();
    }
  }

export default function App() {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('midhula-theme');
      return saved === 'dark' || saved === 'light' ? saved : 'light';
    } catch {
      return 'light';
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mouseRef = useRef({ x: null, y: null, lastX: 0, lastY: 0, speed: 0 });
  const ripplesRef = useRef([]);
  const themeRef = useRef(theme);

  // Sync theme state with DOM data-theme attribute and localStorage
  useEffect(() => {
    themeRef.current = theme;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('midhula-theme', theme);
    } catch { }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const guppyScrollRef = useRef<HTMLDivElement>(null);

  const scrollGuppies = (direction: 'left' | 'right') => {
    if (guppyScrollRef.current) {
      const scrollAmount = guppyScrollRef.current.clientWidth < 640 ? 260 : 540;
      guppyScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Enable mouse wheel horizontal scrolling & click-drag scrolling without scroller pipe
  useEffect(() => {
    const el = guppyScrollRef.current;
    if (!el) return;

    // Convert mouse wheel scroll to horizontal scroll
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        const canScrollLeft = el.scrollLeft > 0 && e.deltaY < 0;
        const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 2 && e.deltaY > 0;

        if (canScrollLeft || canScrollRight) {
          e.preventDefault();
          el.scrollBy({
            left: e.deltaY * 1.25,
            behavior: 'auto'
          });
        }
      }
    };

    // Drag-to-scroll support with mouse
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onMouseDown = (e: MouseEvent) => {
      // Don't drag if clicking buttons or links
      if ((e.target as HTMLElement).closest('button, a')) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollStart = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };

    const onMouseUpOrLeave = () => {
      isDown = false;
      el.style.cursor = 'grab';
      el.style.removeProperty('user-select');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.4;
      el.scrollLeft = scrollStart - walk;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseup', onMouseUpOrLeave);
    el.addEventListener('mouseleave', onMouseUpOrLeave);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseup', onMouseUpOrLeave);
      el.removeEventListener('mouseleave', onMouseUpOrLeave);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Setup Murk Fluid Canvas Animation Loop with 7 Short-Tail Guppies (including Red & Black varieties)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize 3-5 background stones & corner hanging plants
    let bgElements = generateBackgroundElements(width, height);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      bgElements = generateBackgroundElements(width, height);
    };
    window.addEventListener('resize', onResize);

    // Initialize exactly 7 realistic short-tail / wild guppy fishes (original 5 + red + black)
    const GUPPY_COUNT = 7;
    const guppyFlock = Array.from({ length: GUPPY_COUNT }, (_, index) => new ShortTailGuppy(width, height, index));

    // Suspended aquatic motes (sunlight-catching bubbles/dust by day, bioluminescent water sparks by night)
    const MOTE_COUNT = 24;
    const waterMotes = Array.from({ length: MOTE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.0 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.15 - Math.random() * 0.3,
      alpha: 0.2 + Math.random() * 0.55,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      pulseOffset: Math.random() * Math.PI * 2
    }));

    // Pointer Tracker for Murk Fluid displacement
    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX !== undefined && clientY !== undefined) {
        const dx = clientX - (mouseRef.current.lastX || clientX);
        const dy = clientY - (mouseRef.current.lastY || clientY);
        const dist = Math.hypot(dx, dy);

        mouseRef.current = {
          x: clientX,
          y: clientY,
          lastX: clientX,
          lastY: clientY,
          speed: dist
        };

        // Create fluid ripples based on speed
        if (dist > 6 && Math.random() > 0.4) {
          ripplesRef.current.push(new FluidRipple(clientX, clientY, Math.min(dist / 10, 1.8)));
        }
      }
    };

    const onPointerLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave);

    // Water Caustic Grid Clock
    let causticTime = 0;

    const render = () => {
      causticTime += 0.02;
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';

      // 1. BASE WATER COLUMN (FRESH SUNLIT DAY STREAM vs ILLUMINATED NOCTURNAL SANCTUARY STREAM)
      let bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (isDark) {
        // Deep nocturnal stream water under night sky
        bgGrad.addColorStop(0, '#090D0A');
        bgGrad.addColorStop(0.45, '#101612');
        bgGrad.addColorStop(1, '#070A08');
      } else {
        // Clear, sun-warmed mountain stream column
        bgGrad.addColorStop(0, '#FAF5E8');
        bgGrad.addColorStop(0.45, '#EFE7D4');
        bgGrad.addColorStop(1, '#E4D9BD');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      if (!isDark) {
        // ==========================================
        // DAYTIME: NATURAL SUNLIGHT SHAFTS (GOD RAYS)
        // ==========================================
        ctx.save();
        const rayCount = 4;
        for (let r = 0; r < rayCount; r++) {
          const sway = Math.sin(causticTime * 0.4 + r * 1.5) * 35;
          const startX = width * (0.1 + r * 0.25) + sway;
          const rayW = width * 0.14;
          const rayGrad = ctx.createLinearGradient(startX, 0, startX + 160, height);
          rayGrad.addColorStop(0, 'rgba(255, 252, 235, 0.18)');
          rayGrad.addColorStop(0.35, 'rgba(255, 248, 220, 0.09)');
          rayGrad.addColorStop(0.8, 'rgba(250, 242, 218, 0.03)');
          rayGrad.addColorStop(1, 'rgba(246, 241, 228, 0)');

          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(startX - 40, 0);
          ctx.lineTo(startX + rayW + 40, 0);
          ctx.lineTo(startX + rayW + 220, height);
          ctx.lineTo(startX + 60, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      } else {
        // ==========================================
        // NIGHTTIME: UNDERWATER SANCTUARY LIGHTING & MOONBEAM ("WITH SOME LIGHTING")
        // ==========================================
        ctx.save();

        // Cool silver lunar light shaft slanting from top right
        const moonGrad = ctx.createLinearGradient(width * 0.72, 0, width * 0.58, height);
        moonGrad.addColorStop(0, 'rgba(165, 195, 215, 0.09)');
        moonGrad.addColorStop(0.5, 'rgba(140, 180, 205, 0.035)');
        moonGrad.addColorStop(1, 'rgba(10, 15, 12, 0)');
        ctx.fillStyle = moonGrad;
        ctx.beginPath();
        ctx.moveTo(width * 0.62, 0);
        ctx.lineTo(width * 0.88, 0);
        ctx.lineTo(width * 0.74, height);
        ctx.lineTo(width * 0.44, height);
        ctx.closePath();
        ctx.fill();

        // Submerged sanctuary lighting pools / ambient underwater landscape lamps
        const sanctuaryLights = [
          { x: width * 0.22, y: height * 0.36, r: 260, color: '169, 185, 159' }, // Stone cluster illumination
          { x: width * 0.76, y: height * 0.66, r: 290, color: '145, 180, 150' }, // Lower stream lantern
          { x: width * 0.50, y: height * 0.20, r: 200, color: '185, 195, 155' }  // Upper pool lamp
        ];

        sanctuaryLights.forEach((spot, idx) => {
          const pulse = 1 + Math.sin(causticTime * 0.7 + idx * 2.2) * 0.06;
          const rad = spot.r * pulse;
          const spotGrad = ctx.createRadialGradient(spot.x, spot.y, 4, spot.x, spot.y, rad);
          spotGrad.addColorStop(0, `rgba(${spot.color}, 0.22)`);
          spotGrad.addColorStop(0.35, `rgba(${spot.color}, 0.11)`);
          spotGrad.addColorStop(0.7, `rgba(${spot.color}, 0.035)`);
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = spotGrad;
          ctx.beginPath();
          ctx.arc(spot.x, spot.y, rad, 0, Math.PI * 2);
          ctx.fill();

          // Submerged stone lantern glow emitter
          ctx.beginPath();
          ctx.arc(spot.x, spot.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 230, 0.65)';
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${spot.color}, 0.8)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        ctx.restore();
      }

      // 2. SMOOTH RESTING RIVER STONES
      bgElements.stones.forEach((stone) => {
        stone.draw(ctx, isDark);
      });

      // 3. ORGANIC WATER CAUSTIC SIMULATION (DAYLIGHT SUN REFLECTIONS vs NIGHT WATER GLOW)
      ctx.save();
      ctx.globalAlpha = isDark ? 0.15 : 0.12;
      ctx.strokeStyle = isDark ? '#A9B99F' : '#2C4A36';
      ctx.lineWidth = isDark ? 1.3 : 1.1;

      const step = 80;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 40) {
          const xOffset = Math.sin(y * 0.02 + causticTime + x * 0.01) * 16;
          if (y === 0) ctx.moveTo(x + xOffset, y);
          else ctx.lineTo(x + xOffset, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 4. SUSPENDED AQUATIC MOTES (SUNLIGHT PARTICLES vs ILLUMINATED NOCTURNAL PLANKTON)
      ctx.save();
      waterMotes.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const pulse = Math.sin(causticTime * 2 + m.pulseOffset) * 0.2;
        const currentAlpha = Math.max(0.1, m.alpha + pulse);

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = `rgba(169, 185, 159, ${currentAlpha * 0.65})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(169, 185, 159, 0.7)';
        } else {
          ctx.fillStyle = `rgba(255, 252, 235, ${currentAlpha * 0.45})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });
      ctx.restore();

      // 5. FLUID RIPPLES
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.update();
        r.draw(ctx, isDark);
        if (r.opacity <= 0) ripplesRef.current.splice(i, 1);
      }

      // 6. 7 SHORT-TAIL GUPPY AGENTS (NATURAL DAY SHIMMER vs NIGHT BIOLUMINESCENCE WITH LIGHTING)
      guppyFlock.forEach((guppy) => {
        guppy.update(width, height, mouseRef.current, isDark ? 'twilight' : 'day');
        guppy.draw(ctx, isDark ? 'twilight' : 'day');
      });

      // 7. CORNER HANGING PLANTS (Cascading foliage framing the viewport corners)
      bgElements.cornerPlants.forEach((cp) => {
        cp.draw(ctx, causticTime, isDark);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  const openWhatsApp = (msg) => {
    const openWhatsApp = (msg?: string) => {
      const text = encodeURIComponent(
        msg || "Hello Midhula Farm Hut! I'm reaching out from your website to inquire about cottage availability and stream activities."
      );
      window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
    };

    return (
      <div
        className="relative min-h-screen font-sans selection:bg-[var(--accent-primary)] selection:text-white overflow-x-hidden transition-colors duration-300"
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >

        {/* FIXED MURK FLUID CANVAS LAYER */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-auto z-0"
        />

        {/* VIGNETTE & GRAIN REFLECTION */}
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.2) 100%)',
            opacity: theme === 'dark' ? 0.6 : 0.2
          }}
        />

        {/* FLOATING THEME SWITCH TOGGLE BUTTON (BOTTOM-LEFT CORNER) */}
        <button
          onClick={toggleTheme}
          aria-label="Switch Theme"
          title={theme === 'dark' ? "Switch to Fresh Organic Light Theme" : "Switch to Premium Organic Dark Theme"}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 p-3.5 sm:p-4 rounded-full border shadow-2xl backdrop-blur-xl hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(38, 44, 34, 0.94)' : 'rgba(255, 253, 247, 0.96)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-[var(--accent-primary)] transition-transform duration-300 group-hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-[var(--accent-primary)] transition-transform duration-300 group-hover:-rotate-12" />
          )}
          <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap sm:group-hover:max-w-xs transition-all duration-300 text-xs uppercase tracking-wider font-bold">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {/* EDITORIAL FLOATING NAVIGATION BAR (SAME AS FOOTER BACKGROUND) */}
        <header
          className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 shadow-md"
          style={{
            backgroundColor: 'var(--bg-nav-footer)',
            borderColor: 'var(--border-color)',
            color: '#F3F4F6'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

            {/* Brand Identity */}
            <a href="#hero" className="flex items-center gap-3.5 group">
              <div
                className="w-11 h-11 rounded-full overflow-hidden border-2 shadow-lg group-hover:scale-105 transition-all bg-black flex items-center justify-center flex-shrink-0"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <img
                  src="/logo.jpg"
                  alt="Midhula Farm Hut Logo"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <div>
                <span className="font-display tracking-[0.22em] text-lg font-bold uppercase block leading-tight text-[#F3F4F6]">
                  Midhula
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] font-semibold block" style={{ color: 'var(--accent-secondary)' }}>
                  Farm Hut
                </span>
              </div>
            </a>

            {/* Desktop Editorial Menu */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#F3F4F6]/80">

              <a href="#story" className="hover:text-[var(--accent-primary)] transition-colors">About</a>
              <a href="#harvest" className="hover:text-[var(--accent-primary)] transition-colors">Guppy Varieties</a>
              <a href="#dispatches" className="hover:text-[var(--accent-primary)] transition-colors">Live Dispatches</a>
              <a href="#location" className="hover:text-[var(--accent-primary)] transition-colors">Location</a>
            </nav>

            {/* Direct CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => openWhatsApp("Hi Midhula Farm Hut, I would like to inquire about ordering live guppy varieties.")}
                className="px-6 py-2.5 rounded-full text-white text-xs font-semibold uppercase tracking-widest shadow-md transition-all flex items-center gap-2 hover:opacity-90 active:scale-95 cursor-pointer"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                <span>Order Guppies</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full border text-[#F3F4F6] transition-colors"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-color)'
                }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden px-6 py-8 border-b flex flex-col gap-6 text-sm uppercase tracking-widest font-semibold animate-in fade-in shadow-2xl"
              style={{
                backgroundColor: 'var(--bg-nav-footer)',
                borderColor: 'var(--border-color)',
                color: '#F3F4F6'
              }}
            >
              <div
                className="flex items-center gap-3 pb-4 border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <img
                  src="/logo.jpg"
                  alt="Midhula Farm Hut Logo"
                  className="w-10 h-10 rounded-full object-cover shadow-md border"
                  style={{ borderColor: 'var(--border-color)' }}
                />
                <div>
                  <span className="font-display text-base tracking-[0.18em] font-bold uppercase block leading-tight text-[#F3F4F6]">
                    Midhula Farm Hut
                  </span>
                  <span
                    className="text-[9px] tracking-wider uppercase font-medium"
                    style={{ color: 'var(--accent-secondary)' }}
                  >
                    Living Stream Retreat
                  </span>
                </div>
              </div>

              <a href="#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--accent-primary)] transition-colors">About</a>
              <a href="#harvest" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--accent-primary)] transition-colors">Guppy Varieties</a>
              <a href="#dispatches" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--accent-primary)] transition-colors">Live Dispatches</a>
              <a href="#location" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--accent-primary)] transition-colors">Location</a>
              <button
                onClick={() => { setMobileMenuOpen(false); openWhatsApp("Hi Midhula Farm Hut, I would like to order live guppy varieties."); }}
                className="w-full py-3.5 rounded-full text-white flex items-center justify-center gap-2 font-semibold tracking-wider hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                <MessageCircle className="w-4 h-4" />
                Order Guppies on WhatsApp
              </button>
            </div>
          )}
        </header>

        {/* 1. HERO SECTION: SUNLIT FLUID POND */}
        <section id="hero" className="relative z-10 min-h-[92vh] flex flex-col justify-center items-center px-6 text-center">

          {/* Large Editorial Title */}
          <h1
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight uppercase leading-[0.92]"
            style={{ color: 'var(--text-primary)' }}
          >
            Midhula <br />
            <span
              className="italic font-light transition-colors duration-300"
              style={{ color: 'var(--accent-primary)' }}
            >
              Farm Hut
            </span>
          </h1>

          <p
            className="max-w-xl mx-auto mt-8 text-sm sm:text-base md:text-lg font-light leading-relaxed transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Where cold, unpolluted mountain streams meet native wild guppies, natural clay huts, and restorative farm living.
          </p>

          {/* Hero Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <button
              onClick={() => openWhatsApp("Hi, I want to book a stay at Midhula Farm Hut.")}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-white text-xs font-semibold uppercase tracking-[0.25em] shadow-xl transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              Explore Experiences
            </button>
            <a
              href="#story"
              className="w-full sm:w-auto px-8 py-4 rounded-full border text-xs font-semibold uppercase tracking-[0.25em] transition-all backdrop-blur-md hover:opacity-80"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              The Ecosystem
            </a>
          </div>

          {/* Scroll Prompt */}
          <div
            className="absolute bottom-8 flex flex-col items-center gap-2 opacity-60"
            style={{ color: 'var(--text-secondary)' }}
          >
            {/* <span className="text-[10px] uppercase tracking-[0.3em]">Scroll Down</span> */}
            <div
              className="w-px h-8 animate-pulse"
              style={{ backgroundColor: 'var(--border-color)' }}
            />
          </div>
        </section>

        {/* 2. ABOUT & FROSTED GLASS SECTION */}
        <section
          id="story"
          className="relative z-10 py-32 px-6 transition-colors duration-300"
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="max-w-6xl mx-auto">

            <div className="grid md:grid-cols-12 gap-12 items-center">

              <div className="md:col-span-5">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.3em] block mb-3"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Symbiotic Bio-Filter
                </span>
                <h2
                  className="font-serif text-3xl sm:text-5xl font-normal leading-tight mb-6"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Wild Guppies as Natural Guardians.
                </h2>
                <p
                  className="text-sm sm:text-base font-light leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  In our water channels, agile native wild-type guppies feed continuously on micro-larvae, eliminating pests naturally without chemical pesticides.
                </p>

                <div
                  className="p-6 rounded-3xl border shadow-sm space-y-4 backdrop-blur-xl"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Waves className="w-5 h-5" style={{ color: 'var(--accent-micro)' }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                      Perpetual River Filtration
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Feather className="w-5 h-5" style={{ color: 'var(--accent-secondary)' }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                      Zero Chemical Footprint
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                      Living Aquaponic Soil Beds
                    </span>
                  </div>
                </div>
              </div>

              {/* Editorial Visual Collage */}
              <div className="md:col-span-7 grid grid-cols-2 gap-4">
                <div
                  className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border group"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=800&q=80"
                    alt="Clear brook with river stones"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div
                  className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border mt-8 group"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80"
                    alt="Bamboo eco-cottage"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. ORDER GUPPY VARIETIES SECTION */}
        <section
          id="harvest"
          className="relative z-10 py-32 px-6 border-t border-b transition-colors duration-300"
          style={{
            backgroundColor: 'var(--bg-surface-alt)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-[0.3em] block mb-2"
                  style={{ color: 'var(--accent-secondary)' }}
                >
                  Selective Stream Breeding
                </span>
                <h2
                  className="font-serif text-3xl sm:text-5xl font-normal"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Order Guppy Varieties
                </h2>
                <p
                  className="mt-2 text-xs sm:text-sm font-light max-w-xl"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Authentic pure-strain wild Endlers and short-tail guppies raised in living mountain stream channels. Use mouse wheel or drag horizontally to explore all varieties.
                </p>
              </div>

              {/* Scroll Navigation Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => scrollGuppies('left')}
                  aria-label="Scroll left"
                  className="p-3 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollGuppies('right')}
                  aria-label="Scroll right"
                  className="p-3 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Guppy Varieties Single Row Horizontal Scroll (Hidden Scrollbar Pipe & Mouse Wheel Enabled) */}
            <div
              ref={guppyScrollRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth mb-16 no-scrollbar cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {[
                {
                  title: "Scarlet Crimson Wild Endler",
                  tag: "Top Seller • Pure Line",
                  morph: "Wild Endler",
                  rate: "₹499 / Pair",
                  colorDot: "#ef4444",
                  desc: "Vibrant fiery scarlet body with an iridescent metallic ruby patch and classic short rounded caudal fin. Vigorous surface feeder raised in natural sunlit stream flow.",
                  specs: ["Fiery Crimson Flank", "High Vigor", "pH 6.8 - 7.8"],
                  img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80"
                },
                {
                  title: "Midnight Obsidian Wild Type",
                  tag: "Rare Morph",
                  morph: "Velvet Charcoal",
                  rate: "₹599 / Pair",
                  colorDot: "#18181b",
                  desc: "Deep velvet obsidian body with subtle metallic smoke-graphite sheen and slate-silver dorsal streak. Highly hardy, calm, and striking against green planted aquascapes.",
                  specs: ["Velvet Obsidian", "Hardy Morphs", "pH 7.0 - 8.0"],
                  img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80"
                },
                {
                  title: "Wild Stream Endler (Classic)",
                  tag: "Heritage Bloodline",
                  morph: "Cumana Pure Type",
                  rate: "₹449 / Pair",
                  colorDot: "#2a9d8f",
                  desc: "Signature wild Endler markings with luminous emerald green flank bar, radiant orange side streak, and dark peacock eye spot. Exceptionally agile and prolific.",
                  specs: ["Emerald & Flame Stripe", "Pure Bloodline", "pH 6.5 - 7.5"],
                  img: "https://images.unsplash.com/photo-1520315341274-6ddc90db2077?auto=format&fit=crop&w=800&q=80"
                },
                {
                  title: "Emerald Top-Sword Wild",
                  tag: "Show Grade",
                  morph: "Swordtail Variant",
                  rate: "₹549 / Pair",
                  colorDot: "#38b000",
                  desc: "Distinctive extended top-sword caudal ray with brilliant electric green luminescence across the spine. Energetic schooling fish bred in oxygen-rich river gravel.",
                  specs: ["Top-Sword Fin", "Electric Luminescence", "pH 6.8 - 7.6"],
                  img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
                },
                {
                  title: "Tiger Spade Wild Type",
                  tag: "Exotic Pattern",
                  morph: "Spade-Tail Morph",
                  rate: "₹499 / Pair",
                  colorDot: "#e09f3e",
                  desc: "Tigrine barring across a warm amber-bronze body with classic spade-shaped tail fin. Naturally hardy, peaceful with shrimp, and naturally disease-resistant.",
                  specs: ["Tiger Striped Flank", "Spade Caudal", "pH 7.0 - 7.8"],
                  img: "https://images.unsplash.com/photo-1584553421349-3557471bed79?auto=format&fit=crop&w=800&q=80"
                },
                {
                  title: "Breeder Starter Trio (1M + 2F)",
                  tag: "Best Value Pack",
                  morph: "Colony Foundation",
                  rate: "₹799 / Trio",
                  colorDot: "#8b5cf6",
                  desc: "1 prime select male of your choice paired with 2 fertile healthy Opal Stream females. The ideal starter set to build a self-sustaining wild stream colony at home.",
                  specs: ["1 Male + 2 Females", "Acclimation Guide", "Live Arrival Guarantee"],
                  img: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80"
                }
              ].map((card, i) => (
                <div
                  key={i}
                  className="w-[78vw] max-w-[270px] sm:w-[240px] sm:min-w-[240px] md:w-[250px] md:min-w-[250px] lg:w-[265px] lg:min-w-[265px] xl:w-[275px] xl:min-w-[275px] shrink-0 snap-start group rounded-2xl sm:rounded-3xl border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <div>
                    <div className="h-36 sm:h-40 w-full overflow-hidden relative">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div
                        className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border flex items-center gap-1.5"
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--accent-secondary)'
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ backgroundColor: card.colorDot }}
                        />
                        {card.tag}
                      </div>
                      <div
                        className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 py-0.5 rounded-full backdrop-blur-md text-[11px] font-bold shadow-sm border"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {card.rate}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[9px] uppercase font-bold tracking-widest"
                          style={{ color: 'var(--accent-secondary)' }}
                        >
                          {card.morph}
                        </span>
                      </div>

                      <h3
                        className="font-serif text-lg sm:text-xl font-normal mb-2 leading-snug transition-colors group-hover:text-[var(--accent-primary)]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {card.title}
                      </h3>

                      <p
                        className="text-xs font-light leading-relaxed mb-3.5 line-clamp-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {card.desc}
                      </p>

                      {/* Characteristic badges */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {card.specs.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-full text-[9px] font-medium border"
                            style={{
                              backgroundColor: 'var(--bg-surface-alt)',
                              borderColor: 'var(--border-color)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <button
                      onClick={() => openWhatsApp(`Hello Midhula Farm Hut, I would like to order the ${card.title} (${card.rate}).`)}
                      className="w-full py-2.5 rounded-full text-white transition-all text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 shadow-md cursor-pointer"
                      style={{
                        backgroundColor: 'var(--accent-primary)'
                      }}
                    >
                      <span>Order via WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery & Care Trust Badges */}
            <div
              className="rounded-3xl border p-8 sm:p-10 transition-colors duration-300"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: 'var(--bg-surface-alt)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--accent-secondary)'
                    }}
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                      Live Arrival Guarantee
                    </h4>
                    <p className="text-xs font-light" style={{ color: 'var(--text-secondary)' }}>
                      100% replacement or refund guarantee on all nationwide live shipments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: 'var(--bg-surface-alt)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--accent-secondary)'
                    }}
                  >
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                      Spring Acclimatized
                    </h4>
                    <p className="text-xs font-light" style={{ color: 'var(--text-secondary)' }}>
                      Raised in fresh mineral-rich mountain water with natural live feeds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: 'var(--bg-surface-alt)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--accent-secondary)'
                    }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                      Oxygen Thermal Packing
                    </h4>
                    <p className="text-xs font-light" style={{ color: 'var(--text-secondary)' }}>
                      Breathable pure oxygen bags encased in insulated thermocol shipping crates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: 'var(--bg-surface-alt)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--accent-secondary)'
                    }}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                      Pre-Dispatch Video
                    </h4>
                    <p className="text-xs font-light" style={{ color: 'var(--text-secondary)' }}>
                      Receive WhatsApp videos of your exact selected pair before they are packaged.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. LIVE DISPATCHES & SOCIAL MEDIA GALLERY */}
        <section
          id="dispatches"
          className="relative z-10 py-24 px-6 border-t transition-colors duration-300"
          style={{
            backgroundColor: 'var(--bg-surface-alt)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] block mb-2"
                  style={{ color: 'var(--accent-secondary)' }}
                >
                  Visual Chronicles & Farm Updates
                </span>
                <h2
                  className="font-serif text-3xl sm:text-5xl font-normal"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Live Dispatches
                </h2>
                <p
                  className="mt-2 text-xs sm:text-sm font-light max-w-xl"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Static glimpses from our living stream channels, selective breeding lines, and daily pond dispatches.
                </p>
              </div>

              {/* Social Channels with Facebook Included */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  title="Follow on Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram</span>
                </a>

                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  title="Subscribe on YouTube"
                >
                  <Youtube className="w-4 h-4 text-[#FF0000]" />
                  <span>YouTube</span>
                </a>

                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  title="Connect on Facebook"
                >
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Static Gallery: Exactly 4 Images in Single Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Guppy School Feeding in Stream",
                  tag: "Stream Feeding",
                  img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Morning Dew on Living Stone Brook",
                  tag: "Natural Brook",
                  img: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Pure Crimson Wild Endlers Colony",
                  tag: "Endler Line",
                  img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Oxygen Safe Packing & Dispatch",
                  tag: "Live Packing",
                  img: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=600&q=80"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Tag Badge */}
                  <div
                    className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.55)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF'
                    }}
                  >
                    <span>{item.tag}</span>
                  </div>

                  {/* Static Text Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
                    <h4 className="font-serif text-sm sm:text-base font-normal leading-snug text-white">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. LOCATION & MAP VIEW SECTION */}
        <section
          id="location"
          className="relative z-10 py-24 px-6 border-t transition-colors duration-300"
          style={{
            backgroundColor: 'var(--bg-surface-alt)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] block mb-2"
                  style={{ color: 'var(--accent-secondary)' }}
                >
                  Sanctuary Coordinates
                </span>
                <h2
                  className="font-serif text-3xl sm:text-5xl font-normal"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Find Midhula Farm Hut
                </h2>
                <p
                  className="mt-2 text-xs sm:text-sm font-light max-w-xl"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Nooluvally, Mupliyam - Chembuchira Rd, Keralam 680312. Open for scheduled farm visits, guppy tank consultations, and live strain collections.
                </p>
              </div>

              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-white text-xs font-semibold uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer self-start md:self-auto"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Map View with Animated Radar & Ping Beacon */}
            <div
              className="relative rounded-3xl border overflow-hidden shadow-2xl transition-colors duration-300"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              {/* Embedded Google Maps View */}
              <div className="w-full h-[400px] sm:h-[460px] relative">
                <iframe
                  title="Midhula Farm Hut Location Map"
                  src="https://maps.google.com/maps?q=10.3974253,76.3461262&hl=en&z=16&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05] brightness-[0.98]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Animated Floating Beacon Pin Card Overlay */}
                <div
                  className="absolute top-6 left-6 z-20 max-w-xs sm:max-w-sm p-4 rounded-2xl border backdrop-blur-xl shadow-xl transition-all"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Radar Pulse Pin Animation */}
                    <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                      <span
                        className="absolute w-8 h-8 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      />
                      <span
                        className="absolute w-5 h-5 rounded-full animate-pulse opacity-50"
                        style={{ backgroundColor: 'var(--accent-secondary)' }}
                      />
                      <div
                        className="relative w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-500 inline-block" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Live Location Pin
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-semibold leading-tight mt-0.5" style={{ color: 'var(--text-primary)' }}>
                        Midhula Farm Hut
                      </h3>
                      <p className="text-[11px] font-medium mt-1 leading-snug" style={{ color: 'var(--text-primary)' }}>
                        Nooluvally, Mupliyam - Chembuchira Rd
                      </p>
                      <p className="text-[11px] font-light leading-snug" style={{ color: 'var(--text-secondary)' }}>
                        Keralam 680312 • 10°23&apos;50.7&quot;N 76°20&apos;46.1&quot;E
                      </p>
                      <a
                        href={MAPS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider hover:underline"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        <span>Open Live Navigation</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Facts Overlay */}
                <div
                  className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-xl shadow-lg text-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <TreePine className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">Nooluvally, Mupliyam</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Keralam 680312</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. TWILIGHT FOOTER (CHARCOAL NAV/FOOTER AS SPECIFIED) */}
        <footer
          id="footer"
          className="relative z-10 pt-28 pb-16 px-6 border-t transition-colors duration-300"
          style={{
            backgroundColor: 'var(--bg-nav-footer)',
            borderColor: 'var(--border-color)',
            color: '#F3F4F6'
          }}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 mb-20">

            <div className="md:col-span-6">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 shadow-xl bg-black/60 flex-shrink-0 flex items-center justify-center"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <img
                    src="/logo.jpg"
                    alt="Midhula Farm Hut Emblem"
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.15em] uppercase leading-none text-[#F3F4F6]">
                    Midhula Farm Hut
                  </h3>
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] block mt-1.5 font-medium"
                    style={{ color: 'var(--accent-secondary)' }}
                  >
                    Living Stream & Ecological Sanctuary
                  </span>
                </div>
              </div>
              <p className="text-sm font-light max-w-md opacity-70 leading-relaxed mb-6 text-[#9CA3AF]">
                A serene ecological dwelling designed around living spring water and native flora.
              </p>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--accent-secondary)' }}
                />
                <span className="text-[#9CA3AF]">Eco Sanctuary active. Watch native guppy stream trails.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#9CA3AF] mt-5 max-w-md">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-secondary)' }} />
                <span className="leading-relaxed">
                  Nooluvally, Mupliyam - Chembuchira Rd, Keralam 680312
                </span>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4
                className="text-xs uppercase font-bold tracking-[0.25em] mb-4"
                style={{ color: 'var(--accent-secondary)' }}
              >
                Navigation
              </h4>
              <ul className="space-y-3 text-xs uppercase tracking-widest text-[#9CA3AF]">
                <li><a href="#story" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#harvest" className="hover:text-white transition-colors">Guppy Varieties</a></li>
                <li><a href="#dispatches" className="hover:text-white transition-colors">Live Dispatches</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Location</a></li>
              </ul>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-[#9CA3AF] hover:text-[#E1306C] hover:border-[#E1306C] transition-colors"
                  style={{ borderColor: 'var(--border-color)' }}
                  title="Follow on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-[#9CA3AF] hover:text-[#FF0000] hover:border-[#FF0000] transition-colors"
                  style={{ borderColor: 'var(--border-color)' }}
                  title="Subscribe on YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-[#9CA3AF] hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
                  style={{ borderColor: 'var(--border-color)' }}
                  title="Connect on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4
                className="text-xs uppercase font-bold tracking-[0.25em] mb-4"
                style={{ color: 'var(--accent-secondary)' }}
              >
                Order Directly
              </h4>
              <p className="text-xs text-[#9CA3AF] mb-6">Reach our farm team directly on WhatsApp for live stock orders & safe nationwide shipping.</p>
              <button
                onClick={() => openWhatsApp("Hello Midhula Farm Hut, I would like to order live guppy varieties.")}
                className="w-full py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-95 shadow-lg cursor-pointer"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                Order Live Guppies via WhatsApp
              </button>
            </div>

          </div>

          <div
            className="max-w-7xl mx-auto pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-[#9CA3AF]/60"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <p>© {new Date().getFullYear()} Midhula Farm Hut. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Refactored with Brand Theme Variables</p>
          </div>
        </footer>

        {/* FLOATING WHATSAPP BUTTON (BOTTOM-RIGHT) */}
        <div
          onClick={() => openWhatsApp()}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap sm:group-hover:max-w-xs transition-all duration-300 text-xs uppercase tracking-wider font-bold">
            Chat With Us
          </span>
        </div>

      </div>
    );
  }