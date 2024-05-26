import { getMenuRepository } from '../repository/MenuRepository'

export const getMenuService = async () => {
  const newMenu = await getMenuRepository()
  return newMenu
}
