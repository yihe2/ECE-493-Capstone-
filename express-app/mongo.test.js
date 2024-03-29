const {insertUser, insertHealthInformation, insertFinancialInformation, updateHealthInformation, deleteUser, deleteHealthInformation} = require('./mongo.js');
const {MongoClient} = require('mongodb');

const uri = 'mongodb+srv://sahusnai:YzhMRa0cjsrJEVhd@cluster0.nrkocdu.mongodb.net/'

describe('Mongooperations', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = await connection.db('test2');
    }, 10000);
  
    afterAll(async () => {
      await connection.close();
    }, 10000);
  
    it('should insert a user into collection', async () => { 
      const users = db.collection('users');
  
      await insertUser('test2@example.com', 'password123', 'salt123');
  
      const insertedUser = await users.findOne({ email: 'test@example.com' });
      expect(insertedUser).toBeTruthy();
      expect(insertedUser.email).toBe('test@example.com');
    }, 100000);

    it('should insert health information into collection', async () => {
        const healthInfo = {
          email: 'test@example.com',
          smoking: 'No',
        };
  
        await insertHealthInformation(healthInfo.email, healthInfo.smoking, /* other params */);
    
        const insertedHealthInfo = await db.collection('HealthInformation').findOne({ email: healthInfo.email });
        expect(insertedHealthInfo).toBeTruthy();
        expect(insertedHealthInfo.email).toBe(healthInfo.email);
      });
  
      // Insert Financial Information Test
      it('should insert financial information into collection', async () => {
        const financialInfo = {
          email: 'test@example.com',
          income: 75000,
          // Add all other required fields as per your function parameters
        };
  
        await insertFinancialInformation(financialInfo.email, financialInfo.income, /* other params */);
    
        const insertedFinancialInfo = await db.collection('FinancialInformation').findOne({ email: financialInfo.email });
        expect(insertedFinancialInfo).toBeTruthy();
        expect(insertedFinancialInfo.email).toBe(financialInfo.email);
      });
  
      // Update Health Information Test
      it('should update health information in collection', async () => {
        const updates = { smoking: 'Yes' }; // Example update
        await updateHealthInformation('test@example.com', updates);
    
        const updatedHealthInfo = await db.collection('HealthInformation').findOne({ email: 'test@example.com' });
        expect(updatedHealthInfo).toBeTruthy();
        expect(updatedHealthInfo.smoking).toBe(updates.smoking);
      });
  
      // Delete User Test
      it('should delete a user from collection', async () => {
        await deleteUser('test2@example.com');
        const deletedUser = await db.collection('users').findOne({ email: 'test2@example.com' });
        expect(deletedUser).toBeFalsy();
      });

  });