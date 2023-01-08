import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const dbName = "jate";
  //first open the DB
  //define the transaction
  //define the store with the content
  //then put in the request
  const dataBase = await openDB(dbName);
  console.log(dataBase);
  const transaction = dataBase.transaction(dbName, "readwrite");
  console.log(transaction);
  const store = transaction.objectStore(dbName);
  console.log(store);
  const request = store.put({ id: 1, content });
  console.log(request);
  const response = await request;
  console.log(response);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const dbName = "jate";
    //first open the DB
    //define the transaction
    //define the store with the content
    //then put in the request
    const dataBase = await openDB(dbName, 1);
    const transaction = dataBase.transaction(dbName, "readonly");
    const store = transaction.objectStore(dbName);
    const request = store.get(id);
    const response = await request;
    console.log(response);
  } catch (error) {
    console.error("putDb not implemented");
  }
};

initdb();
