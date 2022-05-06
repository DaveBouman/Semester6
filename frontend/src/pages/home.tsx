import { Grid } from "@mui/material";
import SearchBar from "../components/searchBar";

const Home = () => {
  return (
    <Grid container justifyContent="center" maxWidth="lg">
      <SearchBar />
    </Grid>
  );
};

export default Home;
