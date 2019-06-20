import find from "ramda/src/find";
import filter from "ramda/src/filter";
import propEq from "ramda/src/propEq";
import flatten from "ramda/src/flatten";
import map from "ramda/src/map";
import uniqid from "uniqid";

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

export const setItem = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = (key: string) => {
  if (localStorage.getItem(key))
    return JSON.parse(localStorage.getItem(key) || "");
  return null;
};
export const generateItems = (count: any, creator: any) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};

export const generateBoardItems = () => {
  return map(
    (board: any) => ({
      id: board.key,
      type: "container",
      name: board.title,
      props: {
        orientation: "vertical",
        className: "card-container"
      },
      card: generateCardItems(board.key)
    }),
    getItem("boardItems") || []
  );
};
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
      data: card.description
    }),
    filter((card: any) => card.boardId === boardId, getItem("cardItems") || [])
  );
};

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
export const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

export const initialState = () => ({
  board: {
    type: "container",
    props: {
      orientation: "horizontal"
    },
    children: generateBoardItems()
  }
});

export const makeCopy = (source: any) => {
  return Object.assign({}, source);
};

export const getSelectedItem = (key: string, value: any, columnData: any) => {
  return find(propEq(key, value))(columnData);
};

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

export const deleteItems = (id: string) => {
  if (getItem("cardItems")) {
    if (id) {
      const updatedItem = filter(
        (item: any) => item.key !== id,
        getItem("cardItems")
      );
      setItem("cardItems", updatedItem);
    }
  }
};

export const updateObject = (
  arr1: any,
  arr2: any,
  prop: string,
  key: string
) => {
  return arr1[prop].map((obj: any) => {
    return arr2[prop].find((o: any) => o[key] === obj[key]) || obj;
  });
};

export const makeObject = (data: any) => {
  const cardItems = map(values => {
    const boardId = values.id;
    return map(
      (card: any) => ({
        key: card.id,
        title: card.title || "",
        description: card.data,
        boardId: boardId
      }),
      filter(Boolean, values.card)
    );
  }, data);
  setItem("cardItems", flatten(cardItems));
  return;
};

export const reOrderBoard = (boards: any) => {
  setItem(
    "boardItems",
    map((x: any) => ({ key: x.id, title: x.name }), boards)
  );
  return;
};
