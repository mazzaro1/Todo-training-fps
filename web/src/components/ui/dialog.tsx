import * as DialogPrimitive from '@radix-ui/react-dialog'
// Importa todos os componentes do diálogo da biblioteca @radix-ui/react-dialog com o alias "DialogPrimitive".
// Radix UI é uma biblioteca de componentes acessíveis, e os componentes aqui estão sendo reaproveitados.

export function Dialog(props: DialogPrimitive.DialogProps) {
  // O componente principal do diálogo, simplesmente passa todas as propriedades recebidas (props) para o Dialog do Radix UI.
  return <DialogPrimitive.Dialog {...props} />
}

export function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
  // Componente para disparar a abertura do diálogo.
  // Reutiliza o DialogTrigger do Radix e passa as propriedades recebidas.
  return <DialogPrimitive.DialogTrigger {...props} />
}

export function DialogClose(props: DialogPrimitive.DialogCloseProps) {
  // Componente para fechar o diálogo.
  // Reutiliza o DialogClose do Radix e passa as propriedades recebidas.
  return <DialogPrimitive.DialogClose {...props} />
}

export function DialogPortal(props: DialogPrimitive.DialogPortalProps) {
  // O portal do diálogo é responsável por renderizar o conteúdo em uma camada separada da árvore de renderização.
  // Reutiliza o DialogPortal do Radix e passa as propriedades recebidas.
  return <DialogPrimitive.DialogPortal {...props} />
}

export function DialogOverlay(props: DialogPrimitive.DialogOverlayProps) {
  // Componente responsável pelo fundo do diálogo (overlay).
  // Além das propriedades recebidas, adiciona classes para estilizar o overlay com Tailwind CSS.
  // "bg-black/40" define uma cor de fundo preta com 40% de opacidade e "backdrop-blur-sm" adiciona um leve desfoque no fundo.
  return (
    <DialogPrimitive.DialogOverlay
      {...props}
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
    />
  )
}

export function DialogContent(props: DialogPrimitive.DialogContentProps) {
  // Componente que renderiza o conteúdo do diálogo.
  // O conteúdo é envolvido pelo DialogPortal e DialogOverlay para garantir que seja renderizado corretamente no contexto de um portal e com um overlay.
  // Adiciona classes para definir a posição e estilo do conteúdo com Tailwind CSS.
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.DialogContent
        {...props}
        className="fixed z-50 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8"
        // Classe para posicionar o diálogo no lado direito da tela com largura de 400px e altura completa (h-screen).
        // "border-l" define uma borda esquerda e "bg-zinc-950" define a cor de fundo. "p-8" adiciona padding.
      />
    </DialogPortal>
  )
}

export function DialogTitle(props: DialogPrimitive.DialogTitleProps) {
  // Componente para o título do diálogo.
  // Reutiliza o DialogTitle do Radix e adiciona classes para estilizar o texto como título.
  return (
    <DialogPrimitive.DialogTitle {...props} className="text-lg font-semibold" />
    // "text-lg" define um tamanho de texto maior, e "font-semibold" torna o texto semi-negrito.
  )
}

export function DialogDescription(
  props: DialogPrimitive.DialogDescriptionProps
) {
  // Componente para a descrição do diálogo.
  // Reutiliza o DialogDescription do Radix e adiciona classes para estilizar o texto descritivo.
  return (
    <DialogPrimitive.DialogDescription
      {...props}
      className="text-zinc-400 text-sm leading-relaxed"
      // "text-zinc-400" define a cor do texto, "text-sm" ajusta o tamanho do texto para pequeno, e "leading-relaxed" define um espaçamento maior entre as linhas.
    />
  )
}
