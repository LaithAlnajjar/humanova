import { useEffect, useState } from 'react';

export type QualityLevel = 'low' | 'medium' | 'high';

interface ThreePerfConfig {
  quality: QualityLevel;
  maxParticles: number;
  samples: number;
}

export const useThreePerf = (): ThreePerfConfig => {
  const [quality, setQuality] = useState<QualityLevel>('high');

  useEffect(() => {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isLowMemory =
      (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;

    if (prefersReduced || isLowMemory) {
      setQuality('low');
    } else if (window.innerWidth < 768) {
      setQuality('medium');
    } else {
      setQuality('high');
    }
  }, []);

  if (quality === 'low') {
    return { quality, maxParticles: 120, samples: 1 };
  }
  if (quality === 'medium') {
    return { quality, maxParticles: 220, samples: 2 };
  }
  return { quality, maxParticles: 360, samples: 3 };
};
