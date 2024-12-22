
const model = require('../models/model.js');

// POST: http://localhost:8080/api/categories
async function create_Categories(req, res) {
    try {
        // Create a new category instance
        const Create = new model.Categories({
            type: "Investment",
            color: "#FCBE44"
        })

        // Save the category and wait for the operation to complete
        let savedCategory = await Create.save();
        
        // Send the saved category as a response
        res.json(savedCategory);
    } catch (err) {
        // Handle errors and send a response with the error message
        res.status(400).json({ message: `Error while creating categories: ${err}` });
    }
}

// get: http://localhost:8080/api/categories
async function get_Categories(req, res) {
    
    const data = await model.Categories.find({});
    let filter = await data.map(v => Object.assign({},{ type: v.type, color: v.color }));
    return res.json(filter);

}

// POST: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
    
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let { name, type, amount } = req.body;

    try {
        const newTransaction = new model.Transaction({
            name,
            type,
            amount,
            date: new Date()
        });

        const savedTransaction = await newTransaction.save();
        return res.json(savedTransaction);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating transaction: ${err.message}` });
    }
}

//  get: http://localhost:8080/api/transaction
async function get_Transaction(req, res){
    let data = await model.Transaction.find({});
    return res.json(data);
}

//  delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res){
    if (!req.body) return res.status(400).json({ message: "Request body not Found"});
   
    try {
        const result = await model.Transaction.deleteOne(req.body);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No records found to delete" });
        }
        return res.json({ message: "Record deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: `Error while deleting transaction record: ${err}` });
    }
}

//  get: http://localhost:8080/api/labels
async function get_Labels(req, res) {

    model.Transaction.aggregate([
        {
            $lookup: {
                from: "categories",       // Collection to join with
                localField: "type",       // Field from the `Transaction` collection
                foreignField: "type",     // Field from the `categories` collection
                as: "categories_info"     // Field to hold the joined documents
            }
        },
        {
            $unwind: "$categories_info"
        }
        
    ]).then(result => {
        // Format the result to include the necessary fields
        let data = result.map(v => Object.assign({},{_id: v._id,name: v.name,type: v.type,amount: v.amount,color: v.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json({ message: "Lookup Collection Error", error });
    })
}



module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}
