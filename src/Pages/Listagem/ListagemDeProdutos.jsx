import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./ListagemDeProdutos.module.css";

function ListagemDeProdutos() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/produtos/${id}`);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar/${id}`);
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Lista de Produtos
      </Typography>

      <div className={styles.cardsContainer}>
        {produtos.map((produto) => (
          <Card className={styles.card} key={produto.id}>
            <img
              src={produto.imagem}
              alt={produto.nome}
              className={styles.cardMedia}
            />

            <CardContent className={styles.cardContent}>
              <Typography className={styles.cardTitle}>{produto.nome}</Typography>
              <Typography className={styles.cardDescription}>{produto.descricao}</Typography>
              <Typography className={styles.cardPrice}>R$ {produto.preco.toFixed(2)}</Typography>
            </CardContent>

            <CardActions className={styles.cardActions}>
              <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(produto.id)}>
                Editar
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(produto.id)}>
                Deletar
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default ListagemDeProdutos;
