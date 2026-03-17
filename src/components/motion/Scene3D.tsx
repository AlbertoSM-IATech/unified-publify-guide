import { lazy, Suspense, Component, ReactNode } from "react";

const Scene3DCanvas = lazy(() => import("./Scene3DCanvas"));

/** Silently swallow WebGL / Three.js errors so the rest of the app keeps working */
class Scene3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: Error) { console.warn("Scene3D disabled:", err.message); }
  render() { return this.state.hasError ? null : this.props.children; }
}

function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}

export const Scene3D = () => {
  if (!isWebGLAvailable()) return null;

  return (
    <Scene3DErrorBoundary>
      <Suspense fallback={null}>
        <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-80">
          <Scene3DCanvas />
        </div>
      </Suspense>
    </Scene3DErrorBoundary>
  );
};