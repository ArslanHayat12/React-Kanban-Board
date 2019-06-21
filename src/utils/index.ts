import find from "ramda/src/find";
import filter from "ramda/src/filter";
import propEq from "ramda/src/propEq";
import flatten from "ramda/src/flatten";
import map from "ramda/src/map";

//Drag Drop Card replacing of cards from 1 column to other
export const applyDrag = (arr: any, dragResult: any) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  return result;
};

//Set board and card items to localstorage
export const setItem = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

//Get board and card items to localstorage
export const getItem = (key: string) => {
  if (localStorage.getItem(key))
    return JSON.parse(localStorage.getItem(key) || "");
  return [];
};

//Generate Board Data
export const generateBoardItems = () => {
  return map(
    (board: any) => ({
      id: board.key,
      type: "container",
      title: board.title,
      props: {
        orientation: "vertical",
        className: "card-container"
      },
      card: generateCardItems(board.key)
    }),
    getItem("boardItems") || []
  );
};

//Generate Cards Data
export const generateCardItems = (boardId: string) => {
  return map(
    (card: any) => ({
      type: "draggable",
      id: card.key,
      props: {
        className: "card",
        style: { backgroundColor: pickColor() }
      },
      title: card.title,
      description: card.description
    }),
    filter((card: any) => card.boardId === boardId, getItem("cardItems") || [])
  );
};

//Card colors
const cardColors = [
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "burlywood",
  "cornsilk",
  "gainsboro",
  "ghostwhite",
  "ivory",
  "khaki"
];

//Card colors picking
export const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

//Initial states of board and cards
export const initialState = () => ({
  board: {
    type: "container",
    props: {
      orientation: "horizontal"
    },
    children: generateBoardItems()
  }
});

//Cloning of data
export const makeCopy = (source: any) => {
  return Object.assign({}, source);
};

//Get selected item
export const getSelectedItem = (key: string, value: any, columnData: any) => {
  return find(propEq(key, value))(columnData);
};

const updateItem = (key: string, values: any, data: any) => {
  return map((item: any) => {
    if (item.key === key) {
      item.key = key;
      item = values;
    }
    return item;
  }, data);
};
//Store board and card items to localstorage
export const storeItems = (
  type: string | undefined,
  values: any,
  key: string
) => {
  if (type === "board") {
    if (key) {
      setItem("boardItems", updateItem(key, values, getItem("boardItems")));
    } else {
      setItem("boardItems", [
        { key: values.key, title: values.title || "" },
        ...getItem("boardItems")
      ]);
    }
  } else {
    if (key) {
      setItem("cardItems", updateItem(key, values, getItem("cardItems")));
    } else {
      setItem("cardItems", [
        {
          key: values.key,
          title: values.title || "",
          description: values.description,
          boardId: values.boardId
        },
        ...getItem("cardItems")
      ]);
    }
  }
};

// Delete card items
export const deleteItems = (id: string, prop: string, key: string) => {
  if (getItem(key)) {
    if (id) {
      const updatedItem = filter(
        (item: any) => item[prop] !== id,
        getItem(key)
      );
      setItem(key, updatedItem);
    }
  }
  if (key !== "cardItems") {
    deleteItems(id, "boardId", "cardItems");
  }
  return;
};

// Delete board items
export const deleteBoardItems = (id: string, key: string) => {
  if (getItem(key)) {
    if (id) {
      const updatedItem = filter((item: any) => item.key !== id, getItem(key));
      setItem(key, updatedItem);
    }
  }
};

//Update default object on board draging
export const updateObject = (
  arr1: any,
  arr2: any,
  prop: string,
  key: string
) => {
  return map((obj: any) => {
    return getSelectedItem(key, obj[key], arr2[prop]);
  }, arr1[prop]);
};

//Generation of card data for localstorage
export const makeObject = (data: any) => {
  const cardItems = map(values => {
    const boardId = values.id;
    return map(
      (card: any) => ({
        key: card.id,
        title: card.title || "",
        description: card.description,
        boardId: boardId
      }),
      filter(Boolean, values.card)
    );
  }, data);
  setItem("cardItems", flatten(cardItems));
  return;
};

//Reodering of board data for localstorage and setting
export const reOrderBoard = (boards: any) => {
  setItem(
    "boardItems",
    map((x: any) => ({ key: x.id, title: x.title }), boards)
  );
  return;
};
//Make messages
export const getMessage = (id: string, message1: string, message2: string) => {
  return id ? message1 : message2;
};
//Search content
export const searchRecords = (
  items: any,
  key1: string,
  key2: string,
  value: string
) => {
  value=value.toLowerCase();
  return {
    board: {
      type: "container",
      props: {
        orientation: "horizontal"
      },
      children: items[key1].filter((item: any) => {
        return (
          item.title.toLowerCase().includes(value) ||
          (item[key2] &&
            item[key2].some((card: any) => {
              return (
                card.title.toLowerCase().includes(value) || card.description.toLowerCase().includes(value)
              );
            }))
        );
      })
    }
  };
};
