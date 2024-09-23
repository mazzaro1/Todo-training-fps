import type { ComponentProps } from 'react'
// Importa o tipo `ComponentProps` do React, que permite definir as propriedades do componente `Separator` baseadas em um elemento HTML.
// Neste caso, o elemento base é um `<div>`.

import { twMerge } from 'tailwind-merge'
// Importa a função `twMerge`, que mescla classes Tailwind CSS e remove possíveis duplicatas ou conflitos de classes CSS.

export function Separator(props: ComponentProps<'div'>) {
  // Define o componente funcional `Separator`, que aceita todas as propriedades padrão de um elemento `<div>`.

  return (
    <div
      {...props}
      // O operador spread `{...props}` garante que todas as propriedades passadas ao componente `Separator` sejam aplicadas ao `<div>`.

      className={twMerge('h-px bg-zinc-900', props.className)}
      // `twMerge` é utilizado para combinar as classes Tailwind CSS:
      // 'h-px': Define a altura do divisor como 1 pixel, criando uma linha fina.
      // 'bg-zinc-900': Define a cor de fundo da linha como `zinc-900` (um tom de cinza escuro).
      // `props.className`: Permite que classes CSS adicionais sejam aplicadas externamente, combinando-as com as classes padrão de forma que não haja conflitos.
    />
  )
}
