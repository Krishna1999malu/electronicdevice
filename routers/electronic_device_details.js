var deviceCrtl = require('../controllers/electronic_device_details');
const deviceRouter = function (app) {

	var device = deviceCrtl;

    //1.Adding a new electronic device to the database.
	app.post('/create' ,device.addDevice);

    //2.Updating details of an existing electronic device in the database.
	app.put('/update/:id' ,device.updateDevice);

    //3. Removing an existing electronic device from the database.
    app.delete('/delete/:id' ,device.deleteDevice);

   //4.Getting the details of all electronic devices in the database.
    app.get('/getDevices' ,device.getAllDevice);

}
module.exports = deviceRouter;
