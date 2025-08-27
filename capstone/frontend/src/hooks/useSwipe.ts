import { useState, useRef, useCallback, useEffect } from 'react';

interface Transform {
  x: number;
  y: number;
  rotation: number;
}

interface DragOffset {
  x: number;
  y: number;
}

export const useSwipe = (onSwipe: (direction: 'left' | 'right') => void) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [currentTransform, setCurrentTransform] = useState<Transform>({ x: 0, y: 0, rotation: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = 120;
  const MAX_ROTATION = 15;
  const ANIMATION_DURATION = 300;

  const updateTransform = useCallback((x: number, y: number) => {
    const rotation = (x / SWIPE_THRESHOLD) * MAX_ROTATION;
    setCurrentTransform({ x, y, rotation });
  }, []);

  const animateSwipe = useCallback((direction: 'left' | 'right') => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const distance = direction === 'right' ? window.innerWidth : -window.innerWidth;
    const rotation = direction === 'right' ? MAX_ROTATION : -MAX_ROTATION;

    card.style.transition = `all ${ANIMATION_DURATION}ms ease-out`;
    card.style.transform = `translateX(${distance}px) translateY(${distance * 0.1}px) rotate(${rotation}deg)`;
    card.style.opacity = '0';

    setTimeout(() => {
      onSwipe(direction);
      if (card) {
        card.style.transition = 'none';
        card.style.transform = 'translateX(0) translateY(0) rotate(0)';
        card.style.opacity = '1';
        setCurrentTransform({ x: 0, y: 0, rotation: 0 });
      }
    }, ANIMATION_DURATION);
  }, [onSwipe]);

  const snapBack = useCallback(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    card.style.transition = `all ${ANIMATION_DURATION}ms ease-out`;
    card.style.transform = 'translateX(0) translateY(0) rotate(0)';
    card.style.opacity = '1';

    setTimeout(() => {
      if (card) {
        card.style.transition = 'none';
        setCurrentTransform({ x: 0, y: 0, rotation: 0 });
      }
    }, ANIMATION_DURATION);
  }, []);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current) return;

    setIsDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    setDragOffset({
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2
    });
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const newX = clientX - rect.left - rect.width / 2 - dragOffset.x;
    const newY = (clientY - rect.top - rect.height / 2 - dragOffset.y) * 0.3;

    updateTransform(newX, newY);

    const card = cardRef.current;
    card.style.transform = `translateX(${newX}px) translateY(${newY}px) rotate(${currentTransform.rotation}deg)`;
    
    const opacity = Math.abs(newX) > SWIPE_THRESHOLD * 0.5 ? 0.8 : 1;
    card.style.opacity = opacity.toString();
  }, [isDragging, dragOffset, currentTransform.rotation, updateTransform]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    const { x } = currentTransform;

    if (Math.abs(x) > SWIPE_THRESHOLD) {
      const direction = x > 0 ? 'right' : 'left';
      animateSwipe(direction);
    } else {
      snapBack();
    }
  }, [isDragging, currentTransform, animateSwipe, snapBack]);

  // Event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  }, [handleStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  }, [handleEnd]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }, [handleStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [handleMove]);

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Global listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleGlobalMouseUp = () => {
      handleEnd();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMove, handleEnd]);

  return {
    cardRef,
    currentTransform,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    swipeLeft: () => animateSwipe('left'),
    swipeRight: () => animateSwipe('right')
  };
};