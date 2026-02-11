import { useRef, useEffect, useState, useCallback } from 'react';

interface ScratchHeartProps {
  onComplete?: () => void;
}

export function ScratchHeart({ onComplete }: ScratchHeartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [canvasError, setCanvasError] = useState(false);
  const lastCheckTimeRef = useRef<number>(0);
  const hasInitializedRef = useRef(false);

  const checkScratchCompletion = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isCompleted) return;

    // Throttle checks to every 300ms
    const now = Date.now();
    if (now - lastCheckTimeRef.current < 300) return;
    lastCheckTimeRef.current = now;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    const totalPixels = pixels.length / 4;

    // Count transparent/semi-transparent pixels
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) { // Alpha < 50%
        transparentPixels++;
      }
    }

    const scratchedPercentage = (transparentPixels / totalPixels) * 100;

    // Completion threshold: 40% scratched
    if (scratchedPercentage >= 40) {
      setIsCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [isCompleted, onComplete]);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasError(true);
      return;
    }

    // Get container size
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas internal size with devicePixelRatio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Reset any previous transforms before scaling
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Scale context to match DPR
    ctx.scale(dpr, dpr);

    // Draw high-contrast scratch overlay with gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#f472b6');
    gradient.addColorStop(1, '#ec4899');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Add subtle pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < rect.width; i += 20) {
      for (let j = 0; j < rect.height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 10, 10);
        }
      }
    }
    
    // Add centered hint text with shadow for better visibility
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch Here', rect.width / 2, rect.height / 2 - 20);
    
    ctx.font = '48px Poppins, sans-serif';
    ctx.fillText('❤️', rect.width / 2, rect.height / 2 + 30);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    hasInitializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      initializeCanvas();
    }

    // Handle resize and orientation changes
    const handleResize = () => {
      hasInitializedRef.current = false;
      initializeCanvas();
    };

    // Use ResizeObserver for container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [initializeCanvas]);

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isCompleted) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Normalize coordinates with DPR
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30 * dpr, 0, Math.PI * 2);
    ctx.fill();

    checkScratchCompletion();
  }, [isCompleted, checkScratchCompletion]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isCompleted) return;
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching && !isCompleted) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isCompleted) return;
    e.preventDefault();
    setIsScratching(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (isScratching && !isCompleted) {
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(false);
  };

  if (canvasError) {
    return (
      <div ref={containerRef} className="scratch-heart-container">
        <div className="heart-background">
          <div className="big-heart">❤️</div>
          <p className="heart-message">Love you cutie 🥰😘</p>
        </div>
        <div className="scratch-fallback">
          <p className="scratch-fallback-text">
            Scratching not supported on this device
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="scratch-heart-container">
      <div className="heart-background">
        <div className="big-heart">❤️</div>
        <p className="heart-message">Love you cutie 🥰😘</p>
      </div>
      {!isCompleted && (
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </div>
  );
}
