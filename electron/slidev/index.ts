import { createSlidevDev } from './slidev.dev'
import { createSlidevServer } from './slidev.server'
export const createSlidev = async (prod: boolean) => {
  if (prod) {
    return createSlidevServer()
  } else {
    return createSlidevDev()
  }
}