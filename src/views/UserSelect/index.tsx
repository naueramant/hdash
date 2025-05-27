import { Box, Button, Card, Stack, Typography } from "@mui/joy";
import type { FunctionComponent } from "react";
import type { User } from "../../models/user";
import useUserStore from "../../stores/user";

const SelectUser: FunctionComponent = () => {
  const userStore = useUserStore();

  const users: User[] = [
    {
      name: "Laura",
      height: 176,
      birthday: "1993-01-13",
      gender: "female",
    },
    {
      name: "Jonas",
      height: 184,
      birthday: "1993-02-19",
      gender: "male",
    },
  ];
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 500,
        }}
      >
        <Stack gap={1}>
          <Typography textAlign="center" fontSize={32}>
            who are you?
          </Typography>

          {users.map((u) => (
            <Card
              key={u.name}
              component={Button}
              variant="outlined"
              onClick={() => {
                userStore.set(u);
              }}
            >
              <Typography textAlign="center" fontSize={24} fontWeight={500}>
                {u.name}
              </Typography>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SelectUser;
