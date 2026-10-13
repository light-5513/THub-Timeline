import React, { useEffect, useRef } from 'react';

const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com';

export function YouTubeVideo({ videoId, title }) {
  const iframeRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    const postCommand = (func, args = []) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        YOUTUBE_ORIGIN
      );
    };

    const handleTogglePlayback = () => {
      if (isPlayingRef.current) {
        postCommand('pauseVideo');
        isPlayingRef.current = false;
      } else {
        postCommand('playVideo');
        isPlayingRef.current = true;
      }
    };

    const handlePlayerMessage = event => {
      if (event.source !== iframe.contentWindow || event.origin !== YOUTUBE_ORIGIN) return;

      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      const state = data?.event === 'onStateChange'
        ? data.info
        : data?.event === 'infoDelivery'
          ? data.info?.playerState
          : undefined;
      if (typeof state === 'number') isPlayingRef.current = state === 1;
    };

    const subscribeToPlayerState = () => {
      iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'semester-video' }), YOUTUBE_ORIGIN);
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'addEventListener', args: ['onStateChange'] }),
        YOUTUBE_ORIGIN
      );
    };

    iframe.addEventListener('load', subscribeToPlayerState);
    window.addEventListener('message', handlePlayerMessage);
    window.addEventListener('popup-video-toggle', handleTogglePlayback);

    return () => {
      iframe.removeEventListener('load', subscribeToPlayerState);
      window.removeEventListener('message', handlePlayerMessage);
      window.removeEventListener('popup-video-toggle', handleTogglePlayback);
    };
  }, [videoId]);

  const embedUrl = `${YOUTUBE_ORIGIN}/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;

  return (
    <iframe
      ref={iframeRef}
      title={title}
      src={embedUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      loading="eager"
      style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
    />
  );
}
