'use strict';

const { app } = require("../../server");
const supertest = require('supertest');
const req = supertest(app);
const { newSequlize, newUserCOll, newPostCOll, favoritesCollection} = require('../../models/index');


beforeAll( async () => {
    await newSequlize.sync();

    //users
    await newUserCOll.create({
        username : 'sham', 
        password : "s123", 
        email: "sham@email.com"
    });
    
    await newUserCOll.create({
        username : 'blackangel', 
        password : "s123", 
        email: "blackangel@email.com"
    });
    
    //posts
    await newPostCOll.create({
        "imgurl": "catsimge.png",
        "userid": 1,
        "title": "cats playing with a laser",
        "contant": "i took photos of my cats while they were playing with a laser",
        "category": "animal"
    });
    await newPostCOll.create({
        "imgurl":"blackwatch.png",
        "userid":2,
        "title":"my black car",
        "contant":"a journey to Florida with my black car",
        "category":"animal"
    });

    //favorites
    await favoritesCollection.create({
        "userid":"1",
        "postid":"2"
    });

});

afterAll( async () =>{
    await newSequlize.drop();
});


describe.skip('Favorites test' , () =>{

    it.skip('check if the Favorites route working properly or not', async () =>{

        const response = await req.get('/favorites/1');
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).favorites[0].id).toBe(2);
    })
})
