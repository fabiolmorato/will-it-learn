export default function random (min, max) {
  const range = max - min;
  return (Math.random() * range + min) << 0;
}

