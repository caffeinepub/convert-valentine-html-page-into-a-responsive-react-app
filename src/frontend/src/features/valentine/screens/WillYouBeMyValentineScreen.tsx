import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import { useCustomValentineGif } from '../effects/useCustomValentineGif';
import type { Screen } from '../ValentineFlow';
import { ImageIcon, Loader2, RotateCcw } from 'lucide-react';

interface WillYouBeMyValentineScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function WillYouBeMyValentineScreen({ onNavigate }: WillYouBeMyValentineScreenProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const {
    currentGifUrl,
    previewUrl,
    setPreviewUrl,
    applyGif,
    resetToDefault,
    isValidating,
    error,
    clearError,
  } = useCustomValentineGif();

  const handleYes = () => {
    onNavigate('congratulations');
  };

  const handleNo = () => {
    // Grow the Yes button progressively
    setYesButtonScale((prev) => prev + 0.15);
  };

  const handleApplyGif = () => {
    applyGif();
    if (!error) {
      setIsDialogOpen(false);
    }
  };

  const handleResetToDefault = () => {
    resetToDefault();
    setIsDialogOpen(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setPreviewUrl('');
      clearError();
    }
  };

  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="valentine-title text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl md:text-6xl">
          {STRINGS.willYouBeMyValentine}
        </h1>
        
        <div className="relative">
          <img
            src={currentGifUrl}
            alt="Cute couple"
            className="h-auto w-64 rounded-2xl"
            onError={(e) => {
              // Fallback to local GIF if current GIF fails to load
              const target = e.target as HTMLImageElement;
              if (target.src !== ASSETS.bubuDudu) {
                target.src = ASSETS.bubuDudu;
              }
            }}
          />
          
          <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {STRINGS.changeGif}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{STRINGS.changeGif}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gif-url">{STRINGS.gifUrlLabel}</Label>
                  <Input
                    id="gif-url"
                    type="url"
                    placeholder={STRINGS.gifUrlPlaceholder}
                    value={previewUrl}
                    onChange={(e) => {
                      setPreviewUrl(e.target.value);
                      clearError();
                    }}
                    className="w-full"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {previewUrl && !error && (
                  <div className="space-y-2">
                    <Label>{STRINGS.previewLabel}</Label>
                    <div className="flex justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-auto max-h-48 w-auto rounded-lg"
                        onError={() => {
                          // Error will be handled by the validation in applyGif
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
                <Button
                  variant="outline"
                  onClick={handleResetToDefault}
                  className="w-full sm:w-auto"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {STRINGS.resetToDefault}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDialogOpenChange(false)}
                    className="flex-1 sm:flex-none"
                  >
                    {STRINGS.cancel}
                  </Button>
                  <Button
                    onClick={handleApplyGif}
                    disabled={!previewUrl.trim() || isValidating}
                    className="flex-1 sm:flex-none"
                  >
                    {isValidating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      STRINGS.applyGif
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={handleYes}
            size="lg"
            className="valentine-button text-xl transition-transform duration-300"
            style={{ transform: `scale(${yesButtonScale})` }}
          >
            {STRINGS.yes} 💖
          </Button>
          <Button
            onClick={handleNo}
            size="lg"
            variant="outline"
            className="valentine-button-outline text-xl"
          >
            {STRINGS.no} 😡
          </Button>
        </div>
        
        <ValentineBackNextControls
          currentScreen="valentine"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}
