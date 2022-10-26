const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async(event) =>{

const dynamodb = new AWS.DynamoDB.DocumentClient();
const {IdDevice,VertionFirmware,MaxVolumen,MinVolumen,PromVolumen }= JSON.parse(event.body)
const TimeStamp=Date.now()
const date= new Date();
let CreatedAt = date.toISOString();
const id=v4();

const newTask = {
    id,
    CreatedAt,
    TimeStamp,
    IdDevice,
    VertionFirmware,
    MaxVolumen,
    MinVolumen,
    PromVolumen,
   
  };

  await dynamodb
    .put({
      TableName: "TranselecDB_Oficina",
      Item: newTask,
    })
    .promise();

return {
    statusCode: 200,
    body: JSON.stringify(newTask),
  };


};


module.exports = {
  addTask,
};

 