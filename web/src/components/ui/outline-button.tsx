import type { ComponentProps } from 'react'
// Importa o tipo ComponentProps do React, que é usado para definir o tipo das propriedades que o componente <button> pode receber.

import { twMerge } from 'tailwind-merge'
// Importa a função twMerge, que é usada para combinar e resolver classes CSS do Tailwind, especialmente quando o usuário passa classes adicionais através de props.

export function OutlineButton(props: ComponentProps<'button'>) {
  // Define o componente OutlineButton, que utiliza as propriedades nativas do elemento HTML <button> usando ComponentProps<'button'>.

  return (
    <button
      {...props}
      // O spread {...props} garante que todas as propriedades passadas ao componente (como onClick, children, etc.) sejam aplicadas ao botão.

      className={twMerge(
        // twMerge combina as classes CSS padrão com qualquer classe adicional passada através de props.className.
        'flex items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-zinc-800 text-sm text-zinc-300 hover:border-zinc-700 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4',
        // Classe padrão do botão, usando utilitários do Tailwind CSS:
        // 'flex items-center': Alinha o conteúdo do botão como um flex container, com os itens centralizados verticalmente.
        // 'px-3 py-2': Define o padding horizontal (px-3) e vertical (py-2).
        // 'gap-2': Define o espaçamento entre os elementos filhos do botão (ícones, texto, etc.).
        // 'leading-none': Remove qualquer espaçamento adicional entre linhas de texto.
        // 'rounded-full': Faz o botão ter bordas completamente arredondadas.
        // 'border border-dashed border-zinc-800': Define uma borda tracejada (dashed) com a cor zinc-800.
        // 'text-sm text-zinc-300': Define o tamanho do texto como pequeno (text-sm) e a cor como zinc-300.
        // 'hover:border-zinc-700': No estado de hover, a borda muda para zinc-700.
        // 'disabled:opacity-50': No estado disabled (desabilitado), a opacidade é reduzida para 50%.
        // 'disabled:pointer-events-none': Quando desabilitado, remove a capacidade de clicar no botão.
        // 'outline-none': Remove o estilo padrão de foco.
        // 'focus-visible:border-pink-500': No estado de foco visível, a borda muda para pink-500.
        // 'ring-pink-500/10 focus-visible:ring-4': Adiciona um anel de foco de 4px com uma sombra rosa clara ao redor do botão.

        props.className
        // Mescla as classes padrão com qualquer classe personalizada passada via props.className.
      )}
    />
  )
}
