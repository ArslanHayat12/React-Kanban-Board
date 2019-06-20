import find from "ramda/src/find";
import filter from "ramda/src/filter";
import propEq from "ramda/src/propEq";
import flatten from "ramda/src/flatten";
import map from "ramda/src/map";
import uniqid from "uniqid";

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
  return null;
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

//Store board and card items to localstorage
export const storeItems = (
  type: string | undefined,
  values: any,
  id: string
) => {
  if (type === "board") {
    if (getItem("boardItems")) {
      if (id) {
        const updatedItem = map(item => {
          if (item.key === id) {
            item.key = id;
            item = values;
          }
          return item;
        }, getItem("boardItems"));
        setItem("boardItems", updatedItem);
      } else {
        setItem("boardItems", [
          { key: uniqid(), title: values.title || "" },
          ...getItem("boardItems")
        ]);
      }
    } else
      setItem("boardItems", [{ key: uniqid(), title: values.title || "" }]);
  } else {
    if (getItem("cardItems")) {
      if (id) {
        const updatedItem = map(item => {
          if (item.key === id) {
            item = values;
            item.key = id;
          }
          return item;
        }, getItem("cardItems"));
        setItem("cardItems", updatedItem);
      } else {
        setItem("cardItems", [
          {
            key: uniqid(),
            title: values.title || "",
            description: values.description,
            boardId: values.boardId
          },
          ...getItem("cardItems")
        ]);
      }
    } else
      setItem("cardItems", [
        {
          key: uniqid(),
          title: values.title || "",
          description: values.description,
          boardId: values.boardId
        }
      ]);
  }
};

// Delete card items
export const deleteItems = (id: string, prop: string, key: string) => {
  if (key === "cardItems") {
    if (getItem(key)) {
      if (id) {
        const updatedItem = filter(
          (item: any) => item[prop] !== id,
          getItem(key)
        );
        setItem(key, updatedItem);
      }
    }
  } else {
    if (getItem(key)) {
      if (id) {
        const updatedItem = filter(
          (item: any) => item[prop] !== id,
          getItem(key)
        );
        setItem(key, updatedItem);
      }
    }
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
    //return arr2[prop].find((o: any) => o[key] === obj[key]) || obj;
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

export const getMessage = (id: string, message1: string, message2: string) => {
  return id ? message1 : message2;
};
