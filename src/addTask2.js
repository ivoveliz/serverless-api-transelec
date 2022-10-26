const AWS = require("aws-sdk");

const getTasks = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
let val = 'device-oficina';

let params = {
  TableName: "TranselecDB_Oficina",
  ExpressionAttributeValues: {
    ':IdDevice': {
      S: val,
    },
  },
  Limit: 1000,
  FilterExpression: 'MyAttribute = :IdDevice'
};


  const result = await dynamodb.scan(params).promise();

  const tasks = result.Items;

  return {
    status: 200,
    body: {
      tasks,
    },
  };
};

module.exports = {
  getTasks,
};