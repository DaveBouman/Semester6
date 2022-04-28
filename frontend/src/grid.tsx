import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import Draggable from "react-draggable";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const DraggableBox = ({ id }: { id: string }) => {
  const updateXarrow = useXarrow();
  return (
    /* @ts-ignore */
    <Draggable
      onDrag={updateXarrow}
      onStop={updateXarrow}
      defaultPosition={{ x: 11, y: 112 }}
    >
      <div id={id}>
        {id}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" gap={1}>
              <TextField
                id="standard-basic"
                label="version"
                variant="standard"
              />
              <IconButton aria-label="Remove">
                <RemoveIcon />
              </IconButton>
            </Stack>
            <IconButton aria-label="Add">
              <AddIcon />
            </IconButton>
          </CardContent>
        </Card>
      </div>
    </Draggable>
  );
};

function Grid() {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <Xwrapper>
        <DraggableBox id={"elem1"} />
        <DraggableBox id={"elem2"} />
        <DraggableBox id={"elem3"} />
        <Xarrow start={"elem1"} end={"elem2"} />
        <Xarrow start={"elem2"} end={"elem3"} />
      </Xwrapper>
    </div>
  );
}
export default Grid;
