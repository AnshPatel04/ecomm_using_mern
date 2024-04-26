import Item from "../models/Item.js";

// REad
export const getItem = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);
      res.status(200).json(item);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};

export const getItems = async (req, res) => {
    try {
      const item = await Item.find();
      res.status(200).json(item);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};

export const createItem = async (req, res) => {
  try {
    const {
        name,
        sortDescription,
        longDescription,
        price,
        category,
        image
    } = req.body;

    const newItem = new Item({
      attributes: {
        name,
        sortDescription,
        longDescription,
        price,
        category,
        image
      }
    });
    const savedItem = await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const updatedItems =await Item.deleteOne({_id:req.params.id});
    res.status(200).json(updatedItems);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updatedItems = async (req, res) => {
  try {
    const { id } = req.params;
    const  {
      name,
      sortDescription,
      longDescription,
      price,
      category,
      image
    }  = req.body;
    const newDetails = {
      attributes: {
        'name': name,
        'sortDescription': sortDescription,
        'longDescription': longDescription,
        'price': price,
        'category': category,
        'image': image
      }
    };
    const updatedItem = await Item.findByIdAndUpdate(id, newDetails, {new:true});
    // const updatedPost = await Post.findByIdAndUpdate(id, { $set: { comments: post.comments } }, { new: true });

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};