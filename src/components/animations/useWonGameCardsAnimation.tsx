import { useRef, useState, useEffect, MutableRefObject } from 'react'
import { config, useTransition, UseTransitionProps } from 'react-spring'
import { useMemoryState, MemoryCard } from '../../context/memory-context'

interface AnimatedMemoryCard extends MemoryCard {
  transform: number[]
  transitionRef: MutableRefObject<any>
  transition: UseTransitionProps<AnimatedMemoryCard, any>
  showCongrats: boolean
}

const random = (offset: number) => {
  let int = Math.floor(
    Math.floor(offset + Math.random() * (offset * 3 - offset + 1))
  )

  if (int % 2 === 0) {
    int = -int
  }

  return int
}

export const useWonGameCardsAnimation = ({
  grid,
}: {
  grid: MutableRefObject<any>
}): any => {
  const { cards } = useMemoryState()
  const [wonCards, setWonCards] = useState(cards)
  const [showCongrats, setShowCongrats] = useState(false)
  const { clientHeight, clientWidth } = grid.current

  const transitionRef: MutableRefObject<any> = useRef()
  const transition = useTransition(
    !showCongrats
      ? wonCards.map((card) => ({
          ...card,
          transform: [random(clientWidth), random(clientHeight), random(20)],
        }))
      : [],
    (card) => card.uniqueId,
    {
      ref: transitionRef,
      initial: { transform: `translate3d(0px, 0px, 0px)` },
      // @ts-ignore
      leave: (item) => async (next) => {
        const [x, y, z] = item.transform
        await next({
          transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        })
      },
      onDestroyed: () => setShowCongrats(true),
      config: { ...config.wobbly },
      trail: 30,
    }
  )

  useEffect(() => {
    const timeout = setTimeout(() => setWonCards([]), 400)
    return () => clearTimeout(timeout)
  }, [])

  return {
    transitionRef,
    transition,
    showCongrats,
  } as AnimatedMemoryCard
}
