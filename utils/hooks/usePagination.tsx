import { useCallback, useState } from 'react';

export function usePagination(length: number) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const next = useCallback(() => {
    if (activeIdx < length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  }, [setActiveIdx, activeIdx]);

  const previous = useCallback(() => {
    if (activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    }
  }, [setActiveIdx, activeIdx]);
  return [activeIdx, setActiveIdx, previous, next] as const;
}
