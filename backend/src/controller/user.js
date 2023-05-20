const Router = require('express')
const userRoute= Router()
const axios = require('axios')
const userModel= require('../models/user')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

userRoute.get('/users', async (req, res) => {
    try {
      const userData = await userModel.find();
      res.status(200).send({ message: 'User data found', userData });
    } catch (error) {
      console.error('Error fetching user data', error);
      res.status(500).send('Error fetching user data');
    }
  });
  
  userRoute.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = await userModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).send({ message: 'Data updated successfully', updateData });
    } catch (error) {
      console.error('Error updating user data', error);
      res.status(500).send('Error updating user data');
    }
  });
  

userRoute.get('/export/csv',async(req,res)=>{
    try{
      const users = await userModel.find();
      const csvWriter= createCsvWriter({
        path: 'user_data.csv',
        header:[
            { id: 'id', title: 'ID' },
            { id: 'name', title: 'Name' },
            { id: 'email', title: 'Email' },
            { id: 'gender', title: 'Gender' },
            { id: 'status', title: 'Status' },
            { id: 'createdAt', title: 'Created At' },
            { id: 'updatedAt', title: 'Updated At' }   
        ]
      })
      await csvWriter.writeRecords(users)
      //console.log("csv file created")
      res.download('user_data.csv')
    }catch(error) {
      console.error('Error fetching user data', error);
      res.status(500).send('Error fetching user data');
    };
})

userRoute.get('/fetch', async (req, res) => {
    try {
      const response = await axios.get('https://gorest.co.in/public-api/users', {
        headers: {
          Authorization: 'Bearer ac40fae1232a8b7fbdde6af9235bde73a0750267dc0429d084dfa61beae8b101'
        }
      });
  
      const userData = response.data?.data || [];
  
      const users = userData.map(userData => {
        return {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          gender: userData.gender,
          status: userData.status,
          createdAt: new Date(userData.Created_at),
          updatedAt: new Date(userData.Updated_at)
        };
      });
  
      if (users.length === 0) {
        console.log('No user data found');
        res.send('No user data found');
        return;
      }
  
      const insertedUsers = await userModel.insertMany(users);
      //console.log('Data fetched and stored in the database:', insertedUsers);
      res.send('Data fetched and stored in the database');
    } catch (error) {
      console.error('Error fetching data from the API', error);
      res.status(500).send('Error fetching data from the API');
    }
  });
  

module.exports = userRoute