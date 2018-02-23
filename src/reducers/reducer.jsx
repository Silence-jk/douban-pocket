const UPDATE_KIND = 'UPDATE_KIND'
const UPDATE_LIST = 'UPDATE_LIST'

/**
 *
 * @param {*} state
 * @param {*} action
 */
export default function (state, action) {
  if (!state) {
    return {
      datas: {
        kind: 'book',
        list: {

        }
      }
    }
  }

  switch (action.type) {
    case UPDATE_KIND:
      return {
        datas: {
          kind: action.newKind,
          list: state.datas.list
        }
      }
    case UPDATE_LIST:
      return {
        datas: {
          kind: state.datas.kind,
          list: action.newList
        }
      }
    default:
      return {
        state
      }
  }
}

export const updateKind = (newKind) => {
  return {
    type: UPDATE_KIND,
    newKind
  }
}

export const updateList = (newList) => {
  return {
    type: UPDATE_LIST,
    newList
  }
}
