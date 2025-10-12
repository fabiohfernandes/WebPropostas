// ============================================================================
// Chart Bullet Templates - PREMIUM EDITION
// Data visualization bullets with glassmorphism, 3D effects, and gradients
// ============================================================================

import { BulletTemplate, BulletTemplateOptions } from './bulletTemplates';

const SIZES = {
  small: { width: 80, height: 80 },
  medium: { width: 120, height: 120 },
  large: { width: 160, height: 160 },
};

// Color schemes for multi-segment charts
const COLOR_SCHEMES = {
  warm: ['#FF6B6B', '#FFA500', '#FFD93D', '#6BCF7F'],
  cool: ['#4ECDC4', '#45B7D1', '#5F9EA0', '#7B68EE'],
  business: ['#FF6B6B', '#FFA500', '#45B7D1', '#6BCF7F', '#FFC107', '#9C27B0'],
  vibrant: ['#E74C3C', '#F39C12', '#3498DB', '#2ECC71', '#9B59B6', '#E91E63'],
};

// ============================================================================
// STYLE 13: Donut Chart (Multi-segment data visualization)
// ============================================================================
export const DONUT_CHART: BulletTemplate = {
  id: 'donut-chart',
  name: 'Gráfico Donut',
  category: 'charts',
  description: 'Gráfico donut com múltiplos segmentos para dados',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, totalSteps, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || `DATA ${stepNumber.toString().padStart(2, '0')}`;

    // Calculate segments for donut chart
    const segments = totalSteps || 4;
    const anglePerSegment = 360 / segments;
    const colors = COLOR_SCHEMES.business;

    // Generate donut segments with 3D effects
    const generateDonutSegments = () => {
      let svgPaths = '';
      for (let i = 0; i < segments; i++) {
        const startAngle = i * anglePerSegment - 90;
        const endAngle = (i + 1) * anglePerSegment - 90;
        const segmentColor = colors[i % colors.length];

        // Convert angles to radians
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        // Donut outer and inner radius
        const outerRadius = 50;
        const innerRadius = 32;

        // Calculate points
        const x1Outer = 60 + outerRadius * Math.cos(startRad);
        const y1Outer = 60 + outerRadius * Math.sin(startRad);
        const x2Outer = 60 + outerRadius * Math.cos(endRad);
        const y2Outer = 60 + outerRadius * Math.sin(endRad);

        const x1Inner = 60 + innerRadius * Math.cos(endRad);
        const y1Inner = 60 + innerRadius * Math.sin(endRad);
        const x2Inner = 60 + innerRadius * Math.cos(startRad);
        const y2Inner = 60 + innerRadius * Math.sin(startRad);

        const largeArc = anglePerSegment > 180 ? 1 : 0;

        // 3D Shadow layer
        svgPaths += `
          <path d="M ${x1Outer + 2} ${y1Outer + 3}
                   A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer + 2} ${y2Outer + 3}
                   L ${x1Inner + 2} ${y1Inner + 3}
                   A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2Inner + 2} ${y2Inner + 3} Z"
                fill="rgba(0,0,0,0.15)"
                filter="url(#donutBlur)"/>
        `;

        // Main segment with gradient
        svgPaths += `
          <defs>
            <radialGradient id="donutGrad${i}" cx="40%" cy="40%">
              <stop offset="0%" style="stop-color:white;stop-opacity:0.3" />
              <stop offset="50%" style="stop-color:${segmentColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${segmentColor};stop-opacity:0.7" />
            </radialGradient>
          </defs>
          <path d="M ${x1Outer} ${y1Outer}
                   A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
                   L ${x1Inner} ${y1Inner}
                   A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2Inner} ${y2Inner} Z"
                fill="url(#donutGrad${i})"
                filter="url(#donutShadow)"
                opacity="0.95"/>
        `;

        // Glassmorphism overlay
        svgPaths += `
          <path d="M ${x1Outer} ${y1Outer}
                   A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
                   L ${x1Inner} ${y1Inner}
                   A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2Inner} ${y2Inner} Z"
                fill="rgba(255,255,255,0.15)"
                stroke="rgba(255,255,255,0.3)"
                stroke-width="1.5"/>
        `;
      }
      return svgPaths;
    };

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="donutShadow">
            <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
          <filter id="donutBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
          <radialGradient id="centerCircle" cx="40%" cy="40%">
            <stop offset="0%" style="stop-color:white;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f9fafb;stop-opacity:1" />
          </radialGradient>
        </defs>

        <!-- Donut segments with 3D effects -->
        ${generateDonutSegments()}

        <!-- Center circle shadow -->
        <circle cx="60" cy="62" r="28"
                fill="rgba(0,0,0,0.1)"
                filter="url(#donutBlur)"/>

        <!-- Center white circle with gradient -->
        <circle cx="60" cy="60" r="28"
                fill="url(#centerCircle)"
                filter="url(#donutShadow)"/>

        <!-- Glassmorphism border on center -->
        <circle cx="60" cy="60" r="28"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                stroke-width="2"/>

        <!-- Glossy highlight on center -->
        <ellipse cx="52" cy="50" rx="12" ry="10"
                 fill="white"
                 opacity="0.4"/>

        <!-- Center text with 3D effect -->
        <text x="60" y="67"
              font-family="Arial, sans-serif"
              font-size="11"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="66"
              font-family="Arial, sans-serif"
              font-size="11"
              font-weight="bold"
              fill="#666"
              text-anchor="middle"
              style="text-shadow: 0 1px 2px rgba(255,255,255,0.8);">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 10 A 50 50 0 0 1 110 60 L 92 60 A 32 32 0 0 0 60 28 Z" fill="#FF6B6B" opacity="0.9"/>
      <path d="M 110 60 A 50 50 0 0 1 60 110 L 60 92 A 32 32 0 0 0 92 60 Z" fill="#FFA500" opacity="0.9"/>
      <path d="M 60 110 A 50 50 0 0 1 10 60 L 28 60 A 32 32 0 0 0 60 92 Z" fill="#45B7D1" opacity="0.9"/>
      <path d="M 10 60 A 50 50 0 0 1 60 10 L 60 28 A 32 32 0 0 0 28 60 Z" fill="#6BCF7F" opacity="0.9"/>
      <circle cx="60" cy="60" r="28" fill="white"/>
    </svg>
  `,
};

// ============================================================================
// STYLE 14: Pie Chart (Full circle data visualization)
// ============================================================================
export const PIE_CHART: BulletTemplate = {
  id: 'pie-chart',
  name: 'Gráfico Pizza',
  category: 'charts',
  description: 'Gráfico pizza com segmentos coloridos',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, totalSteps, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || `${stepNumber}`;

    const segments = totalSteps || 4;
    const anglePerSegment = 360 / segments;
    const colors = COLOR_SCHEMES.vibrant;

    const generatePieSegments = () => {
      let svgPaths = '';
      for (let i = 0; i < segments; i++) {
        const startAngle = i * anglePerSegment - 90;
        const endAngle = (i + 1) * anglePerSegment - 90;
        const segmentColor = colors[i % colors.length];

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const radius = 50;
        const x1 = 60 + radius * Math.cos(startRad);
        const y1 = 60 + radius * Math.sin(startRad);
        const x2 = 60 + radius * Math.cos(endRad);
        const y2 = 60 + radius * Math.sin(endRad);

        const largeArc = anglePerSegment > 180 ? 1 : 0;

        // Shadow layer
        svgPaths += `
          <path d="M 60 62 L ${x1 + 2} ${y1 + 3} A ${radius} ${radius} 0 ${largeArc} 1 ${x2 + 2} ${y2 + 3} Z"
                fill="rgba(0,0,0,0.15)"
                filter="url(#pieBlur)"/>
        `;

        // Main segment with gradient
        svgPaths += `
          <defs>
            <radialGradient id="pieGrad${i}" cx="50%" cy="50%">
              <stop offset="0%" style="stop-color:white;stop-opacity:0.3" />
              <stop offset="70%" style="stop-color:${segmentColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${segmentColor};stop-opacity:0.8" />
            </radialGradient>
          </defs>
          <path d="M 60 60 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z"
                fill="url(#pieGrad${i})"
                stroke="white"
                stroke-width="2"
                filter="url(#pieShadow)"
                opacity="0.95"/>
        `;

        // Glassmorphism overlay
        svgPaths += `
          <path d="M 60 60 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z"
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(255,255,255,0.3)"
                stroke-width="1"/>
        `;
      }
      return svgPaths;
    };

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="pieShadow">
            <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
          <filter id="pieBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
          <radialGradient id="centerLabel" cx="40%" cy="40%">
            <stop offset="0%" style="stop-color:white;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:1" />
          </radialGradient>
        </defs>

        <!-- Pie segments with 3D effects -->
        ${generatePieSegments()}

        <!-- Center label circle shadow -->
        <circle cx="60" cy="62" r="20"
                fill="rgba(0,0,0,0.1)"
                filter="url(#pieBlur)"/>

        <!-- Center label circle with gradient -->
        <circle cx="60" cy="60" r="20"
                fill="url(#centerLabel)"
                stroke="#e5e7eb"
                stroke-width="2"
                filter="url(#pieShadow)"/>

        <!-- Glassmorphism border -->
        <circle cx="60" cy="60" r="20"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                stroke-width="1.5"/>

        <!-- Glossy highlight -->
        <ellipse cx="54" cy="52" rx="8" ry="6"
                 fill="white"
                 opacity="0.5"/>

        <!-- 3D Number -->
        <text x="60" y="69"
              font-family="Arial, sans-serif"
              font-size="18"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="68"
              font-family="Arial, sans-serif"
              font-size="18"
              font-weight="bold"
              fill="#333"
              text-anchor="middle"
              style="text-shadow: 0 1px 3px rgba(255,255,255,0.8);">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 60 L 60 10 A 50 50 0 0 1 110 60 Z" fill="#E74C3C" opacity="0.9" stroke="white" stroke-width="2"/>
      <path d="M 60 60 L 110 60 A 50 50 0 0 1 60 110 Z" fill="#F39C12" opacity="0.9" stroke="white" stroke-width="2"/>
      <path d="M 60 60 L 60 110 A 50 50 0 0 1 10 60 Z" fill="#3498DB" opacity="0.9" stroke="white" stroke-width="2"/>
      <path d="M 60 60 L 10 60 A 50 50 0 0 1 60 10 Z" fill="#2ECC71" opacity="0.9" stroke="white" stroke-width="2"/>
    </svg>
  `,
};

// ============================================================================
// STYLE 15: Bar Chart (Vertical bars with 3D effects)
// ============================================================================
export const BAR_CHART: BulletTemplate = {
  id: 'bar-chart',
  name: 'Gráfico Barras',
  category: 'charts',
  description: 'Gráficos de barras verticais com valores',
  maxSteps: 5,
  defaultSteps: 3,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, totalSteps, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString();

    // Heights for bars
    const heights = [35, 55, 45, 70, 50];
    const bars = totalSteps || 3;
    const barWidth = 12;
    const spacing = 18;
    const startX = 60 - ((bars * spacing) / 2);

    const generateBars = () => {
      let svgBars = '';
      const colors = COLOR_SCHEMES.cool;

      for (let i = 0; i < bars; i++) {
        const x = startX + i * spacing;
        const height = heights[i % heights.length];
        const y = 90 - height;
        const barColor = colors[i % colors.length];

        // Shadow
        svgBars += `
          <rect x="${x + 1}" y="${y + 2}" width="${barWidth}" height="${height}"
                fill="rgba(0,0,0,0.15)"
                rx="2"
                filter="url(#barBlur)"/>
        `;

        // Gradient definition
        svgBars += `
          <defs>
            <linearGradient id="barGrad${i}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${barColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${barColor};stop-opacity:0.7" />
            </linearGradient>
          </defs>
        `;

        // Bar with gradient
        svgBars += `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${height}"
                fill="url(#barGrad${i})"
                rx="2"
                filter="url(#barShadow)"
                opacity="0.95"/>
        `;

        // Glassmorphism overlay
        svgBars += `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${height}"
                fill="rgba(255,255,255,0.2)"
                stroke="rgba(255,255,255,0.4)"
                stroke-width="1"
                rx="2"/>
        `;

        // Top highlight
        svgBars += `
          <rect x="${x + 1}" y="${y + 1}" width="${barWidth - 2}" height="${Math.min(8, height / 3)}"
                fill="white"
                opacity="0.4"
                rx="1"/>
        `;

        // Value label with 3D text
        svgBars += `
          <text x="${x + barWidth / 2}" y="${y - 4}"
                font-family="Arial, sans-serif"
                font-size="10"
                font-weight="bold"
                fill="rgba(0,0,0,0.2)"
                text-anchor="middle">
            ${i + 1}
          </text>
          <text x="${x + barWidth / 2}" y="${y - 5}"
                font-family="Arial, sans-serif"
                font-size="10"
                font-weight="bold"
                fill="#666"
                text-anchor="middle"
                style="text-shadow: 0 1px 2px rgba(255,255,255,0.8);">
            ${i + 1}
          </text>
        `;
      }
      return svgBars;
    };

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="barShadow">
            <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.3"/>
          </filter>
          <filter id="barBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        <!-- Bars with 3D effects -->
        ${generateBars()}

        <!-- Baseline with glow -->
        <line x1="20" y1="90" x2="100" y2="90"
              stroke="#d1d5db"
              stroke-width="3"
              stroke-linecap="round"
              filter="url(#barShadow)"/>

        <!-- Label with 3D effect -->
        <text x="60" y="111"
              font-family="Arial, sans-serif"
              font-size="12"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="110"
              font-family="Arial, sans-serif"
              font-size="12"
              font-weight="bold"
              fill="#333"
              text-anchor="middle"
              style="text-shadow: 0 1px 2px rgba(255,255,255,0.8);">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="55" width="12" height="35" fill="#4ECDC4" rx="2" opacity="0.9"/>
      <rect x="54" y="35" width="12" height="55" fill="#45B7D1" rx="2" opacity="0.9"/>
      <rect x="73" y="45" width="12" height="45" fill="#5F9EA0" rx="2" opacity="0.9"/>
      <line x1="20" y1="90" x2="100" y2="90" stroke="#ddd" stroke-width="2"/>
    </svg>
  `,
};

// ============================================================================
// STYLE 16: Progress Circle (Percentage circle with 3D effects)
// ============================================================================
export const PROGRESS_CIRCLE: BulletTemplate = {
  id: 'progress-circle',
  name: 'Círculo Progresso',
  category: 'charts',
  description: 'Círculo de progresso com porcentagem',
  maxSteps: 10,
  defaultSteps: 1,
  customizable: { numbers: true, colors: true, text: false, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', size = 'medium' } = options;
    const dims = SIZES[size];

    // Calculate progress
    const percentage = stepNumber * 10;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradient for progress arc -->
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
          </linearGradient>

          <!-- 3D shadow -->
          <filter id="progressShadow">
            <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.3"/>
          </filter>

          <!-- Blur for base circle -->
          <filter id="progressBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        <!-- Shadow circle -->
        <circle cx="60" cy="62" r="${radius + 5}"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                stroke-width="10"
                filter="url(#progressBlur)"/>

        <!-- Background circle (track) -->
        <circle cx="60" cy="60" r="${radius}"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="10"
                stroke-linecap="round"
                filter="url(#progressShadow)"/>

        <!-- Glassmorphism overlay on track -->
        <circle cx="60" cy="60" r="${radius}"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                stroke-width="2"/>

        <!-- Progress arc with gradient -->
        <circle cx="60" cy="60" r="${radius}"
                fill="none"
                stroke="url(#progressGrad)"
                stroke-width="10"
                stroke-linecap="round"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                transform="rotate(-90 60 60)"
                filter="url(#progressShadow)"
                opacity="0.95"/>

        <!-- Glossy highlight on progress -->
        <circle cx="60" cy="60" r="${radius}"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                transform="rotate(-90 60 60)"/>

        <!-- Center circle background -->
        <circle cx="60" cy="60" r="35"
                fill="white"
                filter="url(#progressShadow)"/>

        <!-- Glassmorphism border -->
        <circle cx="60" cy="60" r="35"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                stroke-width="2"/>

        <!-- Glossy highlight center -->
        <ellipse cx="52" cy="48" rx="15" ry="12"
                 fill="white"
                 opacity="0.4"/>

        <!-- Percentage text with 3D -->
        <text x="60" y="73"
              font-family="Arial, sans-serif"
              font-size="24"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${percentage}%
        </text>
        <text x="60" y="72"
              font-family="Arial, sans-serif"
              font-size="24"
              font-weight="bold"
              fill="${color}"
              text-anchor="middle"
              style="text-shadow: 0 1px 3px rgba(255,255,255,0.6);">
          ${percentage}%
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" stroke-width="10"/>
      <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" stroke-width="10"
              stroke-dasharray="282.6" stroke-dashoffset="70.65" transform="rotate(-90 60 60)" stroke-linecap="round"/>
      <text x="60" y="72" font-family="Arial" font-size="24" font-weight="bold" fill="#10b981" text-anchor="middle">75%</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 17: Candlestick Chart (Finance-style with 3D effects)
// ============================================================================
export const CANDLESTICK_CHART: BulletTemplate = {
  id: 'candlestick-chart',
  name: 'Gráfico Candlestick',
  category: 'charts',
  description: 'Gráfico candlestick estilo financeiro',
  maxSteps: 5,
  defaultSteps: 3,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, totalSteps, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || 'CHART';

    // Candlestick data (high, low, open, close)
    const candles = [
      { high: 75, low: 35, open: 45, close: 70, bullish: true },
      { high: 80, low: 55, open: 70, close: 60, bullish: false },
      { high: 70, low: 25, open: 30, close: 65, bullish: true },
      { high: 75, low: 50, open: 65, close: 55, bullish: false },
      { high: 85, low: 45, open: 50, close: 80, bullish: true },
    ];

    const candleCount = totalSteps || 3;
    const candleWidth = 10;
    const spacing = 18;
    const startX = 60 - ((candleCount * spacing) / 2);

    const generateCandles = () => {
      let svgCandles = '';

      for (let i = 0; i < candleCount; i++) {
        const candle = candles[i % candles.length];
        const x = startX + i * spacing;
        const bullishColor = '#10b981';
        const bearishColor = '#ef4444';
        const candleColor = candle.bullish ? bullishColor : bearishColor;

        // Wick (shadow line)
        svgCandles += `
          <line x1="${x + candleWidth / 2 + 1}" y1="${90 - candle.high + 2}"
                x2="${x + candleWidth / 2 + 1}" y2="${90 - candle.low + 2}"
                stroke="rgba(0,0,0,0.15)"
                stroke-width="2"
                filter="url(#candleBlur)"/>
        `;

        svgCandles += `
          <line x1="${x + candleWidth / 2}" y1="${90 - candle.high}"
                x2="${x + candleWidth / 2}" y2="${90 - candle.low}"
                stroke="${candleColor}"
                stroke-width="2"
                stroke-linecap="round"
                filter="url(#candleShadow)"
                opacity="0.9"/>
        `;

        // Body shadow
        const bodyTop = Math.max(candle.open, candle.close);
        const bodyBottom = Math.min(candle.open, candle.close);
        const bodyHeight = bodyTop - bodyBottom;

        svgCandles += `
          <rect x="${x + 1}" y="${90 - bodyTop + 2}" width="${candleWidth}" height="${Math.max(bodyHeight, 3)}"
                fill="rgba(0,0,0,0.15)"
                rx="1"
                filter="url(#candleBlur)"/>
        `;

        // Gradient for body
        svgCandles += `
          <defs>
            <linearGradient id="candleGrad${i}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${candleColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${candleColor};stop-opacity:0.7" />
            </linearGradient>
          </defs>
        `;

        // Body with gradient
        svgCandles += `
          <rect x="${x}" y="${90 - bodyTop}" width="${candleWidth}" height="${Math.max(bodyHeight, 3)}"
                fill="url(#candleGrad${i})"
                rx="1"
                filter="url(#candleShadow)"
                opacity="0.95"/>
        `;

        // Glassmorphism overlay
        svgCandles += `
          <rect x="${x}" y="${90 - bodyTop}" width="${candleWidth}" height="${Math.max(bodyHeight, 3)}"
                fill="rgba(255,255,255,0.2)"
                stroke="rgba(255,255,255,0.4)"
                stroke-width="1"
                rx="1"/>
        `;

        // Top highlight
        svgCandles += `
          <rect x="${x + 1}" y="${90 - bodyTop + 1}" width="${candleWidth - 2}" height="2"
                fill="white"
                opacity="0.5"
                rx="0.5"/>
        `;
      }
      return svgCandles;
    };

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="candleShadow">
            <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.3"/>
          </filter>
          <filter id="candleBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        <!-- Candlesticks with 3D effects -->
        ${generateCandles()}

        <!-- Baseline with glow -->
        <line x1="20" y1="90" x2="100" y2="90"
              stroke="#d1d5db"
              stroke-width="2"
              stroke-linecap="round"
              filter="url(#candleShadow)"/>

        <!-- Label with 3D effect -->
        <text x="60" y="108"
              font-family="Arial, sans-serif"
              font-size="11"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="107"
              font-family="Arial, sans-serif"
              font-size="11"
              font-weight="bold"
              fill="#333"
              text-anchor="middle"
              style="text-shadow: 0 1px 2px rgba(255,255,255,0.8);">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="30" x2="40" y2="80" stroke="#10b981" stroke-width="2"/>
      <rect x="35" y="40" width="10" height="30" fill="#10b981" rx="1"/>
      <line x1="60" y1="20" x2="60" y2="85" stroke="#ef4444" stroke-width="2"/>
      <rect x="55" y="50" width="10" height="25" fill="#ef4444" rx="1"/>
      <line x1="80" y1="25" x2="80" y2="75" stroke="#10b981" stroke-width="2"/>
      <rect x="75" y="35" width="10" height="35" fill="#10b981" rx="1"/>
      <line x1="20" y1="90" x2="100" y2="90" stroke="#ddd" stroke-width="2"/>
    </svg>
  `,
};

// ============================================================================
// Export all chart templates
// ============================================================================
export const CHART_BULLET_TEMPLATES: BulletTemplate[] = [
  DONUT_CHART,
  PIE_CHART,
  BAR_CHART,
  PROGRESS_CIRCLE,
  CANDLESTICK_CHART,
];
