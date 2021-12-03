import { useState } from 'react'

type ButtonProps = {
  text?: string; 
  children?: string;
}

export function Button(props: ButtonProps) {
  const [number, setNumber] = useState(0);
  
  function increment() {
    setNumber(number + 1);
  }

  return (
    <div>
      <p>{number}</p>
      <button onClick={increment} >{props.text || 'Aumente o número'}</button>
      <button>{props.children || ''}</button>
    </div>
  );
}