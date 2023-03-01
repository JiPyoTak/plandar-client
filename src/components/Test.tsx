import React from 'react';

import useIdStore from '@/store/test';

interface IProps {
  text: string;
}

const Test = ({ text }: IProps) => {
  const state = useIdStore();
  const { id, increasePopulation, reset } = state;

  return (
    <div>
      <h1>{text}</h1>
      <p>Population: {id}</p>
      <button onClick={() => increasePopulation(id)}>
        Increase Population
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Test;
