const {
    Stitch,
    RemoteMongoClient,
    RemoteMongoCollection,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('kid_jira-vuftc');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('tasks');

const fetchTaskData = () => client.auth.loginWithCredential(new AnonymousCredential()).then(() => db.collection('items').find({}, { limit: 100}).toArray().then(val => val)).then(docs => { 
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
  let tasks = docs.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
  console.log('mapped tasks', tasks)
  return tasks
}
).catch(err => {
    console.error(err)
});

export async function stitchTaskFetch() {
  const tasks =  await fetchTaskData()
  console.log('fetched tasks', tasks)
  return tasks
}

const fetchColumnData = () => client.auth.loginWithCredential(new AnonymousCredential()).then(() => db.collection('columns').find({}, { limit: 100}).toArray().then(val => val)).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
  let columns = docs.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
  console.log('mapped columns', columns)
  return columns
}
).catch(err => {
    console.error(err)
});

export async function stitchColumnFetch() {
  const columns =  await fetchColumnData()
  console.log('fetched columns', columns)
  return columns
}

const initialData = {
 tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" }
  },  
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"]
};

export { initialData, db, client }
