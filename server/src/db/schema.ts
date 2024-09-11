import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const metas = pgTable('metas', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  titulo: text('titulo').notNull(),
  frequenciaSemanalDesejada: integer('frequencia_semanal_desejada').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const metasConcluidas = pgTable('metas_concluidas', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  idMeta: text('id_meta')
    .references(() => metas.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

//goals = metas
//desireWeeklyFrequency = frequenciaSemanalDesejada
