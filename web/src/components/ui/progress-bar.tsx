import * as ProgressPrimitive from '@radix-ui/react-progress'
// Importa o módulo Progress da biblioteca Radix UI, que fornece componentes acessíveis e altamente configuráveis.
// Neste caso, estamos importando o Progress e o Indicator, componentes para a barra de progresso.

export function Progress(props: ProgressPrimitive.ProgressProps) {
  // Define o componente Progress, que é um wrapper para o Progress da Radix UI.
  // Ele aceita todas as propriedades (props) que o componente Progress original da Radix UI aceita.

  return (
    <ProgressPrimitive.Progress
      {...props}
      // O operador spread {...props} aplica todas as propriedades passadas ao componente Progress original.
      className="bg-zinc-900 rounded-full h-2"
      // Aplica classes do Tailwind CSS para estilizar a barra de progresso:
      // 'bg-zinc-900': Define a cor de fundo da barra de progresso (escura).
      // 'rounded-full': Torna as bordas da barra arredondadas (estilo pílula).
      // 'h-2': Define a altura da barra como 2 unidades.
    />
  )
}

export function ProgressIndicator(
  props: ProgressPrimitive.ProgressIndicatorProps
) {
  // Define o componente ProgressIndicator, que exibe o indicador de progresso dentro da barra.
  // Ele aceita todas as propriedades do ProgressIndicator original da Radix UI.

  return (
    <ProgressPrimitive.Indicator
      {...props}
      // O operador spread {...props} aplica todas as propriedades ao componente Indicator original da Radix UI.
      className="bg-gradient-to-r from-pink-500 to-violet-600 w-1/2 h-2 rounded-full"
      // Aplica classes Tailwind para estilizar o indicador de progresso:
      // 'bg-gradient-to-r from-pink-500 to-violet-600': Cria um gradiente que vai de rosa (pink-500) a violeta (violet-600) da esquerda para a direita.
      // 'w-1/2': Define a largura do indicador como 50% da barra de progresso (simula 50% completo).
      // 'h-2': Define a altura do indicador igual à altura da barra (2 unidades).
      // 'rounded-full': Torna as bordas do indicador arredondadas, igual à barra de progresso.
    />
  )
}
