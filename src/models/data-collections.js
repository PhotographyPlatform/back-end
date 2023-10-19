"use strict";

class Collection {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    if (id) {
      const fineOne = await this.model.findOne({ where: { id } });
      return fineOne;
    } else {
      const findAll = await this.model.findAll();
      return findAll;
    }
  }
  async getEmail(email) {
    const fineOne = await this.model.findOne({ where: { email } });
    return fineOne;
  }
  async create(obj) {
    const add = await this.model.create(obj);
    return add;
  }

  async update(id, obj) {
    const updated = await this.model.update(obj, { where: { id } });
    const newRecord = await this.get(id);
    return newRecord;
  }

  async delete(id) {
    const found = await this.get(id);
    const deleted = await this.model.destroy({ where: { id } });
    return `this user has been deleted ${found.id}`;
  }

  async getRelation(id, model) {
    const records = await this.model.findOne({
      where: { id },
      include: model,
    });
    return records;
  }

  async getManyRelation(id, model1, model2) {
    const records1 = await this.model.findAll({
      where: { id },
      include: [model1, model2],
    });
    return records1;
  }

  async getAllManyRelation(model1, model2) {
    const records1 = await this.model.findAll({
      include: [model1, model2],
    });
    return records1;
  }

  async getManyRelationWithReplies(model1, model2, likes) {
    const records1 = await this.model.findAll({
      include: [
        {
          model: model1,
          include: { model: model2 },
        },
        {
          model: likes,
        },
      ],
    });
    return records1;
  }

  async readAll(id, model, model2, model3) {
    const records = await this.model.findOne({
      where: { id },
      include: [
        {
          model: model,
          include: [
            {
              model: model2,
            },
            {
              model: model3,
            },
          ],
        },
      ],
    });
    return records;
  }

  // fixed the followers to return the correct data and take the id from the token
  async followers(id, model) {
    const records = await this.model.findAll({
      where: { id },
      include: { model: model, as: "Followers" },
    });
    const user = records[0].Followers.map((ele) => {
      return { id: ele.id, name: ele.username };
    });
    return { followers: user, Count: user.length };
  }

  // fixed the following to return the correct data and take the id from the token
  async following(id, model) {
    const records = await this.model.findAll({
      where: { id },
      include: { model: model, as: "Following" },
    });
    const user = records[0].Following.map((ele) => {
      return { id: ele.id, name: ele.username };
    });
    return { Following: user, Count: user.length };
  }
  
  async Feeds(id, model) {
    try {
      const records = await this.model.findOne({
        where: { id },
        include: { association: "Following" },
      });
      
      console.log(records, 'GGGGGGGGGGGGGGGGGGGGGG');
      const userPosts = await Promise.all(
        records.Following.map(async (ele) => {
          const userid = ele.id;
          const userPost = await model.findAll({ where: { userid } });
          return userPost;
        })
      );

      const onlyPosts = [].concat(...userPosts);

      return onlyPosts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async SendandRecieveMessage(senderID, reciveId) {
    const sendData = await this.model.findByPk(senderID, {
      include: "sentMessages",
    });
    const resieveData = await this.model.findByPk(senderID, {
      include: "receivedMessages",
    });

    // return {sendData : sendData.sentMessages.filter(ele => ele.receiverId == reciveId ) , resieveData : resieveData.receivedMessages.filter(ele => ele.senderId == senderID ) }
    return {
      sendData: sendData.sentMessages.filter(
        (ele) => ele.receiverId == reciveId
      ),
      resieveData: resieveData.receivedMessages.filter(
        (ele) => ele.receiverId == senderID && ele.senderId == reciveId
      ),
    };
  }

  async SendMessage(senderId) {
    const data = await this.model.findByPk(senderId, {
      include: "sentMessages",
    });

    return data;
  }

  async RecieveMessage(receiverId) {
    const data = await this.model.findByPk(receiverId, {
      include: "receivedMessages",
    });
    return data;
  }

  async getUserPost(userid) {
    const records = await this.model.findAll({
      where: { userid },
      include: ["comments", "likes"],
    });
    return records;
  }
}

module.exports = Collection;
