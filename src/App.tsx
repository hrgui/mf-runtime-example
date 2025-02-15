import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

init({
  name: "@demo/app-main",
  remotes: [
    {
      name: "app02",
      entry: "https://www.hrgui.dev/mf-playground/button/remoteEntry.js?v=" + Date.now(),
      alias: "app02",
    },
  ],
  shared: {
    react: {
      version: "19.0.0",
      scope: "default",
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: "^19.0.0",
      },
    },
    "react-dom": {
      version: "19.0.0",
      scope: "default",
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: "^19.0.0",
      },
    },
  },
});

const RemoteButton = React.lazy(
  () => loadRemote("app02/button") as Promise<{ default: React.ComponentType<any> }>
);

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <Suspense fallback="Loading...">
        <RemoteButton />
      </Suspense>
    </div>
  );
};

export default App;
