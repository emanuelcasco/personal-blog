import { useState } from 'react'

import useInterval from '@hooks/useInterval'

const COOL_WORDS_LIST =
  'Developer, Software Developer,Geek,Software Architect,Frontend Developer,Backend Developer,Tech Lead,Software Architect,Lead Developer,Tester,Analyst,Writer,Blogger,Node.js Dev'.split(
    ','
  )
const COOL_EMOJI_LIST = '👨🏽‍💻,👨🏽‍🏭,👨🏽‍🚀,⚽️,👷🏽‍♂️,🍕,🥷🏽,🧙🏽‍♂️,🇦🇷,🇮🇹,🇭🇷'.split(',')

const WORD_CHANGE_INTERVAL = 2_000

function takeNRandom<T>(arr: T[], num: number) {
  const shuffle = () => Math.random() - 0.5
  // create a clone of the array so we do not modify the original
  return Array(arr.length)
    .fill(0)
    .map((a, i) => a + i)
    .sort(shuffle)
    .slice(0, num)
}

function takeSingleRandom<T>(arr: T[]) {
  return takeNRandom(arr, 1)[0]
}

function useRandomRoleAndEmoji() {
  const [[role, emoji], setRole] = useState([
    COOL_WORDS_LIST[0],
    COOL_EMOJI_LIST[0],
  ])

  useInterval(() => {
    setRole([
      COOL_WORDS_LIST[takeSingleRandom(COOL_WORDS_LIST)],
      COOL_EMOJI_LIST[takeSingleRandom(COOL_EMOJI_LIST)],
    ])
  }, WORD_CHANGE_INTERVAL)

  return { role, emoji, text: `${role} ${emoji}` }
}

export default useRandomRoleAndEmoji
