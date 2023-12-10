import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, ScanCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-east-2" });
const docClient = DynamoDBDocument.from(client);

export const fetchTasks = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "Tasks",
  })

  const response = await docClient.send(command)
  return response
}

export const createTask = async ({name, completed}) => {
  const command = new PutCommand({
    TableName: "Tasks",
    Item: {
      id: crypto.randomUUID(),
      name,
      completed,
    },
  });

  const response = await docClient.send(command);
  return response;
}

export const updateTask = async ({id, name, completed}) => {
  const command = new UpdateCommand({
    TableName: "Tasks",
    Item: {
      id,
      name,
      completed,
    },
  });
  // const command1 = new UpdateCommand({
  //   TableName: "Tasks",
  //   Key: {
  //     id,
  //   },
  //   UpdateExpression: "set #name = :name, completed = :completed",
  //   ExpressionAttributeNames: {
  //     "#name": "name",
  //   },
  //   ExpressionAttributeValues: {
  //     ":name": name,
  //     ":completed": completed,
  //   },
  // })

  const response = await docClient.send(command);
  return response;
}

export const deleteTask = async (id) => {
  const command = new DeleteCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
  });

  const response = await docClient.send(command);
  return response;
}