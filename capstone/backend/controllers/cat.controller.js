import { getAllCats, getCatById, createCat } from '../services/cat.service.js';

export async function getCats(req, res) {
  try {
    const cats = await getAllCats();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getThisCatById(req, res) {
  try {
    const cat = await getCatById(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Cat not found' });
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createNewCat(req, res) {
  try {
    const cat = await createCat(req.body);
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
