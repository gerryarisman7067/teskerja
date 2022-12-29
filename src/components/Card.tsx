import { useState } from "react";
import { Result } from "../interface";

interface Props {
  character: Result;
}
export const Card = ({ character }: Props) => {
  const [expan, setExpan] = useState(false);

  const handleClick = (item) => {
    setExpan(!expan);
    console.log(item);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="https://s3.amazonaws.com/freecodecamp/relaxing-cat.jpg"
        alt={character.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{character.name}</div>
        {expan ? (
          <p className="text-gray-700 text-base">{character.description}</p>
        ) : null}
      </div>
      <div className="flex justify-end m-2">
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleClick(character)}
        >
          Detail
        </button>
      </div>
    </div>
  );
};
