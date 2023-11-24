import React, { ReactNode, useEffect, useRef } from "react";

// Описуємо Props

interface Props {
  children: ReactNode;
  onContentEndVisible: () => void;
}

export function Observer({ children, onContentEndVisible }: Props) {
  // Вказуємо правильний тип для useRef
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вказуємо правильний тип для options,

    interface Options {
      rootMargin: string;
      threshold: number;
      root: null;
    }

    const options: Options = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
