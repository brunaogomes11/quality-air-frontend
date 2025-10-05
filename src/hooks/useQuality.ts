import { useMemo } from "react";
import { getQualityInfo, type QualityInfo } from "@/utils/qualityUtils";

/**
 * Hook to get air quality information from Portuguese quality string
 * @param qualidade - Portuguese quality string from API
 * @returns QualityInfo object with English translation, color, and className
 */
export function useQuality(qualidade: string | undefined | null): QualityInfo {
  return useMemo(() => {
    return getQualityInfo(qualidade);
  }, [qualidade]);
}