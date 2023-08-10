const { newSequlize, DataTypes } = require("..")

const postModel = (newSequlize, DataTypes) => newSequlize.define('posts', {
     imgurl: {
          type: DataTypes.STRING,
          allowNull: false
     },
     userid: {
          type: DataTypes.INTEGER
     },
     title: {
          type: DataTypes.STRING
     },
     contant: {
          type: DataTypes.STRING
     },
     category: {
          type: DataTypes.ENUM(["Nature", "Wildlife",
               "Pets", "Domestic", "Animals",
               "Food", "Culinary",
               "Travel", "Adventure",
               "Architecture", "Urban", "Scenes",
               "Portraits", "People",
               "Fashion", "Style",
               "Macro", "Close-ups",
               "Abstract", "Artistic",
               "Events", "Celebrations",
               "Sports", "Action",
               "Black", "White",
               "Lifestyle", "Everyday", "Moments",
               "Vintage", "Retro",
               "Technology", "Innovation"
     ]),
          allowNull: false

          // set(category){
          //      const arr = JSON.stringify(category)
          //      this.setDataValue("category" , arr)

          //      console.log(JSON.parse("[\"animal\",\"summer\",\"black\"]"));
          // }
     }
})


module.exports = postModel