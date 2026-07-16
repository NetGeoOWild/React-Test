import { useEffect, useState, useRef } from "react";

type Spark = {
  id: number;
  x: number;
  y: number;
};

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sparks, setSparks] = useState<Spark[]>([]);
  const rotationRef = useRef(0); // Храним текущий угол поворота звезды

  useEffect(() => {
    let sparkId = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      setPosition({ x, y });

      // Вычисляем расстояние, которое прошла мышь (скорость)
      const deltaX = x - lastX;
      const deltaY = y - lastY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Крутим звёздочку пропорционально скорости движения мыши
      rotationRef.current += distance * 0.5;

      // Генерируем искру следа, только если мышь реально двигается
      if (distance > 2) {
        const newSpark: Spark = {
          id: sparkId++,
          // Добавляем случайный разброс в пределах 14 пикселей,
          // чтобы шлейф казался объемным и слегка дымился
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
        };

        setSparks((prev) => [...prev.slice(-40), newSpark]); // Увеличили лимит до 40, чтобы хвост был длиннее!
      }

      lastX = x;
      lastY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleAnimationEnd = (id: number) => {
    setSparks((prev) => prev.filter((spark) => spark.id !== id));
  };

  return (
    <>
      {/* Сюрикэн */}
      <div
        className="ninja-star-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          // Сначала центрируем через translate, а потом крутим!
          transform: `translate(-50%, -50%) rotate(${rotationRef.current}deg)`,
        }}
      >
        <div className="ninja-star-shape" />
        <div className="ninja-star-center" />
      </div>

      {/* Светящийся след (искры) */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="ninja-trail-spark"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
          }}
          onAnimationEnd={() => handleAnimationEnd(spark.id)}
        />
      ))}
    </>
  );
}
