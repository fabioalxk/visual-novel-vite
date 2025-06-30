// src/hooks/useResourceLoader.js
import { useState, useCallback } from "react";
import { GAME_RESOURCES } from "../utils/resourceList";

const useResourceLoader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [resourceCache] = useState(new Map());

  const loadResource = (url, type) => {
    return new Promise((resolve, reject) => {
      if (resourceCache.has(url)) {
        resolve(resourceCache.get(url));
        return;
      }

      if (type === "image") {
        const img = new Image();
        img.onload = () => {
          resourceCache.set(url, img);
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      } else if (type === "video") {
        const video = document.createElement("video");
        video.onloadeddata = () => {
          resourceCache.set(url, video);
          resolve(video);
        };
        video.onerror = reject;
        video.preload = "metadata";
        video.src = url;
      } else if (type === "audio") {
        const audio = new Audio();
        audio.oncanplaythrough = () => {
          resourceCache.set(url, audio);
          resolve(audio);
        };
        audio.onerror = reject;
        audio.preload = "auto";
        audio.src = url;
      }
    });
  };

  const loadAllResources = useCallback(async () => {
    setIsLoading(true);
    setLoadingProgress(0);

    const allResources = [
      ...GAME_RESOURCES.images.map((url) => ({ url, type: "image" })),
      ...GAME_RESOURCES.videos.map((url) => ({ url, type: "video" })),
      ...GAME_RESOURCES.audio.map((url) => ({ url, type: "audio" })),
    ];

    const totalResources = allResources.length;
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / totalResources) * 100);
      setLoadingProgress(progress);
    };

    try {
      const loadPromises = allResources.map(async ({ url, type }) => {
        setLoadingStatus(`Loading ${type}: ${url.split("/").pop()}`);
        await loadResource(url, type);
        updateProgress();
      });

      await Promise.all(loadPromises);
      setLoadingStatus("Resources loaded successfully!");
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error loading resources:", error);
      setLoadingStatus(`Error loading: ${error.message}`);
      setIsLoading(false);
      return false;
    }
  }, [resourceCache]);

  const getResource = useCallback(
    (url) => {
      return resourceCache.get(url);
    },
    [resourceCache]
  );

  return {
    loadAllResources,
    getResource,
    loadingProgress,
    isLoading,
    loadingStatus,
    isComplete: loadingProgress === 100 && !isLoading,
  };
};

export default useResourceLoader;
