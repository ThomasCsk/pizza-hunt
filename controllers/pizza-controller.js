const { Pizza } = require('../models');

const pizzaController = {
  //get all
  getAllPizza(req,res) {
    Pizza.find({})
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  //get one
  getPizzaById({params},res) { //the {params} is just deconstructing the req and only grabbing params
    Pizza.findOne({ _id: params.id })
    .then(dbPizzaData => {
      if(!dbPizzaData){
        res.status(404).json({ message: 'No pizza found with this id!'})
        return;
      }
      res.json(dbPizzaData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  //create pizza
  createPizza({body},res){
    Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.status(400).json(err));
  },
  //update pizza
  updatePizza({ params,body },res) {
    Pizza.findOneAndUpdate({_id: params.id}, body, { new: true }) //the new:true makes it so that one the original document is updated, it returns that instead of the document before it was updated
    .then(dbPizzaData => {
      if(!dbPizzaData){
        res.status(404).json({ message: 'No pizza found with this id!'});
        return;
      }
      res.json(dbPizzaData)
    })
    .catch(err => res.status(400).json(err))
  },
  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;