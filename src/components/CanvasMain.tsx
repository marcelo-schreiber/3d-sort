import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// algorithms
import shuffle from "../../utils/shuffle";
import bubbleSort from "../../utils/bubblesort";
import insertionSort from "../../utils/insertionsort";
import selectionSort from "../../utils/selectionsort";
import mergeSort from "../../utils/mergesort";
import quickSort from "../../utils/quicksort";

import Box from "./box";

import { BsShuffle, BsForward, BsSortDownAlt } from "react-icons/bs";

// colocar numero de elementos variavel

function CanvasMain() {
  const [generator, setGenerator] = useState(bubbleSort([1, 2, 3, 4, 5, 6, 7]));
  const [sortingState, setSortingState] = useState(() => generator.next());
  const [currentAlg, setCurrentAlg] = useState("Bubble sort");

  const sort = () => !sortingState.done && setSortingState(generator.next());

  const setAlgorithm = () => {
    let newGenerator;

    switch (currentAlg) {
      case "Insertion sort":
        newGenerator = insertionSort(sortingState.value.arr);
        break;
      case "Selection sort":
        newGenerator = selectionSort(sortingState.value.arr);
        break;
      case "Merge sort":
        newGenerator = mergeSort(sortingState.value.arr);
        break;
      case "Quick sort":
        newGenerator = quickSort(sortingState.value.arr);
        break;
      default:
        newGenerator = bubbleSort(sortingState.value.arr);
        break;
    }

    setGenerator(newGenerator);
    setSortingState(newGenerator.next());
  };

  const randomize = () => {
    sortingState.value.arr = shuffle(sortingState.value.arr);

    setAlgorithm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAlg(e.target.value);

    setAlgorithm();
  };

  const boxes = sortingState.value;

  return (
    <div style={{ height: "62vh", width: "100%" }}>
      <Canvas
        camera={{ fov: 70, position: [0, 0, 12] }}
        className="cursor-grab"
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxes.arr.map((h: number, idx: number) => (
          <Box
            height={h}
            key={`${idx} + ${h}`}
            position={[-7 + 2 * idx, 0, 0]}
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
          Algoritmo atual: {currentAlg} <BsSortDownAlt className="ml-2" />
        </h2>
        <select
          className="flex mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
          onChange={handleChange}
        >
          <option value={"Bubble sort"}>Bubble sort</option>
          <option value={"Insertion sort"}>Insertion sort</option>
          <option value={"Selection sort"}>Selection sort</option>
          <option value={"Merge sort"}>Merge sort</option>
          <option value={"Quick sort"}>Quick sort</option>
        </select>
        <div className="flex w-full items-center justify-around absolute top-5">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l flex items-center"
            onClick={randomize}
          >
            Embaralhar <BsShuffle className="ml-2" />
          </button>
          <button
            onClick={sort}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l flex items-center"
          >
            Próximo passo <BsForward className="ml-2" />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default CanvasMain;
