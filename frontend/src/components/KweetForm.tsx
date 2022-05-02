import { Card, CardContent, Stack, TextField, Button } from "@mui/material";
import { fetchRequest } from "../utils/fetchRequest";

const KweetForm = () => {
  const postMessage = () => {
    fetchRequest("http://localhost/api/v1/messages/messages", "POST", {
      name: "This is the name",
      content: "first kweet",
      userId: "sss",
    });
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" gap={1}>
          <TextField
            placeholder="Create Kweet"
            multiline
            inputProps={{ maxLength: 150 }}
            rows={4}
          />
        </Stack>
        <Button variant="contained" onClick={postMessage}>
          Kweet it!
        </Button>
      </CardContent>
    </Card>
  );
};

export default KweetForm;
