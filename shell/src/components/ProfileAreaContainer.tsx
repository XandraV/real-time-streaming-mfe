import { Avatar, Badge, IconButton, Tooltip } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { accounts } from "../config/accounts";
import { AccountSelector, type Account } from "./AccountSelector";
import { styled } from "styled-components";
import { useState } from "react";

const circularButtonStyle = {
  backgroundColor: "transparent",
  color: "#66b2ff",
  border: "2px solid #38406a",
  "&:hover": { backgroundColor: "#3a3a3a1a" },
  width: 32,
  height: 32,
  padding: 2,
};

const StyledProfileArea = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileAreaContainer = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const onSelectAccount = (account: Account) => {
    setSelectedAccount(account);
  };
  return (
    <StyledProfileArea>
      <AccountSelector
        accounts={accounts}
        selectedAccount={selectedAccount}
        onSelect={onSelectAccount}
      />
      <Tooltip title="Notifications">
        <Badge
          variant="dot"
          overlap="circular"
          sx={{ "& .MuiBadge-badge": { backgroundColor: "#ff1f8bff" } }}
        >
          <IconButton sx={circularButtonStyle}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </Badge>
      </Tooltip>
      <Tooltip title="Settings">
        <IconButton sx={circularButtonStyle}>
          <SettingsOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sandra">
        <Avatar
          src="https://general-gif-bucket.s3.eu-west-2.amazonaws.com/me.jpeg"
          alt="sandra"
          sx={{
            width: 32,
            height: 32,
            cursor: "pointer",
            border: "2px solid white",
          }}
        />
      </Tooltip>
    </StyledProfileArea>
  );
};

export default ProfileAreaContainer;
