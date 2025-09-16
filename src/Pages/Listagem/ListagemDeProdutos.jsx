import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import styles from "./ListagemDeProdutos.module.css";

function ListagemDeProdutos() {
  const [produtos, setProdutos] = useState([]);

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
              <Button size="small" variant="outlined" color="primary">Editar</Button>
              <Button size="small" variant="outlined" color="error">Deletar</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default ListagemDeProdutos;
