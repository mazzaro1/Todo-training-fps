import { Dialog } from './components/ui/dialog'
import { CriarMeta } from './components/criar-meta'
import { Resumo } from './components/resumo'
/*import { SemMetas } from './components/sem-metas'*/

export function App() {
  return (
    <Dialog>
      <Resumo />
      <CriarMeta />
    </Dialog>
  )
}
