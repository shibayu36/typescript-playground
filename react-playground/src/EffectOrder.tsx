import React, { useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

export const EffectOrder: React.FC = () => {
  console.log("EffectOrder rendering");
  useEffect(() => {
    console.log("EffectOrder useEffect");
    return () => {
      console.log("EffectOrder useEffect cleanup");
    };
  }, []);
  return (
    <>
      <Link to="/">Home</Link>
      <div>
        <p>EffectOrder Component</p>
        <Effect />
      </div>
    </>
  );
};

const Effect: React.FC = () => {
  console.log("Effect rendering");
  useEffect(() => {
    console.log("Effect useEffect");
    return () => {
      console.log("Effect useEffect cleanup");
    };
  }, []);
  return (
    <div>
      <p>Effect Component</p>
      <LayoutEffect />
    </div>
  );
};

const LayoutEffect: React.FC = () => {
  console.log("LayoutEffect rendering");
  useLayoutEffect(() => {
    runSec(2);
    console.log("LayoutEffect useLayoutEffect");

    return () => {
      runSec(2);
      console.log("LayoutEffect useLayoutEffect cleanup");
    };
  }, []);
  return (
    <div>
      <p>LayoutEffect Component</p>
      <Child />
    </div>
  );
};

const Child: React.FC = () => {
  console.log("Child rendering");
  useEffect(() => {
    console.log("Child useEffect");
    return () => {
      console.log("Child useEffect cleanup");
    };
  }, []);
  return <div>Child Component</div>;
};

function runSec(seconds: number): void {
  const start = performance.now();
  while (performance.now() - start < 1000 * seconds);
}
