/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  __openContact?: () => void;
  __closeContact?: () => void;
  __ready?: boolean;
  __marks?: Record<string, { start: number; end: number; mid: number; pin?: boolean }>;
}
