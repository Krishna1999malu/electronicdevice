const Device = require("../models/electronic_device_details");
const fs = require("fs");
const logger = require("../controllers/logger");

/*
Author:krishna priya P
created:23-07-2022
purpose:Adding a new electronic device to the database.
input: deviceName,deviceBrandName,description,price,createdAt
output:Create new electronic device 
steps
1.check device details
2.table has exceeded a limit. This limit should be read from a file named ‘config.json’.
3.If the number of rows in the ‘electronic_device_details’ table has exceeded the limit, an entry should be written
to a log file named ‘application.log’.
4.else create  deviceName successfully
5.occur error,send error message
6.send response
*/

const addDevice = (req, res) => {
  var obj = {};

  // 1.check device details
  if (!req.body || req.body.deviceName == "") {
    return res.json({
      status: false,
      statusCode: 400,
      message: "Please enter device details",
    });
  }

  //2.table has exceeded a limit. This limit should be read from a file named ‘config.json’.
  Device.count()
    .then((count) => {
      console.log(count);

      fs.readFile("config.json", "utf-8", (err, content) => {
        if (err) {
          console.log(err);
        } else {
          obj = JSON.parse(content);
        }
        console.log(content);

        if (count >= obj.counter.limits) {
          res.json({
            status: false,
            statusCode: 500,
            message: "Electronic device details table exceeded the limit of 10 rows",
            data: "",
          })

        //3.If the number of rows  table has exceeded the limit, an entry should be writtento a log file named ‘application.log’.
          logger.deviceLogger.log(
            "info",
            "Electronic device details table exceeded the limit of 10 rows"
          );
        } 

        // 4.else create  deviceName successfully
        else {
          var devices = Device(req.body);
          devices
            .save()
            .then((data) => {
              console.log(data);
              res.json({
                status: true,
                statusCode: 200,
                message: "Successfully created",
                data: data,
              });
            })

            // 5.occur error,send error message
            .catch((err) => {
              res.json({
                status: false,
                statusCode: 500,
                message: err.message,
                data: "",
              });
            });
        }
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        statusCode: 500,
        message: err.message,
        data: "",
      });
    });
};

/*
Author:Krishna priya
 created:23-07-2022
 purpose:Updating details of an existing electronic device in the database.
 input:id
 output:Updated device details
 steps
 Step:1 check Entered device id
 Step:2  if no error ,Update data
 Step:3  error occur ,send error message
 */

const updateDevice = (req, res) => {
  //Step:1 check Entered device id
  if (!req.body || !req.params || !req.params.id || req.params.id == "") {
    return res.json({
      status: false,
      statusCode: 400,
      message: "Please enter device  details",
      data: "",
    });
  }

  // Step:2  if no error ,Update data
  Device.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => {
      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully updated",
        data: data
      });
    })

        // Step:3  error occur ,send error message
    .catch((err) => {
      res.json({
        status: false,
        statusCode: 500,
        message: "Failed to update please try again",
        data: "",
      });
    });
};

/*
Author:Krishna priya p
 created:23-07-2022
 purpose:Removing an existing electronic device from the database.
 input:id
 output:Delete electronic device
 steps
 Step:1 check Entered device id
 Step:2  if no error ,delete data
 Step:3  error occur ,send error message
 */

const deleteDevice = (req, res, next) => {
  var set = {};

  //Step:1 check Entered device id
  if (!req.params || !req.params.id || req.params.id == "") {
    return res.json({
      status: false,
      statusCode: 400,
      message: "Please select device to delete",
      data: "",
    });
  }
  // Step:2  if no error ,delete data
  Device.findOneAndUpdate({ _id: req.params.id }, { $set: set })
    .then((data) => {
      data
        .remove()
        .then((data) => {
          res.json({
            status: true,
            statusCode: 200,
            message: "Successfully deleted",
            data: "",
          });
        })

        // Step:3  error occur ,send error message
        .catch((err) => {
          res.json({
            status: false,
            statusCode: 500,
            message: err.message,
            data: "",
          });
        });
    })
    .catch((err) => {
      res.json({
        status: false,
        statusCode: 500,
        message: err.message,
        data: "",
      });
    });
};
/*
Author:Krishna priya p
created:23-07-2022
purpose:Getting the details of all electronic devices in the database.
output:Getting the details of all electronic devices in the database.
steps
1.if no error occur,send successful get all details
2.Error occur,send error message
*/

const getAllDevice = (req, res) => {
  //if no error occur,send successful get all details
  var devices = Device.find()
    .then((data) => {
      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully get all devices",
        data: data,
      });
      //Error occur,send error message
    })
    .catch((err) => {
      res.json({
        status: false,
        statusCode: 500,
        message: err.message,
        data: "",
      });
    });
};

module.exports = {
  addDevice,
  updateDevice,
  deleteDevice,
  getAllDevice,
};
