export type Status = 'todo' | 'inprogress' | 'done'

export interface Task {
  id: string
  title: string
  status: Status
}
