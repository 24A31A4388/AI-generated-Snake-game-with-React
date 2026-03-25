import { useState, useEffect, useCallback, useRef } from 'react';
import { Point, Direction } from '../types';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = { x: 0, y: 0 }; // Start stationary
const INITIAL_SPEED = 150;

const getRandomFoodPosition = (snake: Point[]): Point => {
  let newFood: Point;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // Ensure food doesn't spawn on the snake
    const isOnSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
    if (!isOnSnake) break;
  }
  return newFood;
};

export const useSnakeGame = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(direction);

  useEffect(() => {
    setFood(getRandomFoodPosition(INITIAL_SNAKE));
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionRef.current = INITIAL_DIRECTION;
    setFood(getRandomFoodPosition(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setHasStarted(false);
    setIsPaused(false);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !hasStarted) return;

    setSnake((prevSnake) => {
      const currentDirection = nextDirectionRef.current;
      directionRef.current = currentDirection;
      setDirection(currentDirection);

      const head = prevSnake[0];
      const newHead = {
        x: head.x + currentDirection.x,
        y: head.y + currentDirection.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check self collision
      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setFood(getRandomFoodPosition(newSnake));
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [food, gameOver, isPaused, hasStarted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys and space
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)
      ) {
        e.preventDefault();
      }

      if (e.key === ' ' && hasStarted && !gameOver) {
        setIsPaused((p) => !p);
        return;
      }

      if (gameOver) {
        if (e.key === 'Enter') resetGame();
        return;
      }

      const currentDir = directionRef.current;
      let newDir = { ...currentDir };

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDir.y !== 1) newDir = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDir.y !== -1) newDir = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDir.x !== 1) newDir = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDir.x !== -1) newDir = { x: 1, y: 0 };
          break;
      }

      // Start game on first valid move
      if (!hasStarted && (newDir.x !== 0 || newDir.y !== 0)) {
        setHasStarted(true);
      }

      nextDirectionRef.current = newDir;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, hasStarted, resetGame]);

  useEffect(() => {
    const speed = Math.max(50, INITIAL_SPEED - Math.floor(score / 50) * 10);
    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [moveSnake, score]);

  return {
    snake,
    food,
    gameOver,
    score,
    isPaused,
    hasStarted,
    resetGame,
    GRID_SIZE,
  };
};
