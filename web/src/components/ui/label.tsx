import type { ComponentProps } from 'react'
// Importa o tipo ComponentProps do React, que é usado para definir o tipo das propriedades que o componente <label> pode receber.

import { twMerge } from 'tailwind-merge'
// Importa a função twMerge, que combina classes CSS do Tailwind, resolvendo possíveis conflitos ou duplicações de estilos.

export function Label(props: ComponentProps<'label'>) {
  // Define o componente Label, que recebe propriedades padrão do elemento HTML <label> através de ComponentProps<'label'>.

  return (
    <label
      {...props}
      // O operador spread {...props} garante que todas as propriedades passadas ao componente, como `htmlFor` ou `children`, sejam aplicadas ao elemento <label>.

      className={twMerge(
        // Usa twMerge para combinar a classe padrão com qualquer classe personalizada que o usuário forneça em `props.className`.
        'font-medium text-sm tracking-tight leading-normal',
        // Classe padrão do Tailwind CSS para estilizar o texto:
        // 'font-medium' define peso médio da fonte.
        // 'text-sm' define o tamanho pequeno do texto.
        // 'tracking-tight' reduz o espaçamento entre letras.
        // 'leading-normal' define o espaçamento entre linhas padrão.

        props.className
        // Se o usuário passar uma classe personalizada, ela será mesclada com as classes padrão.
      )}
    />
  )
}
