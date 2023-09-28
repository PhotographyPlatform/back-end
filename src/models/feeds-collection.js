'use strict'

const Collection = require('./data-collections')
const modules = require("./index")
const { Op } = require('sequelize');




async function handleUserPost(req, res, next) {
    try {
        const id = req.users.userId;
        const record = await modules.newPostCOll.getUserPost(id)
        res.status(200).json(record);
    } catch (err) {
        next(err);
    }
}







class Feeds extends Collection {
    constructor(userId) {
        super();
        this.userId = userId;
    }
    async getOtherUserPost() {
        const id = this.userId;
        let record = await modules.newUserCOll.following(id, modules.user);
        let post = [];

        for (let item of record.Following) {

            let data = await modules.newUserCOll.readAll(
                item.id,
                modules.post,
                modules.comment,
                modules.like
            )
            post=[...data.posts];
        }
        return post;
    }

    async getSuggestPost() {
        // by user behaviour buld on  like on the post 
        try {
            const id = this.userId;
            let allLike = await modules.like.findAll({ where: { userid: id } });
            let interested = [];
            for (const item of allLike) {
                await modules.post.findByPk(item.dataValues.postid).then(data => {
                    interested.push(data.dataValues.category);
                })
                interested = [].concat(...interested).filter(item => item !== null);
            }

            let FrequentCategory = this.findMostFrequentItems(interested)

            let postInterested = await modules.post.findAll({
                where: {
                    category: {
                        [Op.contains]: FrequentCategory
                    }
                }
            })

            let postIdLikedBefore = allLike.map(likeRecord => {
                return likeRecord.postid;
            })


            let suggestion = [];

            for (let item of postInterested) {
                if (!postIdLikedBefore.includes(item.id)) {
                    let data = await modules.newUserCOll.readAll(
                        item.id,
                        modules.post,
                        modules.comment,
                        modules.like
                    )
                    suggestion.push(data);
                }
            }


            // let suggestion = postInterested.map(post => {
            //     if (!postIdLikedBefore.includes(post.id)) {
            //         console.log(post)
            //         return (post);
            //     }
            // })
            suggestion = suggestion.filter(item => item !== null && item !== undefined);

            suggestion = suggestion.filter(item => item.dataValues.userid !== this.userId);




            return suggestion;

        } catch (err) {
            console.log(err);
        }

    }
    findMostFrequentItems(arr) {
        const frequencyMap = {};
        // Create a frequency map
        arr.forEach(item => {
            if (frequencyMap[item]) {
                frequencyMap[item]++;
            } else {
                frequencyMap[item] = 1;
            }
        });

        // Find the maximum frequency
        let maxFrequency = 0;
        for (const item in frequencyMap) {
            if (frequencyMap[item] > maxFrequency) {
                maxFrequency = frequencyMap[item];
            }
        }
        // Find items with the maximum frequency
        const mostFrequentItems = [];
        for (const item in frequencyMap) {
            if (frequencyMap[item] === maxFrequency) {
                mostFrequentItems.push(item);
            }
        }
        return mostFrequentItems;
    }

    async getChllange() {
        // get all Chllange on the pltform 
        return await modules.challenagesCollection.get();
    }

    async getAllData() {
        let mergedArray = [];
        let getOtherUserPost = await this.getOtherUserPost();
        let getSuggestPost = await this.getSuggestPost();
        let getChllange = await this.getChllange();
        mergedArray = [...getOtherUserPost, ...getSuggestPost, ...getChllange]
        return mergedArray;
    }

}

module.exports = Feeds;

