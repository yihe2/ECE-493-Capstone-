const {insertUser, insertHealthInformation, insertFinancialInformation, updateHealthInformation, deleteHealthInformation, getHealthInformation, deleteFinancialInformation, updateFinancialInformation} = require('./mongo.js');
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
      db = await connection.db('test');
    }, 10000);
  
    afterAll(async () => {
      await connection.close();
    }, 10000);

    it('should insert health information into collection', async () => {
        const healthInfo = {
            email: 'test2@example.com',
            smoking: 'No',
            alcoholConsumption: 'Occasionally',
            sex: 'Male',
            age: 30,
            race: 'Asian',
            difficultyWalking: 'No',
            diabetic: 'No',
            physicalActivity: 'Yes',
            generalHealth: 'Good',
            asthma: 'No',
            kidneyDisease: 'No',
            skinCancer: 'No',
            stroke: 'No',
            BMI: 22,
            PhysicalHealth: 'Good',
            MentalHealth: 'Good',
            SleepTime: 8,
          };
  
          await insertHealthInformation(
            healthInfo.email,
            healthInfo.smoking,
            healthInfo.alcoholConsumption,
            healthInfo.sex,
            healthInfo.age,
            healthInfo.race,
            healthInfo.difficultyWalking,
            healthInfo.diabetic,
            healthInfo.physicalActivity,
            healthInfo.generalHealth,
            healthInfo.asthma,
            healthInfo.kidneyDisease,
            healthInfo.skinCancer,
            healthInfo.stroke,
            healthInfo.BMI,
            healthInfo.PhysicalHealth,
            healthInfo.MentalHealth,
            healthInfo.SleepTime,
            connection
          );
    
        const insertedHealthInfo = await db.collection('HealthInformation').findOne({ email: healthInfo.email });
        expect(insertedHealthInfo).toBeTruthy();
        expect(insertedHealthInfo.email).toBe(healthInfo.email);
      });
  
      // Insert Financial Information Test
      it('should insert financial information into collection', async () => {
        const financialInfo = {
          email: 'test2@example.com',
          income: 75000,
          expense: 0,
          savings: 0,
          investements: 0,
          debt: 0
        };
  
        await insertFinancialInformation(financialInfo.email, financialInfo.income, financialInfo.expense, financialInfo.savings, financialInfo.investements, financialInfo.debt, connection);
    
        const insertedFinancialInfo = await db.collection('FinancialInformation').findOne({ email: financialInfo.email });
        expect(insertedFinancialInfo).toBeTruthy();
        expect(insertedFinancialInfo.email).toBe(financialInfo.email);
      });
  
      // Update Health Information Test
      it('should update health information in collection', async () => {
        const updates = { smoking: 'Yes' }; // Example update
        await updateHealthInformation('test2@example.com', updates, connection);
    
        const updatedHealthInfo = await db.collection('HealthInformation').findOne({ email: 'test2@example.com' });
        expect(updatedHealthInfo).toBeTruthy();
        expect(updatedHealthInfo.smoking).toBe(updates.smoking);
      });
  

      // Get Health Test
      it('should fetch health information for a user', async () => {
        const healthInfo = await getHealthInformation('test2@example.com', connection);
        expect(healthInfo).toBeTruthy();
        expect(healthInfo.email).toBe('test2@example.com');
    }, 10000);

    // Update Financial Test
    it('should update financial information in collection', async () => {
        const updates = { savings: 20000 };
        await updateFinancialInformation('test2@example.com', updates, connection);
        const updatedFinancialInfo = await db.collection('FinancialInformation').findOne({ email: 'test2@example.com' });
        expect(updatedFinancialInfo).toBeTruthy();
        expect(updatedFinancialInfo.savings).toBe(updates.savings);
    }, 10000);

    // Delete Health
    it('should delete health information from collection', async () => {
        await deleteHealthInformation('test2@example.com', connection);
        const deletedHealthInfo = await db.collection('HealthInformation').findOne({ email: 'test2@example.com' });
        expect(deletedHealthInfo).toBeFalsy();
    }, 10000);

    // Delete Financial
    it('should delete financial information from collection', async () => {
        await deleteFinancialInformation('test2@example.com', connection);
        const deletedFinancialInfo = await db.collection('FinancialInformation').findOne({ email: 'test2@example.com' });
        expect(deletedFinancialInfo).toBeFalsy();
    }, 10000);
});