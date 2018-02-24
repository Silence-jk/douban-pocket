const UPDATE_KIND = 'UPDATE_KIND'
const UPDATE_LIST = 'UPDATE_LIST'
const UPDATE_DETAIL = 'UPDATE_DETAIL'
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

        },
        isShowDetail: false
      }
    }
  }

  switch (action.type) {
    case UPDATE_KIND:
      return {
        datas: {
          kind: action.newKind,
          list: state.datas.list,
          isShowDetail: state.datas.isShowDetail
        }
      }
    case UPDATE_LIST:
      return {
        datas: {
          kind: state.datas.kind,
          list: action.newList,
          isShowDetail: state.datas.isShowDetail
        }
      }
    case UPDATE_DETAIL:
      return {
        datas: {
          kind: state.datas.kind,
          list: state.datas.list,
          isShowDetail: action.newDeatilStatus
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

export const updateDetail = (newDeatilStatus) => {
  return {
    type: UPDATE_DETAIL,
    newDeatilStatus
  }
}
