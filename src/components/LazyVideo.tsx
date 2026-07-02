import { forwardRef, useEffect, useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

type LazyVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  poster?: string;
};

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(function LazyVideo({ src, poster, ...props }, ref) {
  const innerRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const setRefs = (node: HTMLVideoElement | null) => {
    innerRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <div className="relative">
      {!loaded && <LoadingSpinner overlay={false} message="Loading video..." />}
      <video
        ref={setRefs}
        {...props}
        src={shouldLoad ? src : undefined}
        poster={poster}
        preload="metadata"
        onLoadedData={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
});

export default LazyVideo;
