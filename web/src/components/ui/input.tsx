import { forwardRef, type ComponentProps } from 'react'
// Importa o forwardRef para permitir a passagem de uma referência ao componente, e ComponentProps tipa as propriedades do elemento 'input'.

import { twMerge } from 'tailwind-merge'
// Importa a função twMerge, que é usada para combinar e resolver classes do Tailwind CSS.
// Isso ajuda a lidar com possíveis conflitos entre classes, como a ordem de aplicação de estilos.

type InputProps = ComponentProps<'input'>
// Define o tipo InputProps, que estende as propriedades nativas do elemento HTML <input>.

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // Define o componente Input usando forwardRef para permitir a passagem da referência do input (ref).
  // InputProps são as propriedades que o componente pode receber.

  return (
    <input
      {...props}
      ref={ref}
      // Usa spread operator para passar todas as propriedades (props) ao input.
      // ref é passado diretamente para o input, permitindo manipulação externa (como foco programático).

      className={twMerge(
        // A função twMerge é usada para mesclar a classe padrão do input com qualquer outra classe personalizada passada via props.className.
        'px-4 h-12 bg-black border border-zinc-900 rounded-lg placeholder-zinc-400 outline-none text-sm hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10',
        props.className
        // Classe padrão do input, definindo padding (px-4), altura (h-12), cor de fundo (bg-black), bordas, arredondamento (rounded-lg),
        // e estilos de placeholder, hover, e focus usando utilitários do Tailwind CSS.
        // "twMerge" garante que se houver um className passado por props, ele seja corretamente mesclado com o estilo padrão.
      )}
    />
  )
})

Input.displayName = 'Input'
//
