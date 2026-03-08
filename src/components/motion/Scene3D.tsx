import { lazy, Suspense } from "react";

const Scene3DCanvas = lazy(() => import("./Scene3DCanvas"));

export const Scene3D = () => {
  return (
    <Suspense fallback={null}>
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <Scene3DCanvas />
      </div>
    </Suspense>
  );
};
