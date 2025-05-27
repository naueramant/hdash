import { Box, IconButton, Typography } from "@mui/joy";
import type { FunctionComponent } from "react";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useUserStore from "../../stores/user";

interface TopBarProps {
  onExit?: () => void;
}

const TopBar: FunctionComponent<TopBarProps> = (props) => {
  const userStore = useUserStore();

  return (
    <Box
      sx={{
        flex: 1,
        maxHeight: "fit-content",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography fontSize={32} startDecorator={<FaUser />}>
        {userStore.user?.name}
      </Typography>
      <IconButton
        onClick={() => {
          props.onExit?.();
        }}
      >
        <IoClose size={64} />
      </IconButton>
    </Box>
  );
};

export default TopBar;
