const AWS = require("aws-sdk");

const getTasks = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  

  let params = {
    TableName: "TranselecDB_Oficina",
     
    Limit: 1000,
   
  };
  
    const result = await dynamodb.scan(params).promise();
  const tasks = result.Items;
  let dataOrder= tasks.sort((a,b)=> new Date(b.CreatedAt).getTime() - 
  new Date(a.CreatedAt).getTime());

  return {
    status: 200,
    body: {
      tasks,
      dataOrder
    },
  };
};

module.exports = {
  getTasks,
};