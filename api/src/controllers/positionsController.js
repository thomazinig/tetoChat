
import pool from '../models/db.js';


export const getPositions = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM positions");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar cargos:", error);
    res.status(500).send("Erro ao buscar cargos");
  }
};


export const addPosition = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Nome do cargo é obrigatório");
  }

  try {
    const [result] = await pool.query("INSERT INTO positions (name) VALUES (?)", [name]);
    res.status(201).send(`Cargo adicionado com sucesso. ID: ${result.insertId}`);
  } catch (error) {
    console.error("Erro ao adicionar cargo:", error);
    res.status(500).send("Erro ao adicionar cargo");
  }
};

export const deletePosition = async (req, res) => {
  const positionId = req.params.id;

  try {
    const [result] = await pool.query("DELETE FROM positions WHERE id = ?", [positionId]);
    if (result.affectedRows > 0) {
      res.status(200).send("Cargo deletado com sucesso");
    } else {
      res.status(404).send("Cargo não encontrado");
    }
  } catch (error) {
    console.error("Erro ao deletar cargo:", error);
    res.status(500).send("Erro ao deletar cargo");
  }
};


export const editPosition = async (req, res) => {
  const { id } = req.params; 
  const { name } = req.body; 

  try {
    
    const updatedPosition = await Position.update(
      { name }, 
      {
        where: {
          id, 
        },
      }
    );

    if (updatedPosition[0] === 0) {
      return res.status(404).json({ message: "Cargo não encontrado" });
    }

    
    res.status(200).json({
      message: "Cargo atualizado com sucesso",
      position: { id, name }, 
    });
  } catch (error) {
    console.error("Erro ao atualizar cargo:", error);
    res.status(500).json({ message: "Erro ao atualizar o cargo", error });
  }
};