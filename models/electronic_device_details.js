var mongoose = require("mongoose");

var deviceSchema = mongoose.Schema({
    deviceName: {type:String,required:true},
    deviceBrandName: {type:String},
    description: {type:String},
    price: {type:Number},
    createdAt: { type: Date, default: Date.now }
});

var electronicDevices = mongoose.model("electronic_device_details", deviceSchema);
module.exports = electronicDevices;