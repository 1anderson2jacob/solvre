import { useState, useCallback, useEffect } from 'react'

function usePackData(grid, numColumns) {
  const [data, setData] = useState({
    incompleteWord: Array.from({length:numColumns},()=> ('_')),
    excludedLetters: [],
    requiredLetters: [],
    wrongLetterPos: [],
  })

  const updateIncompleteWord = useCallback((letter, index) => {
    setData(prevState => {
      let newState = prevState.incompleteWord
      newState[index] = letter

      return { ...prevState, incompleteWord: newState }
    })
  }, [])

  const updateExcludedLetters = useCallback(letter => {
    setData(prevState => {
      let newState = prevState.excludedLetters
      prevState.excludedLetters.includes(letter) === false && newState.push(letter)

      return { ...prevState, excludedLetters: newState }
    })
  }, [])

  const updateRequiredLetters = useCallback(letter => {
    setData(prevState => {
      let newState = prevState.requiredLetters
      prevState.requiredLetters.includes(letter) === false && newState.push(letter)

      return { ...prevState, requiredLetters: newState}
    })
  }, [])

  const updateWrongLetterPos = useCallback((letter, x, y) => {
    setData(prevState => {
      let newState = prevState.wrongLetterPos
      newState.push({[letter]: { x,y } })

      return { ...prevState, wrongLetterPos: newState }
    })
  }, [])

  const trimExcludedLetters = useCallback(() => {
    setData(prevState => {
      let newState = prevState.excludedLetters.filter(letter => {
        if (prevState.requiredLetters.includes(letter)) {
          return false
        }
        return true
      })

      return { ...prevState, excludedLetters: newState }
    })
  }, [])

  useEffect(() => {

    setData({
      incompleteWord: Array.from({length:numColumns},()=> ('_')),
      excludedLetters: [],
      requiredLetters: [],
      wrongLetterPos: [],
    })
    
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const tile = grid[i][j];
        switch (tile.dataState) {
          case 'empty' : 
            break
          case 'absent' :
            updateExcludedLetters(tile.letter)
            break
          case 'present' : 
            updateRequiredLetters(tile.letter)
            updateWrongLetterPos(tile.letter, j, i)
            break
          case 'correct' : 
            updateIncompleteWord(tile.letter, j)
            updateRequiredLetters(tile.letter)
            break
          default : break
        } 
      }
    }
    trimExcludedLetters()

    //eventually, this entire section probably just needs to useReducer instead of useState
  

  } ,[grid, updateExcludedLetters, updateRequiredLetters, updateIncompleteWord, updateWrongLetterPos, numColumns, trimExcludedLetters])

  return { data } 
}

export default usePackData
