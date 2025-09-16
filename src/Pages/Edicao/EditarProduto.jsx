import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, TextField, Button, Alert } from "@mui/material";
import styles from "./EditarProduto.module.css";

function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({ nome: "", preco: "", descricao: "", imagem: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    };
    fetchProduto();
  }, [id]);

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/produtos/${id}`, {
        ...produto,
        preco: parseFloat(produto.preco),
      });
      setMessage("Produto atualizado com sucesso!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setMessage("Erro ao atualizar produto.");
    }
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Editar Produto
      </Typography>

      {message && (
        <Alert severity={message.includes("sucesso") ? "success" : "error"}>
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Preço"
          name="preco"
          type="number"
          value={produto.preco}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Descrição"
          name="descricao"
          multiline
          rows={4}
          value={produto.descricao}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="URL da Imagem"
          name="imagem"
          value={produto.imagem}
          onChange={handleChange}
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Salvar
        </Button>
      </form>
    </Container>
  );
}

export default EditarProduto;
