const users = require('../models/User');
const { signUp, signIn, signOut } = require('../controller/AuthController')
const mongoose = require('mongoose');

describe('AuthController', () => {

    async function dropAllCollections() {
        const collections = Object.keys(mongoose.connection.collections)
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName]
            try {
                await collection.drop()
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    beforeAll(() => {
        mongoose.connect('mongodb://localhost/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
            (err) => {
                if (!err) {
                    console.info("Successfully Established Connection with MongoDB");
                } else {
                    console.error(
                        "Failed to Establish Connection with MongoDB with Error: " + err
                    );
                }
            })
    });

    afterAll(async () => {
        await dropAllCollections()
        // Closes the Mongoose connection
        await mongoose.connection.close()
    });
    let req, res;
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        return res;
    };
    test('expect 422 status code when body params are empty', async () => {
        req = { user: { id: '' }, body: { email: '', password: '', confirmPassword: '', } }
        res = mockResponse();
        const result = await signUp(req, res);
        expect(result.status.mock.calls[0][0]).toBe(422)
        expect(result.send.mock.calls[0][0].message).toBe('Please fill all mandatory fields')
    })

    test('expect 400 status code when password and confirm password doest not match', async () => {
        req = { user: { id: '' }, body: { email: 'test@test.com', password: 'test', confirmPassword: 'test1', } }
        res = mockResponse();
        const result = await signUp(req, res);
        expect(result.status.mock.calls[0][0]).toBe(400)
        expect(result.send.mock.calls[0][0].message).toBe('password and confirm password must be same.')
    })

    test('expect 200 status code when user sign up successfully', async () => {
        req = { user: { id: '' }, body: { email: 'example@example.com', password: 'test', confirmPassword: 'test', } }
        res = mockResponse();
        const result = await signUp(req, res);
        expect(result.status.mock.calls[0][0]).toBe(200)
        expect(result.send.mock.calls[0][0].message).toBe('Wohoo! you have registered with us Successfully, Now please login')
    })
})