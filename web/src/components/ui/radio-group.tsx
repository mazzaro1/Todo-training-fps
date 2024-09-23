import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
// Importa os componentes de rádio da Radix UI, que fornecem componentes acessíveis e configuráveis para criar grupos de botões de rádio.

import { CheckCircle2, Circle } from 'lucide-react'
// Importa ícones do pacote 'lucide-react', que serão usados como indicadores visuais para o estado dos itens de rádio (selecionado ou não).

export function RadioGroup(props: RadioGroupPrimitive.RadioGroupProps) {
  // Define o componente RadioGroup, que é um wrapper para o componente RadioGroup da Radix UI.
  // Ele aceita todas as propriedades definidas para o RadioGroup na Radix UI.

  return (
    <RadioGroupPrimitive.RadioGroup
      {...props}
      // O spread {...props} passa todas as propriedades fornecidas ao componente RadioGroup da Radix UI.

      className="flex flex-col gap-2"
      // Classe Tailwind que aplica estilos ao grupo de rádio:
      // 'flex flex-col': Organiza os itens em uma coluna usando Flexbox.
      // 'gap-2': Adiciona um espaçamento de 2 unidades entre os itens.
    />
  )
}

export function RadioGroupItem(props: RadioGroupPrimitive.RadioGroupItemProps) {
  // Define o componente RadioGroupItem, que representa cada botão de rádio individual no grupo.
  // Aceita todas as propriedades do RadioGroupItem da Radix UI.

  return (
    <RadioGroupPrimitive.RadioGroupItem
      {...props}
      // O spread {...props} passa todas as propriedades para o item de rádio da Radix UI.

      className="group bg-black border border-zinc-900 rounded-lg px-4 py-2.5 flex items-center justify-between outline-none hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10 data-[state=checked]:bg-pink-500/5 data-[state=checked]:border-pink-500"
      // Classe Tailwind para estilizar o botão de rádio:
      // 'group': Agrupa estilos para ser usado com outros elementos, como os ícones no RadioGroupIndicator.
      // 'bg-black': Define a cor de fundo do item como preto.
      // 'border border-zinc-900': Aplica uma borda com a cor 'zinc-900'.
      // 'rounded-lg': Define bordas arredondadas.
      // 'px-4 py-2.5': Define padding horizontal (px-4) e vertical (py-2.5).
      // 'flex items-center justify-between': Usa Flexbox para alinhar o conteúdo dentro do item, centralizando verticalmente e distribuindo horizontalmente.
      // 'outline-none': Remove o contorno padrão.
      // 'hover:border-zinc-800': Altera a cor da borda ao passar o mouse por cima.
      // 'focus-visible:border-pink-500': Altera a cor da borda quando o item está em foco.
      // 'focus-visible:ring-4 ring-pink-500/10': Adiciona um anel de foco com 4px de espessura e uma sombra rosa ao redor do item.
      // 'data-[state=checked]:bg-pink-500/5': Altera a cor de fundo para um tom claro de rosa quando o item está marcado (estado "checked").
      // 'data-[state=checked]:border-pink-500': Altera a cor da borda para rosa quando o item está marcado.
    />
  )
}

export function RadioGroupIndicator() {
  // Define o componente RadioGroupIndicator, que exibe o ícone apropriado com base no estado do item de rádio (selecionado ou não).

  return (
    <>
      <Circle className="size-4 text-zinc-600 group-data-[state=checked]:hidden" />

      <CheckCircle2 className="size-4 text-pink-500 hidden group-data-[state=checked]:inline" />
    </>
  )
}
