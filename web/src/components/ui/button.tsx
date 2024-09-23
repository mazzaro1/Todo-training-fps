import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

// Define as dependências necessárias. O forwardRef é utilizado para passar a referência para o componente Button.
// ComponentProps tipa as propriedades do elemento button.
// tv e VariantProps são importados da biblioteca tailwind-variants.

const button = tv({
  // Define a configuração base do botão com tailwind-variants.
  // Isso configura o estilo base do botão com classes do Tailwind CSS.

  base: 'flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2',

  // Definição de variantes, como estilo (variant) e tamanho (size).

  variants: {
    variant: {
      // Variantes de estilo do botão (cores e efeitos de hover).
      primary: 'bg-pink-500 text-zinc-300 hover:bg-violet-600 ring-violet-500',
      secondary: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 ring-zinc-900',
    },
    size: {
      // Variantes de tamanho (padding).
      default: 'px-4 py-2.5', // Tamanho padrão
      sm: 'px-3 py-1.5', // Tamanho pequeno
    },
  },

  // Define as variantes padrão: variante "primary" e tamanho "default".
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>
// Define o tipo ButtonProps. Ele estende as propriedades nativas do botão (ComponentProps<'button'>) e as variantes de estilo do botão (VariantProps<typeof button>).

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    // O componente Button é uma função que usa forwardRef para passar referências para o botão HTML.
    // Recebe as props, variant e size e passa o resto das props para o elemento <button>.

    return (
      <button
        {...props}
        ref={ref}
        // O className é gerado dinamicamente com base nas variantes fornecidas e propriedades customizadas.
        className={button({ variant, size, className })}
      />
    )
  }
)

// Define um nome de exibição para o componente Button.
Button.displayName = 'Button'
