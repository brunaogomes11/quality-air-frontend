/**
 * Utility functions for air quality management
 */

export interface QualityInfo {
  english: string;
  color: string;
  className: string;
}

/**
 * Maps Portuguese air quality to English with color information
 * @param quality - Portuguese quality string (BOM, MODERADA, RUIM, etc.)
 * @returns QualityInfo object with English translation and color
 */
export function getQualityInfo(quality: string | undefined | null): QualityInfo {
  if (!quality || typeof quality !== 'string') {
    return {
      english: "Unknown",
      color: "#6b7280", // gray-500
      className: "text-gray-600"
    };
  }

  const qualityUpper = quality.toUpperCase();

  if (qualityUpper === "BOM" || qualityUpper === "BOA") {
    return {
      english: "Good",
      color: "#22c55e", // green-500
      className: "text-green-600"
    };
  }

  if (qualityUpper === "MODERADA" || qualityUpper === "MODERADO") {
    return {
      english: "Moderate",
      color: "#eab308", // yellow-500
      className: "text-yellow-600"
    };
  }

  if (qualityUpper === "RUIM") {
    return {
      english: "Poor",
      color: "#f97316", // orange-500
      className: "text-orange-600"
    };
  }

  if (qualityUpper === "MUITO RUIM") {
    return {
      english: "Very Poor",
      color: "#ef4444", // red-500
      className: "text-red-600"
    };
  }

  if (qualityUpper === "PÉSSIMA" || qualityUpper === "CRÍTICA") {
    return {
      english: "Terrible",
      color: "#a855f7", // purple-500
      className: "text-purple-600"
    };
  }

  return {
    english: "Unknown",
    color: "#6b7280", // gray-500
    className: "text-gray-600"
  };
}