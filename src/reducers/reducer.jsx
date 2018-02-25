const UPDATE_KIND = 'UPDATE_KIND'
const UPDATE_LIST = 'UPDATE_LIST'
const UPDATE_DETAIL = 'UPDATE_DETAIL'
const UPDATE_QUERY = 'UPDATE_QUERY'
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
        isShowDetail: false,
        query: ''
      }
    }
  }

  switch (action.type) {
    case UPDATE_KIND:
      return {
        datas: {
          kind: action.newKind,
          list: state.datas.list,
          isShowDetail: state.datas.isShowDetail,
          query: state.datas.query
        }
      }
    case UPDATE_LIST:
      return {
        datas: {
          kind: state.datas.kind,
          list: action.newList,
          isShowDetail: state.datas.isShowDetail,
          query: state.datas.query
        }
      }
    case UPDATE_DETAIL:
      return {
        datas: {
          kind: state.datas.kind,
          list: state.datas.list,
          isShowDetail: action.newDeatilStatus,
          query: state.datas.query
        }
      }  
    case UPDATE_QUERY:
      return {
        datas: {
          kind: state.datas.kind,
          list: state.datas.list,
          isShowDetail: state.datas.isShowDetail,
          query: action.newQuery
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

export const updateQuery = (newQuery) => {
  return {
    type: UPDATE_QUERY,
    newQuery
  }
}
