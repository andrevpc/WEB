const database = require("../config/db");
const sala = require("../model/sala");
const aluno = require("../model/aluno");

module.exports = {
  async pagInicialGet(req, res) {
    const salas = await sala.findAll({
      raw: true, // Retorna somente os valores de uma tabela, sem os metadados.
      attributes: ["IDSala", "Nome"],
    });
    res.render("../views/index", { salas, alunos: "", id: "", salaescolhida: '' });
  },

  async pagInicialPost(req, res) {
    const id = req.body.nome;

    const salas = await sala.findAll({
      raw: true,
      attributes: ["IDSala", "Nome"],
    });

    if (id == "cancel") {
      const alunos = await aluno.findAll({
        raw: true,
        attributes: ["IDAluno", "Nome", "Idade", "Foto"],
      });
  
      res.render("../views/index", { salas, alunos: alunos, id: id });
      return
    }

    const salaescolhida = await sala.findByPk(id,{
      raw: true,
      attributes: ["IDSala", "Nome", "Capacidade"]
    })

    const alunos = await aluno.findAll({
      raw: true,
      attributes: ["IDAluno", "Nome", "Idade", "Foto"],
      where: { IDSala: id },
    });

    res.render("../views/index", { salas, alunos: alunos, id: id , salaescolhida: salaescolhida});
  },
};
