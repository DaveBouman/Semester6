import React, { useContext } from "react";
import { Card, CardContent, Stack, TextField, Button } from "@mui/material";
import { fetchRequest } from "../utils/fetchRequest";
import { UserContext } from "./context/userContext";

const KweetForm: React.FC = () => {
  const postMessage = () => {
    fetch("http://localhost/api/v1/messages/messages", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        name: "test",
        content: "test",
      }),
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
