import { useState, useCallback } from 'react'
/*
eventually take this objet as an arguement 
{ rows, columns}
then generate the appropriate grid in [grid, setGrid] = useState
*/
const arrSize = 5;
const numRows = 6;
const dataStateEnum = Object.freeze({
  empty: 'empty',
  absent: 'absent',
  present: 'present',
  correct: 'correct'
})

let gridObj = {}
for (let i = 0; i < numRows; i++) {
  gridObj[i] = Array.from({length:arrSize},()=> ({ letter:'', dataState: dataStateEnum.empty }))
}

function useGrid() {
  const [grid, setGrid] = useState(gridObj)
  const [gridPos, setGridPos] = useState({ row: 0, index: 0})

  const moveUp = useCallback(() => {
    if (gridPos.row !== 0) {
        setGridPos(prevState => {
          return {
            ...prevState,
            row: prevState.row - 1
          }
        })
    }
  }, [gridPos.row])

  const moveDown = useCallback(() => {
    if (gridPos.row < numRows-1) {
      setGridPos(prevState => {
        return {
          ...prevState,
          row: prevState.row + 1
        }
      })
    }
  }, [gridPos.row])

  const moveLeft = useCallback(() => {
    if (!(gridPos.row === 0 && gridPos.index === 0)) {
      if (gridPos.index > 0) {
        setGridPos(prevState => {
          return {
            ...prevState,
            index: prevState.index - 1
          }
        });
      } else {
        setGridPos(prevState => {
          return {
            row: prevState.row - 1,
            index: arrSize-1,
          }
        })
      }					
    }
  }, [gridPos])

  const moveRight = useCallback(() => {
    if (gridPos.index < arrSize-1) {
      setGridPos(prevState => {
        return { 
          ...prevState,
          index: prevState.index + 1
        }
      })
    } else if (gridPos.row < numRows-1) { 
      setGridPos(prevState => {
        return {
          row: prevState.row + 1,
          index: 0
        }
      })
    }
  }, [gridPos])

  const addLetter = useCallback((letter) => {
    setGrid(prevState => {
      const currentRow = prevState[gridPos.row]
      currentRow[gridPos.index] = { letter: letter, dataState: dataStateEnum.absent }
      return ({
        ...prevState,
        [gridPos.row]: currentRow
      })
    })

    moveRight();		
  }, [gridPos, moveRight])

  const removeLetter = useCallback((letter) => {
    setGrid(prevState => {
      const currentRow = prevState[gridPos.row]
      currentRow[gridPos.index] = { letter: '', dataState: dataStateEnum.empty }
      return ({
        ...prevState,
        [gridPos.row]: currentRow
      })
    })
    
    moveLeft();
  }, [gridPos, moveLeft])

  const setDataState = useCallback((state) => {
    setGrid(prevState => {
      const currentRow = prevState[gridPos.row]
      let currentTile = prevState[gridPos.row][gridPos.index]
      currentRow[gridPos.index] = { ...currentTile, dataState: state}

      return ({
        ...prevState,
        [gridPos.row]: currentRow
      })
    })
  }, [gridPos])

  const cycleDataState = useCallback(() => {
    let currentTile = grid[gridPos.row][gridPos.index]
    switch (currentTile.dataState) {
      case (dataStateEnum.absent) : setDataState(dataStateEnum.present);
      return;
      case (dataStateEnum.present) : setDataState(dataStateEnum.correct);
      return;
      case (dataStateEnum.correct) : setDataState(dataStateEnum.absent);
      return;
      default : return;
    }
  }, [grid, gridPos, setDataState])

  return {  grid, gridPos, setGridPos, 
            moveUp, moveDown, moveLeft, 
            moveRight, addLetter, removeLetter, 
            cycleDataState, numRows  }
}

export default useGrid