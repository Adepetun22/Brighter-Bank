import React, { forwardRef, useEffect, useRef, useState } from 'react';

type LazyVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  poster?: string;
};

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(function LazyVideo({ src, poster, ...props }, ref) {
  const innerRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const setRefs = (node: HTMLVideoElement | null) => {
    (innerRef as React.MutableRefObject<HTMLVideoElement | null>).current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={setRefs}
      {...props}
      src={shouldLoad ? src : undefined}
      poster={poster}
    />
  );
});

export default LazyVideo;
