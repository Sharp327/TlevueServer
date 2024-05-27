import { ParsedQs } from 'qs'
import { getMenuRepository } from '../repository/MenuRepository'

export const getMenuService = async (pagetype: string | ParsedQs | string[] | ParsedQs[] | undefined) => {
  const newMenu = await getMenuRepository(pagetype)
  return newMenu
}
