const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://tejavarma0808:zeZe2AMvLTNAWpuc@cluster0.xsyvicr.mongodb.net/TodoApp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('Connected to DB'))
    .catch(console.error);

const Todo = require('./models/Todo');
app.get('/todos', async(req,res) =>{
    const todos = await Todo.find();

    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

app.post('/todo/new' , (req,res) => {
    const todo =  new Todo({
        text: req.body.text
    });

    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req,res)=> {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.get('/todo/complete/:id', async(req,res) =>{
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);

})
app.listen(3001, () => console.log("Server started on port 3001"));

