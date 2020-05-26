import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMemoryDispatch, useMemoryState } from '../context/memory-context'

const TimerValue = styled.h3`
  text-align: center;
  color: whitesmoke;
  font-size: 4rem;
`

export const Timer = () => {
  const dispatch = useMemoryDispatch()
  const state = useMemoryState()
  const [time, setTime] = useState(0)
  useEffect(() => {
    let interval = setInterval((): void => {
      setTime((time) => time + 1)
    }, 1000)

    return () => clearInterval(interval)
  })
  return <TimerValue>{time}</TimerValue>
}
