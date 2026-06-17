import { useInView } from 'react-intersection-observer';

/**
 * Обёртка над react-intersection-observer.
 * Возвращает ref для элемента и флаг inView (срабатывает один раз).
 */
export const useScrollAnimation = (threshold = 0.15) => {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return { ref, inView };
};
