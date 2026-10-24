/**
 * Audio controller for wedding invitation:
 * - Plays user's royal background music (/assets/aistudio/AUD-20261024-WA0000_918c829d.mp3)
 * - Seamlessly starts the authentic flute melody when cover page is opened
 */

class WeddingAudioController {
  private bgAudio: HTMLAudioElement | null = null;
  private isPlayingMusic: boolean = false;
  private stateChangeListeners: ((playing: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initBgAudio();
    }
  }

  private initBgAudio() {
    if (this.bgAudio) return;
    try {
      this.bgAudio = new Audio('/assets/aistudio/AUD-20261024-WA0000_918c829d.mp3');
      this.bgAudio.loop = true;
      this.bgAudio.preload = 'auto';
      this.bgAudio.volume = 0.8;

      this.bgAudio.addEventListener('play', () => {
        this.isPlayingMusic = true;
        this.notifyListeners(true);
      });

      this.bgAudio.addEventListener('pause', () => {
        this.isPlayingMusic = false;
        this.notifyListeners(false);
      });

      this.bgAudio.addEventListener('ended', () => {
        this.isPlayingMusic = false;
        this.notifyListeners(false);
      });
    } catch (e) {
      console.warn('Audio init warning:', e);
    }
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.stateChangeListeners.push(listener);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(playing: boolean) {
    this.stateChangeListeners.forEach((l) => l(playing));
  }

  public playBackgroundMusic(): Promise<void> {
    this.initBgAudio();
    if (!this.bgAudio) return Promise.resolve();

    return this.bgAudio
      .play()
      .then(() => {
        this.isPlayingMusic = true;
        this.notifyListeners(true);
      })
      .catch((err) => {
        console.warn('Playback prevented until user interaction:', err);
      });
  }

  public pauseBackgroundMusic() {
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.isPlayingMusic = false;
      this.notifyListeners(false);
    }
  }

  public toggleAmbientMusic(onStateChange?: (playing: boolean) => void): boolean {
    this.initBgAudio();
    if (!this.bgAudio) return false;

    if (this.isPlayingMusic) {
      this.pauseBackgroundMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.playBackgroundMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingMusic;
  }
}

export const weddingAudio = new WeddingAudioController();
