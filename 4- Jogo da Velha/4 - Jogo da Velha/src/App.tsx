import { useState, useEffect  } from 'react'
import './index.css';

const App: React.FC = () => {
  const [player, setPlayer] = useState<string>('');
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonClicked2, setButtonClicked2] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [oppositeSymbol, setOppositeSymbol] = useState('');
  const [winner, setWinner] = useState<string | null>('');
  const [gameOver, setGameOver] = useState(false);
  const [winnerList, setWinnerList] = useState<string[]>([]);



  useEffect(() => {
    const verifyWinner = () => {
      const winningPositions = [
        // Linhas
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Colunas
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonais
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const [a, b, c] of winningPositions) {
        if (
          board[a] &&
          board[a] === board[b] &&
          board[a] === board[c]
        ) {
          setWinner(board[a]);
          setGameOver(true);
          setWinnerList(prevWinnerList => [...prevWinnerList, board[a]]);
          return;
        }
      }
    };
  
    verifyWinner();
  
  }, [board, setWinner, setGameOver, setWinnerList]);

  const newWinnerList = winnerList.map((element, index) =>  
<div key={index}>
  {index+1}. O jogador {element} venceu!
  <br />
</div>  
  );


  const clearGame = () => {
    setBoard(Array(9).fill(''))
    setWinner('')
    setGameOver(false)
  }
  
  const handleSymbol = ( symbol: string ) => {
    setSelectedSymbol(symbol);
    setPlayer(symbol)
    const opSymbol = symbol === 'X' ? 'O' : 'X';
    setOppositeSymbol(opSymbol)
  }
  const handleCellClick = ( index: number ): void => {
    if ( gameOver || board[index] !== '' ) {
      return;
    }

    switch(player) {
      case "X":
        setPlayer('O')
        break
      case "O":
        setPlayer('X')
        break
      default:
        break
    };
    setBoard(board.map(( item, itIndex) => itIndex === index ? player : item ));
    
  };

  const handleButtonClick = () => {
    setButtonClicked(true)
    setButtonClicked2(false)
  }
  const handleButtonClick2 = () => {
    setButtonClicked2(true);
    setButtonClicked(false);
    setPlayer('X'); 
    setBoard(Array(9).fill(''))
  }
  const clickOtherCell = ( index: number ): void => {
    if ( gameOver || board[index] !== '' ) {
      return;
    }
  
    const emptyIndexes: number[] = board.reduce(( indexes: number[], cell: string, itIndex: number ) => {
      if ( cell !== 'X' && cell !== 'O' && itIndex !== index ) {
        indexes.push(itIndex);
      }
      return indexes;
    }, []);
  
    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    setBoard((prevBoard) => {

      const newBoard = [...prevBoard];
      newBoard[index] = selectedSymbol;
      return newBoard;
    });
    if (!['X', 'O'].includes(board[randomIndex]) && randomIndex !== index ) {
      setTimeout(() => {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[randomIndex] = oppositeSymbol;
          return newBoard;
        });
      }, 250); 
    }
    
  };
  return (
    <main>
      <div className='maingame'>
        <div className='maingame-2'>
          <div className='game-container'>
            <h1 className='title'>Jogo da Velha</h1>
              <div className='symbol-select-properties'>
                <button onClick={() => {handleSymbol('X')}}>X</button>
                <button onClick={() => {handleSymbol('O')}}>O</button>
              </div>
          </div>
        <div className="board">
          {board.map((item, index) => ( 
          <div 
            key={index}
            className={`cell ${item}`}
            onClick={() => {
            if (buttonClicked === true) {
              handleCellClick(index);
            } else if (buttonClicked2 === true) {
              clickOtherCell(index);
            }
          }}>
            {item}
          </div>
        ))}</div>
        <h1 className='winnerStyle'>{`O vencedor é o jogador: ${winner}`}</h1>
        <div className='button-container'>
            <button className='gameType' onClick={handleButtonClick}>1 Jogador</button>
            <button className='gameType' onClick={handleButtonClick2}>2 Jogadores</button>
          <button className='clear' onClick={clearGame}>Jogar novamente</button>
        </div>
        </div>
          <div  className='winnerListStyle'>
            <h2>Histórico de partidas: {newWinnerList}</h2>
          </div>
      </div>
    </main>
  );
};

export default App;
