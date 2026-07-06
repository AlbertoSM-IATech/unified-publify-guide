import { lazy, Suspense, Component, ReactNode } from "react";

const HeroScene3DCanvas = lazy(() => import("./HeroScene3DCanvas"));

class HeroSceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: Error) { console.warn("HeroScene3D disabled:", err.message); }
  render() { return this.state.hasError ? null : this.props.children; }
}

function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}

export const HeroScene3D = () => {
  if (typeof window === "undefined") return null;
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !isWebGLAvailable()) return null;

  return (
    <HeroSceneErrorBoundary>
      <Suspense fallback={null}>
        <div className="absolute inset-0 pointer-events-none">
          <HeroScene3DCanvas />
        </div>
      </Suspense>
    </HeroSceneErrorBoundary>
  );
};
