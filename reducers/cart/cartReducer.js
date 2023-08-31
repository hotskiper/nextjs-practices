export default function cartReducer(list, action) {
  switch (action.type) {
    case "FETCH_LIST":{
      return action.list.map(item=>{item.checked=true; return item;});
    }

    case "SET_LIST_ITEM_PROPERTY": {
      return list.map((item) => {
        if (item._id === action.id) {
          item[action.property] = action.value;
        }
        return item;
      });
    }

    case "REMOVE_FROM_CART": {
      return list.filter(item=>item._id !== action.id);
    }

    case "PATCH_REMOVE_FROM_CART": {
      return list.filter((item) => !item.checked);
    }
    
    case "CHECKED": {
      return list.map((item) => {
        if (item._id === action.id) {
          item.checked = !item.checked;
        }
        return item;
      });
    }

    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}
