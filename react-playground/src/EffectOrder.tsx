import React from "react";

const EffectOrder: React.FC = () => {
  return <div></div>;
};

const Effect: React.FC = () => {
  console.log("Effect rendering");
  return <div>Effect Component</div>;
};

const LayoutEffect: React.FC = () => {
  console.log("LayoutEffect rendering");
  return <div>LayoutEffect Component</div>;
};

const Child: React.FC = () => {
  console.log("Child rendering");
  return <div>Child Component</div>;
};
