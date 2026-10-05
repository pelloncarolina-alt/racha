export const AVATARS = [
  { id: 'fox', emoji: '🦊', from: '#ff9a5a', to: '#ff4d6d' },
  { id: 'alien', emoji: '👾', from: '#b39dff', to: '#5b8cff' },
  { id: 'wolf', emoji: '🐺', from: '#7de3ff', to: '#4a6cf7' },
  { id: 'rocket', emoji: '🚀', from: '#ffd36e', to: '#ff7eb3' },
  { id: 'ghost', emoji: '👻', from: '#9df2c6', to: '#3fbfb3' },
  { id: 'bolt', emoji: '⚡', from: '#fff07a', to: '#ff9e4a' },
]

export function getAvatar(id) {
  return AVATARS.find((a) => a.id === id) || AVATARS[0]
}
