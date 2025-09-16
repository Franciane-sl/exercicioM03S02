import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import styles from "./CadastroDeProduto.module.css";

export default function CadastroProduto() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/produtos", {
        nome: name,
        preco: parseFloat(price),
        descricao: description,
        imagem: imageUrl,
      });

      setMessage("Produto cadastrado com sucesso!");
      console.log("Sucesso:", response.data);

      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      setMessage("Erro ao cadastrar produto.");
      console.error("Erro:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className={styles.container}>
        <Typography variant="h4" className={styles.title}>
          Cadastro de Produto
        </Typography>

        {message && (
          <Alert severity={message.includes("sucesso") ? "success" : "error"}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            fullWidth
            label="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Preço do produto"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            fullWidth
            label="Descrição"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            fullWidth
            label="URL da imagem"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={styles.button}
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </Container>
  );
}
