export type Question = {
  text: string,
  answers: string[],
  correctAnswers: number[],
  type?: 'text' | 'image',
  image?: string
}
