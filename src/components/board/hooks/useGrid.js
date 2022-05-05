import { useState, useCallback } from 'react'

const dataStateEnum = Object.freeze({
  empty: 'empty',
  absent: 'absent',
  present: 'present',
  correct: 'correct'
})

function useGrid({ numRows, numColumns }) {
  const [grid, setGrid] = useState(() => {
    let gridArr = []
    for (let i = 0; i < numRows; i++) {
      gridArr[i] = Array.from({length:numColumns},()=> ({ letter:'', dataState: dataStateEnum.empty }))
    }

    return gridArr
  })
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
  }, [gridPos.row, numRows])

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
            index: numColumns-1,
          }
        })
      }					
    }
  }, [gridPos, numColumns])

  const moveRight = useCallback(() => {
    if (gridPos.index < numColumns-1) {
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
  }, [gridPos, numRows, numColumns])

  const addLetter = useCallback((letter) => {
    setGrid(prevState => {
      let newState = prevState.slice()
      newState[gridPos.row][gridPos.index] = { letter: letter, dataState: dataStateEnum.absent }
      return newState
    })

    moveRight();		
  }, [gridPos, moveRight])

  const removeLetter = useCallback(() => {
    setGrid(prevState => {
      let newState  = prevState.slice()
      newState[gridPos.row][gridPos.index] = { letter: '', dataState: dataStateEnum.empty }
      return newState
    })

    moveLeft();
  }, [gridPos, moveLeft])

  const setDataState = useCallback((state) => {
    setGrid(prevState => {
      let newState = prevState.slice()
      let currentTile = newState[gridPos.row][gridPos.index]
      newState[gridPos.row][gridPos.index] = { ...currentTile, dataState: state }
      return newState
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

  const hasInput = useCallback(() => {
    let inputBool = false
    for(let i = 0; i < numRows; i++) {
      for(let j = 0; j < numColumns; j++) {
        if (grid[i][j].letter !== '') {
          inputBool = true
        }
      }
    }
    return inputBool
  }, [grid, numColumns, numRows])

  return {  grid, gridPos, setGridPos, 
            moveUp, moveDown, moveLeft, 
            moveRight, addLetter, removeLetter, 
            cycleDataState, hasInput, numRows, numColumns }
}

export default useGrid