import { Dialog } from './components/ui/dialog'
import { CriarMeta } from './components/criar-meta'
import { SemMetas } from './components/sem-metas'

export function App() {
  return (
    <Dialog>
      <SemMetas />
      <CriarMeta />
    </Dialog>
  )
}
