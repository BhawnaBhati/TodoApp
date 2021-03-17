import { DB } from "./dbConnection";
import { TaskRecord } from "../utils/types";
import { BadRequest, NotFound, BadAuthorization } from "../utils/errors";

// Set a default limit to maximum number of tasks returns at a time
const LIMIT = 100;

const getTasks = async ({
  user_id,
  name = "",
  completed,
}: {
  user_id: number;
  name: string | undefined;
  completed: boolean | undefined;
}) => {
  let criteria = `where user_id=${user_id}`;
  if (completed !== undefined) {
    criteria = ` and completed = ${completed}`;
  }
  if (name !== "") {
    criteria += ` and name ilike '%${name}%'`;
  }
  const itemList = await DB.any(
    `SELECT * FROM tasks ${criteria} order by created_at LIMIT ${LIMIT}`
  );
  return itemList;
};

const createTask = async (task: TaskRecord) => {
  await DB.none(
    `INSERT INTO tasks(
        user_id,name,completed
    ) VALUES ( 
      $(user_id),$(name), $(completed)
    )`,
    { ...task }
  );
};

const updateTask = async (task: TaskRecord) => {
  const item = await DB.oneOrNone(
    `SELECT completed FROM tasks where id=$(id)`,
    { ...task }
  );
  if (item === null) {
    throw new NotFound("Not found.");
  }
  await DB.none(
    `UPDATE tasks SET 
           name=$(name), completed=$(completed)
        where id=$(id)`,
    { ...task }
  );
};

const deleteTask = async (id: number) => {
  const item = await DB.oneOrNone(`SELECT completed FROM tasks where id=${id}`);
  if (item === null) {
    throw new NotFound("Not found.");
  }
  if (item.completed === false) {
    await DB.none(`DELETE FROM tasks where id=${id}`, id);
    return;
  }
  throw new BadRequest(
    "Bad Request. Task is marked complete, it cannot be deleted."
  );
};

const dashboard = async (userId: number) => {
  console.log("running queries");
  const dbItem = await DB.oneOrNone(
    `SELECT count(*) as "totalTasks",
    count(*) filter(where completed=true) as "tasksCompleted"
     FROM tasks 
     where user_id=$(userId)`,
    { userId }
  );

  const latestTasks = await DB.any(
    `SELECT id,name,completed FROM tasks 
    where user_id=$(userId) 
    order by created_at desc 
    LIMIT 3`,
    { userId }
  );
  return {
    tasksCompleted: dbItem.tasksCompleted,
    totalTasks: dbItem.totalTasks,
    latestTasks,
  };
};

export { getTasks, createTask, updateTask, deleteTask, dashboard };
