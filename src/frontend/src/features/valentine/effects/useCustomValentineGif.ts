import { useState, useEffect } from 'react';
import { ASSETS } from '../content/assets';

const STORAGE_KEY = 'valentine-custom-gif-url';

interface UseCustomValentineGifReturn {
  currentGifUrl: string;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
  applyGif: () => void;
  resetToDefault: () => void;
  isValidating: boolean;
  error: string | null;
  clearError: () => void;
}

export function useCustomValentineGif(): UseCustomValentineGifReturn {
  const [currentGifUrl, setCurrentGifUrl] = useState<string>(ASSETS.valentineGif);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved GIF URL from localStorage on mount
  useEffect(() => {
    const savedUrl = localStorage.getItem(STORAGE_KEY);
    if (savedUrl) {
      // Validate the saved URL
      validateAndSetGif(savedUrl, true);
    }
  }, []);

  const validateAndSetGif = (url: string, isInitialLoad: boolean = false) => {
    if (!url.trim()) {
      if (!isInitialLoad) {
        setError('Please enter a valid URL');
      }
      return;
    }

    setIsValidating(true);
    setError(null);

    const img = new Image();
    
    img.onload = () => {
      setCurrentGifUrl(url);
      if (!isInitialLoad) {
        localStorage.setItem(STORAGE_KEY, url);
        setPreviewUrl('');
      }
      setIsValidating(false);
    };

    img.onerror = () => {
      setError('Failed to load GIF. Please check the URL and try again.');
      // Fallback to local GIF instead of looping back to Tenor URL
      setCurrentGifUrl(ASSETS.bubuDudu);
      if (isInitialLoad) {
        localStorage.removeItem(STORAGE_KEY);
      }
      setIsValidating(false);
    };

    img.src = url;
  };

  const applyGif = () => {
    validateAndSetGif(previewUrl);
  };

  const resetToDefault = () => {
    setCurrentGifUrl(ASSETS.valentineGif);
    setPreviewUrl('');
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    currentGifUrl,
    previewUrl,
    setPreviewUrl,
    applyGif,
    resetToDefault,
    isValidating,
    error,
    clearError,
  };
}
