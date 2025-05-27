import { Box, Button, Input, Stack, Typography } from "@mui/joy";
import { useState, type FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { addUserWeight } from "../../api/weight";
import TopBar from "../../components/TopBar";
import useUserStore from "../../stores/user";

const RecordWeight: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState<string>();
  const navigate = useNavigate();
  const userStore = useUserStore();

  const onRecord = async () => {
    if (!inputValue) return;
    const weight = parseFloat(inputValue);
    if (isNaN(weight)) return;
    if (!userStore.user) return;

    await addUserWeight(userStore.user.name, weight);

    navigate("/overview");
  };

  return (
    <Stack
      sx={{
        flex: 1,
        padding: 2,
      }}
      gap={2}
    >
      <TopBar
        onExit={() => {
          navigate("/overview");
        }}
      />

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
            width: 350,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography textAlign="center" fontSize={32}>
            Enter your weight
          </Typography>

          <Input
            readOnly
            value={inputValue}
            sx={{
              fontSize: 42,
              fontWeight: 500,
              backgroundColor: "background.level1",
              color: "text.primary",
            }}
            endDecorator={"kg"}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
            }}
          >
            {[
              {
                content: 1,
                onClick: () => setInputValue((prev) => (prev ?? "") + "1"),
              },
              {
                content: 2,
                onClick: () => setInputValue((prev) => (prev ?? "") + "2"),
              },
              {
                content: 3,
                onClick: () => setInputValue((prev) => (prev ?? "") + "3"),
              },
              {
                content: 4,
                onClick: () => setInputValue((prev) => (prev ?? "") + "4"),
              },
              {
                content: 5,
                onClick: () => setInputValue((prev) => (prev ?? "") + "5"),
              },
              {
                content: 6,
                onClick: () => setInputValue((prev) => (prev ?? "") + "6"),
              },
              {
                content: 7,
                onClick: () => setInputValue((prev) => (prev ?? "") + "7"),
              },
              {
                content: 8,
                onClick: () => setInputValue((prev) => (prev ?? "") + "8"),
              },
              {
                content: 9,
                onClick: () => setInputValue((prev) => (prev ?? "") + "9"),
              },
              {
                content: ".",
                onClick: () =>
                  setInputValue((prev) => {
                    // if first character, do not allow leading dot
                    if (prev === undefined || prev === "") return;

                    // if already has a dot, do not add another one
                    if (prev.includes(".")) return prev;

                    return (prev ?? "") + ".";
                  }),
              },
              {
                content: 0,
                onClick: () =>
                  setInputValue((prev) => {
                    // if first character, do not allow leading zero
                    if (prev === undefined || prev === "") return;

                    return (prev ?? "") + "0";
                  }),
              },
              {
                content: "C",
                onClick: () => setInputValue(""),
              },
            ].map((button, index) => (
              <Button
                key={index}
                variant="outlined"
                color="neutral"
                onClick={button.onClick}
                sx={{
                  aspectRatio: "1.2 / 1",
                  fontSize: 36,
                }}
              >
                {button.content}
              </Button>
            ))}
          </Box>

          <Button
            fullWidth
            variant={inputValue ? "solid" : "outlined"}
            sx={{
              fontSize: 42,
              fontWeight: 500,
            }}
            onClick={onRecord}
          >
            Record
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default RecordWeight;
