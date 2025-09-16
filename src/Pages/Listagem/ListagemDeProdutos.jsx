import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Card, CardContent, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./ListagemDeProdutos.module.css";

function ListagemDeProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // estado para pesquisa
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

  // Filtra os produtos pelo nome
  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Lista de Produtos
      </Typography>

      {/* Campo de pesquisa */}
      <TextField
        fullWidth
        label="Pesquisar produtos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />

      <div className={styles.cardsContainer}>
        {filteredProdutos.map((produto) => (
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
