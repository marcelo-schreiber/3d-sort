import { useState, useEffect } from "react";
// THREE components
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// algorithms
import bubbleSort from "../../utils/sort/bubblesort";
import insertionSort from "../../utils/sort/insertionsort";
import selectionSort from "../../utils/sort/selectionsort";
import mergeSort from "../../utils/sort/mergesort";
import quickSort from "../../utils/sort/quicksort";

import shuffle from "../../utils/shuffle";
import findMaxValue from "../../utils/findMaxValue";

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

const acceleration = 150;

function CanvasMain() {
  const [generator, setGenerator] = useState(
    bubbleSort(shuffle([1, 2, 3, 4, 5, 6, 7]))
  );
  const [sortingState, setSortingState] = useState(() => generator.next());
  const [currentAlg, setCurrentAlg] = useState("Bubble sort");
  const [play, setPlay] = useState(false);
  const [delay, setDelay] = useState(1000);

  const sort = () => !sortingState.done && setSortingState(generator.next());

  const boxes = sortingState.value;
  let { arr: array } = sortingState.value;

  useEffect(() => {
    const timer = setTimeout(() => sort(), delay); // 800ms delay (0.8s)

    if (!play) clearTimeout(timer);

    return () => clearTimeout(timer);
  }, [sortingState, play]);

  const speedUp = () => {
    if (delay <= acceleration) return;
    setDelay((prev) => prev - acceleration);
  };

  const slowDown = () => {
    if (delay >= 2000) return; // 2 seconds will be the slowest delay possible
    setDelay((prev) => prev + acceleration);
  };

  const setAlgorithm = () => {
    let newGenerator = bubbleSort(array);

    switch (currentAlg) {
      case "Insertion sort":
        newGenerator = insertionSort(array);
        break;
      case "Selection sort":
        newGenerator = selectionSort(array);
        break;
      case "Merge sort":
        newGenerator = mergeSort(array);
        break;
      case "Quick sort":
        newGenerator = quickSort(array);
        break;
    }

    setGenerator(newGenerator);
    setSortingState(newGenerator.next());
  };

  useEffect(setAlgorithm, [currentAlg]);

  const addItem = () => {
    array = [...array, array.length + 1];

    setAlgorithm();
  };

  const removeItem = () => {
    if (array.length <= 5) return;

    array.splice(findMaxValue(array), 1);
    setAlgorithm();
  };

  const randomize = () => {
    array = shuffle(array);
    setAlgorithm();
  };

  return (
    <div style={{ height: "62vh", width: "100%" }}>
      <Canvas
        camera={{ fov: 90, position: [0, 0, 12] }}
        className="cursor-grab"
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {array.map((h: number, idx: number) => (
          <Box
            height={h}
            key={`${idx} + ${h}`}
            position={[-array.length + 2 * idx, 0, 0]}
            isMoved={boxes.idx === idx || boxes?.idx2 === idx}
            isPivot={boxes.pivot === idx}
          />
        ))}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          rotation={[0, 0, 0]}
        />
      </Canvas>
      <nav>
        <h2 className="text-gray-800 font-semibold text-2xl my-8 flex items-center justify-center">
          Velocidade: {Number((1 / delay) * 1000).toFixed(2)}
        </h2>
        <div className="w-full flex justify-center align-center">
          <button
            onClick={slowDown}
            disabled={delay >= 2000}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
              delay >= 2000 && "bg-gray-200"
            }`}
          >
            <BsSkipBackward />
          </button>
          <button
            onClick={() => setPlay((prev) => !prev)}
            className="bg-gray-300 hover:bg-gray-400 mx-4 text-gray-800 font-bold py-2 px-4 rounded-l "
          >
            {play ? (
              <span className="flex items-center justify-center">
                Pausar <BsPause className="ml-2" />
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Iniciar <BsPlay className="ml-2" />
              </span>
            )}
          </button>
          <button
            onClick={speedUp}
            disabled={delay <= acceleration}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
              delay <= acceleration && "bg-gray-200"
            }`}
          >
            <BsSkipForward />
          </button>
        </div>
        <label
          htmlFor="selectAlg"
          className="text-gray-800 font-semibold text-2xl my-8 flex items-center justify-center"
        >
          <BsSortDownAlt className="mr-2" /> Escolha o algoritmo:
        </label>
        <select
          id="selectAlg"
          className="flex mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrentAlg(e.target.value)
          }
        >
          <option value="Bubble sort">Bubble sort</option>
          <option value="Insertion sort">Insertion sort</option>
          <option value="Selection sort">Selection sort</option>
          <option value="Merge sort">Merge sort</option>
          <option value="Quick sort">Quick sort</option>
        </select>
        <div className="flex flex-wrap w-full gap-y-4 items-center justify-around absolute top-5">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l flex items-center"
            onClick={randomize}
          >
            Embaralhar <BsShuffle className="ml-2" />
          </button>
          <button
            className="bg-gray-300 px-4 hover:bg-gray-400 text-gray-800 font-bold py-2  rounded-l flex items-center"
            onClick={removeItem}
            disabled={array.length <= 5}
          >
            Remover
            <BsPatchMinus className="ml-2" />
          </button>
          <button
            className="bg-gray-300 px-4 hover:bg-gray-400 text-gray-800 font-bold py-2  rounded-l flex items-center"
            onClick={addItem}
          >
            Adicionar <BsPatchPlus className="ml-2" />
          </button>

          <button
            onClick={sort}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l flex items-center"
          >
            Próximo passo <BsForward className="ml-2" />
          </button>
        </div>
      </nav>
      <h1 className="text-lg text-gray-800 text-center mt-6">
        O vetor possui <b>{array.length}</b> elementos.
      </h1>
    </div>
  );
}

export default CanvasMain;
