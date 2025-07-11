import { useState, useEffect } from "react";

// THREE
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// algorithms
import bubbleSort from "@/utils/sort/bubblesort";
import insertionSort from "@/utils/sort/insertionsort";
import selectionSort from "@/utils/sort/selectionsort";
import mergeSort from "@/utils/sort/mergesort";
import heapSort from "@/utils/sort/heapsort";
import quickSort from "@/utils/sort/quicksort";

import shuffle from "@/utils/shuffle";
import findMaxValue from "@/utils/findMaxValue";

// my components
import Box from "./box";
import {
  BsShuffle,
  BsForward,
  BsSortDownAlt,
  BsPatchPlus,
  BsPatchMinus,
  BsPlay,
  BsPause,
  BsSkipForward,
  BsSkipBackward,
} from "react-icons/bs";
import { useLanguage } from "@/utils/hooks/useLanguage";

function SortCanvas({ array, boxes }: { array: number[]; boxes: any }) {
  return (
    <Canvas
      camera={{ fov: 70, position: [0, 0, 12] }}
      className="cursor-grab min-h-96"
    >
      <ambientLight intensity={3} />
      <pointLight position={[10, 10, 10]} />
      {array.map((h, idx) => {
        const isActive = boxes.idx === idx || boxes.idx2 === idx;
        const startPos = new THREE.Vector3(-array.length + 2 * idx, 0, 0);
        const endPos = isActive
          ? idx === boxes.idx
            ? new THREE.Vector3(-array.length + 2 * boxes.idx2, 0, 0)
            : new THREE.Vector3(-array.length + 2 * boxes.idx, 0, 0)
          : startPos;
        return (
          <Box
            height={h}
            key={`${idx}-${h}`}
            position={[-array.length + 2 * idx, 0, 0]}
            startPos={startPos}
            endPos={endPos}
            isMoved={isActive}
            isPivot={boxes.pivot === idx}
            isSwapped={isActive && boxes.swapped === true}
          />
        );
      })}
      <OrbitControls enablePan={false} enableZoom={true} />
    </Canvas>
  );
}

const SPEEDS = [0.5, 0.7, 1, 1.5, 2, 5, 10, 20];
const BASE_DELAY = 1000; // Base delay of 1 second at 1x speed

const ALG_MAP = {
  "Bubble sort": bubbleSort,
  "Insertion sort": insertionSort,
  "Selection sort": selectionSort,
  "Merge sort": mergeSort,
  "Quick sort": quickSort,
  "Heap sort": heapSort,
};

function CanvasMain() {
  const langJson = useLanguage();
  const [generator, setGenerator] = useState(
    bubbleSort(shuffle([1, 2, 3, 4, 5, 6, 7]))
  );
  const [sortingState, setSortingState] = useState(() => generator.next());
  const [currentAlg, setCurrentAlg] = useState("Bubble sort");
  const [play, setPlay] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(2); // Start at 1x speed (index 2)

  const sort = () => !sortingState.done && setSortingState(generator.next());

  const boxes = sortingState.value;
  let { arr: array } = sortingState.value;

  // Calculate current delay based on speed multiplier
  const currentDelay = BASE_DELAY / SPEEDS[speedIndex];

  useEffect(() => {
    const timer = setTimeout(() => sort(), currentDelay);

    if (!play) clearTimeout(timer);
    if (sortingState.done) setPlay(false);
    return () => clearTimeout(timer);
  }, [sortingState, play, speedIndex]);

  const speedUp = () => {
    if (speedIndex >= SPEEDS.length - 1) return; // Already at maximum speed
    setSpeedIndex((prev) => prev + 1);
  };

  const slowDown = () => {
    if (speedIndex <= 0) return; // Already at minimum speed
    setSpeedIndex((prev) => prev - 1);
  };

  useEffect(() => {
    setGeneratorFromAlg(array);
  }, [currentAlg]);

  const setGeneratorFromAlg = (arr: number[]) => {
    const sortFn = ALG_MAP[currentAlg as keyof typeof ALG_MAP] || bubbleSort;
    const newGen = sortFn(arr);
    setGenerator(newGen);
    setSortingState(newGen.next());
  };

  const removeItem = () => {
    if (array.length <= 5) return;
    const newArr = [...array];
    newArr.splice(findMaxValue(newArr), 1);
    setGeneratorFromAlg(newArr);
  };

  const addItem = () => {
    const newArr = [...array, array.length + 1];
    setGeneratorFromAlg(newArr);
  };

  const randomize = () => {
    const newArr = shuffle([...array]);
    setGeneratorFromAlg(newArr);
  };

  return (
    <div className="w-full h-[calc(100vh-24rem)]">
      <SortCanvas array={array} boxes={boxes} />

      <div className="text-slate-800 text-lg text-center">
        <code>{JSON.stringify(array, null, 2)}</code>
      </div>
      <div className="flex flex-wrap w-full gap-y-4 items-center justify-around absolute top-5">
        <button
          className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-l flex items-center"
          onClick={randomize}
        >
          {langJson.shuffle} <BsShuffle className="ml-2" />
        </button>
        <button
          className={`bg-slate-300 px-4 hover:bg-slate-400 text-slate-800 font-bold py-2 rounded-l flex items-center ${
            array.length <= 5 && "bg-slate-200"
          }`}
          onClick={removeItem}
          disabled={array.length <= 5}
        >
          {langJson.remove}
          <BsPatchMinus className="ml-2" />
        </button>
        <button
          className="bg-slate-300 px-4 hover:bg-slate-400 text-slate-800 font-bold py-2 rounded-l flex items-center"
          onClick={addItem}
        >
          {langJson.add} <BsPatchPlus className="ml-2" />
        </button>

        <button
          onClick={sort}
          disabled={sortingState.done}
          className={`bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-l flex items-center ${
            sortingState.done && "bg-slate-200"
          }`}
        >
          {langJson.next_step}
          <BsForward className="ml-2" />
        </button>
      </div>
      <nav>
        <h2 className="text-slate-800 font-semibold text-2xl my-8 flex items-center justify-center">
          {langJson.velocity}: {SPEEDS[speedIndex]}x
        </h2>
        <div className="w-full flex justify-center align-center">
          <button
            onClick={slowDown}
            disabled={speedIndex <= 0}
            className={`bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-l ${
              speedIndex <= 0 && "bg-slate-200"
            }`}
          >
            <BsSkipBackward />
          </button>
          <button
            onClick={() => setPlay((prev) => !prev)}
            className="bg-slate-300 hover:bg-slate-400 mx-4 w-28 text-slate-800 font-bold py-2 px-4 rounded-l "
          >
            {play ? (
              <span className="flex items-center justify-center">
                Pausar <BsPause className="ml-2" />
              </span>
            ) : (
              <span className="flex items-center justify-center">
                {langJson.start} <BsPlay className="ml-2" />
              </span>
            )}
          </button>
          <button
            onClick={speedUp}
            disabled={speedIndex >= SPEEDS.length - 1}
            className={`bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-l ${
              speedIndex >= SPEEDS.length - 1 && "bg-slate-200"
            }`}
          >
            <BsSkipForward />
          </button>
        </div>
        <label
          htmlFor="selectAlg"
          className="text-slate-800 font-semibold text-2xl my-8 flex items-center justify-center"
        >
          <BsSortDownAlt className="mr-2" /> {langJson.choose_an_algorithm}
        </label>
        <select
          id="selectAlg"
          className="flex mx-auto bg-slate-50 border border-slate-300 text-slate-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrentAlg(e.target.value)
          }
        >
          {Object.keys(ALG_MAP).map((alg) => (
            <option key={alg} value={alg}>
              {alg}
            </option>
          ))}
        </select>
      </nav>
      <h1 className="text-lg text-slate-800 text-center mt-6">
        {langJson.array_prefix} <b>{array.length}</b> {langJson.array_suffix}
      </h1>
    </div>
  );
}

export default CanvasMain;
