// import './App.css'
import { useState } from "react"

interface SquareProps{value: string|number|null, onSquareClick:()=>void}

function Square({value, onSquareClick}:SquareProps){
  return <button className="square" onClick={onSquareClick}>
    {value}
    </button>
}

export default function Board(){
  const [squares, setSqures] = useState<(string|number|null)[]>(Array(9).fill(null))
  const [xIsnext, setXisNext] = useState<(boolean)>(true)  
  
  function handleClick(i: number){
    if(squares[i]||calculateWinner(squares)){
      return
    }
    const nextSquares = squares.slice()

    if(xIsnext){
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    setSqures(nextSquares)
    setXisNext(!xIsnext)
  }

  const winner = calculateWinner(squares)
  const tie = claculateTie(squares)

  let status

  if(winner){
    status = 'Winner:' + winner
  } else if(tie) {
    status = `It's a tie!!!`
  } else {
    status = 'Next player:' + (xIsnext? 'X':'O')
  }

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
  <Square value={squares[0]} onSquareClick = { ()=> handleClick(0)}/>
  <Square value={squares[1]} onSquareClick = { ()=> handleClick(1)}/>
  <Square value={squares[2]} onSquareClick = { ()=> handleClick(2)}/>
  </div>
  <div className="board-row">
  <Square value={squares[3]} onSquareClick = { ()=> handleClick(3)}/>
  <Square value={squares[4]} onSquareClick = { ()=> handleClick(4)}/>
  <Square value={squares[5]} onSquareClick = { ()=> handleClick(5)}/>
  </div>
  <div className="board-row">
  <Square value={squares[6]} onSquareClick = { ()=> handleClick(6)}/>
  <Square value={squares[7]} onSquareClick = { ()=> handleClick(7)}/>
  <Square value={squares[8]} onSquareClick = { ()=> handleClick(8)}/>
  </div>
  </>
)
}

function claculateTie(squares: (string|number|null)[]){
  return squares.every(square => square !== null)
}

function calculateWinner(squares: (string|number|null)[]){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i = 0; i < lines.length; i++){
    const[a,b,c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null 
}